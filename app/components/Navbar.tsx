'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Initialize theme from localStorage / default light
  useEffect(() => {
    try {
      const savedTheme = (localStorage.getItem('ncs_theme') as 'light' | 'dark') || 'light';
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } catch {}
  }, []);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem('ncs_theme', next);
    } catch {}
  };

  useEffect(() => {
    const onScroll = () => {
      if (!navRef.current) return;
      if (window.scrollY > 30) {
        navRef.current.style.boxShadow = '0 6px 24px rgba(0, 0, 0, 0.08)';
        navRef.current.style.borderBottomColor = 'var(--border-bright)';
      } else {
        navRef.current.style.boxShadow = 'none';
        navRef.current.style.borderBottomColor = 'var(--border)';
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav ref={navRef} className="nav" style={{ animation: 'fadeIn 0.6s ease-out forwards' }}>
      {/* NCS Logo */}
      <Link href="/" className="ncs-logo-wrapper" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ display: 'flex' }}>
          <Image
            src="/logo.png"
            alt="NCS"
            width={120}
            height={53}
            className="ncs-logo-img ncs-logo-light"
            priority
          />
          <Image
            src="/logo-white.png"
            alt="NCS"
            width={120}
            height={53}
            className="ncs-logo-img ncs-logo-dark"
            priority
          />
        </div>
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '1.4rem',
            fontWeight: 800,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'var(--foreground)',
          }}
        >
          EVENTS
        </span>
      </Link>

      {/* Mobile Menu Toggle */}
      <button
        className="mobile-menu-btn"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle Menu"
      >
        {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
      </button>

      {/* Nav Links */}
      <ul className={`nav-links ${isMobileMenuOpen ? 'nav-links-open' : ''}`}>
        <li><Link href="/#about" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>About</Link></li>
        <li><Link href="/#event-flow" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Event</Link></li>
        <li><a href="https://hackncs.in" target="_blank" rel="noopener noreferrer" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Website</a></li>
        {/* Dark Mode Toggle */}
        <li>
          <button
            onClick={toggleTheme}
            className="theme-toggle-btn"
            title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? <Moon size={19} /> : <Sun size={19} />}
          </button>
        </li>
        <li>
          <Link href="/register" className="btn btn-primary" style={{ padding: '0.55rem 1.25rem', fontSize: '0.92rem' }}>
            Register
          </Link>
        </li>
      </ul>
    </nav>
  );
}
