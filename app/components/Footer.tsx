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
          width={80}
          height={36}
          className="ncs-logo-img ncs-logo-light"
        />
        <Image
          src="/logo-white.png"
          alt="NCS – Nibble Computer Society"
          width={80}
          height={36}
          className="ncs-logo-img ncs-logo-dark"
        />
      </Link>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.08em' }}>
        © {new Date().getFullYear()} NIBBLE COMPUTER SOCIETY · ALL RIGHTS RESERVED
      </p>
      <p style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>
        Presented by NCS — How to Hackathon !!
      </p>
    </footer>
  );
}
