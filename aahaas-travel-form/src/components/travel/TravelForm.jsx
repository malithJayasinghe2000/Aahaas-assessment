import { FormInput } from '../common/FormInput';
import { TravelHero } from './TravelHero';
import { FormStepIndicator } from './FormStepIndicator';
import { SuccessModal } from './SuccessModal';
import { useTravelForm } from '../../hooks/useTravelForm';
import { getTodayISO } from '../../utils/dateUtils';

export const TravelForm = () => {
  const {
    formData,
    loading,
    submissionResult,
    isFormValid,
    completionPercentage,
    handleChange,
    handleBlur,
    handleSubmit,
    resetSubmissionResult,
    getFieldError,
    isFieldValid,
  } = useTravelForm();

  return (
    <>
      {/* ── Form Card ─────────────────────────────────────── */}
      <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl shadow-black/20 border border-white/20 overflow-hidden">
        {/* Hero header */}
        <TravelHero />

        {/* Progress indicator */}
        <FormStepIndicator percentage={completionPercentage} />

        {/* Form body */}
        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-5" noValidate>
          {/* ── Row 1: Name & Email ───────────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <FormInput
              label="Full Name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={getFieldError('name')}
              isValid={isFieldValid('name')}
              placeholder="Kamal Perera"
            />
            <FormInput
              label="Email Address"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={getFieldError('email')}
              isValid={isFieldValid('email')}
              placeholder="kamal@example.com"
            />
          </div>

          {/* ── Row 2: Destination & Date ─────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <FormInput
              label="Dream Destination"
              name="destination"
              required
              value={formData.destination}
              onChange={handleChange}
              onBlur={handleBlur}
              error={getFieldError('destination')}
              isValid={isFieldValid('destination')}
              placeholder="e.g. Maldives, Japan"
            />
            <FormInput
              label="Travel Date"
              name="travelDate"
              type="date"
              required
              value={formData.travelDate}
              onChange={handleChange}
              onBlur={handleBlur}
              error={getFieldError('travelDate')}
              isValid={isFieldValid('travelDate')}
              min={getTodayISO()}
            />
          </div>

          {/* ── Row 3: Travelers & Budget ─────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <FormInput
              label="Number of Travelers"
              name="travelers"
              type="number"
              required
              value={formData.travelers}
              onChange={handleChange}
              onBlur={handleBlur}
              error={getFieldError('travelers')}
              isValid={isFieldValid('travelers')}
              min="1"
            />
            <FormInput
              label="Estimated Budget ($ USD)"
              name="budget"
              type="number"
              required
              value={formData.budget}
              onChange={handleChange}
              onBlur={handleBlur}
              error={getFieldError('budget')}
              isValid={isFieldValid('budget')}
              placeholder="e.g. 5000"
            />
          </div>

          {/* ── Special Notes ─────────────────────────────── */}
          <FormInput
            label="Special Notes & Requests"
            name="notes"
            isTextArea
            value={formData.notes}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Mention any accommodation choices, dietary restrictions, or celebration occasions (e.g. Honeymoon)..."
          />

          {/* ── Submit Button ─────────────────────────────── */}
          <button
            id="submit-travel-request"
            type="submit"
            disabled={loading || !isFormValid}
            className="w-full bg-gradient-to-r from-brand-600 to-brand-700
              hover:from-brand-700 hover:to-brand-800
              disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed disabled:shadow-none
              text-white font-bold py-3.5 px-6 rounded-xl
              transition-all duration-300 shadow-lg shadow-brand-600/25 hover:shadow-xl hover:shadow-brand-700/30
              active:scale-[0.98]
              flex justify-center items-center gap-2.5 text-base cursor-pointer"
          >
            {loading ? (
              <>
                {/* Spinner */}
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Processing Inquiry...
              </>
            ) : (
              <>
                {/* Send icon */}
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
                Submit Travel Request
              </>
            )}
          </button>

          {/* ── Disabled state helper text ────────────────── */}
          {!isFormValid && !loading && (
            <p className="text-center text-xs text-gray-400 -mt-1">
              Please complete all required fields to submit
            </p>
          )}
        </form>
      </div>

      {/* ── Success / Error Modal ─────────────────────────── */}
      <SuccessModal
        isOpen={!!submissionResult}
        onClose={resetSubmissionResult}
        result={submissionResult}
      />
    </>
  );
};
