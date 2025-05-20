# LEARN-X

An AI-powered study companion that helps students learn more effectively by providing personalized, document-based assistance.

## Features

- **Document Management**: Upload and organize study materials (PDFs)
- **AI-Powered Q&A**: Get answers based on your uploaded documents
- **Interactive Learning**: Split-screen interface with document viewer and chat
- **Personalized Experience**: Adjustable learning styles and explanation depth

## Tech Stack

### Backend
- Python 3.10+
- FastAPI
- PostgreSQL with pgvector
- SQLAlchemy
- LangChain

### Frontend
- React with TypeScript
- Chakra UI + Tailwind CSS
- PDF.js

## Getting Started

### Prerequisites

- Python 3.10+
- Node.js 18+
- PostgreSQL 13+
- Docker (optional)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/LEARN-X.git
   cd LEARN-X
   ```

2. Set up the backend:
   ```bash
   # Create and activate virtual environment
   python -m venv venv
   source venv/bin/activate  # On Windows: .\venv\Scripts\activate
   
   # Install dependencies
   pip install -r requirements.txt
   ```

3. Set up the frontend:
   ```bash
   cd frontend
   npm install
   ```

4. Configure environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

5. Run the development servers:
   ```bash
   # Backend
   cd ../backend
   uvicorn main:app --reload
   
   # Frontend (in a new terminal)
   cd ../frontend
   npm run dev
   ```

## Project Structure

```
learn-x/
├── .github/            # CI/CD workflows, pull request templates
├── docker/             # Docker configurations
├── docs/               # Documentation
├── frontend/           # React (TypeScript) client
├── backend/            # Python (FastAPI) server
├── .env.example        # Environment variables example
├── .gitignore
├── README.md
└── PRD.md
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
