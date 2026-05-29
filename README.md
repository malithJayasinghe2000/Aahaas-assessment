# Aahaas Travel Planner - Automated Inquiry System

A travel inquiry system built for Aahaas Travel Agency. The project consists of a modern ReactJS frontend styled with Tailwind CSS to capture customer requests, and a automated n8n backend pipeline that handles strict data validation, database persistence, AI-powered summarization, and team notifications.

## System Features

* **Dynamic Priority Tagging :** The system automatically evaluates the incoming user's budget. If the budget is $5,000 or greater, the lead is dynamically tagged as "High Priority", which is injected into the database and the team's email notification subject line.
* **AI Summarization :** Integrates Google Gemini (1.5 Flash) to read the customer's travel details and dynamically generate a professional, 2-sentence briefing for the sales team.
* **Fault Tolerance & Graceful Degradation:** Built with a "Fallback Email" path. If the Google Gemini API experiences rate limits or server timeouts , the workflow safely bypasses the AI generation and sends a standard notification email, ensuring zero lead loss.
* **Strict API Gatekeeper (Backend Validation):** The backend strictly verifies that all required fields are present in the payload before any database writes or API calls occur, protecting the system from empty payloads or direct API spam.
* *⁠*Lightweight Data Storage: For now, the system uses Google Sheets as a simple, accessible database to store inquiries, allowing the team to easily view and manage.
* **Frontend UI:** A clean, responsive form interface built with ReactJS and Tailwind CSS.

## The n8n Workflow Architecture (Backend)

The backend is entirely powered by a custom n8n workflow, designed for reliability, error handling, and data integrity. Here is the step-by-step execution flow:

1. **Webhook Node (Trigger):** Listens for incoming `POST` requests from the React frontend containing the user's JSON payload.
2. **IF Node (API Gatekeeper):** Validates the incoming data. It checks that critical fields (`name`, `email`, `destination`, `travelDate`, `travelers`, `budget`) are not empty.
   * *False Path:* If data is missing, it routes immediately to an Error Response node to reject the request.
   * *True Path:* If data is valid, it proceeds to the database layer.
3. **Google Sheets Node (Data Persistence):** Appends the validated lead data as a new row in the Aahaas Travel google sheet (database). 
4. **Google Gemini Node (AI Processing):** Takes the data output from the Google Sheet and sends a structured prompt to the `gemini-1.5-flash` model to generate a custom summary of the inquiry.
5. **Send Email Node (Notification):** Compiles the customer details, priority tag, and AI summary into an email sent directly to the Aahaas sales team.
6. **Fallback Email Path:** If the Gemini node fails (e.g., quota exceeded or server down), the error output routes to a duplicate Email Node that sends the lead details *without* the AI summary, guaranteeing the team is still alerted.
7. **Success/Error Response Nodes:** Returns a clean `{ "status": "success", "referenceID": "..." }` or `{ "status": "error", "message": "..." }` JSON payload back to the React frontend to display the appropriate UI message.

## Setup Instructions

### 1. Frontend Setup (ReactJS)
1. Clone or extract the project repository.
2. Open a terminal and navigate into the project directory:
   ```bash
   cd aahaas-travel-form
3. install dependencies:
   ```bash
   npm install
4. start the development server:
   ```bash
   npm run dev

### 2. Backend Setup (n8n)

1. Open your n8n instance.

2. Go to your workflows and click Import from File in the top right menu.

3. Select the n8n-workflow.json file included in this repository.

4. Configure Credentials:

    Update the Google Sheets node with your Google account credentials and select your specific spreadsheet.

    Update the Google Gemini node with your Google AI Studio API key.

    Update the Send Email nodes with your SMTP/Gmail app credentials.

    Click the toggle to Activate the workflow.

Note: Ensure the Webhook URL in your React code (src/services/api.js) matches the Production Webhook URL provided by your n8n instance.