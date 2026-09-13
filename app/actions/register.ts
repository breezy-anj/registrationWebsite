'use server';

import { z } from 'zod';
import { sql } from '@/lib/db';
import { appendToSheet } from '@/lib/sheets';
import { redirect } from 'next/navigation';

const phoneRegex = /^[0-9]{10}$/;
const phoneError = 'Must be exactly 10 digits';

const memberSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().regex(phoneRegex, phoneError),
  roll: z.string().min(1, 'Roll number is required'),
  institution: z.string().min(1, 'Institution is required'),
  year: z.string().min(1, 'Year is required'),
  branch: z.string().min(1, 'Branch is required'),
});

const formSchema = z.object({
  team_name: z.string().min(1, 'Team name is required'),
  members: z.array(memberSchema).min(1).max(3),
});

export async function registerAction(prevState: any, formData: FormData) {
  const memberCountStr = formData.get('member_count') as string;
  const count = parseInt(memberCountStr, 10) || 1;
  const team_name = formData.get('team_name') as string;

  const members = [];
  for (let i = 0; i < count; i++) {
    members.push({
      name: formData.get(`m${i}_name`) as string,
      email: formData.get(`m${i}_email`) as string,
      phone: formData.get(`m${i}_phone`) as string,
      roll: formData.get(`m${i}_roll`) as string,
      institution: formData.get(`m${i}_institution`) as string,
      year: formData.get(`m${i}_year`) as string,
      branch: formData.get(`m${i}_branch`) as string,
    });
  }

  const parsed = formSchema.safeParse({ team_name, members });

  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
      message: 'Validation failed. Please check all fields.',
    };
  }

  const validData = parsed.data;

  // 1. Check for duplicates within the current form submission
  const submittedEmails = validData.members.map(m => m.email.toLowerCase());
  const uniqueEmails = new Set(submittedEmails);
  if (uniqueEmails.size !== submittedEmails.length) {
    return { message: 'Duplicate emails found within the team submission.' };
  }

  try {
    // 2. Check for duplicate emails in the database
    const existingUsers = await sql`
      SELECT email FROM participants WHERE email = ANY(${submittedEmails})
    `;
    
    if (existingUsers.length > 0) {
      const dups = existingUsers.map(u => u.email).join(', ');
      return { message: `Email already registered: ${dups}` };
    }

    // 3. Insert into Database
    for (let i = 0; i < validData.members.length; i++) {
      const m = validData.members[i];
      const isLeader = i === 0;
      await sql`
        INSERT INTO participants (team_name, is_leader, name, email, phone_number, roll_number, institution, college_year, branch)
        VALUES (${validData.team_name}, ${isLeader}, ${m.name}, ${m.email.toLowerCase()}, ${m.phone}, ${m.roll}, ${m.institution}, ${m.year}, ${m.branch})
      `;
      
      // 4. Append to Google Sheets (One row per participant)
      const dateStr = new Date().toLocaleString();
      await appendToSheet([
        validData.team_name,
        isLeader ? 'Leader' : `Member ${i + 1}`,
        m.name,
        m.email,
        m.phone,
        m.roll,
        m.institution,
        m.year,
        m.branch,
        dateStr
      ]);
    }
    
  } catch (error) {
    console.error('Database Error:', error);
    return {
      message: 'Database Error: Failed to complete registration.',
    };
  }

  // Redirect on success
  const query = new URLSearchParams({
    team: validData.team_name,
    count: validData.members.length.toString(),
  });
  
  redirect(`/success?${query.toString()}`);
}
