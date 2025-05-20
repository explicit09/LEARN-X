# LEARN-X Task Breakdown

This document outlines the tasks required to build the LEARN-X student MVP as described in the PRD.

## 1. Setup & Tooling (PRD §3, §6)
- **Environment**
  - Install Python 3.10+ and Node 18+.
  - Provide `.env.example` with required variables (`OPENAI_API_KEY`, `DATABASE_URL`, `JWT_SECRET`, `LEARNX_ENV`, `PORT`).
- **Database Provisioning**
  - Configure PostgreSQL with the `pgvector` extension.
  - Create initial Alembic migration for `User`, `Document`, and `Conversation` tables.
- **Docker & Scripts**
  - Add `docker-compose` services for backend, frontend, and database.
  - Include `setup.sh` and `start.sh` to bootstrap and run the project locally.

## 2. Backend Implementation (PRD §2, §3, §4)
- **Auth Routes**
  - `POST /api/v1/auth/register` – create user accounts.
  - `POST /api/v1/auth/token` – obtain JWT access tokens.
  - `GET /api/v1/health` – service health check.
  - Implement `User` model with hashed passwords and profile fields.
- **Document Routes**
  - `POST /api/v1/documents` – upload PDF files with validation.
  - `GET /api/v1/documents` – list a user's documents.
  - `DELETE /api/v1/documents/{id}` – delete a document.
  - Models: `Document` and `DocumentChunk` with embeddings stored via `pgvector`.
- **Conversation Routes**
  - `POST /api/v1/conversations` – start a chat for a document.
  - `GET /api/v1/conversations` – list conversations per user.
  - `POST /api/v1/conversations/{id}/message` – send questions and receive answers with citations.
  - `PUT /api/v1/conversations/{id}/preferences` – update learning style settings.
  - `DELETE /api/v1/conversations/{id}` – remove a conversation.
  - Models: `Conversation` and `Message` for storing history.
- **AI Integration**
  - Use LangChain to query document chunks and generate answers.
  - Include source page numbers and sections in responses.

## 3. Frontend Implementation (PRD §2, §3)
- **Authentication Pages**
  - Login and registration forms connected to the auth API.
- **Dashboard**
  - Document list view with drag‑and‑drop upload.
  - Links to open the viewer and chat interface.
- **Document Viewer & Chat**
  - Split-screen page using PDF.js alongside the conversation component.
  - Allow text highlighting to generate questions automatically.
- **Settings Panel**
  - UI controls for learning style, complexity, and tone.
  - Persist preferences via API calls.

## 4. Personalization Features (PRD §2.C, §4)
- Store user preferences (learning style, complexity, tone, follow‑ups).
- Expose API endpoint to update preferences (`PUT /api/v1/users/preferences`).
- Apply preferences when formatting AI queries and responses.
- Frontend form to edit saved preferences.

## 5. Security & Compliance (PRD §5)
- Require JWT authentication on protected routes.
- Encrypt uploaded documents and sensitive fields at rest.
- Enforce HTTPS and CORS settings in production.
- Document clear data retention and deletion policies (FERPA/GDPR/CCPA).

## 6. Testing & Quality Assurance (PRD §3, §6)
- Pytest unit tests for each API route and service.
- React Testing Library for component and integration tests.
- Continuous linting (`black`, `isort`, `flake8`) and type checking (`mypy`).

## 7. CI/CD & Deployment (PRD §3)
- GitHub Actions workflow to run lint, type, and test targets.
- Build Docker images for backend and frontend on each push.
- Deploy images to the production environment after successful checks.

## 8. Phase 2 Enhancements
- Advanced document management (folders, tags, search).
- Deeper personalization and performance optimizations.
- Enhanced retrieval and search accuracy.

## 9. Phase 3 & Future Work
- Support additional file types and collaborative study features.
- Mobile app and offline functionality.
- Integration with external LMS platforms and analytics dashboards.
