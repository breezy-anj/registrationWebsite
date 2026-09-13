import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

async function init() {
  console.log('Initializing database...');
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS registrations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        team_name VARCHAR(255),
        phone_number VARCHAR(50) NOT NULL,
        college_year VARCHAR(50) NOT NULL,
        branch VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log('Table "registrations" created successfully (or already exists).');
  } catch (error) {
    console.error('Error creating table:', error);
  }
}

init();
