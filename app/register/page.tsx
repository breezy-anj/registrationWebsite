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
  const [members, setMembers] = useState(0);

  return (
    <main className={styles.container}>
      <div className={`${styles.formWrapper} glass animate-fade-in`}>
        <h1 className={styles.title}>Join the Challenge</h1>
        <p className={styles.subtitle}>Fill in your details below</p>

        <form action={formAction}>
          <div className="input-group">
            <label htmlFor="name" className="input-label">Leader Name</label>
            <input type="text" id="name" name="name" className="input-field" placeholder="John Doe" required />
            {state?.errors?.name && <p className="error-text">{state.errors.name[0]}</p>}
          </div>

          <div className="input-group">
            <label htmlFor="team_name" className="input-label">Team Name</label>
            <input type="text" id="team_name" name="team_name" className="input-field" placeholder="Code Ninjas" required />
            {state?.errors?.team_name && <p className="error-text">{state.errors.team_name[0]}</p>}
          </div>

          <div className="input-group">
            <label htmlFor="phone_number" className="input-label">Leader Phone Number</label>
            <input type="tel" id="phone_number" name="phone_number" className="input-field" placeholder="1234567890" pattern="[0-9]{10}" maxLength={10} required />
            {state?.errors?.phone_number && <p className="error-text">{state.errors.phone_number[0]}</p>}
          </div>

          <div className="input-group">
            <label htmlFor="college_year" className="input-label">College Year</label>
            <select id="college_year" name="college_year" className="input-field" required defaultValue="">
              <option value="" disabled>Select your year</option>
              <option value="1st Year">1st Year</option>
              <option value="2nd Year">2nd Year</option>
              <option value="3rd Year">3rd Year</option>
              <option value="4th Year">4th Year</option>
            </select>
            {state?.errors?.college_year && <p className="error-text">{state.errors.college_year[0]}</p>}
          </div>

          <div className="input-group">
            <label htmlFor="branch" className="input-label">Branch</label>
            <select id="branch" name="branch" className="input-field" required defaultValue="">
              <option value="" disabled>Select your branch</option>
              <option value="CSE - core">CSE - core</option>
              <option value="CSE - AIML">CSE - AIML</option>
              <option value="CSE - DS">CSE - DS</option>
              <option value="IT">IT</option>
              <option value="OTHER">OTHER</option>
            </select>
            {state?.errors?.branch && <p className="error-text">{state.errors.branch[0]}</p>}
          </div>

          {members >= 1 && (
            <>
              <div className="input-group" style={{ marginTop: '1.5rem' }}>
                <label htmlFor="member2_name" className="input-label">Member 2 Name</label>
                <input type="text" id="member2_name" name="member2_name" className="input-field" placeholder="Jane Doe" required />
              </div>
              <div className="input-group">
                <label htmlFor="member2_phone" className="input-label">Member 2 Phone Number</label>
                <input type="tel" id="member2_phone" name="member2_phone" className="input-field" placeholder="0987654321" pattern="[0-9]{10}" maxLength={10} required />
              </div>
            </>
          )}

          {members >= 2 && (
            <>
              <div className="input-group" style={{ marginTop: '1.5rem' }}>
                <label htmlFor="member3_name" className="input-label">Member 3 Name</label>
                <input type="text" id="member3_name" name="member3_name" className="input-field" placeholder="Alex Smith" required />
              </div>
              <div className="input-group">
                <label htmlFor="member3_phone" className="input-label">Member 3 Phone Number</label>
                <input type="tel" id="member3_phone" name="member3_phone" className="input-field" placeholder="1122334455" pattern="[0-9]{10}" maxLength={10} required />
              </div>
            </>
          )}

          {members < 2 && (
            <button 
              type="button" 
              className="btn" 
              style={{ backgroundColor: 'var(--secondary)', color: 'var(--foreground)', border: '1px solid var(--border)', width: '100%', marginBottom: '1rem' }}
              onClick={() => setMembers(m => m + 1)}
            >
              + Add Team Member
            </button>
          )}

          {members > 0 && (
             <button 
              type="button" 
              className="btn" 
              style={{ backgroundColor: 'transparent', color: 'var(--error)', width: '100%', marginBottom: '1rem' }}
              onClick={() => setMembers(m => m - 1)}
             >
               - Remove Member
             </button>
          )}

          {state?.message && <p className="error-text" style={{ textAlign: 'center', marginBottom: '1rem' }}>{state.message}</p>}

          <SubmitButton />
        </form>
      </div>
    </main>
  );
}
