import { useState, useEffect, useCallback } from 'react';

/**
 * Full-screen animated preloader with travel-themed visuals.
 *
 * @param {Object} props
 * @param {() => void} props.onComplete — Callback fired after the exit animation finishes.
 */
export const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const increment = prev < 30 ? 4 : prev < 70 ? 2 : prev < 90 ? 3 : 1;
        return Math.min(prev + increment, 100);
      });
    }, 45);

    return () => clearInterval(interval);
  }, []);

  const handleExit = useCallback(() => {
    setIsExiting(true);
    const timer = setTimeout(() => onComplete(), 800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  useEffect(() => {
    if (progress === 100) {
      const delay = setTimeout(handleExit, 500);
      return () => clearTimeout(delay);
    }
  }, [progress, handleExit]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center
        bg-gradient-to-br from-brand-950 via-blue-950 to-indigo-950
        transition-all duration-700 ease-in-out
        ${isExiting ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'}`}
      aria-label="Loading application"
      role="status"
    >
      {/* ── Decorative floating particles ─────────────────── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/5"
            style={{
              width: `${8 + i * 6}px`,
              height: `${8 + i * 6}px`,
              top: `${15 + i * 14}%`,
              left: `${10 + i * 15}%`,
              animation: `float ${5 + i}s ease-in-out ${i * 0.5}s infinite`,
            }}
          />
        ))}
      </div>

      {/* ── Airplane flying across ────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg
          className="absolute w-10 h-10 text-brand-400/60 animate-fly-across"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M21 16v-2l-8-5V3.5A1.5 1.5 0 0 0 11.5 2 1.5 1.5 0 0 0 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
        </svg>
      </div>

      {/* ── Spinning compass ring ─────────────────────────── */}
      <div className="relative mb-8">
        <svg
          className="w-24 h-24 animate-spin-slow"
          viewBox="0 0 100 100"
          fill="none"
        >
          {/* Outer ring */}
          <circle
            cx="50"
            cy="50"
            r="44"
            stroke="url(#compassGradient)"
            strokeWidth="2"
            strokeDasharray="8 4"
            opacity="0.4"
          />
          {/* Inner ring */}
          <circle
            cx="50"
            cy="50"
            r="34"
            stroke="url(#compassGradient)"
            strokeWidth="1.5"
            opacity="0.6"
          />
          {/* Cardinal points */}
          <text x="50" y="14" textAnchor="middle" fill="#93c5fd" fontSize="8" fontWeight="700">N</text>
          <text x="50" y="94" textAnchor="middle" fill="#93c5fd" fontSize="8" fontWeight="700">S</text>
          <text x="8" y="53" textAnchor="middle" fill="#93c5fd" fontSize="8" fontWeight="700">W</text>
          <text x="92" y="53" textAnchor="middle" fill="#93c5fd" fontSize="8" fontWeight="700">E</text>
          {/* Compass needle */}
          <path d="M50 20 L54 50 L50 55 L46 50 Z" fill="#3b82f6" opacity="0.8" />
          <path d="M50 80 L54 50 L50 45 L46 50 Z" fill="#ef4444" opacity="0.5" />
          <circle cx="50" cy="50" r="3" fill="#60a5fa" />
          <defs>
            <linearGradient id="compassGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#14b8a6" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* ── Brand text ────────────────────────────────────── */}
      <h1
        className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-2 animate-fade-in-up"
      >
        Aahaas
        <span className="bg-gradient-to-r from-brand-400 to-teal-400 bg-clip-text text-transparent">
          {' '}Travel
        </span>
      </h1>
      <p
        className="text-brand-300/80 text-sm md:text-base font-medium tracking-wide animate-fade-in-up"
        style={{ animationDelay: '0.3s' }}
      >
        Premium Travel Arrangements
      </p>

      {/* ── Progress bar ──────────────────────────────────── */}
      <div className="mt-10 w-56 md:w-64">
        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
          <div
            className="h-full rounded-full bg-gradient-to-r from-brand-500 via-teal-400 to-brand-400 transition-all duration-200 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-3 text-center text-brand-400/70 text-xs font-medium tracking-widest uppercase">
          {progress < 100 ? 'Preparing your journey...' : 'Ready!'}
        </p>
      </div>
    </div>
  );
};
