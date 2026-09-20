import React from 'react';
import Link from 'next/link';
import { CheckCircle2, Home, QrCode } from 'lucide-react';

interface SuccessPageProps {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }> | { [key: string]: string | string[] | undefined };
}

export default async function SuccessPage(props: SuccessPageProps) {
  let resolvedParams: { [key: string]: string | string[] | undefined } = {};

  if (props?.searchParams) {
    if (props.searchParams instanceof Promise) {
      resolvedParams = await props.searchParams;
    } else {
      resolvedParams = props.searchParams;
    }
  }

  const team = typeof resolvedParams.team === 'string' ? resolvedParams.team : '';
  const count = typeof resolvedParams.count === 'string' ? resolvedParams.count : '';

  return (
    <main style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '4rem 1.5rem 6rem 1.5rem',
      width: '100%',
    }}>
      <div className="animate-fade-in" style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid var(--border-color)',
        borderRadius: '20px',
        boxShadow: 'var(--shadow-lg)',
        padding: 'clamp(2rem, 5vw, 3.5rem)',
        textAlign: 'center',
      }}>
        {/* Success Icon */}
        <div style={{
          width: '72px',
          height: '72px',
          backgroundColor: 'var(--success-bg)',
          color: 'var(--success)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem auto',
          boxShadow: '0 6px 16px rgba(22, 163, 74, 0.2)',
        }}>
          <CheckCircle2 size={42} />
        </div>

        {/* Header Text */}
        <div style={{
          display: 'inline-block',
          color: 'var(--primary-red)',
          fontWeight: 800,
          fontSize: '0.85rem',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          marginBottom: '0.5rem',
        }}>
          Registration Confirmed
        </div>

        <h1 style={{
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 800,
          color: 'var(--black)',
          letterSpacing: '-0.03em',
          marginBottom: '1rem',
        }}>
          You&apos;re <span className="text-red">In!</span>
        </h1>

        <p style={{
          fontSize: '1.05rem',
          color: 'var(--text-muted)',
          maxWidth: '540px',
          margin: '0 auto 2rem auto',
          lineHeight: 1.6,
        }}>
          Thank you for registering for the <strong>How to Hackathon.</strong> session. Your team entry has been recorded in our system.
        </p>

        {/* Dynamic Team Info Box */}
        {team && (
          <div style={{
            backgroundColor: 'var(--bg-subtle)',
            border: '1px solid var(--border-color)',
            borderRadius: '12px',
            padding: '1.5rem',
            maxWidth: '480px',
            margin: '0 auto 2.5rem auto',
            textAlign: 'left',
          }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
              Registered Squad
            </div>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--black)', marginBottom: '0.5rem' }}>
              {team}
            </div>
            {count && (
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                <strong>Participants:</strong> {count} Member(s)
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Link href="/register" className="btn btn-primary" style={{ minWidth: '200px' }}>
            <QrCode size={18} />
            <span>View QR Passes</span>
          </Link>

          <Link href="/" className="btn btn-secondary">
            <Home size={18} />
            <span>Back to Home</span>
          </Link>
        </div>

      </div>
    </main>
  );
}
