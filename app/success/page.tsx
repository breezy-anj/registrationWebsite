import Link from 'next/link';
import Image from 'next/image';
import { QrCode, ArrowLeft } from 'lucide-react';

export default async function Success({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const team = resolvedParams.team as string;
  const count = resolvedParams.count as string;

  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '6rem 2rem 4rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Ambient glow */}
      <div style={{
        position: 'absolute',
        top: '20%', left: '50%',
        transform: 'translateX(-50%)',
        width: '500px', height: '400px',
        background: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* NCS logo */}
      <div className="animate-float-logo" style={{ marginBottom: '2rem' }}>
        <Image
          src="/logo.png"
          alt="NCS"
          width={90}
          height={40}
          className="ncs-logo-img ncs-logo-light"
          style={{ opacity: 0.9 }}
          priority
        />
        <Image
          src="/logo-white.png"
          alt="NCS"
          width={90}
          height={40}
          className="ncs-logo-img ncs-logo-dark"
          style={{ opacity: 0.9 }}
          priority
        />
      </div>

      {/* Success icon */}
      <div
        className="animate-fade-scale"
        style={{
          width: '72px', height: '72px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #10b981, #06b6d4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1.5rem',
          boxShadow: '0 0 32px rgba(16,185,129,0.45)',
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24"
          fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      <span className="badge badge-accent animate-fade-in" style={{ marginBottom: '1rem' }}>
        Registration Confirmed!
      </span>

      <h1
        className="animate-fade-in"
        style={{ animationDelay: '0.1s', fontSize: 'clamp(2rem, 5vw, 3rem)', textAlign: 'center', marginBottom: '0.875rem' }}
      >
        You&apos;re <span className="gradient-text">In!!</span>
      </h1>

      <p
        className="animate-fade-in"
        style={{
          animationDelay: '0.2s',
          color: 'var(--muted-fg)',
          fontSize: '1rem',
          maxWidth: '500px',
          textAlign: 'center',
          lineHeight: 1.7,
          marginBottom: '2rem',
        }}
      >
        Thank you for registering for <strong style={{ color: 'var(--foreground)' }}>How to Hackathon!!</strong>.
        We&apos;ve saved your details. See you at the event!
      </p>

      {team && (
        <div
          className="glass-bright animate-fade-in"
          style={{
            animationDelay: '0.3s',
            padding: '1.5rem 2rem',
            borderRadius: 'var(--radius-lg)',
            marginBottom: '2rem',
            textAlign: 'center',
            minWidth: '260px',
          }}
        >
          <p style={{ fontSize: '0.72rem', letterSpacing: '0.1em', color: 'var(--muted-fg)', textTransform: 'uppercase', marginBottom: '0.5rem', fontFamily: 'var(--font-mono)' }}>Team Name</p>
          <p className="gradient-text" style={{ fontSize: '1.4rem', fontWeight: 800 }}>{team}</p>
          <p style={{ fontSize: '0.85rem', color: 'var(--muted-fg)', marginTop: '0.5rem' }}>
            {count || 1} member{(parseInt(count) || 1) !== 1 ? 's' : ''} registered
          </p>
        </div>
      )}

      <div className="animate-fade-in" style={{ animationDelay: '0.4s', display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link href="/register" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
          <QrCode size={18} />
          View QR Passes
        </Link>
        <Link href="/" className="btn btn-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
          <ArrowLeft size={16} />
          Return Home
        </Link>
      </div>

      {/* Footer brand */}
      <div style={{ marginTop: '3rem', opacity: 0.6 }}>
        <Image src="/logo.png" alt="NCS" width={70} height={31} />
      </div>
    </main>
  );
}
