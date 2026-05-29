import { VALIDATION_RULES, EMAIL_REGEX } from './constants';
import { isDateInPast } from './dateUtils';

/**
 * Validates the traveler's full name.
 *
 * @param {string} name — The name to validate.
 * @returns {string} Error message, or empty string if valid.
 */
export const validateName = (name) => {
  if (!name || !name.trim()) {
    return 'Full name is required.';
  }
  if (name.trim().length < VALIDATION_RULES.MIN_NAME_LENGTH) {
    return `Name must be at least ${VALIDATION_RULES.MIN_NAME_LENGTH} characters long.`;
  }
  return '';
};

/**
 * Validates an email address format.
 *
 * @param {string} email — The email to validate.
 * @returns {string} Error message, or empty string if valid.
 */
export const validateEmail = (email) => {
  if (!email || !email.trim()) {
    return 'Email address is required.';
  }
  if (!EMAIL_REGEX.test(email)) {
    return 'Please enter a valid email address.';
  }
  return '';
};

/**
 * Validates the destination field.
 *
 * @param {string} destination — The destination to validate.
 * @returns {string} Error message, or empty string if valid.
 */
export const validateDestination = (destination) => {
  if (!destination || !destination.trim()) {
    return 'Dream destination is required.';
  }
  return '';
};

/**
 * Validates the selected travel date (must not be in the past).
 *
 * @param {string} travelDate — ISO date string.
 * @returns {string} Error message, or empty string if valid.
 */
export const validateTravelDate = (travelDate) => {
  if (!travelDate) {
    return 'Travel date is required.';
  }
  if (isDateInPast(travelDate)) {
    return 'Travel date cannot be in the past.';
  }
  return '';
};

/**
 * Validates the number of travelers.
 *
 * @param {number|string} travelers — The traveler count.
 * @returns {string} Error message, or empty string if valid.
 */
export const validateTravelers = (travelers) => {
  const count = Number(travelers);
  if (!travelers || count < VALIDATION_RULES.MIN_TRAVELERS) {
    return `Must have at least ${VALIDATION_RULES.MIN_TRAVELERS} traveler.`;
  }
  if (count > VALIDATION_RULES.MAX_TRAVELERS) {
    return `For groups larger than ${VALIDATION_RULES.MAX_TRAVELERS}, please contact our corporate team directly.`;
  }
  return '';
};

/**
 * Validates the estimated budget.
 *
 * @param {number|string} budget — The budget amount in USD.
 * @returns {string} Error message, or empty string if valid.
 */
export const validateBudget = (budget) => {
  if (!budget && budget !== 0) {
    return 'Please specify your estimated budget.';
  }
  if (isNaN(Number(budget))) {
    return 'Budget must be a valid number.';
  }
  if (Number(budget) <= 0) {
    return 'Budget must be a positive number.';
  }
  if (Number(budget) < VALIDATION_RULES.MIN_BUDGET) {
    return `Minimum budget allocation for custom planning is $${VALIDATION_RULES.MIN_BUDGET}.`;
  }
  return '';
};

/**
 * Runs all field validations against the full form data object.
 *
 * @param {Object} data — The complete form state.
 * @returns {Object} An object mapping field names to their error messages.
 *                    Empty object means all fields are valid.
 */
export const validateTravelForm = (data) => {
  const errors = {};

  const nameError = validateName(data.name);
  if (nameError) errors.name = nameError;

  const emailError = validateEmail(data.email);
  if (emailError) errors.email = emailError;

  const destinationError = validateDestination(data.destination);
  if (destinationError) errors.destination = destinationError;

  const travelDateError = validateTravelDate(data.travelDate);
  if (travelDateError) errors.travelDate = travelDateError;

  const travelersError = validateTravelers(data.travelers);
  if (travelersError) errors.travelers = travelersError;

  const budgetError = validateBudget(data.budget);
  if (budgetError) errors.budget = budgetError;

  return errors;
};