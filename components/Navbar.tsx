'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowRight } from 'lucide-react';

import Image from 'next/image';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid var(--border-color)',
      transition: 'all 0.2s ease',
    }}>
      <div style={{
        maxWidth: '1240px',
        margin: '0 auto',
        padding: '0 1.5rem',
        height: '72px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Brand Logo Block */}
        <Link 
          href="/" 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            textDecoration: 'none',
            transition: 'opacity 0.2s ease',
          }}
          aria-label="Nibble Computer Society - How to Hackathon Home"
        >
          <div style={{
            height: '44px',
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
          }}>
            <Image
              src="/ncs-logo.png"
              alt="NCS Nibble Computer Society"
              width={150}
              height={42}
              style={{
                height: '40px',
                width: 'auto',
                objectFit: 'contain',
              }}
              priority
            />
            <span style={{
              fontFamily: 'var(--font-sans), Arial Black, Impact, sans-serif',
              fontWeight: 900,
              fontSize: '1.35rem',
              letterSpacing: '0.3em',
              color: 'var(--black)',
              marginTop: '4px',
              opacity: 0.8
            }}>
              EVENTS
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links & CTA */}
        <nav className="desktop-nav" style={{
          alignItems: 'center',
          gap: '2rem',
        }}>
          <Link 
            href="https://hackncs.in/" 
            target="_blank"
            rel="noopener noreferrer"
            style={{ 
              fontSize: '0.925rem', 
              fontWeight: 600, 
              color: 'var(--text-muted)',
              transition: 'color 0.15s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--black)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
          >
            NCS Website
          </Link>
          <Link 
            href="/#about" 
            style={{ 
              fontSize: '0.925rem', 
              fontWeight: 600, 
              color: 'var(--text-muted)',
              transition: 'color 0.15s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--black)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
          >
            About Event
          </Link>
          <Link 
            href="/#schedule" 
            style={{ 
              fontSize: '0.925rem', 
              fontWeight: 600, 
              color: 'var(--text-muted)',
              transition: 'color 0.15s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--black)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
          >
            Event Flow
          </Link>
          <Link 
            href="/register" 
            className="btn btn-primary"
            style={{
              padding: '0.6rem 1.4rem',
              fontSize: '0.9rem',
            }}
          >
            <span>Register Now</span>
            <ArrowRight size={16} />
          </Link>
        </nav>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0.5rem',
            borderRadius: '6px',
            background: 'transparent',
            border: '1px solid var(--border-color)',
            color: 'var(--black)',
            cursor: 'pointer',
          }}
          className="mobile-toggle"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div style={{
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid var(--border-color)',
          padding: '1.25rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          boxShadow: 'var(--shadow-md)',
        }}>
          <Link 
            href="https://hackncs.in/" 
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            style={{ 
              fontSize: '1rem', 
              fontWeight: 600, 
              color: 'var(--black)',
              padding: '0.5rem 0'
            }}
          >
            NCS Website
          </Link>
          <Link 
            href="/#about" 
            onClick={() => setMobileMenuOpen(false)}
            style={{ 
              fontSize: '1rem', 
              fontWeight: 600, 
              color: 'var(--black)',
              padding: '0.5rem 0'
            }}
          >
            About Event
          </Link>
          <Link 
            href="/#schedule" 
            onClick={() => setMobileMenuOpen(false)}
            style={{ 
              fontSize: '1rem', 
              fontWeight: 600, 
              color: 'var(--black)',
              padding: '0.5rem 0'
            }}
          >
            Event Flow
          </Link>
          <Link 
            href="/register" 
            onClick={() => setMobileMenuOpen(false)}
            className="btn btn-primary"
            style={{ width: '100%', justifyContent: 'center' }}
          >
            <span>Register Now</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      )}
    </header>
  );
}
