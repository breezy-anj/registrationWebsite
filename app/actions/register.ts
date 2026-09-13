'use server';

import { z } from 'zod';
import { sql } from '@/lib/db';
import { appendToSheet } from '@/lib/sheets';
import crypto from 'crypto';

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

export type MemberData = {
  name: string;
  email: string;
  branch: string;
  is_leader: boolean;
};

export type RegistrationData = {
  team_name: string;
  members: MemberData[];
};

export type RegisterState = {
  success?: boolean;
  token?: string;
  team_name?: string;
  members?: MemberData[];
  message?: string;
  errors?: Record<string, string[]>;
};

export async function registerAction(prevState: any, formData: FormData): Promise<RegisterState> {
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
      success: false,
      errors: parsed.error.flatten().fieldErrors,
      message: 'Validation failed. Please check all fields.',
    };
  }

  const validData = parsed.data;

  // 1. Check for duplicates within the current form submission
  const submittedEmails = validData.members.map(m => m.email.toLowerCase());
  const uniqueEmails = new Set(submittedEmails);
  if (uniqueEmails.size !== submittedEmails.length) {
    return {
      success: false,
      message: 'Duplicate emails found within the team submission.'
    };
  }

  // 2. Generate a secure unique token for this registration
  const token = crypto.randomUUID();

  try {
    // 3. Check for duplicate emails in the database
    const existingUsers = await sql`
      SELECT email FROM participants WHERE email = ANY(${submittedEmails})
    `;
    
    if (existingUsers.length > 0) {
      const dups = existingUsers.map(u => u.email).join(', ');
      return {
        success: false,
        message: `Email already registered: ${dups}`
      };
    }

    // 4. Insert into Database with token
    for (let i = 0; i < validData.members.length; i++) {
      const m = validData.members[i];
      const isLeader = i === 0;
      await sql`
        INSERT INTO participants (team_name, is_leader, name, email, phone_number, roll_number, institution, college_year, branch, token)
        VALUES (${validData.team_name}, ${isLeader}, ${m.name}, ${m.email.toLowerCase()}, ${m.phone}, ${m.roll}, ${m.institution}, ${m.year}, ${m.branch}, ${token})
      `;
      
      // 5. Append to Google Sheets (One row per participant)
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
        dateStr,
        token
      ]);
    }
    
    return {
      success: true,
      token,
      team_name: validData.team_name,
      members: validData.members.map((m, idx) => ({
        name: m.name,
        email: m.email.toLowerCase(),
        branch: m.branch,
        is_leader: idx === 0,
      })),
    };
  } catch (error) {
    console.error('Database Error:', error);
    return {
      success: false,
      message: 'Database Error: Failed to complete registration.',
    };
  }
}

export async function getRegistrationByToken(token: string): Promise<{
  success: boolean;
  registration?: RegistrationData;
  message?: string;
}> {
  if (!token || typeof token !== 'string' || token.trim().length === 0) {
    return { success: false, message: 'Invalid token' };
  }

  try {
    const rows = await sql`
      SELECT team_name, is_leader, name, email, branch
      FROM participants
      WHERE token = ${token.trim()}
      ORDER BY id ASC
    `;

    if (!rows || rows.length === 0) {
      return { success: false, message: 'Registration not found' };
    }

    return {
      success: true,
      registration: {
        team_name: rows[0].team_name as string,
        members: rows.map(r => ({
          name: r.name as string,
          email: r.email as string,
          branch: r.branch as string,
          is_leader: Boolean(r.is_leader),
        })),
      },
    };
  } catch (error) {
    console.error('Error fetching registration by token:', error);
    return { success: false, message: 'Failed to retrieve registration details.' };
  }
}
