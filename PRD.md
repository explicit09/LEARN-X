# LEARN-X - Product Requirements Document (PRD)

## 1. Overview

### Project Name
LEARN-X – Student MVP

### Objective
Create a minimal, robust web platform where students can:
1. Upload and manage PDF course materials through manual upload
2. Interact with an AI tutor that references only their ingested documents
3. Enjoy an innovative, frictionless UI with personalization options

### Key Differentiators
- Strictly document-based AI assistance (no external sources)
- Modern, minimal UI inspired by alice.tech and excellence-ai.com
- Lightweight personalization for learning styles

## 2. Core Features

### A. Content Ingestion
1. **PDF Upload & Management**
   - Drag-and-drop interface for easy uploading
   - File validation (PDF format, size limits)
   - Document organization and management
   - Support for multiple documents per course/subject

### B. AI-Powered Study Assistant
1. **Contextual Q&A**
   - Chat interface for asking questions
   - Strictly references uploaded documents
   - Citation of sources (page numbers, sections)

2. **Interactive Document Viewer**
   - Split-screen layout (document + chat)
   - Text highlighting and annotation
   - Direct question generation from highlighted text

### C. Personalization
1. **Learning Style Preferences**
   - Visual, text-based, or example-driven explanations
   - Adjustable complexity levels
   - Persistent user settings

2. **Response Customization**
   - Tone adjustment (casual to formal)
   - Detail level control
   - Follow-up question handling

## 3. Technical Architecture

### Backend (Python/FastAPI)
- **Framework**: FastAPI with Python 3.10+
- **Authentication**: JWT-based email/password
- **Database**: PostgreSQL with pgvector for embeddings
- **AI/ML Services**:
  - Document processing pipeline (PyPDF2, pdfplumber)
  - Vector embeddings (sentence-transformers)
  - LLM integration (LangChain + OpenAI/OpenRouter)
  - Text chunking and indexing service
- **API**: FastAPI with Pydantic models
- **Key Directories**:
  - `routers/` - API route definitions
  - `services/` - Business logic and AI integration
  - `models/` - SQLAlchemy models
  - `schemas/` - Pydantic models for request/response
  - `utils/` - Helper functions and utilities

### Frontend (React/TypeScript)
- **Framework**: React with TypeScript
- **State Management**: React Query
- **UI Library**: Chakra UI with Tailwind CSS
- **Key Features**:
  - PDF.js integration for document viewing
  - Real-time chat interface
  - Responsive split-screen layout
  - User preference management
- **Key Directories**:
  - `components/` - Reusable UI components
  - `pages/` - Route-based components
  - `hooks/` - Custom React hooks
  - `context/` - Global state management
  - `services/` - API integration

### Development & Deployment
- **Containerization**: Docker with docker-compose
- **CI/CD**: GitHub Actions workflows
- **Testing**: Jest + React Testing Library
- **Documentation**: Comprehensive API and component docs

## 4. Data Model

### Core Entities
1. **User**
   - Authentication details
   - Preferences
   - Document access permissions

2. **Document**
   - User ID (owner)
   - Original filename and metadata
   - Processing status and timestamps
   - Vector embeddings for search
   - Text content (extracted from PDF)

3. **Conversation**
   - Message history
   - Document context
   - User preferences at time of conversation

## 5. Security & Compliance

### Data Protection
- End-to-end encryption for document storage
- Secure API authentication
- Regular security audits

### Compliance
- FERPA compliance for educational data
- GDPR/CCPA compliance for user data
- Clear data retention policies

## 6. Development Roadmap

### Phase 1: MVP (4-6 weeks)
- User authentication (email/password)
- PDF upload and text extraction
- Basic Q&A functionality
- Simple document management
- Minimal viable UI with split-screen view

### Phase 2: Enhanced Features
- Advanced document management
- Improved personalization
- Performance optimizations
- Enhanced search capabilities

### Phase 3: Scaling
- Support for additional file types
- Collaborative features
- Advanced analytics

## 7. Success Metrics

### Key Performance Indicators
1. **User Engagement**
   - Average session duration
   - Questions asked per session
   - Return user rate

2. **System Performance**
   - Document processing time
   - Response accuracy
   - Uptime and reliability

3. **User Satisfaction**
   - NPS (Net Promoter Score)
   - Feature usage statistics
   - Support ticket volume

## 8. Risks & Mitigations

### Technical Risks
1. **AI Hallucinations**
   - Mitigation: Strict retrieval-augmented generation
   - Human review of edge cases

2. **Performance with Large Documents**
   - Mitigation: Efficient chunking strategies
   - Progressive loading

3. **Integration Complexity**
   - Mitigation: Clear API contracts
   - Comprehensive testing

## 9. Future Considerations

### Potential Expansions
- Mobile application
- Offline functionality
- Integration with additional LMS platforms
- Support for multimedia content
- Collaborative study features

---

*Last Updated: May 19, 2025*
*Version: 1.0*
