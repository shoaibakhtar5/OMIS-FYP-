# OMIS: Organizational Meeting Intelligence System

Final year project, Bahria University Islamabad (H-11). Team: Member A = shoaibakhtar5 (frontend lead), Member B = SharafatKhattak (backend/AI lead). Supervisor: Amir Sohail.
OMIS turns meetings into transcripts, summaries, decisions, risks and tracked action items.

## Stack
- Frontend: React + Vite + TypeScript (`frontend/`)
- Backend: FastAPI (Python) REST API + PostgreSQL (`backend/`), Alembic migrations
- Queue: Celery + Redis (to be confirmed)
- AI worker: WhisperX/Whisper (speech to text; English, Urdu, mixed), pyannote.audio (diarization, uploads only), LLM for summary/decisions/risks/action items
- Live meetings: LiveKit recommended (to be confirmed), per-participant track recording, TURN/STUN. FFmpeg for audio.
- Auth: JWT-style access token (30 min) + refresh token (7 days). RBAC enforced on the server.

## Two input paths (do not mix them up)
- Live meeting: one audio track per participant. Speaker = the authenticated user. No diarization, no speaker mapping. Transcribed after the meeting ends (no live captions).
- Upload: one mixed file, anonymous speaker labels. Diarization + manual speaker mapping apply to this path only.
Status flow: live skips Diarizing and Awaiting Speaker Mapping.

## Roles and rules
Roles: Super Admin, CEO, Project Manager, Employee, HR Manager, Marketing Manager.
- Everything is multi-tenant: every query filters by organization id.
- Super Admin manages the system but cannot read meeting content.
- HR sees aggregate participation only, never meeting content.
- Only invited users can join a meeting; the host ends it; ending starts processing.
- Transcripts are not edited after creation.

## Task workflow (human in the loop)
- AI-suggested tasks start as Suggested. A reviewer (organizer or CEO) approves or rejects them.
- Allowed transitions: Suggested -> Approved/Rejected; Approved -> In Progress/Completed; In Progress -> Completed; Completed -> In Progress. Reviewer can reassign approved/in-progress tasks.
- Owner resolution is hybrid: the LLM extracts a name, deterministic code maps it to a real user. The LLM never assigns owners directly.

## Scope tiers
Core (High), Extended (Medium), Future Work (Low). Do not build Future Work (full RAG assistant, semantic search, deep analytics) unless asked.

## Reference documents (kept outside the repo by the team)
SRS v1.1 and SDS v1.1 (combined file OMIS_System_Specification_v1.1.docx): IDs UC-xx, FR-xx, NFR-xx, BR-xx, CMP-xx, DD-xx, SEQ-xx, EP-xx (endpoints), SC-xx (screens). If a requirement ID is mentioned, ask the user to paste it rather than guessing.

## Work split
See docs/WORK_PACKAGES.md. A owns `frontend/`, B owns `backend/` and AI. API shape changes must be agreed in the OpenAPI file (`backend/openapi.yaml`) before either side builds on them.

## Git rules
- Never push to `main`. `main` is protected; everything goes through a PR with at least one approval from the other member.
- Branches: `feature/<name>`, `fix/<name>`, `docs/<name>`.
- Small commits with clear messages. After each finished component, screen or endpoint, add a task: commit and push to the current branch. Open a PR when a work package or a usable piece is done.
- A daily scheduled review (10:47 PM Pakistan time) reviews open PRs and merges only approved, passing, conflict-free ones.
- No secrets in git. Use `.env` (ignored) and commit `.env.example`.

## Working style
Keep answers and code simple and readable (student project, must be explainable at defense). Add tests for logic that enforces roles, org filtering and task transitions. Run lint and tests before committing.
