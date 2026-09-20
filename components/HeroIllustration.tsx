import React from 'react';
import Image from 'next/image';

export default function HeroIllustration() {
  return (
    <div style={{
      width: '100%',
      maxWidth: '460px',
      height: 'clamp(350px, 45vh, 480px)',
      margin: '0 auto',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Image
        src="/hero-illustration.svg"
        alt="Hero Illustration"
        fill
        style={{
          objectFit: 'contain',
          filter: 'drop-shadow(0 15px 30px rgba(0, 0, 0, 0.06))',
        }}
        priority
      />
    </div>
  );
}
