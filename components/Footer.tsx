'use client';

import React from 'react';
import { Globe } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{
      width: '100%',
      backgroundColor: 'var(--primary-red)',
      color: '#FFFFFF',
      marginTop: 'auto',
    }}>
      <div style={{
        maxWidth: '1240px',
        margin: '0 auto',
        padding: '2.5rem 1.5rem',
      }}>
        {/* Social Links Row */}
        <div className="footer-links-row" style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem',
          paddingBottom: '2rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.25)',
        }}>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
              HOW TO HACKATHON.
            </span>
            <span style={{ fontSize: '0.875rem', opacity: 0.9 }}>
              From Ideas. To Prototype.
            </span>
          </div>

          <div className="social-links-group" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2rem',
            flexWrap: 'wrap',
          }}>


            {/* Instagram */}
            <a
              href="https://www.instagram.com/hackncs/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: '#FFFFFF',
                fontWeight: 600,
                fontSize: '0.95rem',
                transition: 'opacity 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
              aria-label="Instagram Profile"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
              <span>Instagram</span>
            </a>


          </div>
        </div>

        {/* Bottom copyright & attribution */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          paddingTop: '1.5rem',
          fontSize: '0.85rem',
          opacity: 0.9,
        }}>
          <div>
            &copy; {currentYear} How to Hackathon. All rights reserved.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span>Built with passion for innovators</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
