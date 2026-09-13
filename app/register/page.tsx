'use client';

import { useState, useEffect, useTransition } from 'react';
import QRCode from 'qrcode';
import Link from 'next/link';
import { registerAction, getRegistrationByToken, MemberData, RegistrationData } from '../actions/register';
import styles from './page.module.css';

function MemberQRCodeCard({ member }: { member: MemberData }) {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');

  useEffect(() => {
    if (!member.email) return;

    // Encode member email into the QR Code
    QRCode.toDataURL(member.email, {
      width: 320,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#ffffff',
      },
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error('QR Generation failed:', err));
  }, [member.email]);

  return (
    <div className={styles.qrCard}>
      <div className={styles.qrImageContainer}>
        {qrDataUrl ? (
          <img
            src={qrDataUrl}
            alt={`QR Code encoded with email for ${member.name}`}
            className={styles.qrImage}
          />
        ) : (
          <div style={{ width: 180, height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>
            Generating QR...
          </div>
        )}
      </div>

      <div className={styles.memberDetails}>
        <div className={styles.memberName}>
          <span>{member.name}</span>
          {member.is_leader && <span className={styles.roleBadge}>Team Leader</span>}
        </div>
        <div className={styles.memberBranch}>{member.branch}</div>
        <div className={styles.memberEmail}>{member.email}</div>
      </div>
    </div>
  );
}

export default function Register() {
  const [loadingToken, setLoadingToken] = useState(true);
  const [registration, setRegistration] = useState<RegistrationData | null>(null);
  const [isPending, startTransition] = useTransition();
  const [memberCount, setMemberCount] = useState(1);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  // On page load, check if token is already present in localStorage
  useEffect(() => {
    try {
      const savedToken = localStorage.getItem('registration_token');
      if (savedToken) {
        getRegistrationByToken(savedToken)
          .then((res) => {
            if (res.success && res.registration) {
              setRegistration(res.registration);
            } else {
              // Token is invalid / not in database
              localStorage.removeItem('registration_token');
            }
          })
          .catch((err) => {
            console.error('Error fetching registration from token:', err);
          })
          .finally(() => {
            setLoadingToken(false);
          });
      } else {
        setLoadingToken(false);
      }
    } catch (e) {
      console.error('Error reading localStorage:', e);
      setLoadingToken(false);
    }
  }, []);

  const handleFormSubmit = async (formData: FormData) => {
    setErrorMessage('');
    setFieldErrors({});

    startTransition(async () => {
      try {
        const result = await registerAction(null, formData);

        if (result.success && result.token && result.members) {
          // Save token to localStorage
          try {
            localStorage.setItem('registration_token', result.token);
          } catch (storageErr) {
            console.warn('Could not save token to localStorage:', storageErr);
          }

          setRegistration({
            team_name: result.team_name || 'Team',
            members: result.members,
          });
        } else {
          setErrorMessage(result.message || 'Registration failed. Please check your details.');
          if (result.errors) {
            setFieldErrors(result.errors);
          }
        }
      } catch (err) {
        console.error('Submission error:', err);
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
    });
  };

  const renderMemberFields = (index: number) => {
    const isLeader = index === 0;
    const prefix = `m${index}_`;
    const title = isLeader ? 'Leader Details' : `Member ${index + 1} Details`;

    return (
      <div
        key={index}
        style={{
          marginBottom: '2rem',
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '1rem',
          border: '1px solid var(--border)',
        }}
      >
        <h2
          style={{
            marginBottom: '1rem',
            fontSize: '1.25rem',
            color: isLeader ? 'var(--primary)' : 'var(--foreground)',
          }}
        >
          {title}
        </h2>

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

  // State 1: Loading localStorage token check
  if (loadingToken) {
    return (
      <main className={styles.container}>
        <div className={`${styles.qrWrapper} glass animate-fade-in`}>
          <div className={styles.loadingBox}>
            <div className={styles.spinner}></div>
            <p style={{ color: '#a1a1aa' }}>Checking registration status...</p>
          </div>
        </div>
      </main>
    );
  }

  // State 2: Already registered (Token found in localStorage & DB, OR freshly submitted)
  // Directly show QR codes for each member; NO registration form!
  if (registration) {
    return (
      <main className={styles.container}>
        <div className={`${styles.qrWrapper} glass animate-fade-in`}>
          <h1 className={styles.title}>
            Team: <span className="gradient-text">{registration.team_name}</span>
          </h1>
          <p className={styles.subtitle}>
            These QR codes will be required at the venue to verify your registration.
          </p>

          <div className={styles.qrGrid}>
            {registration.members.map((member, index) => (
              <MemberQRCodeCard key={index} member={member} />
            ))}
          </div>

          <div className={styles.bottomActions}>
            <Link href="/" className="btn btn-primary" style={{ minWidth: 200 }}>
              Return Home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // State 3: No token in localStorage - show registration form
  return (
    <main className={styles.container}>
      <div className={`${styles.formWrapper} glass animate-fade-in`}>
        <h1 className={styles.title}>Join the Challenge</h1>
        <p className={styles.subtitle}>Fill in your team details below</p>

        <form action={handleFormSubmit}>
          <input type="hidden" name="member_count" value={memberCount} />

          <div className="input-group" style={{ marginBottom: '2rem' }}>
            <label
              htmlFor="team_name"
              className="input-label"
              style={{ fontSize: '1.25rem', color: 'var(--foreground)' }}
            >
              Team Name
            </label>
            <input
              type="text"
              id="team_name"
              name="team_name"
              className="input-field"
              style={{ fontSize: '1.25rem', padding: '1rem' }}
              placeholder="Code Ninjas"
              required
            />
            {fieldErrors.team_name && <p className="error-text">{fieldErrors.team_name[0]}</p>}
          </div>

          {[...Array(memberCount)].map((_, i) => renderMemberFields(i))}

          {memberCount < 3 && (
            <button
              type="button"
              className="btn"
              style={{
                backgroundColor: 'var(--secondary)',
                color: 'var(--foreground)',
                border: '1px solid var(--border)',
                width: '100%',
                marginBottom: '1rem',
              }}
              onClick={() => setMemberCount((m) => m + 1)}
            >
              + Add Team Member
            </button>
          )}

          {memberCount > 1 && (
            <button
              type="button"
              className="btn"
              style={{
                backgroundColor: 'transparent',
                color: 'var(--error)',
                width: '100%',
                marginBottom: '1rem',
              }}
              onClick={() => setMemberCount((m) => m - 1)}
            >
              - Remove Member
            </button>
          )}

          {errorMessage && (
            <p className="error-text" style={{ textAlign: 'center', marginBottom: '1rem', fontSize: '1rem' }}>
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            className={`btn btn-primary ${styles.submitBtn}`}
            disabled={isPending}
          >
            {isPending ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
    </main>
  );
}
