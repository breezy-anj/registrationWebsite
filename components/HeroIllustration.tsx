import React from 'react';

export default function HeroIllustration() {
  return (
    <div style={{
      width: '100%',
      maxWidth: '520px',
      margin: '0 auto',
      position: 'relative',
    }}>
      <svg
        viewBox="0 0 520 460"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          width: '100%',
          height: 'auto',
          filter: 'drop-shadow(0 15px 30px rgba(0, 0, 0, 0.06))',
        }}
        aria-label="Illustration: A person on a ladder placing the final red puzzle piece into a lightbulb of innovation"
      >
        <defs>
          {/* Subtle Glow & Gradients */}
          <radialGradient id="bulbGlow" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#FFF1F1" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>
          
          <linearGradient id="redAccentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF3B42" />
            <stop offset="100%" stopColor="#E31E24" />
          </linearGradient>

          <linearGradient id="ladderGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1F2937" />
            <stop offset="100%" stopColor="#111827" />
          </linearGradient>

          <filter id="pieceShadow" x="-10%" y="-10%" width="130%" height="130%">
            <feDropShadow dx="2" dy="4" stdDeviation="4" floodColor="#E31E24" floodOpacity="0.35" />
          </filter>
        </defs>

        {/* Ambient Glow behind bulb */}
        <circle cx="270" cy="180" r="160" fill="url(#bulbGlow)" />

        {/* Floating Sparks / Idea Nodes */}
        <g opacity="0.85">
          <circle cx="120" cy="90" r="4" fill="#E31E24" />
          <path d="M120 75 L120 105 M105 90 L135 90" stroke="#E31E24" strokeWidth="1.5" strokeLinecap="round" />
          
          <circle cx="410" cy="110" r="5" fill="#0A0A0A" />
          <path d="M410 95 L410 125 M395 110 L425 110" stroke="#0A0A0A" strokeWidth="1.5" strokeLinecap="round" />

          <circle cx="430" cy="240" r="3.5" fill="#E31E24" />
          <path d="M430 228 L430 252 M418 240 L442 240" stroke="#E31E24" strokeWidth="1.2" strokeLinecap="round" />

          {/* Dotted Connection Arcs */}
          <path d="M140 100 Q 200 40 270 50" stroke="#E5E7EB" strokeWidth="1.5" strokeDasharray="4 4" />
          <path d="M380 70 Q 420 130 390 200" stroke="#E5E7EB" strokeWidth="1.5" strokeDasharray="4 4" />
        </g>

        {/* ============================================================ */}
        {/* LIGHTBULB PUZZLE OUTLINE & PIECES */}
        {/* ============================================================ */}
        <g transform="translate(140, 40)">
          {/* Bulb Screw Base */}
          <path d="M100 240 L160 240 L155 260 L105 260 Z" fill="#374151" />
          <path d="M105 262 L155 262 L150 276 L110 276 Z" fill="#4B5563" />
          <path d="M112 278 L148 278 L142 290 L118 290 Z" fill="#1F2937" />
          <path d="M122 292 Q 130 300 138 292 Z" fill="#E31E24" />

          {/* Puzzle Piece 1: Top Left */}
          <path
            d="M70 40 C100 10 130 20 130 20 C130 20 135 32 145 32 C155 32 160 20 160 20 L160 75 C150 75 142 82 142 92 C142 102 150 110 160 110 L160 120 L75 120 C75 108 67 100 55 100 C43 100 35 108 35 120 L25 100 C15 75 40 45 70 40 Z"
            fill="#FFFFFF"
            stroke="#0A0A0A"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* Puzzle Piece 2: Bottom Left */}
          <path
            d="M25 100 L35 120 C35 108 43 100 55 100 C67 100 75 108 75 120 L160 120 L160 180 C145 180 138 190 138 200 C138 210 145 220 160 220 L100 240 C75 220 50 180 35 140 Z"
            fill="#F9FAFB"
            stroke="#0A0A0A"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* Puzzle Piece 3: Bottom Right */}
          <path
            d="M160 120 L240 120 C240 132 248 140 260 140 L240 190 C220 220 185 240 160 240 L160 220 C145 220 138 210 138 200 C138 190 145 180 160 180 Z"
            fill="#FFFFFF"
            stroke="#0A0A0A"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* Puzzle Piece 4 (THE MISSING / BEING INSERTED TOP-RIGHT RED PIECE) */}
          {/* Target Slot (dotted outline) */}
          <path
            d="M160 20 C160 20 165 32 175 32 C185 32 190 20 190 20 C225 35 250 70 245 100 L240 120 L160 120 L160 110 C150 110 142 102 142 92 C142 82 150 75 160 75 Z"
            fill="none"
            stroke="#E31E24"
            strokeWidth="2"
            strokeDasharray="5 5"
          />

          {/* Filament subtle lines inside */}
          <path d="M125 180 L125 150 Q 130 140 135 150 L135 180" stroke="#D1D5DB" strokeWidth="2" />
        </g>

        {/* ============================================================ */}
        {/* LADDER */}
        {/* ============================================================ */}
        <g transform="translate(320, 110)">
          {/* Main Rails */}
          <line x1="20" y1="0" x2="-35" y2="330" stroke="url(#ladderGrad)" strokeWidth="6" strokeLinecap="round" />
          <line x1="60" y1="0" x2="5" y2="330" stroke="url(#ladderGrad)" strokeWidth="6" strokeLinecap="round" />

          {/* Rungs */}
          <line x1="15" y1="35" x2="55" y2="35" stroke="#374151" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="10" y1="75" x2="50" y2="75" stroke="#374151" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="5" y1="115" x2="45" y2="115" stroke="#374151" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="0" y1="155" x2="40" y2="155" stroke="#374151" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="-5" y1="195" x2="35" y2="195" stroke="#374151" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="-10" y1="235" x2="30" y2="235" stroke="#374151" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="-15" y1="275" x2="25" y2="275" stroke="#374151" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="-20" y1="315" x2="20" y2="315" stroke="#374151" strokeWidth="3.5" strokeLinecap="round" />
        </g>

        {/* ============================================================ */}
        {/* ACTIVE RED PUZZLE PIECE BEING PLACED */}
        {/* ============================================================ */}
        <g transform="translate(305, 52)" filter="url(#pieceShadow)">
          <path
            d="M0 0 C0 0 5 12 15 12 C25 12 30 0 30 0 C60 12 80 45 75 75 L70 95 L0 95 L0 85 C-10 85 -18 77 -18 67 C-18 57 -10 50 0 50 Z"
            fill="url(#redAccentGrad)"
            stroke="#B91C1C"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* High-tech circuit accent inside the red piece */}
          <circle cx="28" cy="45" r="3.5" fill="#FFFFFF" />
          <path d="M28 45 L50 45 L58 60" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="58" cy="60" r="2.5" fill="#FFFFFF" />
        </g>

        {/* ============================================================ */}
        {/* PERSON ON LADDER */}
        {/* ============================================================ */}
        <g transform="translate(315, 60)">
          {/* Head */}
          <circle cx="32" cy="20" r="11" fill="#0A0A0A" />
          {/* Hair/Cap Accent in Red */}
          <path d="M22 18 Q 32 8 42 16" stroke="#E31E24" strokeWidth="3" strokeLinecap="round" />

          {/* Torso */}
          <path d="M32 32 L30 75" stroke="#0A0A0A" strokeWidth="12" strokeLinecap="round" />

          {/* Upper Arms reaching toward the red piece */}
          <path d="M30 40 L10 25 L-5 22" stroke="#0A0A0A" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M32 40 L18 20 L5 16" stroke="#0A0A0A" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />

          {/* Hands holding the puzzle piece */}
          <circle cx="-5" cy="22" r="4.5" fill="#E31E24" />
          <circle cx="5" cy="16" r="4.5" fill="#E31E24" />

          {/* Legs on the ladder rungs */}
          <path d="M30 75 L18 105 L15 130" stroke="#0A0A0A" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M30 75 L38 100 L42 125" stroke="#0A0A0A" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          
          {/* Shoes */}
          <path d="M12 130 L22 130" stroke="#E31E24" strokeWidth="4" strokeLinecap="round" />
          <path d="M38 125 L48 125" stroke="#E31E24" strokeWidth="4" strokeLinecap="round" />
        </g>

        {/* Floor Horizon Line */}
        <line x1="50" y1="445" x2="470" y2="445" stroke="#E5E7EB" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  );
}
