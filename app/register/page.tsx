'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { registerAction } from '../actions/register';
import styles from './page.module.css';
import { useState } from 'react';

const initialState = {
  message: '',
  errors: {},
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" className={`btn btn-primary ${styles.submitBtn}`} disabled={pending}>
      {pending ? 'Registering...' : 'Register'}
    </button>
  );
}

export default function Register() {
  const [state, formAction] = useFormState(registerAction, initialState);
  const [memberCount, setMemberCount] = useState(1); // 1 to 3

  const renderMemberFields = (index: number) => {
    const isLeader = index === 0;
    const prefix = `m${index}_`;
    const title = isLeader ? 'Leader Details' : `Member ${index + 1} Details`;

    return (
      <div key={index} className={styles.memberSection} style={{ marginBottom: '2rem', padding: '1.5rem', backgroundColor: 'var(--card-bg)', borderRadius: '1rem', border: '1px solid var(--border)' }}>
        <h2 style={{ marginBottom: '1rem', fontSize: '1.25rem', color: isLeader ? 'var(--primary)' : 'var(--foreground)' }}>{title}</h2>
        
        <div className="input-group">
          <label htmlFor={`${prefix}name`} className="input-label">Full Name</label>
          <input type="text" id={`${prefix}name`} name={`${prefix}name`} className="input-field" placeholder="John Doe" required />
        </div>

        <div className="input-group">
          <label htmlFor={`${prefix}email`} className="input-label">Email Address</label>
          <input type="email" id={`${prefix}email`} name={`${prefix}email`} className="input-field" placeholder="john@example.com" required />
        </div>

        <div className="input-group">
          <label htmlFor={`${prefix}phone`} className="input-label">Phone Number</label>
          <input type="tel" id={`${prefix}phone`} name={`${prefix}phone`} className="input-field" placeholder="1234567890" pattern="[0-9]{10}" maxLength={10} required />
        </div>

        <div className="input-group">
          <label htmlFor={`${prefix}roll`} className="input-label">Roll Number</label>
          <input type="text" id={`${prefix}roll`} name={`${prefix}roll`} className="input-field" placeholder="2003... / 230..." required />
        </div>

        <div className="input-group">
          <label htmlFor={`${prefix}institution`} className="input-label">Institution</label>
          <select id={`${prefix}institution`} name={`${prefix}institution`} className="input-field" required defaultValue="">
            <option value="" disabled>Select Institution</option>
            <option value="AKTU">AKTU</option>
            <option value="University">University</option>
          </select>
        </div>

        <div className="input-group">
          <label htmlFor={`${prefix}year`} className="input-label">College Year</label>
          <select id={`${prefix}year`} name={`${prefix}year`} className="input-field" required defaultValue="">
            <option value="" disabled>Select year</option>
            <option value="1st Year">1st Year</option>
            <option value="2nd Year">2nd Year</option>
            <option value="3rd Year">3rd Year</option>
            <option value="4th Year">4th Year</option>
          </select>
        </div>

        <div className="input-group">
          <label htmlFor={`${prefix}branch`} className="input-label">Branch</label>
          <select id={`${prefix}branch`} name={`${prefix}branch`} className="input-field" required defaultValue="">
            <option value="" disabled>Select branch</option>
            <option value="CSE - core">CSE - core</option>
            <option value="CSE - AIML">CSE - AIML</option>
            <option value="CSE - DS">CSE - DS</option>
            <option value="IT">IT</option>
            <option value="OTHER">OTHER</option>
          </select>
        </div>
      </div>
    );
  };

  return (
    <main className={styles.container}>
      <div className={`${styles.formWrapper} glass animate-fade-in`}>
        <h1 className={styles.title}>Join the Challenge</h1>
        <p className={styles.subtitle}>Fill in your team details below</p>

        <form action={formAction}>
          <input type="hidden" name="member_count" value={memberCount} />
          
          <div className="input-group" style={{ marginBottom: '2rem' }}>
            <label htmlFor="team_name" className="input-label" style={{ fontSize: '1.25rem', color: 'var(--foreground)' }}>Team Name</label>
            <input type="text" id="team_name" name="team_name" className="input-field" style={{ fontSize: '1.25rem', padding: '1rem' }} placeholder="Code Ninjas" required />
            {state?.errors?.team_name && <p className="error-text">{state.errors.team_name[0]}</p>}
          </div>

          {[...Array(memberCount)].map((_, i) => renderMemberFields(i))}

          {memberCount < 3 && (
            <button 
              type="button" 
              className="btn" 
              style={{ backgroundColor: 'var(--secondary)', color: 'var(--foreground)', border: '1px solid var(--border)', width: '100%', marginBottom: '1rem' }}
              onClick={() => setMemberCount(m => m + 1)}
            >
              + Add Team Member
            </button>
          )}

          {memberCount > 1 && (
             <button 
              type="button" 
              className="btn" 
              style={{ backgroundColor: 'transparent', color: 'var(--error)', width: '100%', marginBottom: '1rem' }}
              onClick={() => setMemberCount(m => m - 1)}
             >
               - Remove Member
             </button>
          )}

          {state?.message && <p className="error-text" style={{ textAlign: 'center', marginBottom: '1rem', fontSize: '1rem' }}>{state.message}</p>}

          <SubmitButton />
        </form>
      </div>
    </main>
  );
}
