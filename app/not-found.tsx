import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <main style={{
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '4rem 1.5rem',
      textAlign: 'center',
    }}>
      <div className="animate-fade-in" style={{
        maxWidth: '540px',
        margin: '0 auto',
      }}>
        <div style={{
          width: '72px',
          height: '72px',
          backgroundColor: 'var(--primary-red-light)',
          color: 'var(--primary-red)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem auto',
        }}>
          <Compass size={38} />
        </div>

        <div style={{
          fontSize: 'clamp(4rem, 8vw, 6rem)',
          fontWeight: 800,
          lineHeight: 1,
          letterSpacing: '-0.04em',
          color: 'var(--black)',
          marginBottom: '0.75rem',
        }}>
          404<span className="text-red">.</span>
        </div>

        <h1 style={{
          fontSize: '1.5rem',
          fontWeight: 800,
          color: 'var(--black)',
          marginBottom: '0.75rem',
        }}>
          Page Not Found
        </h1>

        <p style={{
          fontSize: '1rem',
          color: 'var(--text-muted)',
          marginBottom: '2rem',
          lineHeight: 1.6,
        }}>
          The page you are looking for does not exist or has moved. Return to the main portal to explore the hackathon details or register.
        </p>

        <Link href="/" className="btn btn-primary">
          <ArrowLeft size={18} />
          <span>Back to Home</span>
        </Link>
      </div>
    </main>
  );
}
