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

2. Use the setup script to initialize the project:
   ```bash
   # Make the script executable
   chmod +x setup.sh
   
   # Run the setup script
   ./setup.sh
   ```
   
   The setup script will:
   - Install required system dependencies
   - Set up Python virtual environment
   - Install backend and frontend dependencies from `requirements.txt`
   - Configure environment variables from .env.example
   - Set up PostgreSQL with pgvector (if Docker is available)
   - Initialize the database schema
   
3. Install development dependencies (optional):
   ```bash
   pip install -r requirements-dev.txt
   ```

4. Configure environment variables:
   ```bash
   # Edit .env with your configuration (created from .env.example)
   # At minimum, update OPENAI_API_KEY, JWT_SECRET, LEARNX_ENV, and PORT
   ```

5. Start the application:
   ```bash
   # Make the script executable
   chmod +x start.sh
   
   # Start both backend and frontend
   ./start.sh
   
   # Or use Docker for all services
   ./start.sh docker
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
