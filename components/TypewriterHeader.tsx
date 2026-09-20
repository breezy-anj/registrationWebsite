'use client';

import React, { useState, useEffect } from 'react';

interface TypewriterHeaderProps {
  words?: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}

export default function TypewriterHeader({
  words = ['Hackathon'],
  typingSpeed = 130,
  deletingSpeed = 80,
  pauseDuration = 3200,
}: TypewriterHeaderProps) {
  const [displayText, setDisplayText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const currentWord = words[wordIndex % words.length];
    let timer: NodeJS.Timeout;

    if (!isDeleting) {
      if (displayText.length < currentWord.length) {
        timer = setTimeout(() => {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
        }, typingSpeed);
      } else {
        // Finished typing word, pause before deleting
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDuration);
      }
    } else {
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(currentWord.slice(0, displayText.length - 1));
        }, deletingSpeed);
      } else {
        // Finished deleting, start next cycle
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseDuration, isMounted]);

  // SSR fallback keeps full word rendered to avoid SEO/layout pop
  const textToShow = isMounted ? displayText : words[0];

  return (
    <h1
      style={{
        fontSize: 'clamp(3rem, 7vw, 5.5rem)',
        fontWeight: 800,
        lineHeight: 1.05,
        letterSpacing: '-0.04em',
        color: 'var(--black)',
        marginBottom: '1.25rem',
        display: 'inline-flex',
        alignItems: 'baseline',
        minHeight: '1.15em',
      }}
    >
      <span>{textToShow}</span>
      <span className="text-red">.</span>
      <span
        className="typewriter-caret"
        aria-hidden="true"
        style={{
          display: 'inline-block',
          width: '4px',
          height: '0.82em',
          backgroundColor: 'var(--primary-red)',
          marginLeft: '4px',
          borderRadius: '2px',
          verticalAlign: 'baseline',
        }}
      />
    </h1>
  );
}
