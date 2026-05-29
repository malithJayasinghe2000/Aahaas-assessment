/** API endpoint configuration */
export const API_ENDPOINTS = {
  WEBHOOK_URL: 'http://localhost:5678/webhook/inquiry',
};

/** Validation rule thresholds */
export const VALIDATION_RULES = {
  MIN_NAME_LENGTH: 3,
  MIN_BUDGET: 100,
  MAX_TRAVELERS: 50,
  MIN_TRAVELERS: 1,
};

/** Email format regex (RFC 5322 simplified) */
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** List of fields that must be filled before submission */
export const REQUIRED_FIELDS = [
  'name',
  'email',
  'destination',
  'travelDate',
  'travelers',
  'budget',
];

/** Default (empty) form state — used for initialization and reset */
export const INITIAL_FORM_DATA = {
  name: '',
  email: '',
  destination: '',
  travelDate: '',
  travelers: 1,
  budget: '',
  notes: '',
};
