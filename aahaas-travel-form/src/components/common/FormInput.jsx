/**
 * form input component with icon support, validation states, and animations.
 *
 * @param {Object} props
 * @param {string} props.label — Field label text.
 * @param {string} props.name — Input name attribute (also used for icon mapping).
 * @param {string} [props.type='text'] — Input type (text, email, number, date).
 * @param {string|number} props.value — Controlled input value.
 * @param {Function} props.onChange — Change handler.
 * @param {Function} [props.onBlur] — Blur handler for touched tracking.
 * @param {string} [props.error] — Error message to display.
 * @param {boolean} [props.isValid] — Whether the field has been validated successfully.
 * @param {string} [props.placeholder] — Placeholder text.
 * @param {boolean} [props.required] — Whether the field is required.
 * @param {string} [props.min] — Minimum value attribute.
 * @param {boolean} [props.isTextArea] — Render as textarea instead of input.
 */
export const FormInput = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  onBlur,
  error,
  isValid = false,
  placeholder,
  required = false,
  min,
  isTextArea = false,
}) => {
  const icon = FIELD_ICONS[name];

  const baseInputStyles = `
    w-full py-2.5 border rounded-xl outline-none
    transition-all duration-200 text-gray-900 bg-white/80 backdrop-blur-sm
    placeholder:text-gray-400 text-sm
    ${icon ? 'pl-10 pr-4' : 'px-4'}
    ${
      error
        ? 'border-red-400 focus:ring-2 focus:ring-red-200/60 focus:border-red-400 animate-shake'
        : isValid
          ? 'border-emerald-400 focus:ring-2 focus:ring-emerald-200/60 focus:border-emerald-400'
          : 'border-gray-200 focus:ring-2 focus:ring-brand-200/60 focus:border-brand-400 hover:border-gray-300'
    }
  `;

  return (
    <div className="w-full group">
      {/* Label */}
      <label
        htmlFor={`field-${name}`}
        className="flex items-center gap-1 text-sm font-semibold text-gray-700 mb-1.5"
      >
        {label}
        {required && (
          <span className="text-red-400 text-xs" aria-hidden="true">
            *
          </span>
        )}
        {/* Valid checkmark */}
        {isValid && (
          <svg
            className="w-3.5 h-3.5 text-emerald-500 ml-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </label>

      {/* Input wrapper with icon */}
      <div className="relative">
        {/* Icon */}
        {icon && (
          <div
            className={`absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-200
              ${error ? 'text-red-400' : isValid ? 'text-emerald-500' : 'text-gray-400 group-focus-within:text-brand-500'}`}
          >
            {icon}
          </div>
        )}

        {/* Input or Textarea */}
        {isTextArea ? (
          <textarea
            id={`field-${name}`}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            rows="3"
            className={`${baseInputStyles} resize-none`}
          />
        ) : (
          <input
            id={`field-${name}`}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            onKeyDown={
              type === 'number'
                ? (e) => {
                    if (['e', 'E', '+', '-'].includes(e.key)) {
                      e.preventDefault();
                    }
                  }
                : undefined
            }
            placeholder={placeholder}
            min={min}
            className={baseInputStyles}
          />
        )}
      </div>

      {/* Error message with animation */}
      {error && (
        <p
          className="mt-1.5 text-xs font-medium text-red-500 flex items-center gap-1 animate-fade-in"
          role="alert"
        >
          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
};

const iconClass = 'w-4 h-4';

const FIELD_ICONS = {
  name: (
    <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  email: (
    <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  destination: (
    <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  travelDate: (
    <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  travelers: (
    <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  budget: (
    <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  notes: (
    <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  ),
};
