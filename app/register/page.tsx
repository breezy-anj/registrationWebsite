'use client';

import React, { useState, useEffect, useTransition } from 'react';
import Link from 'next/link';
import QRCode from 'qrcode';
import { 
  ArrowLeft, 
  ArrowRight, 
  Users, 
  UserCheck, 
  ShieldCheck, 
  Plus, 
  Trash2, 
  AlertCircle, 
  CheckCircle, 
  Copy, 
  Check, 
  Sparkles,
  RefreshCw
} from 'lucide-react';
import FormField from '@/components/FormField';
import { submitRegistration, fetchRegistrationByToken, type MemberPayload } from '@/services/api';
import { type MemberData, type RegistrationData } from '@/app/actions/register';

const INSTITUTION_OPTIONS = [
  { value: 'AKTU', label: 'AKTU' },
  { value: 'University', label: 'University' },
  { value: 'Other College/Institute', label: 'Other College/Institute' },
];

const YEAR_OPTIONS = [
  { value: '1st Year', label: '1st Year' },
  { value: '2nd Year', label: '2nd Year' },
  { value: '3rd Year', label: '3rd Year' },
  { value: '4th Year', label: '4th Year' },
];

const BRANCH_OPTIONS = [
  { value: 'CSE - core', label: 'Computer Science & Engineering (Core)' },
  { value: 'CSE - AIML', label: 'CSE - AI & Machine Learning' },
  { value: 'CSE - DS', label: 'CSE - Data Science' },
  { value: 'IT', label: 'Information Technology' },
  { value: 'OTHER', label: 'Other Specialization' },
];

// QR Pass component for registered members
function MemberPassCard({ member, teamName }: { member: MemberData; teamName: string }) {
  const [qrUrl, setQrUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!member.email) return;
    // Generate high resolution QR code with dark ink & clear contrast
    QRCode.toDataURL(JSON.stringify({
      team: teamName,
      name: member.name,
      email: member.email,
      role: member.is_leader ? 'Leader' : 'Member',
      branch: member.branch
    }), {
      width: 360,
      margin: 2,
      color: {
        dark: '#0A0A0A',
        light: '#FFFFFF',
      },
    })
      .then((url) => setQrUrl(url))
      .catch((err) => console.error('Failed to generate QR:', err));
  }, [member, teamName]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(member.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{
      backgroundColor: '#FFFFFF',
      border: '1.5px solid var(--border-color)',
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-md)',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
    }}>
      {/* Top Header Card Stripe */}
      <div style={{
        backgroundColor: member.is_leader ? 'var(--primary-red)' : 'var(--black)',
        color: '#FFFFFF',
        padding: '0.85rem 1.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ShieldCheck size={18} />
          <span style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {member.is_leader ? 'Team Leader Pass' : 'Team Member Pass'}
          </span>
        </div>
        <span style={{ fontSize: '0.75rem', opacity: 0.85, fontWeight: 600 }}>
          VENUE PASS
        </span>
      </div>

      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
        {/* QR Code Container */}
        <div style={{
          padding: '0.75rem',
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-sm)',
          marginBottom: '1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '200px',
          height: '200px',
        }}>
          {qrUrl ? (
            <img
              src={qrUrl}
              alt={`QR Verification Pass for ${member.name}`}
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
              <RefreshCw className="animate-spin" size={24} />
              <span style={{ fontSize: '0.8rem' }}>Generating QR...</span>
            </div>
          )}
        </div>

        {/* Member Details */}
        <div style={{ width: '100%', textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--black)', marginBottom: '0.2rem' }}>
            {member.name}
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--primary-red)', fontWeight: 700, marginBottom: '0.75rem' }}>
            {member.branch}
          </p>

          <div style={{
            backgroundColor: 'var(--bg-subtle)',
            padding: '0.6rem 0.85rem',
            borderRadius: '8px',
            border: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.5rem',
          }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {member.email}
            </span>
            <button
              type="button"
              onClick={handleCopyEmail}
              aria-label="Copy participant email"
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: copied ? 'var(--success)' : 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                padding: '2px',
              }}
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  const [loadingToken, setLoadingToken] = useState(true);
  const [registrationData, setRegistrationData] = useState<RegistrationData | null>(null);
  const [isPending, startTransition] = useTransition();

  // Form State
  const [teamName, setTeamName] = useState('');
  const [activeStep, setActiveStep] = useState(0); // 0 = Team & Leader, 1 = Member 2, 2 = Member 3
  const [members, setMembers] = useState<MemberPayload[]>([
    { name: '', email: '', phone: '', roll: '', institution: 'AKTU', year: '1st Year', branch: 'CSE - core' },
  ]);

  // Errors state
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string>('');

  // 1. Initial Load: Check if registration token exists in localStorage
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem('registration_token');
      if (storedToken) {
        fetchRegistrationByToken(storedToken)
          .then((res) => {
            if (res.success && res.data) {
              setRegistrationData(res.data);
            } else {
              localStorage.removeItem('registration_token');
            }
          })
          .catch(() => {
            localStorage.removeItem('registration_token');
          })
          .finally(() => {
            setLoadingToken(false);
          });
      } else {
        setLoadingToken(false);
      }
    } catch {
      setLoadingToken(false);
    }
  }, []);

  // Update member field
  const updateMemberField = (index: number, field: keyof MemberPayload, value: string) => {
    setMembers((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });

    // Clear field error as user types
    const errorKey = `m${index}_${field}`;
    if (fieldErrors[errorKey]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[errorKey];
        return next;
      });
    }
  };

  // Add Member
  const addMember = () => {
    if (members.length < 3) {
      setMembers((prev) => [
        ...prev,
        { name: '', email: '', phone: '', roll: '', institution: 'AKTU', year: '1st Year', branch: 'CSE - core' },
      ]);
      setActiveStep(members.length);
    }
  };

  // Remove Member
  const removeMember = (indexToRemove: number) => {
    if (members.length > 1) {
      setMembers((prev) => prev.filter((_, idx) => idx !== indexToRemove));
      if (activeStep >= members.length - 1) {
        setActiveStep(Math.max(0, members.length - 2));
      }
    }
  };

  // Client-side validation per step & for whole form
  const validateStep = (stepIndex: number): boolean => {
    const errors: Record<string, string> = {};

    if (stepIndex === 0) {
      if (!teamName.trim()) {
        errors.team_name = 'Team name is required';
      }
    }

    const member = members[stepIndex];
    if (member) {
      const prefix = `m${stepIndex}_`;
      if (!member.name.trim() || member.name.trim().length < 2) {
        errors[`${prefix}name`] = 'Full name must be at least 2 characters';
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!member.email.trim()) {
        errors[`${prefix}email`] = 'Email address is required';
      } else if (!emailRegex.test(member.email.trim())) {
        errors[`${prefix}email`] = 'Please enter a valid email address';
      }

      const phoneRegex = /^[0-9]{10}$/;
      if (!member.phone.trim()) {
        errors[`${prefix}phone`] = 'Phone number is required';
      } else if (!phoneRegex.test(member.phone.trim())) {
        errors[`${prefix}phone`] = 'Must be exactly 10 digits (e.g. 9876543210)';
      }

      if (!member.roll.trim()) {
        errors[`${prefix}roll`] = 'Roll number / Student ID is required';
      }
      if (!member.institution) {
        errors[`${prefix}institution`] = 'Please select your institution';
      }
      if (!member.year) {
        errors[`${prefix}year`] = 'Please select your college year';
      }
      if (!member.branch) {
        errors[`${prefix}branch`] = 'Please select your branch';
      }
    }

    // Check duplicate emails in the form
    const emails = members.map((m) => m.email.trim().toLowerCase()).filter(Boolean);
    const emailDuplicates = emails.filter((item, index) => emails.indexOf(item) !== index);
    if (emailDuplicates.length > 0) {
      members.forEach((m, idx) => {
        if (emailDuplicates.includes(m.email.trim().toLowerCase())) {
          errors[`m${idx}_email`] = 'Duplicate email: Each member must have a unique email';
        }
      });
    }

    setFieldErrors((prev) => ({ ...prev, ...errors }));
    return Object.keys(errors).length === 0;
  };

  const validateAll = (): boolean => {
    let isValid = true;
    for (let i = 0; i < members.length; i++) {
      if (!validateStep(i)) {
        isValid = false;
      }
    }
    return isValid;
  };

  // Handle Form Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setServerError('');

    if (!validateAll()) {
      setServerError('Please correct the highlighted errors before submitting.');
      return;
    }

    startTransition(async () => {
      const response = await submitRegistration({
        team_name: teamName,
        members: members,
      });

      if (response.success && response.data && response.data.token && response.data.members) {
        // Save token to localStorage for instant access
        try {
          localStorage.setItem('registration_token', response.data.token);
        } catch (err) {
          console.warn('Storage warning:', err);
        }

        setRegistrationData({
          team_name: response.data.team_name || teamName,
          members: response.data.members,
        });
      } else {
        setServerError(response.message || 'Registration failed. Please check your details.');
        if (response.errors) {
          // Map server-side errors
          const mappedErrors: Record<string, string> = {};
          if (response.errors.team_name) {
            mappedErrors.team_name = response.errors.team_name[0];
          }
          setFieldErrors((prev) => ({ ...prev, ...mappedErrors }));
        }
      }
    });
  };

  // Handle new registration / clear token
  const handleRegisterAnother = () => {
    localStorage.removeItem('registration_token');
    setRegistrationData(null);
    setTeamName('');
    setMembers([{ name: '', email: '', phone: '', roll: '', institution: 'AKTU', year: '1st Year', branch: 'CSE - core' }]);
    setActiveStep(0);
    setFieldErrors({});
    setServerError('');
  };

  // State 1: Checking localStorage
  if (loadingToken) {
    return (
      <main style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '3px solid var(--border-color)',
            borderTopColor: 'var(--primary-red)',
            borderRadius: '50%',
          }} className="animate-spin" />
          <p style={{ color: 'var(--text-muted)', fontWeight: 600, marginTop: '1rem' }}>Loading registration details...</p>
        </div>
      </main>
    );
  }

  // State 2: Already registered (Token verified) -> Display QR Passes
  if (registrationData) {
    return (
      <main style={{ padding: '3.5rem 1.5rem 5rem 1.5rem', maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
        <div className="animate-fade-in" style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--border-color)',
          borderRadius: '20px',
          boxShadow: 'var(--shadow-lg)',
          padding: 'clamp(1.5rem, 4vw, 3rem)',
        }}>
          {/* Header Banner */}
          <div style={{
            textAlign: 'center',
            marginBottom: '2.5rem',
            paddingBottom: '2rem',
            borderBottom: '1px solid var(--border-color)',
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              backgroundColor: 'var(--success-bg)',
              color: 'var(--success)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem auto',
              boxShadow: '0 4px 12px rgba(22, 163, 74, 0.2)',
            }}>
              <CheckCircle size={36} />
            </div>

            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              color: 'var(--primary-red)',
              fontWeight: 800,
              fontSize: '0.85rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '0.5rem',
            }}>
              <Sparkles size={16} />
              <span>Confirmed Registration</span>
            </div>

            <h1 style={{
              fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
              fontWeight: 800,
              color: 'var(--black)',
              letterSpacing: '-0.03em',
              marginBottom: '0.5rem',
            }}>
              Team: <span className="text-red">{registrationData.team_name}</span>
            </h1>

            <p style={{ fontSize: '1rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
              Each team member must present their personal QR pass card below at the registration desk for venue check-in.
            </p>
          </div>

          {/* Member Passes Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.75rem',
            marginBottom: '3rem',
          }}>
            {registrationData.members.map((member, idx) => (
              <MemberPassCard key={idx} member={member} teamName={registrationData.team_name} />
            ))}
          </div>

          {/* Action Bar */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid var(--border-color)',
          }}>
            <Link href="/" className="btn btn-primary" style={{ minWidth: '180px' }}>
              <ArrowLeft size={18} />
              <span>Return Home</span>
            </Link>

            <button
              type="button"
              onClick={handleRegisterAnother}
              className="btn btn-secondary"
            >
              <span>Register Another Team</span>
            </button>
          </div>
        </div>
      </main>
    );
  }

  // State 3: Active Registration Form
  return (
    <main style={{ padding: '3rem 1.5rem 5rem 1.5rem', maxWidth: '820px', margin: '0 auto', width: '100%' }}>
      
      {/* Back to Home Link */}
      <div style={{ marginBottom: '1.5rem' }}>
        <Link 
          href="/" 
          style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.4rem', 
            fontSize: '0.9rem', 
            fontWeight: 700, 
            color: 'var(--text-muted)',
            transition: 'color 0.15s ease'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--primary-red)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
        >
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </Link>
      </div>

      <div className="form-card animate-fade-in">
        
        {/* Card Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            color: 'var(--primary-red)',
            fontWeight: 800,
            fontSize: '0.8rem',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            marginBottom: '0.4rem',
          }}>
            <span>HOW TO HACKATHON</span>
          </div>

          <h1 style={{
            fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
            fontWeight: 800,
            color: 'var(--black)',
            letterSpacing: '-0.03em',
            marginBottom: '0.5rem',
          }}>
            Team <span className="text-red">Registration</span>
          </h1>

          <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
            Register your team (1 to 3 members). Complete all required details for verification.
          </p>
        </div>

        {/* Global Server Error Alert */}
        {serverError && (
          <div style={{
            backgroundColor: 'var(--error-bg)',
            border: '1px solid #FECACA',
            borderRadius: '8px',
            padding: '1rem 1.25rem',
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            color: 'var(--primary-red)',
          }} role="alert">
            <AlertCircle size={20} style={{ flexShrink: 0 }} />
            <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{serverError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          
          {/* Section 1: Team Name */}
          <div style={{
            backgroundColor: 'var(--bg-subtle)',
            border: '1px solid var(--border-color)',
            borderRadius: '12px',
            padding: '1.5rem',
            marginBottom: '2rem',
          }}>
            <FormField
              id="team_name"
              name="team_name"
              label="Team Name"
              placeholder="e.g. Code Ninjas"
              value={teamName}
              required
              error={fieldErrors.team_name}
              onChange={(e) => {
                setTeamName(e.target.value);
                if (fieldErrors.team_name) {
                  setFieldErrors((prev) => {
                    const next = { ...prev };
                    delete next.team_name;
                    return next;
                  });
                }
              }}
              helperText="Choose a distinctive name for your hackathon squad"
            />
          </div>

          {/* Section 2: Member Step Selector Tabs */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '0.75rem',
              flexWrap: 'wrap',
              gap: '0.5rem',
            }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--black)' }}>
                Team Members ({members.length}/3)
              </span>

              {members.length < 3 && (
                <button
                  type="button"
                  onClick={addMember}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    backgroundColor: 'transparent',
                    border: '1px solid var(--primary-red)',
                    color: 'var(--primary-red)',
                    padding: '0.35rem 0.85rem',
                    borderRadius: '6px',
                    fontSize: '0.825rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  <Plus size={14} />
                  <span>Add Member ({members.length + 1})</span>
                </button>
              )}
            </div>

            {/* Stepper Tabs */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${members.length}, 1fr)`,
              gap: '0.5rem',
              backgroundColor: 'var(--bg-subtle)',
              padding: '0.4rem',
              borderRadius: '10px',
              border: '1px solid var(--border-color)',
            }}>
              {members.map((_, idx) => {
                const isActive = activeStep === idx;
                const isLeader = idx === 0;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveStep(idx)}
                    style={{
                      padding: '0.65rem 0.5rem',
                      borderRadius: '6px',
                      border: 'none',
                      backgroundColor: isActive ? 'var(--white)' : 'transparent',
                      color: isActive ? 'var(--primary-red)' : 'var(--text-muted)',
                      boxShadow: isActive ? 'var(--shadow-sm)' : 'none',
                      fontWeight: isActive ? 800 : 600,
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.35rem',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {isLeader ? <UserCheck size={16} /> : <Users size={16} />}
                    <span>{isLeader ? 'Leader (M1)' : `Member ${idx + 1}`}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 3: Active Member Details Form */}
          {members.map((member, idx) => {
            if (idx !== activeStep) return null;
            const isLeader = idx === 0;
            const prefix = `m${idx}_`;

            return (
              <div
                key={idx}
                className="animate-fade-in"
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--border-color)',
                  borderRadius: '12px',
                  padding: '1.75rem',
                  marginBottom: '2rem',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '1.5rem',
                  paddingBottom: '0.75rem',
                  borderBottom: '1px solid var(--border-color)',
                }}>
                  <div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--black)' }}>
                      {isLeader ? 'Team Leader Details' : `Member ${idx + 1} Details`}
                    </h3>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {isLeader ? 'Primary contact for team announcements' : 'Team participant details'}
                    </p>
                  </div>

                  {!isLeader && (
                    <button
                      type="button"
                      onClick={() => removeMember(idx)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        backgroundColor: 'transparent',
                        border: 'none',
                        color: 'var(--primary-red)',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        padding: '0.4rem',
                      }}
                    >
                      <Trash2 size={16} />
                      <span>Remove</span>
                    </button>
                  )}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.5rem' }}>
                  
                  {/* Full Name */}
                  <FormField
                    id={`${prefix}name`}
                    name={`${prefix}name`}
                    label="Full Name"
                    placeholder="e.g. Alex Johnson"
                    value={member.name}
                    required
                    error={fieldErrors[`${prefix}name`]}
                    onChange={(e) => updateMemberField(idx, 'name', e.target.value)}
                  />

                  {/* Email & Phone grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                    <FormField
                      id={`${prefix}email`}
                      name={`${prefix}email`}
                      type="email"
                      label="Email Address"
                      placeholder="alex@university.edu"
                      value={member.email}
                      required
                      error={fieldErrors[`${prefix}email`]}
                      onChange={(e) => updateMemberField(idx, 'email', e.target.value)}
                      helperText="Must be unique across registrations"
                    />

                    <FormField
                      id={`${prefix}phone`}
                      name={`${prefix}phone`}
                      type="tel"
                      label="Phone Number"
                      placeholder="10-digit Mobile Number"
                      maxLength={10}
                      value={member.phone}
                      required
                      error={fieldErrors[`${prefix}phone`]}
                      onChange={(e) => updateMemberField(idx, 'phone', e.target.value.replace(/\D/g, ''))}
                    />
                  </div>

                  {/* Roll Number & Institution */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                    <FormField
                      id={`${prefix}roll`}
                      name={`${prefix}roll`}
                      label="Roll Number / Student ID"
                      placeholder="e.g. 23005201..."
                      value={member.roll}
                      required
                      error={fieldErrors[`${prefix}roll`]}
                      onChange={(e) => updateMemberField(idx, 'roll', e.target.value)}
                    />

                    <FormField
                      id={`${prefix}institution`}
                      name={`${prefix}institution`}
                      type="select"
                      label="Institution"
                      value={member.institution}
                      options={INSTITUTION_OPTIONS}
                      required
                      error={fieldErrors[`${prefix}institution`]}
                      onChange={(e) => updateMemberField(idx, 'institution', e.target.value)}
                    />
                  </div>

                  {/* College Year & Branch */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                    <FormField
                      id={`${prefix}year`}
                      name={`${prefix}year`}
                      type="select"
                      label="College Year"
                      value={member.year}
                      options={YEAR_OPTIONS}
                      required
                      error={fieldErrors[`${prefix}year`]}
                      onChange={(e) => updateMemberField(idx, 'year', e.target.value)}
                    />

                    <FormField
                      id={`${prefix}branch`}
                      name={`${prefix}branch`}
                      type="select"
                      label="Branch / Major"
                      value={member.branch}
                      options={BRANCH_OPTIONS}
                      required
                      error={fieldErrors[`${prefix}branch`]}
                      onChange={(e) => updateMemberField(idx, 'branch', e.target.value)}
                    />
                  </div>

                </div>

                {/* Step navigation buttons inside the card */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '1.5rem',
                  paddingTop: '1rem',
                  borderTop: '1px solid var(--border-color)',
                }}>
                  {activeStep > 0 ? (
                    <button
                      type="button"
                      onClick={() => setActiveStep(activeStep - 1)}
                      className="btn btn-secondary"
                      style={{ padding: '0.5rem 1.25rem', fontSize: '0.875rem' }}
                    >
                      <ArrowLeft size={16} />
                      <span>Previous Member</span>
                    </button>
                  ) : <div />}

                  {activeStep < members.length - 1 ? (
                    <button
                      type="button"
                      onClick={() => {
                        if (validateStep(activeStep)) {
                          setActiveStep(activeStep + 1);
                        }
                      }}
                      className="btn btn-secondary"
                      style={{ padding: '0.5rem 1.25rem', fontSize: '0.875rem' }}
                    >
                      <span>Next Member</span>
                      <ArrowRight size={16} />
                    </button>
                  ) : <div />}
                </div>
              </div>
            );
          })}

          {/* Submit Button */}
          <div style={{ marginTop: '2rem' }}>
            <button
              type="submit"
              disabled={isPending}
              className="btn btn-primary"
              style={{
                width: '100%',
                padding: '1rem',
                fontSize: '1.05rem',
                fontWeight: 800,
              }}
            >
              {isPending ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
                  <div style={{
                    width: '18px',
                    height: '18px',
                    border: '2px solid #FFFFFF',
                    borderTopColor: 'transparent',
                    borderRadius: '50%',
                  }} className="animate-spin" />
                  <span>Securing Registration...</span>
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
                  <span>Complete Team Registration</span>
                  <ArrowRight size={18} />
                </div>
              )}
            </button>
          </div>

        </form>

      </div>
    </main>
  );
}
