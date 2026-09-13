'use server';

import { z } from 'zod';
import { sql } from '@/lib/db';
import { appendToSheet } from '@/lib/sheets';
import { redirect } from 'next/navigation';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  team_name: z.string().optional(),
  phone_number: z.string().min(10, 'Valid phone number is required'),
  college_year: z.string().min(1, 'College year is required'),
  branch: z.string().min(1, 'Branch is required'),
});

export async function registerAction(prevState: any, formData: FormData) {
  const data = {
    name: formData.get('name') as string,
    team_name: formData.get('team_name') as string,
    phone_number: formData.get('phone_number') as string,
    college_year: formData.get('college_year') as string,
    branch: formData.get('branch') as string,
  };

  const parsed = schema.safeParse(data);

  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Register.',
    };
  }

  const { name, team_name, phone_number, college_year, branch } = parsed.data;

  try {
    // 1. Insert into DB
    await sql`
      INSERT INTO registrations (name, team_name, phone_number, college_year, branch)
      VALUES (${name}, ${team_name}, ${phone_number}, ${college_year}, ${branch})
    `;

    // 2. Append to Sheet
    const dateStr = new Date().toLocaleString();
    await appendToSheet([name, team_name || 'N/A', phone_number, college_year, branch, dateStr]);
    
  } catch (error) {
    console.error('Database Error:', error);
    return {
      message: 'Database Error: Failed to complete registration.',
    };
  }

  // Redirect on success
  redirect('/success');
}
