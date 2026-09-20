'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <Link href="/" className="ncs-logo-wrapper footer-logo">
        <Image
          src="/logo.png"
          alt="NCS – Nibble Computer Society"
          width={100}
          height={44}
          className="ncs-logo-img ncs-logo-light"
        />
        <Image
          src="/logo-white.png"
          alt="NCS – Nibble Computer Society"
          width={100}
          height={44}
          className="ncs-logo-img ncs-logo-dark"
        />
      </Link>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.08em' }}>
        © {new Date().getFullYear()} NIBBLE COMPUTER SOCIETY · ALL RIGHTS RESERVED
      </p>
      <p style={{ fontSize: '0.78rem', color: 'var(--muted)', marginTop: '0.5rem' }}>
        Presented by <a href="https://hackncs.in" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>NCS</a> — How to Hackathon !!
      </p>
    </footer>
  );
}
