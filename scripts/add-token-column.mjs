import { neon } from '@neondatabase/serverless';
import crypto from 'crypto';

const sql = neon(process.env.DATABASE_URL);

async function addTokenColumn() {
  console.log('Adding token column to participants table...');
  try {
    await sql`
      ALTER TABLE participants 
      ADD COLUMN IF NOT EXISTS token VARCHAR(255);
    `;
    await sql`
      CREATE INDEX IF NOT EXISTS idx_participants_token ON participants(token);
    `;

    // Backfill any existing records with a token if null
    const existing = await sql`SELECT id, team_name FROM participants WHERE token IS NULL`;
    if (existing.length > 0) {
      console.log(`Backfilling token for ${existing.length} existing rows...`);
      // Group by team_name or assign a token
      const teams = [...new Set(existing.map(r => r.team_name))];
      for (const team of teams) {
        const teamToken = crypto.randomUUID();
        await sql`UPDATE participants SET token = ${teamToken} WHERE team_name = ${team} AND token IS NULL`;
      }
    }

    console.log('Token column added and indexed successfully.');
  } catch (err) {
    console.error('Migration error:', err);
  }
}

addTokenColumn();
