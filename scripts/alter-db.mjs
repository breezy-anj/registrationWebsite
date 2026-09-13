import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

async function alter() {
  console.log('Altering database...');
  try {
    await sql`
      ALTER TABLE registrations
      ADD COLUMN IF NOT EXISTS member2_name VARCHAR(255),
      ADD COLUMN IF NOT EXISTS member2_phone VARCHAR(50),
      ADD COLUMN IF NOT EXISTS member3_name VARCHAR(255),
      ADD COLUMN IF NOT EXISTS member3_phone VARCHAR(50);
    `;
    console.log('Table "registrations" altered successfully.');
  } catch (error) {
    console.error('Error altering table:', error);
  }
}

alter();
