import { API_ENDPOINTS } from '../utils/constants';

/**
 * Submits a travel inquiry to the backend webhook.
 *
 * @param {Object} formData — The validated form payload.
 * @param {string} formData.name — Traveler's full name.
 * @param {string} formData.email — Contact email address.
 * @param {string} formData.destination — Desired travel destination.
 * @param {string} formData.travelDate — Planned travel date (ISO format).
 * @param {number} formData.travelers — Number of travelers.
 * @param {number} formData.budget — Estimated budget in USD.
 * @param {string} [formData.notes] — Optional special requests.
 *
 * @returns {Promise<Object>} Server response with `status` and `referenceID`.
 * @throws {Error} If the network request fails or the server returns a non-OK status.
 */
export const submitTravelInquiry = async (formData) => {
  try {
    const response = await fetch(API_ENDPOINTS.WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error(
      'Failed to connect to the server. Please ensure the backend is running.',
      { cause: error }
    );
  }
};