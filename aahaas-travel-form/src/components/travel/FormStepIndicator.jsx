/**
 * Visual progress indicator showing form completion status.
 *
 * @param {Object} props
 * @param {number} props.percentage — Completion percentage (0–100).
 */
export const FormStepIndicator = ({ percentage }) => {
  // SVG circle geometry
  const RADIUS = 16;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
  const strokeDashoffset = CIRCUMFERENCE - (percentage / 100) * CIRCUMFERENCE;

  /**
   * Returns a contextual status message based on completion level.
   */
  const getStatusMessage = () => {
    if (percentage === 0) return 'Start filling in your details';
    if (percentage < 50) return 'Keep going — you\'re making progress';
    if (percentage < 100) return 'Almost there — just a few more fields';
    return 'All fields complete — ready to submit!';
  };

  /**
   * Returns the gradient color class based on completion level.
   */
  const getProgressColor = () => {
    if (percentage === 100) return '#10b981'; // emerald-500
    if (percentage >= 50) return '#3b82f6';   // brand-500
    return '#60a5fa';                          // brand-400
  };

  return (
    <div className="flex items-center gap-3 px-6 md:px-8 py-4 bg-gradient-to-r from-blue-50/80 to-indigo-50/50 border-b border-blue-100/60">
      {/* ── Circular progress ring ────────────────────────── */}
      <div className="relative w-11 h-11 flex-shrink-0">
        <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
          {/* Background track */}
          <circle
            cx="18"
            cy="18"
            r={RADIUS}
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="3"
          />
          {/* Progress arc */}
          <circle
            cx="18"
            cy="18"
            r={RADIUS}
            fill="none"
            stroke={getProgressColor()}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-500 ease-out"
          />
        </svg>
        {/* Center percentage text */}
        <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-gray-700">
          {percentage}%
        </span>
      </div>

      {/* ── Status text ───────────────────────────────────── */}
      <div className="min-w-0">
        <p className="text-sm font-semibold text-gray-700 truncate">
          Form Progress
        </p>
        <p className="text-xs text-gray-500 truncate">
          {getStatusMessage()}
        </p>
      </div>

      {/* ── Completion badge ──────────────────────────────── */}
      {percentage === 100 && (
        <div className="ml-auto flex-shrink-0 animate-bounce-in">
          <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-700 text-xs font-semibold px-2.5 py-1 rounded-full">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Ready
          </span>
        </div>
      )}
    </div>
  );
};
