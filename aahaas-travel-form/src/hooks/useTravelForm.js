import { useState, useMemo, useCallback } from 'react';
import { validateTravelForm } from '../utils/validation';
import { submitTravelInquiry } from '../services/api';
import { INITIAL_FORM_DATA, REQUIRED_FIELDS } from '../utils/constants';

/**
 * Custom hook encapsulating all travel form state and logic.
 *
 * @returns {Object} Form state, handlers, and computed values.
 */
export const useTravelForm = () => {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);

  /**
   * Handles input changes with real-time validation.
   * Updates formData, marks field as touched, and validates.
   */
  const handleChange = useCallback(
    (e) => {
      const { name, value, type } = e.target;

      // HTML inputs always return strings — convert number fields to actual numbers
      const parsedValue =
        type === 'number' ? (value === '' ? '' : Number(value)) : value;

      const updatedData = { ...formData, [name]: parsedValue };

      setFormData(updatedData);
      setTouched((prev) => ({ ...prev, [name]: true }));

      const validationErrors = validateTravelForm(updatedData);
      setErrors((prev) => ({
        ...prev,
        [name]: validationErrors[name] || '',
      }));
    },
    [formData]
  );

  /**
   * Marks a field as touched on blur to enable error display.
   */
  const handleBlur = useCallback(
    (e) => {
      const { name } = e.target;
      setTouched((prev) => ({ ...prev, [name]: true }));

      const validationErrors = validateTravelForm(formData);
      setErrors((prev) => ({
        ...prev,
        [name]: validationErrors[name] || '',
      }));
    },
    [formData]
  );

  /**
   * Whether the entire form is valid (no errors, all required fields filled).
   * Used to gate the submit button — solves the "button enabled with errors" bug.
   */
  const isFormValid = useMemo(() => {
    const validationErrors = validateTravelForm(formData);
    return Object.keys(validationErrors).length === 0;
  }, [formData]);

  /**
   * Percentage of required fields that have been filled (0–100).
   * Used for the progress indicator ring.
   */
  const completionPercentage = useMemo(() => {
    const filledCount = REQUIRED_FIELDS.filter((field) => {
      const value = formData[field];
      return value !== '' && value !== null && value !== undefined;
    }).length;
    return Math.round((filledCount / REQUIRED_FIELDS.length) * 100);
  }, [formData]);

  /**
   * Returns the error message for a field, but only if the field has been touched.
   * This prevents showing "required" errors before the user interacts.
   */
  const getFieldError = useCallback(
    (fieldName) => {
      return touched[fieldName] ? errors[fieldName] : '';
    },
    [touched, errors]
  );

  /**
   * Returns true if a field has been touched, has a value, and has no errors.
   * Used to show the green checkmark "valid" indicator.
   */
  const isFieldValid = useCallback(
    (fieldName) => {
      if (!touched[fieldName]) return false;
      const value = formData[fieldName];
      const hasValue =
        value !== '' && value !== null && value !== undefined;
      return !errors[fieldName] && hasValue;
    },
    [touched, errors, formData]
  );

  /**
   * Handles form submission:
   * 1. Runs final validation (marks all fields touched)
   * 2. Calls the API service
   * 3. Sets success or error result for the modal
   * 4. Resets form on success
   */
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      const allTouched = {};
      REQUIRED_FIELDS.forEach((f) => {
        allTouched[f] = true;
      });
      setTouched((prev) => ({ ...prev, ...allTouched }));

      const validationErrors = validateTravelForm(formData);
      setErrors(validationErrors);

      if (Object.keys(validationErrors).length > 0) return;

      setLoading(true);
      setSubmissionResult(null);

      try {
        const response = await submitTravelInquiry(formData);

        if (response.status === 'success') {
          setSubmissionResult({
            type: 'success',
            message: 'Your travel inquiry has been received!',
            referenceId: response.referenceID,
          });
          // Reset form on success
          setFormData(INITIAL_FORM_DATA);
          setTouched({});
          setErrors({});
        } else {
          setSubmissionResult({
            type: 'error',
            message:
              response.message ||
              'The server rejected the request. Please try again.',
          });
        }
      } catch (error) {
        setSubmissionResult({
          type: 'error',
          message:
            error.message ||
            'Unable to connect to the server. Please ensure the backend is running.',
        });
      } finally {
        setLoading(false);
      }
    },
    [formData]
  );

  /**
   * Clears the submission result — called when the modal is closed.
   */
  const resetSubmissionResult = useCallback(() => {
    setSubmissionResult(null);
  }, []);

  return {
    formData,
    errors,
    touched,
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
  };
};
