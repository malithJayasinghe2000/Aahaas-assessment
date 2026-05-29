
export const TravelHero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-brand-800 via-brand-700 to-blue-700 px-8 py-10 md:px-10 md:py-12 text-center text-white">
      {/* ── Animated gradient mesh overlay ─────────────────── */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-brand-800/40 via-indigo-600/20 to-blue-700/40 animate-gradient-shift bg-[length:200%_200%]"
        aria-hidden="true"
      />

      {/* ── Subtle pattern overlay ────────────────────────── */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      {/* ── Floating decorative icons ─────────────────────── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Compass */}
        <svg
          className="absolute top-4 left-6 w-8 h-8 text-white/10 animate-float"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z" />
        </svg>

        {/* Airplane */}
        <svg
          className="absolute bottom-4 right-6 w-7 h-7 text-white/10 animate-float-delayed"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M21 16v-2l-8-5V3.5A1.5 1.5 0 0 0 11.5 2 1.5 1.5 0 0 0 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
        </svg>

        {/* Globe */}
        <svg
          className="absolute top-6 right-10 w-6 h-6 text-white/8 animate-float"
          style={{ animationDelay: '1s' }}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10A15.3 15.3 0 0112 2z" />
        </svg>
      </div>

      {/* ── Content ───────────────────────────────────────── */}
      <div className="relative z-10">
        {/* Premium badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider mb-5 border border-white/10">
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10A15.3 15.3 0 0112 2z" />
          </svg>
          Premium Travel Planning
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3 drop-shadow-sm">
          Aahaas Travel Planner
        </h1>

        {/* Subtitle */}
        <p className="text-blue-100/80 font-medium text-sm md:text-base max-w-sm mx-auto leading-relaxed">
          Design your dream journey with our expert travel architects
        </p>
      </div>
    </div>
  );
};
