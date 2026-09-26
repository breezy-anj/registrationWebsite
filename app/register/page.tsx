'use client';

import { useState, useEffect, useTransition, useRef } from 'react';
import QRCode from 'qrcode';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import {
  Crown,
  Sparkles,
  Rocket,
  AlertTriangle,
  Loader2,
  Plus,
  Minus,
  ArrowLeft,
} from 'lucide-react';
import {
  registerAction,
  getRegistrationByToken,
  MemberData,
  RegistrationData,
} from '../actions/register';

/* ── QR card ─────────────────────────────────────────────────── */
function MemberQRCodeCard({ member, index }: { member: MemberData; index: number }) {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!member.email) return;
    QRCode.toDataURL(member.email, {
      width: 320,
      margin: 2,
      color: { dark: '#0a0a0f', light: '#ffffff' },
    })
      .then(setQrDataUrl)
      .catch((err) => console.error('QR Generation failed:', err));
  }, [member.email]);

  // Animate card in
  useEffect(() => {
    if (!cardRef.current) return;
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 30, scale: 0.93 },
      { opacity: 1, y: 0, scale: 1, duration: 0.55, delay: index * 0.12, ease: 'back.out(1.3)' }
    );
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="glass"
      style={{
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        opacity: 0,
      }}
    >
      {/* Top accent bar */}
      <div style={{
        height: '3px',
        background: member.is_leader
          ? 'linear-gradient(90deg, var(--primary), var(--accent))'
          : 'linear-gradient(90deg, var(--accent), var(--emerald))',
      }} />

      <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
        {/* Role badge */}
        <span className={`badge ${member.is_leader ? 'badge-primary' : 'badge-accent'}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
          {member.is_leader ? (
            <>
              <Crown size={13} />
              <span>Team Leader</span>
            </>
          ) : (
            `Member ${index + 1}`
          )}
        </span>

        {/* QR Code */}
        <div style={{
          padding: '0.75rem',
          background: '#fff',
          borderRadius: 'var(--radius-md)',
          boxShadow: member.is_leader
            ? '0 0 24px var(--primary-glow)'
            : '0 0 16px rgba(6,182,212,0.3)',
        }}>
          {qrDataUrl ? (
            <img src={qrDataUrl} alt={`QR for ${member.name}`} width={160} height={160} />
          ) : (
            <div style={{
              width: 160, height: 160,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#888',
            }}>
              GENERATING...
            </div>
          )}
        </div>

        {/* Member info */}
        <div style={{ textAlign: 'center', width: '100%' }}>
          <p style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.25rem', color: 'var(--foreground)' }}>{member.name}</p>
          <p style={{ fontSize: '0.8rem', color: 'var(--primary)', marginBottom: '0.2rem', fontFamily: 'var(--font-mono)' }}>{member.branch}</p>
          <p style={{ fontSize: '0.75rem', color: 'var(--muted-fg)' }}>{member.email}</p>
        </div>
      </div>
    </div>
  );
}

/* ── Member form fields ──────────────────────────────────────── */
function MemberFields({ index }: { index: number }) {
  const isLeader = index === 0;
  const prefix = `m${index}_`;

  return (
    <div
      className="glass"
      style={{
        padding: '1.75rem',
        borderRadius: 'var(--radius-lg)',
        marginBottom: '1.5rem',
        borderColor: isLeader ? 'rgba(139,92,246,0.35)' : 'var(--border)',
        position: 'relative',
      }}
    >
      {/* Top accent */}
      <div style={{
        height: '2px',
        background: isLeader
          ? 'linear-gradient(90deg, var(--primary), var(--accent))'
          : 'linear-gradient(90deg, var(--accent), var(--emerald))',
        borderRadius: '1px',
        marginBottom: '1.25rem',
        width: '80px',
      }} />

      <h3 style={{
        fontSize: '1rem',
        fontWeight: 700,
        marginBottom: '1.25rem',
        color: isLeader ? 'var(--primary)' : 'var(--accent)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
      }}>
        {isLeader ? (
          <>
            <Crown size={16} />
            <span>Leader Details</span>
          </>
        ) : (
          `Member ${index + 1} Details`
        )}
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0 1rem' }}>
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
          <input type="tel" id={`${prefix}phone`} name={`${prefix}phone`} className="input-field" placeholder="10-digit number" pattern="[0-9]{10}" maxLength={10} required />
        </div>
        <div className="input-group">
          <label htmlFor={`${prefix}roll`} className="input-label">Roll Number</label>
          <input type="text" id={`${prefix}roll`} name={`${prefix}roll`} className="input-field" placeholder="2003... / 230..." required />
        </div>
        <input type="hidden" name={`${prefix}institution`} value="University" />
        <div className="input-group">
          <label htmlFor={`${prefix}year`} className="input-label">College Year</label>
          <select id={`${prefix}year`} name={`${prefix}year`} className="input-field" required defaultValue="">
            <option value="" disabled>Select Year</option>
            <option value="1st Year">1st Year</option>
          </select>
        </div>
        <div className="input-group">
          <label htmlFor={`${prefix}branch`} className="input-label">Branch</label>
          <select id={`${prefix}branch`} name={`${prefix}branch`} className="input-field" required defaultValue="">
            <option value="" disabled>Select Branch</option>
            <option value="CSE - core">CSE - Core</option>
            <option value="CSE - AIML">CSE - AIML</option>
            <option value="CSE - DS">CSE - DS</option>
            <option value="IT">IT</option>
            <option value="OTHER">Other</option>
          </select>
        </div>
      </div>
    </div>
  );
}

/* ── Main Register Page ──────────────────────────────────────── */
export default function Register() {
  const [loadingToken, setLoadingToken] = useState(true);
  const [registration, setRegistration] = useState<RegistrationData | null>(null);
  const [isPending, startTransition] = useTransition();
  const [memberCount, setMemberCount] = useState(1);
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const pageRef = useRef<HTMLDivElement>(null);

  // Animate page on mount
  useEffect(() => {
    if (!pageRef.current) return;
    gsap.fromTo(pageRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' });
  }, [loadingToken, registration]);

  // Token check
  useEffect(() => {
    try {
      const token = localStorage.getItem('registration_token');
      if (token) {
        getRegistrationByToken(token)
          .then((res) => {
            if (res.success && res.registration) setRegistration(res.registration);
            else localStorage.removeItem('registration_token');
          })
          .catch(console.error)
          .finally(() => setLoadingToken(false));
      } else {
        setLoadingToken(false);
      }
    } catch {
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
          try { localStorage.setItem('registration_token', result.token); } catch {}
          setRegistration({ team_name: result.team_name || 'Team', members: result.members });
        } else {
          setErrorMessage(result.message || 'Registration failed. Please check your details.');
          if (result.errors) setFieldErrors(result.errors);
        }
      } catch {
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
    });
  };

  const bgGlow = {
    position: 'absolute' as const,
    top: '15%', left: '50%',
    transform: 'translateX(-50%)',
    width: '500px', height: '500px',
    background: 'radial-gradient(circle, rgba(220,38,38,0.06) 0%, transparent 70%)',
    pointerEvents: 'none' as const,
  };

  /* ── Loading state ── */
  if (loadingToken) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '1.5rem',
      }}>
        <div style={{ position: 'relative', animation: 'spin-slow 3s linear infinite' }}>
          <Image src="/logo.png" alt="NCS" width={100} height={44} className="ncs-logo-img ncs-logo-light" style={{ opacity: 0.85 }} />
          <Image src="/logo-white.png" alt="NCS" width={100} height={44} className="ncs-logo-img ncs-logo-dark" style={{ opacity: 0.85 }} />
        </div>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--muted)', letterSpacing: '0.12em' }}>
          CHECKING REGISTRATION STATUS...
        </p>
      </div>
    );
  }

  /* ── Already registered — QR Pass view ── */
  if (registration) {
    return (
      <div ref={pageRef} style={{
        minHeight: '100vh',
        padding: '7rem 1.5rem 4rem',
        maxWidth: '900px',
        margin: '0 auto',
        position: 'relative',
        opacity: 0,
      }}>
        <div style={bgGlow} />

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span className="badge badge-primary" style={{ marginBottom: '0.875rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
            <Sparkles size={14} />
            <span>Registration Confirmed</span>
          </span>
          <h1 style={{ fontSize: 'clamp(1.75rem, 5vw, 2.75rem)', marginBottom: '0.5rem' }}>
            Team: <span className="gradient-text">{registration.team_name}</span>
          </h1>
          <p style={{ color: 'var(--muted-fg)', fontSize: '0.95rem' }}>
            Present these QR codes at the venue to verify your registration.
          </p>
        </div>

        {/* QR cards grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.25rem',
          marginBottom: '2.5rem',
        }}>
          {registration.members.map((member, i) => (
            <MemberQRCodeCard key={i} member={member} index={i} />
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <Link href="/" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
            <ArrowLeft size={16} />
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  /* ── Registration form ── */
  return (
    <div ref={pageRef} style={{
      minHeight: '100vh',
      padding: '7rem 1.5rem 4rem',
      maxWidth: '780px',
      margin: '0 auto',
      position: 'relative',
      opacity: 0,
    }}>
      <div style={bgGlow} />

      {/* Page header */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>

        <h1 style={{ fontSize: 'clamp(1.75rem, 5vw, 2.5rem)', marginBottom: '0.5rem' }}>
          Join the <span className="gradient-text">Challenge</span>
        </h1>
        <p style={{ color: 'var(--muted-fg)', fontSize: '0.95rem' }}>
          Fill in your team details below — 1 to 3 members
        </p>
      </div>

      {/* Form */}
      <form action={handleFormSubmit}>
        <input type="hidden" name="member_count" value={memberCount} />

        {/* Team name */}
        <div className="glass" style={{ padding: '1.75rem', borderRadius: 'var(--radius-lg)', marginBottom: '1.5rem' }}>
          <div className="input-group" style={{ marginBottom: 0 }}>
            <label htmlFor="team_name" className="input-label">Team Name</label>
            <input
              type="text"
              id="team_name"
              name="team_name"
              className="input-field"
              style={{ fontSize: '1.1rem', padding: '0.9rem 1rem' }}
              placeholder="Code Ninjas"
              required
            />
            {fieldErrors.team_name && <p className="error-text">{fieldErrors.team_name[0]}</p>}
          </div>
        </div>

        {/* Member fields */}
        {Array.from({ length: memberCount }, (_, i) => (
          <MemberFields key={i} index={i} />
        ))}

        {/* Add / Remove member */}
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          {memberCount < 3 && (
            <button
              type="button"
              className="btn btn-ghost"
              style={{ flex: 1, minWidth: '160px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
              onClick={() => setMemberCount((m) => m + 1)}
            >
              <Plus size={16} />
              Add Team Member
            </button>
          )}
          {memberCount > 1 && (
            <button
              type="button"
              className="btn"
              style={{ flex: 1, minWidth: '160px', background: 'rgba(239,68,68,0.1)', color: 'var(--error)', border: '1px solid rgba(239,68,68,0.3)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
              onClick={() => setMemberCount((m) => m - 1)}
            >
              <Minus size={16} />
              Remove Member
            </button>
          )}
        </div>

        {/* Error */}
        {errorMessage && (
          <div className="glass" style={{
            padding: '1rem 1.25rem',
            borderRadius: 'var(--radius-md)',
            borderColor: 'rgba(239,68,68,0.4)',
            background: 'rgba(239,68,68,0.07)',
            marginBottom: '1.25rem',
          }}>
            <p style={{ color: 'var(--error)', fontSize: '0.9rem', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
              <AlertTriangle size={16} />
              <span>{errorMessage}</span>
            </p>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="btn btn-primary"
          style={{ width: '100%', padding: '1rem', fontSize: '1rem', letterSpacing: '0.03em', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
          disabled={isPending}
        >
          {isPending ? (
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
              <Loader2 size={18} className="animate-spin-slow" />
              Registering…
            </span>
          ) : (
            <>
              <Rocket size={18} />
              Complete Registration
            </>
          )}
        </button>
      </form>

      {/* Footer brand */}
      <div style={{ textAlign: 'center', marginTop: '2.5rem', opacity: 0.7 }}>
        <div style={{ display: 'inline-block' }}>
          <Image src="/logo.png" alt="NCS" width={100} height={44} className="ncs-logo-img ncs-logo-light" />
          <Image src="/logo-white.png" alt="NCS" width={100} height={44} className="ncs-logo-img ncs-logo-dark" />
        </div>
      </div>
    </div>
  );
}
