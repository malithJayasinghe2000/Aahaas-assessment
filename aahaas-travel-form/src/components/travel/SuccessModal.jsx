import { Modal } from '../common/Modal';

/**
 * Travel-themed success/error modal shown after form submission.
 *
 * @param {Object} props
 * @param {boolean} props.isOpen — Whether the modal is visible.
 * @param {() => void} props.onClose — Handler to close the modal.
 * @param {{ type: 'success'|'error', message: string, referenceId?: string }|null} props.result
 */
export const SuccessModal = ({ isOpen, onClose, result }) => {
  if (!result) return null;

  const isSuccess = result.type === 'success';

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-8 md:p-10 text-center">
        {isSuccess ? (
          <>
            {/* ── Success state ──────────────────────────── */}

            {/* Decorative gradient top bar */}
            <div
              className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500"
              aria-hidden="true"
            />

            {/* Animated checkmark circle */}
            <div className="mx-auto w-20 h-20 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center mb-6 animate-bounce-in">
              <svg
                className="w-10 h-10 text-emerald-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline
                  points="20 6 9 17 4 12"
                  style={{
                    strokeDasharray: 48,
                    strokeDashoffset: 48,
                  }}
                  className="animate-draw-check"
                />
              </svg>
            </div>

            {/* Heading */}
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2">
              Your journey begins!
            </h2>
            <p className="text-gray-500 mb-5 text-sm leading-relaxed max-w-xs mx-auto">
              {result.message}
            </p>

            {/* Reference ID badge */}
            {result.referenceId && (
              <div className="inline-flex flex-col items-center gap-1 bg-gradient-to-r from-brand-50 to-blue-50 border border-brand-200 rounded-xl px-5 py-3 mb-6">
                <span className="text-[10px] uppercase tracking-widest font-semibold text-gray-400">
                  Reference ID
                </span>
                <span className="font-mono text-lg font-bold text-brand-700 tracking-wide">
                  {result.referenceId}
                </span>
              </div>
            )}

            {/* Reassuring message */}
            <p className="text-xs text-gray-400 mb-6 max-w-[280px] mx-auto leading-relaxed">
              Our travel architects will contact you within 24 hours to begin
              crafting your perfect journey.
            </p>

            {/* CTA button */}
            <button
              onClick={onClose}
              className="w-full max-w-xs mx-auto bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800
                text-white font-semibold py-3 px-6 rounded-xl
                transition-all duration-200 shadow-md hover:shadow-lg
                active:scale-[0.98] cursor-pointer"
            >
              Plan Another Trip
            </button>
          </>
        ) : (
          <>
            {/* ── Error state ────────────────────────────── */}

            {/* Red top bar */}
            <div
              className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-400 via-rose-400 to-red-500"
              aria-hidden="true"
            />

            {/* Error icon */}
            <div className="mx-auto w-20 h-20 rounded-full bg-red-50 border-2 border-red-200 flex items-center justify-center mb-6 animate-bounce-in">
              <svg
                className="w-10 h-10 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>

            {/* Heading */}
            <h2 className="text-2xl font-extrabold text-gray-900 mb-2">
              Something Went Wrong
            </h2>
            <p className="text-gray-500 text-sm mb-8 max-w-xs mx-auto leading-relaxed">
              {result.message}
            </p>

            {/* Retry button */}
            <button
              onClick={onClose}
              className="w-full max-w-xs mx-auto bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black
                text-white font-semibold py-3 px-6 rounded-xl
                transition-all duration-200 shadow-md hover:shadow-lg
                active:scale-[0.98] cursor-pointer"
            >
              Try Again
            </button>
          </>
        )}
      </div>
    </Modal>
  );
};
