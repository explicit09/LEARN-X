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

2. Install dependencies (preferred):
   ```bash
   bash setup.sh
   ```

## Environment Configuration

Before running the application, you need to set up your environment variables.

1.  **Copy the example environment file:**
    ```bash
    cp .env.example .env
    ```
2.  **Update `.env`:**
    Open the newly created `.env` file and update the following variables:
    *   `OPENAI_API_KEY`: Your OpenAI API key.
    *   `JWT_SECRET`: A strong, unique secret for signing JWTs. You can generate one using a tool like `openssl rand -hex 32`.

    Ensure other variables like `DATABASE_URL`, `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB` are suitable for your environment if you're not using the default Docker setup. For the default Docker setup (`docker-compose up`), the pre-configured database values should work out of the box.

### Running with Docker

1. Copy `.env.example` to `.env` and fill in the required values.
2. Start the services:
   ```bash
   docker compose up -d
   ```
3. Visit `http://localhost:3000` to access the frontend.


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
