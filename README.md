# Multi-LLM Chatbot — Frontend

A React (Vite) chat interface that lets users converse with multiple open-source LLMs and switch between them from a dropdown, in real time.

## Tech Stack
- React (Vite) — UI framework and build tool
- Vanilla CSS — styling
- Fetch API — communication with the backend

## Features
- Real-time chat interface with distinct styling for user vs. AI messages
- Model selector dropdown, dynamically populated from the backend's `/models` endpoint
- Loading state ("Thinking...") while waiting for a response
- Graceful error handling: displays clear messages for network failures, rate limits, or backend errors instead of breaking silently
- Environment-based API URL configuration (switches automatically between local and deployed backend)

## Setup & Run Locally

1. Clone this repository:
```bash
   git clone https://github.com/ABHITANWAR26/chatbot-frontend.git
   cd chatbot-frontend
```

2. Install dependencies:
```bash
   npm install
```

3. Create a `.env` file in the root:
VITE_API_URL=http://localhost:5000
   (Change this to your deployed backend URL when testing against production.)

4. Start the dev server:
```bash
   npm run dev
```

5. Open the URL shown in your terminal (typically `http://localhost:5173`).

## Live Deployment
- Frontend (Vercel): https://chatbot-frontend-sable-six.vercel.app
- Backend (Render): https://chatbot-backend-aveo.onrender.com

**Note:** the backend is on Render's free tier, which sleeps after inactivity. The first message after idle time may take 30–50 seconds while it wakes up.

## Related Repository
Backend code: https://github.com/ABHITANWAR26/chatbot-backend-