'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { registerAction } from '../actions/register';
import styles from './page.module.css';

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

  return (
    <main className={styles.container}>
      <div className={`${styles.formWrapper} glass animate-fade-in`}>
        <h1 className={styles.title}>Join the Challenge</h1>
        <p className={styles.subtitle}>Fill in your details below</p>

        <form action={formAction}>
          <div className="input-group">
            <label htmlFor="name" className="input-label">Full Name</label>
            <input type="text" id="name" name="name" className="input-field" placeholder="John Doe" required />
            {state?.errors?.name && <p className="error-text">{state.errors.name[0]}</p>}
          </div>

          <div className="input-group">
            <label htmlFor="team_name" className="input-label">Team Name (Optional)</label>
            <input type="text" id="team_name" name="team_name" className="input-field" placeholder="Code Ninjas" />
          </div>

          <div className="input-group">
            <label htmlFor="phone_number" className="input-label">Phone Number</label>
            <input type="tel" id="phone_number" name="phone_number" className="input-field" placeholder="1234567890" required />
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
            <input type="text" id="branch" name="branch" className="input-field" placeholder="Computer Science" required />
            {state?.errors?.branch && <p className="error-text">{state.errors.branch[0]}</p>}
          </div>

          {state?.message && <p className="error-text" style={{ textAlign: 'center', marginBottom: '1rem' }}>{state.message}</p>}

          <SubmitButton />
        </form>
      </div>
    </main>
  );
}
