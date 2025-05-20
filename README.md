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

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/LEARN-X.git
   cd LEARN-X
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

```


## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
