# Work packages (approx. hours)

## Member A: frontend lead (shoaibakhtar5), about 410 h
- A-01 Foundation and design system (50): Vite/React/TS, tokens from wireframes, routing, role guards, layout, shared components, API client with mock data
- A-02 Auth, roles, admin, full stack (75): login, registration, user management, settings, audit log screens plus the matching endpoints with B
- A-03 Meetings and uploads, full stack (65): meeting list, schedule form, upload recording, device check / join
- A-04 Meeting record, tasks and dashboards screens (85): meeting record, speaker mapping (uploads only), task review, My tasks, CEO/PM/Employee dashboards
- A-05 Live room frontend (30): participant list, mute state, active speaker, recording indicator
- A-06 Extended features (50)
- A-07 Testing (30)
- A-08 Documentation and demo (25)

## Member B: backend and AI lead (SharafatKhattak), about 410 h
- B-01 Foundation and proof of concept (75): FastAPI + PostgreSQL + Docker Compose, schema and migrations, OpenAPI draft (target week 3), WhisperX/pyannote proof of concept incl. Urdu
- B-02 Speech pipeline (85): per-track and mixed-file transcription, diarization for uploads, merge by timestamp
- B-03 Live meetings RTC and tracks (65): LiveKit rooms, join tokens (per participant, short-lived), per-track recording
- B-04 AI analysis, tasks, workflow (105): summary, decisions, risks, action items, owner resolver, task approval workflow
- B-05 Search and scheduler (20)
- B-06 AI evaluation (40)
- B-07 Deployment and security (20)

## Hand-offs
- B-01 schema + OpenAPI draft (week 3) -> A builds against it
- A-02 login screens -> B auth endpoints (semester 1, week 6)
Mock data on the frontend until the real endpoint exists.
