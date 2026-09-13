'use server';

import { z } from 'zod';
import { sql } from '@/lib/db';
import { appendToSheet } from '@/lib/sheets';
import { redirect } from 'next/navigation';

const schema = z.object({
  name: z.string().min(2, 'Leader Name is required'),
  team_name: z.string().min(1, 'Team name is required'),
  phone_number: z.string().min(10, 'Valid phone number is required'),
  college_year: z.string().min(1, 'College year is required'),
  branch: z.string().min(1, 'Branch is required'),
  member2_name: z.string().optional(),
  member2_phone: z.string().optional(),
  member3_name: z.string().optional(),
  member3_phone: z.string().optional(),
});

export async function registerAction(prevState: any, formData: FormData) {
  const data = {
    name: formData.get('name') as string,
    team_name: formData.get('team_name') as string,
    phone_number: formData.get('phone_number') as string,
    college_year: formData.get('college_year') as string,
    branch: formData.get('branch') as string,
    member2_name: formData.get('member2_name') as string | undefined,
    member2_phone: formData.get('member2_phone') as string | undefined,
    member3_name: formData.get('member3_name') as string | undefined,
    member3_phone: formData.get('member3_phone') as string | undefined,
  };

  const parsed = schema.safeParse(data);

  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Register.',
    };
  }

  const { name, team_name, phone_number, college_year, branch, member2_name, member2_phone, member3_name, member3_phone } = parsed.data;

  try {
    // 1. Insert into DB
    await sql`
      INSERT INTO registrations (name, team_name, phone_number, college_year, branch, member2_name, member2_phone, member3_name, member3_phone)
      VALUES (${name}, ${team_name}, ${phone_number}, ${college_year}, ${branch}, ${member2_name || null}, ${member2_phone || null}, ${member3_name || null}, ${member3_phone || null})
    `;

    // 2. Append to Sheet
    const dateStr = new Date().toLocaleString();
    await appendToSheet([name, team_name, phone_number, college_year, branch, member2_name || '', member2_phone || '', member3_name || '', member3_phone || '', dateStr]);
    
  } catch (error) {
    console.error('Database Error:', error);
    return {
      message: 'Database Error: Failed to complete registration.',
    };
  }

  // Redirect on success with query params
  const query = new URLSearchParams({
    team: team_name,
    m1: name,
    m2: member2_name || '',
    m3: member3_name || '',
    p1: phone_number,
    p2: member2_phone || '',
    p3: member3_phone || '',
  });
  
  redirect(`/success?${query.toString()}`);
}
