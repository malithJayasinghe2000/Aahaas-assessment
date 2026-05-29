/**
 * Full-page layout wrapper with animated gradient background
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children — Page content (the form card).
 */
export const PageLayout = ({ children }) => {
  return (
    <main className="relative min-h-screen w-full flex items-center justify-center p-4 md:p-8 overflow-hidden">
      {/* ── Animated gradient background ──────────────────── */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 animate-gradient-shift bg-[length:200%_200%]"
        aria-hidden="true"
      />

      {/* ── Radial glow accents ───────────────────────────── */}
      <div
        className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-brand-600/10 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-[-15%] left-[-10%] w-[500px] h-[500px] rounded-full bg-teal-600/8 blur-[100px]"
        aria-hidden="true"
      />

      {/* ── Floating decorative elements ──────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Dotted travel path */}
        <svg className="absolute top-[10%] left-[5%] w-[300px] h-[200px] text-white/5" fill="none" viewBox="0 0 300 200">
          <path
            d="M10 180 Q80 20, 150 100 T290 30"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="6 8"
          />
          <circle cx="10" cy="180" r="4" fill="currentColor" />
          <circle cx="290" cy="30" r="4" fill="currentColor" />
        </svg>

        {/* Small floating airplane */}
        <svg
          className="absolute top-[15%] right-[12%] w-6 h-6 text-white/8 animate-float"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M21 16v-2l-8-5V3.5A1.5 1.5 0 0 0 11.5 2 1.5 1.5 0 0 0 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
        </svg>

        {/* Compass rose */}
        <svg
          className="absolute bottom-[12%] right-[8%] w-10 h-10 text-white/5 animate-spin-slow"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2v4M12 18v4M2 12h4M18 12h4" strokeLinecap="round" />
          <path d="M12 8l2 4-2 2-2-2 2-4z" fill="currentColor" opacity="0.5" />
        </svg>

        {/* Globe outline */}
        <svg
          className="absolute bottom-[20%] left-[8%] w-8 h-8 text-white/5 animate-float-delayed"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10A15.3 15.3 0 0112 2z" />
        </svg>

        {/* Small stars/dots */}
        {[
          { top: '25%', left: '20%', size: 3, delay: 0 },
          { top: '70%', left: '75%', size: 2, delay: 1 },
          { top: '40%', left: '85%', size: 3, delay: 2 },
          { top: '80%', left: '30%', size: 2, delay: 3 },
          { top: '10%', left: '60%', size: 2, delay: 1.5 },
        ].map((star, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/10"
            style={{
              top: star.top,
              left: star.left,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animation: `float ${5 + i}s ease-in-out ${star.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* ── Main content ──────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-2xl animate-fade-in-up">
        {children}
      </div>
    </main>
  );
};
