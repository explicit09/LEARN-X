# LEARN-X Task Breakdown

This document outlines the tasks required to build the LEARN-X student MVP as described in the PRD.

## 1. Setup & Tooling
- **Repository Initialization**
  - Establish Python (FastAPI) and Node (React) environments.
  - Provide `.env.example` with all required variables.
- **Database Provisioning**
  - Configure PostgreSQL with the `pgvector` extension.
  - Set up Alembic for migrations.
- **Docker & Scripts**
  - Add `docker-compose` services for backend, frontend, and database.
  - Create startup scripts for local development.

## 2. Core Backend Features
- **Authentication**
  - Email/password signup and login endpoints.
  - JWT token generation and validation.
  - Password hashing via `passlib`.
- **PDF Upload & Management**
  - API route for drag‑and‑drop uploads with file validation (PDF only, size limits).
  - CRUD endpoints for listing and deleting documents.
  - Associate documents with user accounts.
- **Document Processing Pipeline**
  - Extract text from PDFs using `pdfplumber`.
  - Chunk text, generate embeddings (`sentence-transformers`).
  - Persist embeddings in Postgres using `pgvector`.
- **AI Q&A Service**
  - Integrate LangChain with OpenAI to answer questions strictly from stored documents.
  - Return source citations (page numbers, sections) with each answer.
- **Conversation History**
  - Maintain conversation records linked to documents and user preferences.

## 3. Core Frontend Features
- **Initial React Setup**
  - Configure React with TypeScript, Chakra UI, Tailwind CSS, and React Query.
- **Document Viewer**
  - Integrate PDF.js for viewing and annotating PDFs.
  - Display documents alongside the chat interface (split screen).
- **Chat Interface**
  - Real‑time conversation component connected to the backend Q&A service.
  - Highlight text to generate questions directly from the viewer.
- **Document Management UI**
  - Drag‑and‑drop upload component with progress feedback.
  - List, rename, and delete uploaded documents.

## 4. Personalization Features
- **Learning Style Settings**
  - Visual, text‑based, and example‑driven explanation modes.
  - Complexity level slider or selector.
  - Persist settings per user.
- **Response Customization**
  - Tone adjustment (casual ↔ formal) and detail level controls.
  - Optional follow‑up question prompts.

## 5. Security & Compliance
- Enforce secure API authentication and authorization.
- Encrypt stored documents and sensitive data.
- Document clear data retention policies (FERPA/GDPR/CCPA).

## 6. Testing & Quality Assurance
- Unit tests for all API routes and services.
- Frontend component and integration tests with React Testing Library.
- Continuous linting (black, isort, flake8) and type checking (mypy).

## 7. CI/CD & Deployment
- GitHub Actions workflows for test, lint, type, and build steps.
- Docker images for backend and frontend.
- Deployment scripts for production environments.

## 8. Phase 2 Enhancements
- Advanced document management (folders, tags, search).
- Deeper personalization and performance optimizations.
- Enhanced retrieval and search accuracy.

## 9. Phase 3 & Future Work
- Support additional file types and collaborative study features.
- Mobile app and offline functionality.
- Integration with external LMS platforms and analytics dashboards.

