# OMIS: Organizational Meeting Intelligence System

Final year project, Bahria University Islamabad. OMIS turns meetings (live or uploaded recordings) into transcripts, summaries, decisions, risks and tracked action items.

Team: Member A, shoaibakhtar5 (frontend lead). Member B, SharafatKhattak (backend and AI lead). Supervisor: Amir Sohail.

## Stack

- **Frontend:** React, Vite, TypeScript, React Router, Vitest and React Testing Library
- **Backend:** FastAPI (Python), PostgreSQL, Alembic migrations
- **Queue:** Celery and Redis (to be confirmed)
- **Speech and analysis:** WhisperX/Whisper (English, Urdu, mixed), pyannote.audio for diarization of uploads, an LLM for summaries, decisions, risks and action items
- **Live meetings:** LiveKit (to be confirmed), FFmpeg for audio

## Folder layout

```
frontend/   React + Vite + TypeScript app (Member A)
  src/
    api/          API client
    components/   shared UI components
    hooks/        custom React hooks
    layouts/      page layouts
    mocks/        mock data used until real endpoints exist
    pages/        screens
    routes/       router setup and route guards
    styles/       global styles and design tokens
    types/        shared TypeScript types
backend/    FastAPI API, database and AI worker (Member B)
docs/       work packages and project notes
.github/    pull request template
```

## Running the frontend

Requires Node.js 20 or newer.

```bash
cd frontend
npm install
npm run dev      # start the dev server at http://localhost:5173
npm run lint     # ESLint
npm run test     # Vitest
npm run build    # production build into frontend/dist
```

Copy `.env.example` to `.env` (in the repo root) and adjust values for local use. Never commit `.env`.

The frontend uses mock data by default, so it works without the backend. Set `VITE_USE_MOCKS=false` to call the real API at `VITE_API_BASE_URL`. In mock mode the login page lets you pick any of the six roles, and a "Dev" role switcher in the top bar changes role without signing out.

## Branch rules

- Never push to `main`. It is protected; every change goes through a pull request with at least one approval from the other member.
- Branch names: `feature/<name>`, `fix/<name>`, `docs/<name>`.
- Small commits with clear messages. Push after each finished component, screen or endpoint, and open a pull request when a work package or usable piece is done.
- Open pull requests are reviewed daily; only approved, passing, conflict-free ones are merged.
- No secrets in git. Use `.env` (ignored) and commit `.env.example`.
- API shape changes are agreed in `backend/openapi.yaml` before either side builds on them.
