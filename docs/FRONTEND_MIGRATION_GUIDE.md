# LEARN-X Frontend Migration Guide

## Table of Contents
1. [Overview](#overview)
2. [Project Structure](#project-structure)
3. [Setup Instructions](#setup-instructions)
4. [Component Documentation](#component-documentation)
5. [State Management](#state-management)
6. [API Integration](#api-integration)
7. [Theming and Styling](#theming-and-styling)
8. [Testing](#testing)
9. [Deployment](#deployment)
10. [Troubleshooting](#troubleshooting)

## Overview

This document outlines the process of integrating the enhanced frontend from `learnx-pdf-chat-main` into the main LEARN-X project. The new frontend provides a more polished user interface with improved document management and chat capabilities.

## Project Structure

```
frontend/
├── public/                  # Static assets
├── src/
│   ├── api/                 # API service layer
│   ├── components/           # Reusable UI components
│   │   ├── ui/               # ShadCN/ui components
│   │   ├── Layout/           # Layout components
│   │   ├── Dashboard/        # Dashboard components
│   │   └── Study/            # Study/chat components
│   ├── hooks/                # Custom React hooks
│   ├── pages/                # Page components
│   ├── state/                # Zustand stores
│   ├── styles/               # Global styles
│   ├── types/                # TypeScript type definitions
│   ├── utils/                # Utility functions
│   ├── App.tsx               # Main application component
│   └── main.tsx              # Application entry point
├── .env                      # Environment variables
├── package.json              # Dependencies and scripts
├── tailwind.config.js        # Tailwind CSS configuration
└── tsconfig.json             # TypeScript configuration
```

## Setup Instructions

### Prerequisites
- Node.js 18+
- npm or yarn
- LEARN-X backend running locally

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd LEARN-X/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   # Update the variables in .env.local
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## Component Documentation

### Layout Components

#### MainLayout
- **Location**: `components/Layout/MainLayout.tsx`
- **Purpose**: Provides the main application layout including header, navigation, and footer
- **Props**:
  - `children`: React nodes to be rendered in the main content area

#### Sidebar
- **Location**: `components/Layout/Sidebar.tsx`
- **Purpose**: Navigation sidebar with links to main sections
- **Props**: None

### Page Components

#### Dashboard
- **Location**: `pages/Dashboard.tsx`
- **Purpose**: Displays user's documents and upload functionality
- **Features**:
  - Document list with search and filter
  - Upload new documents
  - Document actions (view, download, delete)

#### Study
- **Location**: `pages/Study.tsx`
- **Purpose**: PDF viewer with integrated chat interface
- **Features**:
  - PDF document rendering
  - Chat interface for Q&A
  - Document navigation
  - Page controls

## State Management

The application uses Zustand for state management with the following stores:

### Auth Store
- **Location**: `state/authStore.ts`
- **State**:
  ```typescript
  interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
  }
  ```
- **Actions**:
  - `login`: Handle user login
  - `logout`: Handle user logout
  - `register`: Handle user registration
  - `fetchUser`: Fetch current user data

### Chat Store
- **Location**: `state/chatStore.ts`
- **State**:
  ```typescript
  interface ChatState {
    currentConversation: Conversation | null;
    messages: Message[];
    isLoading: boolean;
    error: string | null;
  }
  ```
- **Actions**:
  - `startConversation`: Initialize a new chat
  - `sendMessage`: Send a message in the current conversation
  - `updatePreferences`: Update chat preferences

## API Integration

The frontend communicates with the backend through the following endpoints:

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/token` - Login and get access token
- `GET /auth/me` - Get current user data

### Documents
- `GET /documents` - List all documents
- `POST /documents` - Upload a new document
- `GET /documents/{id}/download` - Download a document
- `DELETE /documents/{id}` - Delete a document

### Conversations
- `POST /conversations` - Create a new conversation
- `POST /conversations/{id}/message` - Send a message
- `PUT /conversations/{id}/preferences` - Update conversation preferences

## Theming and Styling

The application uses Tailwind CSS for styling with the following customizations:

### Colors
- Primary: `#3b82f6` (blue-500)
- Secondary: `#6b7280` (gray-500)
- Success: `#10b981` (emerald-500)
- Warning: `#f59e0b` (amber-500)
- Danger: `#ef4444` (red-500)

### Typography
- Font Family: Inter (loaded from Google Fonts)
- Base text size: 16px
- Line height: 1.5

### Breakpoints
- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px
- 2xl: 1536px

## Testing

### Unit Tests
Run unit tests with:
```bash
npm test
# or
yarn test
```

### E2E Tests
Run end-to-end tests with:
```bash
npm run test:e2e
# or
yarn test:e2e
```

## Deployment

### Production Build
Create a production build:
```bash
npm run build
# or
yarn build
```

### Docker
Build and run with Docker:
```bash
docker build -t learnx-frontend .
docker run -p 3000:3000 learnx-frontend
```

## Troubleshooting

### Common Issues

#### 1. Missing Dependencies
**Error**: `Module not found: Can't resolve 'module-name'`
**Solution**:
```bash
npm install module-name --save
# or
yarn add module-name
```

#### 2. Environment Variables
**Error**: `process.env.VARIABLE is undefined`
**Solution**:
1. Ensure `.env` file exists in the frontend directory
2. All required variables are defined in `.env`
3. Restart the development server after making changes

#### 3. CORS Issues
**Error**: `CORS policy` errors in the console
**Solution**:
1. Ensure the backend has proper CORS headers
2. Verify the API base URL in the frontend configuration

## Support

For additional help, please contact the development team or open an issue in the repository.
