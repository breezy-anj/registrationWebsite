import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

async function migrate() {
  console.log('Migrating database...');
  try {
    await sql`DROP TABLE IF EXISTS registrations;`;
    await sql`DROP TABLE IF EXISTS participants;`;

    await sql`
      CREATE TABLE participants (
        id SERIAL PRIMARY KEY,
        team_name VARCHAR(255) NOT NULL,
        is_leader BOOLEAN NOT NULL DEFAULT false,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        phone_number VARCHAR(50) NOT NULL,
        roll_number VARCHAR(100) NOT NULL,
        institution VARCHAR(255) NOT NULL,
        college_year VARCHAR(50) NOT NULL,
        branch VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log('Table "participants" created successfully.');
  } catch (error) {
    console.error('Error migrating table:', error);
  }
}

migrate();
