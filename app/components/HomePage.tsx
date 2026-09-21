'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Rocket,
  Zap,
  Calendar,
  Trophy,
  Users,
  CheckCircle2,
  Bot,
  Gift,
  ChevronDown,
  Sparkles,
  Globe,
  Laptop,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CyberCore3D = dynamic(() => import('./CyberCore3D'), { ssr: false });

/* ── Preloader (Gen-Z Cyberpunk Dark) ──────────────────────── */
function Preloader({ onDone }: { onDone: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('BOOT');
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const statuses = ['BOOT', 'SYNC', 'LOAD', 'GO!'];
    let step = 0;

    // Random glitch flickers
    const glitchTimer = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 80);
    }, 900 + Math.random() * 700);

    const interval = setInterval(() => {
      setProgress(prev => {
        const next = Math.min(prev + Math.random() * 22 + 8, 100);
        if (next >= 30 && step === 0) { step = 1; setStatus(statuses[1]); }
        if (next >= 60 && step === 1) { step = 2; setStatus(statuses[2]); }
        if (next >= 90 && step === 2) { step = 3; setStatus(statuses[3]); }
        return next;
      });
    }, 120);

    const timer = setTimeout(() => {
      clearInterval(interval);
      clearInterval(glitchTimer);
      setProgress(100);
      setStatus('GO!');
      gsap.to(ref.current, {
        opacity: 0,
        scale: 1.04,
        duration: 0.55,
        ease: 'power2.inOut',
        onComplete: onDone,
      });
    }, 1700);

    return () => { clearInterval(interval); clearInterval(glitchTimer); clearTimeout(timer); };
  }, [onDone]);

  return (
    <div
      ref={ref}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#0a0a0f',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2.5rem',
        overflow: 'hidden',
      }}
    >
      {/* Scanline overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.015) 2px, rgba(255,255,255,0.015) 4px)',
        pointerEvents: 'none', zIndex: 10,
      }} />

      {/* Big pulsing red glow blobs */}
      <div style={{
        position: 'absolute', top: '-15%', left: '-10%',
        width: '60vw', height: '60vw',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(220,38,38,0.22) 0%, transparent 65%)',
        animation: 'float 5s ease-in-out infinite',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-15%', right: '-10%',
        width: '50vw', height: '50vw',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(239,68,68,0.15) 0%, transparent 65%)',
        animation: 'float 7s ease-in-out infinite reverse',
        pointerEvents: 'none',
      }} />

      {/* Particle dots grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(rgba(220,38,38,0.25) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
        pointerEvents: 'none', opacity: 0.5,
      }} />

      {/* Animated orbit rings */}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
        {/* Ring 1 — outer slow */}
        <div style={{
          position: 'absolute',
          width: '330px', height: '330px',
          borderRadius: '50%',
          border: '1px solid rgba(220,38,38,0.3)',
          animation: 'spin-slow 12s linear infinite',
          pointerEvents: 'none',
        }} />
        {/* Ring 2 — medium */}
        <div style={{
          position: 'absolute',
          width: '275px', height: '275px',
          borderRadius: '50%',
          border: '1px solid rgba(239,68,68,0.2)',
          animation: 'spin-slow-rev 8s linear infinite',
          pointerEvents: 'none',
        }} />
        {/* Ring 3 — inner dashed */}
        <div style={{
          position: 'absolute',
          width: '230px', height: '230px',
          borderRadius: '50%',
          border: '1px dashed rgba(220,38,38,0.18)',
          animation: 'spin-slow 5s linear infinite',
          pointerEvents: 'none',
        }} />

        {/* Glowing dot on outer ring */}
        <div style={{
          position: 'absolute',
          width: '10px', height: '10px',
          borderRadius: '50%',
          background: '#ef4444',
          boxShadow: '0 0 18px 4px rgba(239,68,68,0.7)',
          top: '50%', left: '165px',
          transform: 'translateY(-50%)',
          animation: 'spin-slow 12s linear infinite',
          transformOrigin: '-161px 0',
          pointerEvents: 'none',
        }} />
        {/* Second dot on ring 2 */}
        <div style={{
          position: 'absolute',
          width: '6px', height: '6px',
          borderRadius: '50%',
          background: '#dc2626',
          boxShadow: '0 0 10px 2px rgba(220,38,38,0.6)',
          top: '50%', left: '137px',
          transform: 'translateY(-50%)',
          animation: 'spin-slow-rev 8s linear infinite',
          transformOrigin: '-134px 0',
          pointerEvents: 'none',
        }} />

        {/* NCS Logo box — cyberpunk glass HUD badge */}
        <div style={{
          position: 'relative',
          zIndex: 5,
          padding: '1.1rem 1.8rem',
          borderRadius: '1.25rem',
          background: 'rgba(12, 12, 20, 0.88)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: '0 0 35px rgba(220,38,38,0.35), 0 0 70px rgba(220,38,38,0.15), 0 8px 32px rgba(0,0,0,0.8), inset 0 0 15px rgba(239,68,68,0.1)',
          border: '1px solid rgba(239,68,68,0.45)',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          userSelect: 'none',
        }}>
          {/* Left: High-contrast NCS Emblem Badge */}
          <div style={{
            width: '52px',
            height: '52px',
            background: '#ffffff',
            color: '#09090b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 900,
            fontSize: '1.6rem',
            fontFamily: 'var(--font-sans), system-ui, -apple-system, sans-serif',
            letterSpacing: '-0.04em',
            lineHeight: 1,
            borderRadius: '6px',
            boxShadow: '0 0 20px rgba(255, 255, 255, 0.4), 0 0 35px rgba(239, 68, 68, 0.35)',
            flexShrink: 0,
          }}>
            NCS
          </div>

          {/* Center: Vertical Divider Bar */}
          <div style={{
            width: '3px',
            height: '50px',
            background: 'linear-gradient(180deg, #ef4444, #ffffff, #ef4444)',
            borderRadius: '2px',
            boxShadow: '0 0 10px rgba(239, 68, 68, 0.7)',
            flexShrink: 0,
          }} />

          {/* Right: Three stacked lines — NIBBLE / COMPUTER / SOCIETY */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '50px',
            fontFamily: 'var(--font-sans), system-ui, -apple-system, sans-serif',
            fontWeight: 800,
            fontSize: '0.85rem',
            lineHeight: 1.15,
            letterSpacing: '0.15em',
            color: '#ffffff',
            textShadow: '0 0 14px rgba(255, 255, 255, 0.3), 0 0 22px rgba(239, 68, 68, 0.4)',
            textTransform: 'uppercase',
            textAlign: 'left',
          }}>
            <span>NIBBLE</span>
            <span>COMPUTER</span>
            <span>SOCIETY</span>
          </div>
        </div>
      </div>

      {/* Glitchy event title */}
      <div style={{ textAlign: 'center', zIndex: 2, position: 'relative' }}>
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(1rem, 3vw, 1.4rem)',
          fontWeight: 700,
          letterSpacing: '0.22em',
          color: glitch ? '#ffffff' : '#ef4444',
          textShadow: glitch
            ? '2px 0 #dc2626, -2px 0 #fff, 0 0 20px rgba(239,68,68,0.8)'
            : '0 0 20px rgba(239,68,68,0.45)',
          transform: glitch ? 'translateX(3px)' : 'none',
          transition: 'color 0.05s, text-shadow 0.05s',
          textTransform: 'uppercase',
          marginBottom: '0.3rem',
        }}>
          HOW TO HACKATHON
        </p>
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.68rem',
          letterSpacing: '0.3em',
          color: 'rgba(255,255,255,0.35)',
          textTransform: 'uppercase',
        }}>BY NIBBLE COMPUTER SOCIETY</p>
      </div>

      {/* Status + Progress */}
      <div style={{ fontFamily: 'var(--font-mono)', textAlign: 'center', zIndex: 2, width: '260px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '0.65rem', letterSpacing: '0.2em', color: '#ef4444', fontWeight: 700 }}>
            {status}<span style={{ animation: 'blink-cursor 1s step-end infinite' }}>_</span>
          </span>
          <span style={{ fontSize: '0.65rem', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)' }}>
            {Math.round(progress)}%
          </span>
        </div>

        {/* Progress bar */}
        <div style={{
          width: '100%', height: '2px',
          background: 'rgba(220,38,38,0.18)',
          borderRadius: '2px', overflow: 'hidden',
        }}>
          <div style={{
            height: '100%',
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #991b1b, #dc2626, #ef4444)',
            borderRadius: '2px',
            transition: 'width 0.12s ease',
            boxShadow: '0 0 12px rgba(239,68,68,0.7)',
          }} />
        </div>
      </div>

      {/* Corner HUD decorations */}
      <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', width: '28px', height: '28px',
        borderTop: '2px solid rgba(220,38,38,0.45)', borderLeft: '2px solid rgba(220,38,38,0.45)' }} />
      <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', width: '28px', height: '28px',
        borderTop: '2px solid rgba(220,38,38,0.45)', borderRight: '2px solid rgba(220,38,38,0.45)' }} />
      <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', width: '28px', height: '28px',
        borderBottom: '2px solid rgba(220,38,38,0.45)', borderLeft: '2px solid rgba(220,38,38,0.45)' }} />
      <div style={{ position: 'absolute', bottom: '1.5rem', right: '1.5rem', width: '28px', height: '28px',
        borderBottom: '2px solid rgba(220,38,38,0.45)', borderRight: '2px solid rgba(220,38,38,0.45)' }} />

      {/* Bottom URL tag */}
      <p style={{
        position: 'absolute', bottom: '2.5rem',
        fontSize: '0.6rem', letterSpacing: '0.22em',
        color: 'rgba(255,255,255,0.2)', fontFamily: 'var(--font-mono)',
        textTransform: 'uppercase', zIndex: 2,
      }}>HACKNCS.IN</p>
    </div>
  );
}

/* ── Tilt Card ──────────────────────────────────────────────── */
function TiltCard({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotX = (y / rect.height) * -14;
    const rotY = (x / rect.width) * 14;
    gsap.to(card, {
      rotationX: rotX,
      rotationY: rotY,
      transformPerspective: 800,
      duration: 0.25,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotationX: 0,
      rotationY: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.5)',
    });
  };

  return (
    <div
      ref={cardRef}
      className="glass tilt-card"
      style={{
        padding: '2rem',
        borderRadius: 'var(--radius-lg)',
        opacity: 0,
        transform: 'translateY(32px)',
        willChange: 'transform',
        transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
        cursor: 'default',
      }}
      data-tilt
      data-delay={delay}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}

/* ── Main Page ──────────────────────────────────────────────── */
export default function HomePage() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [ready, setReady] = useState(false);

  const pageRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroDescRef = useRef<HTMLParagraphElement>(null);
  const heroBadgeRef = useRef<HTMLDivElement>(null);
  const heroCtaRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const logoSectionRef = useRef<HTMLDivElement>(null);

  // Entry GSAP timeline after preloader
  useEffect(() => {
    if (!ready) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(heroBadgeRef.current,
        { opacity: 0, y: -16, scale: 0.85 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6 }
      )
        .fromTo(heroTitleRef.current,
          { opacity: 0, y: 40, clipPath: 'inset(0 0 100% 0)' },
          { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)', duration: 0.9 },
          '-=0.2'
        )
        .fromTo(heroDescRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.7 },
          '-=0.4'
        )
        .fromTo(heroCtaRef.current,
          { opacity: 0, y: 20, scale: 0.94 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6 },
          '-=0.35'
        )
        .fromTo(coreRef.current,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 1.1, ease: 'back.out(1.2)' },
          '-=1.0'
        );
    }, pageRef);

    return () => ctx.revert();
  }, [ready]);

  // ScrollTrigger for cards
  useEffect(() => {
    if (!ready) return;

    const ctx = gsap.context(() => {
      // Cards stagger on scroll
      const cards = document.querySelectorAll('[data-tilt]');
      cards.forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 48 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: i * 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              once: true,
            },
          }
        );
      });

      // Logo section reveal
      if (logoSectionRef.current) {
        gsap.fromTo(logoSectionRef.current,
          { opacity: 0, scale: 0.92 },
          {
            opacity: 1, scale: 1, duration: 0.8,
            scrollTrigger: {
              trigger: logoSectionRef.current,
              start: 'top 80%',
              once: true,
            },
          }
        );
      }

      // Core parallax on scroll
      gsap.to(coreRef.current, {
        y: -80,
        ease: 'none',
        scrollTrigger: {
          trigger: pageRef.current,
          start: 'top top',
          end: 'center top',
          scrub: 1.5,
        },
      });

      ScrollTrigger.refresh();
    }, pageRef);

    return () => ctx.revert();
  }, [ready]);

  const onPreloaderDone = () => {
    // Force scroll to very top so the hero + 3D orb is the first thing visible
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    setShowPreloader(false);
    setReady(true);
  };

  return (
    <>
      {showPreloader && <Preloader onDone={onPreloaderDone} />}

      <div ref={pageRef} style={{ visibility: showPreloader ? 'hidden' : 'visible' }}>
        {/* Ambient cyber grid */}
        <div className="cyber-grid-bg" />

        {/* ── HERO ──────────────────────────────────────────────── */}
        <section style={{
          minHeight: '100dvh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'clamp(5rem, 6vh, 6rem) 1.25rem 1rem',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Ambient background glow */}
          <div style={{
            position: 'absolute',
            top: '4%', left: '50%',
            transform: 'translateX(-50%)',
            width: 'min(96vw, 1100px)', height: '620px',
            background: 'radial-gradient(circle, rgba(220,38,38,0.07) 0%, rgba(0,0,0,0.015) 55%, transparent 75%)',
            pointerEvents: 'none',
            zIndex: 0,
          }} />

          {/* 3D Core Canvas (Insanely Large Background) */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '150vw',
            height: '150vh',
            minWidth: '1200px',
            minHeight: '1200px',
            zIndex: 0,
            opacity: 0.35,
            pointerEvents: 'none',
          }}>
            {ready && <CyberCore3D style={{ width: '100%', height: '100%' }} />}
          </div>

          <div className="hero-split">
            {/* LEFT COLUMN: TEXT */}
            <div className="hero-text-content">
              {/* Badge */}
              <div ref={heroBadgeRef} style={{ opacity: 0, marginBottom: '0.65rem', zIndex: 1 }}>
                <span className="badge badge-primary badge-shimmer" style={{ fontWeight: 700, letterSpacing: '0.04em', background: 'var(--surface)' }}>
                  Nibble Computer Society Presents
                </span>
              </div>

              {/* Poster Headline with !! */}
              <h1
                ref={heroTitleRef}
                style={{
                  fontSize: 'clamp(1.85rem, 6vw, 4.4rem)',
                  fontWeight: 900,
                  lineHeight: 1.05,
                  letterSpacing: '-0.04em',
                  marginBottom: '0.85rem',
                  opacity: 0,
                  zIndex: 1,
                }}
              >
                <span style={{ color: 'var(--primary)' }}>How to</span>{' '}
                <span style={{ color: 'var(--foreground)' }}>
                  Hackathon<span style={{ color: 'var(--primary)' }}>!!</span>
                </span>
              </h1>

              {/* Poster Subtitles */}
              <div
                ref={heroDescRef}
                style={{
                  maxWidth: '600px',
                  marginBottom: '1.75rem',
                  opacity: 0,
                  zIndex: 1,
                }}
              >
                <p style={{
                  fontSize: 'clamp(1.05rem, 2.5vw, 1.4rem)',
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  color: 'var(--foreground)',
                  marginBottom: '0.35rem',
                }}>
                  From <span style={{ color: 'var(--primary)' }}>Ideas.</span> To <span style={{ color: 'var(--primary)' }}>Prototype.</span>
                </p>
                <p style={{
                  fontSize: 'clamp(0.88rem, 1.9vw, 0.98rem)',
                  color: 'var(--muted-fg)',
                  lineHeight: 1.55,
                }}>
                  <strong style={{ color: 'var(--foreground)' }}>Stay Tuned. Stay Ahead.</strong> · Ideate, collaborate, and conquer hackathons with mentored guidance.
                </p>
              </div>

              {/* CTAs */}
              <div
                ref={heroCtaRef}
                className="hero-cta-container"
                style={{ opacity: 0, zIndex: 1 }}
              >
                <Link href="/register" className="btn btn-primary" style={{ minWidth: '180px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                  <Rocket size={18} />
                  Register Now
                </Link>
                <a href="#about" className="btn btn-ghost" style={{ minWidth: '140px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem' }}>
                  Learn More
                  <ChevronDown size={16} />
                </a>
              </div>
            </div>

            {/* RIGHT COLUMN: IMAGE */}
            <div className="hero-image-content">

              {/* Main Hero Illustration */}
              <div
                ref={coreRef}
                style={{
                  width: 'clamp(200px, 65vw, 550px)',
                  aspectRatio: '1',
                  position: 'relative',
                  opacity: 0,
                  zIndex: 1,
                }}
              >
                {ready && (
                  <div style={{ width: '100%', height: '100%', animation: 'float-logo 6s ease-in-out infinite' }}>
                    <Image 
                      src="/document.svg" 
                      alt="Hero Illustration" 
                      fill
                      style={{ 
                        objectFit: 'contain',
                        filter: 'drop-shadow(0 25px 35px rgba(0,0,0,0.9)) drop-shadow(0 0 50px rgba(220, 38, 38, 0.45))'
                      }}
                      priority
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── ABOUT SECTION (FIFA CARD AESTHETICS) ──────────────── */}
        <section id="about" style={{ padding: '5rem 2rem', maxWidth: '1180px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="badge badge-accent" style={{ marginBottom: '1rem' }}>About the Event</span>
            <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', marginBottom: '0.75rem' }}>
              What is <span style={{ color: 'var(--primary)' }}>How to</span> Hackathon<span style={{ color: 'var(--primary)' }}>!!</span>?
            </h2>
            <div className="section-divider" />
            <p style={{ color: 'var(--muted-fg)', maxWidth: '720px', margin: '1.25rem auto 0', lineHeight: 1.8 }}>
              The &quot;How to Hackathon !!&quot; event is designed to introduce participants to the dynamics of tech competitions. Inspired by the comprehensive vision of larger events, this session aims to unite creative thinkers and aspiring technologists. A core component of the event is the mini idea challenge, structured to foster collaboration and learning.
            </p>
          </div>

          <div className="event-layout-grid" id="event-flow">
            {/* LEFT COLUMN: TIMELINE */}
            <div>
              <div style={{ textAlign: 'left', marginBottom: '2.5rem' }}>
                <span className="badge badge-accent" style={{ marginBottom: '1rem' }}>Timeline</span>
                <h3 style={{ fontSize: '1.8rem', fontWeight: 800 }}>
                  Event <span style={{ color: 'var(--primary)' }}>Flow</span>
                </h3>
              </div>
              
              <div style={{ position: 'relative', paddingLeft: '1.5rem' }}>
                {/* Vertical Line */}
                <div style={{
                  position: 'absolute',
                  left: '1.5rem',
                  top: '2rem',
                  bottom: '2rem',
                  width: '2px',
                  background: 'linear-gradient(180deg, rgba(239, 68, 68, 0) 0%, var(--primary) 15%, var(--primary) 85%, rgba(239, 68, 68, 0) 100%)',
                  transform: 'translateX(-50%)',
                  opacity: 0.5,
                }} />

                {[
                  { time: '~30m', label: 'Intro', desc: "Preview of the event with the president's address." },
                  { time: 'TBD', label: 'Main Session', desc: 'An engaging session about hackathons, contests, networking, and modern tech trends.' },
                  { time: '1 Hr', label: 'Ideation', desc: 'Participants are given a theme or problem and will come up with the best possible software solutions. Mentoring will be provided.' },
                  { time: 'End', label: 'Submission', desc: 'Participants will submit their ideas along with the proposed solution through the chat link they used for research.' },
                  { time: '~30m', label: 'Judging', desc: 'A speaker session about how participants should have approached the problems and real hackathons, followed by result declaration. Future events and recruitments will also be promoted.' },
                ].map((item, i) => (
                  <div key={i} data-tilt className="glass" style={{
                    position: 'relative',
                    marginLeft: '2rem',
                    marginBottom: '1.5rem',
                    padding: '1.5rem',
                    borderRadius: 'var(--radius-lg)',
                  }}>
                    {/* Timeline Dot */}
                    <div style={{
                      position: 'absolute',
                      left: '-2rem',
                      top: '50%',
                      width: '14px',
                      height: '14px',
                      borderRadius: '50%',
                      background: 'var(--background)',
                      border: '3px solid var(--primary)',
                      boxShadow: '0 0 12px var(--primary-glow)',
                      transform: 'translate(-50%, -50%)',
                      zIndex: 2,
                    }} />
                    
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--foreground)', marginBottom: '0.25rem' }}>
                          {item.label}
                        </h3>
                        <p style={{ color: 'var(--muted-fg)', fontSize: '0.92rem' }}>
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT COLUMN: CARDS STACK */}
            <div>
              <div style={{ textAlign: 'left', marginBottom: '2.5rem' }}>
                <span className="badge badge-accent" style={{ marginBottom: '1rem' }}>Highlights</span>
                <h3 style={{ fontSize: '1.8rem', fontWeight: 800 }}>
                  Event <span style={{ color: 'var(--primary)' }}>Details</span>
                </h3>
              </div>
              <div ref={cardsRef} style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
                {/* FIFA Card 1 — Lightning Talks */}
                <div className="fifa-card-wrapper" data-tilt>
                  <div className="fifa-card">


                    <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.65rem', color: 'var(--foreground)' }}>
                      Sessions & Talks
                    </h3>
                    <p style={{ color: 'var(--muted-fg)', lineHeight: 1.65, fontSize: '0.92rem', marginBottom: '1rem' }}>
                      Starts with a 30 min preview and the president's address on why NCS is a good fit. Then, two NCS leads will deliver an engaging main session on hackathons, contests, networking, and modern tech trends.
                    </p>

                    <div className="hud-corner hud-corner-tl" /><div className="hud-corner hud-corner-tr" />
                    <div className="hud-corner hud-corner-bl" /><div className="hud-corner hud-corner-br" />
                  </div>
                </div>

                {/* FIFA Card 3 — Event Details */}
                <div className="fifa-card-wrapper" data-tilt>
                  <div className="fifa-card">


                    <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.85rem', color: 'var(--foreground)' }}>
                      Event Details
                    </h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                      {[
                        { label: 'Requirement', value: 'Bring own laptop & extension cord', icon: <Laptop size={16} style={{ color: 'var(--primary)' }} /> },
                        { label: 'Team Size', value: '1 to 3 members', icon: <Users size={16} style={{ color: 'var(--foreground)' }} /> },
                        { label: 'Tools', value: 'AI tools encouraged!', icon: <Bot size={16} style={{ color: 'var(--primary)' }} /> },
                        { label: 'Prizes', value: 'Best ideas get goodies', icon: <Gift size={16} style={{ color: '#f59e0b' }} /> },
                      ].map((item, i) => (
                        <div key={i} style={{ display: 'flex', gap: '0.65rem', alignItems: 'center' }}>
                          <span style={{ flexShrink: 0 }}>{item.icon}</span>
                          <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'baseline' }}>
                            <span style={{ fontSize: '0.78rem', color: 'var(--muted-fg)', fontWeight: 600 }}>{item.label}:</span>
                            <span style={{ fontSize: '0.82rem', color: 'var(--foreground)', fontWeight: 700 }}>{item.value}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="hud-corner hud-corner-tl" /><div className="hud-corner hud-corner-tr" />
                    <div className="hud-corner hud-corner-bl" /><div className="hud-corner hud-corner-br" />
                  </div>
                </div>

                {/* FIFA Card 4 — Judgment Criteria */}
                <div className="fifa-card-wrapper" data-tilt>
                  <div className="fifa-card">


                    <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.85rem', color: 'var(--foreground)' }}>
                      Judgment Criteria
                    </h3>
                    
                    <p style={{ color: 'var(--muted-fg)', lineHeight: 1.65, fontSize: '0.92rem', marginBottom: '1rem' }}>
                      Submissions are evaluated on the quality of proposed software solutions during a 30-minute judging phase. The conclusive session offers insights into real hackathons, followed by result declaration, prize distribution, and promotion of future events and recruitments.
                    </p>

                    <div className="hud-corner hud-corner-tl" /><div className="hud-corner hud-corner-tr" />
                    <div className="hud-corner hud-corner-bl" /><div className="hud-corner hud-corner-br" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── NCS IDENTITY SECTION ──────────────────────────────── */}
        <section
          ref={logoSectionRef}
          id="ncs-identity"
          style={{
            padding: '5rem 2rem',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Subtle background */}
          <div style={{
            position: 'absolute',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '500px', height: '300px',
            background: 'radial-gradient(ellipse, rgba(220,38,38,0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          {/* Animated NCS Logo — with red glow, dark-mode visible */}
          <div style={{ position: 'relative', display: 'inline-block', marginBottom: '2.5rem' }}>
            {/* Orbit rings */}
            <div style={{
              position: 'absolute',
              inset: '-28px',
              border: '1px solid rgba(220,38,38,0.3)',
              borderRadius: '50%',
              animation: 'spin-slow 12s linear infinite',
            }} />
            <div style={{
              position: 'absolute',
              inset: '-14px',
              border: '1px dashed rgba(220,38,38,0.18)',
              borderRadius: '50%',
              animation: 'spin-slow-rev 8s linear infinite',
            }} />

            <div className="ncs-logo-glass" style={{
              padding: '2rem 3.5rem',
              borderRadius: 'var(--radius-xl)',
              animation: 'float-logo 5s ease-in-out infinite',
              position: 'relative',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Image
                src="/logo.png"
                alt="Nibble Computer Society"
                width={220}
                height={99}
                style={{ display: 'block' }}
                className="ncs-logo-img ncs-logo-light"
              />
              <Image
                src="/logo-white.png"
                alt="Nibble Computer Society"
                width={220}
                height={99}
                style={{ display: 'block' }}
                className="ncs-logo-img ncs-logo-dark"
              />
            </div>
          </div>

          <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', marginBottom: '0.875rem' }}>
            Presented by <span style={{ color: 'var(--primary)' }}>Nibble Computer Society</span>
          </h2>
          <p style={{ color: 'var(--muted-fg)', maxWidth: '520px', margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
            NCS is the official computer science society dedicated to building a vibrant tech community —
            empowering students through events, workshops, and hackathons.
          </p>
          <Link href="/register" className="btn btn-primary" style={{ minWidth: '220px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', margin: '0 auto' }}>
            <Rocket size={18} />
            Secure Your Spot
          </Link>
        </section>

        {/* ── REDESIGNED MODERN TECH FOOTER ─────────────────────── */}
        <footer className="footer-modern">
          <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
            {/* Social Connection Pills */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <a
                href="https://www.linkedin.com/company/hackncs/home/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-pill"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.32a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28z" />
                </svg>
                <span>/nibble computer society</span>
              </a>
              <a
                href="https://instagram.com/hackncs"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-pill"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
                <span>/hackncs</span>
              </a>
              <a
                href="https://hackncs.in"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-pill"
              >
                <Globe size={18} />
                <span>www.hackncs.in/</span>
              </a>
            </div>

            {/* Society Emblem & Details */}
            <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
              <Link href="/" className="ncs-logo-wrapper" style={{ opacity: 0.95 }}>
                <Image
                  src="/logo.png"
                  alt="NCS"
                  width={96}
                  height={43}
                  className="ncs-logo-img ncs-logo-light"
                />
                <Image
                  src="/logo-white.png"
                  alt="NCS"
                  width={96}
                  height={43}
                  className="ncs-logo-img ncs-logo-dark"
                />
              </Link>
              <p style={{ fontSize: '0.88rem', color: 'var(--muted-fg)', maxWidth: '420px', lineHeight: 1.6 }}>
                How to Hackathon!! — From Ideas. To Prototype. An initiative by Nibble Computer Society.
              </p>
              <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--primary)' }}>#HowToHackathon</span>
                <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--muted-fg)' }}>#HackNCS</span>
                <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--primary)' }}>#IdeasToPrototype</span>
              </div>
            </div>

            {/* Bottom Copyright */}
            <div style={{
              width: '100%',
              paddingTop: '1.5rem',
              borderTop: '1px solid var(--border)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '0.75rem',
              fontSize: '0.74rem',
              color: 'var(--muted-fg)',
              fontFamily: 'var(--font-mono)',
            }}>
              <p>© {new Date().getFullYear()} NIBBLE COMPUTER SOCIETY · ALL RIGHTS RESERVED</p>
              <div style={{ display: 'flex', gap: '1.25rem' }}>
                <Link href="/#about" style={{ color: 'inherit' }}>About</Link>
                <Link href="/#event-flow" style={{ color: 'inherit' }}>Event Flow</Link>
                <Link href="/register" style={{ color: 'var(--primary)' }}>Register</Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
