# Replit.md

## Overview

This is a modern full-stack chat application built with React, TypeScript, Express.js, and PostgreSQL. The application provides an AI-powered chat interface where users can interact with an Eleganza Property Assistant that provides conversational responses with rich HTML content and multimedia elements about luxury real estate.

**Property**: Eleganza - Luxury residential development in Jumeirah Village Circle, Dubai
**Developer**: Danube Properties (Top 5 developer in UAE)
**Location**: Jumeirah Village Circle (JVC), Dubai
**Property Types**: 1BR, 2BR, 2BR Duplex Apartments & 4BR Townhouses
**Contact**: 800 17 17 17

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Framework**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **API Design**: RESTful API with JSON responses
- **Session Management**: In-memory storage with potential for database upgrade
- **Error Handling**: Centralized error middleware
- **Logging**: Custom request/response logging middleware

### Database Design
- **Primary Database**: PostgreSQL (configured via Drizzle)
- **ORM**: Drizzle ORM with schema-first approach
- **Tables**: 
  - `conversations`: Stores chat sessions with unique session IDs
  - `messages`: Stores individual messages with role, content, and HTML formatting
- **Current Implementation**: In-memory storage for development with database schema ready

## Key Components

### Chat System
- **Chat Container**: Main chat interface with auto-scrolling and message display
- **Message Bubbles**: Differentiated UI for user and assistant messages
- **Chat Input**: Auto-resizing textarea with character limits and keyboard shortcuts
- **Typing Indicator**: Visual feedback during AI response generation

### AI Integration
- **OpenAI Integration**: GPT-4o model for generating conversational responses
- **Context Management**: Maintains conversation history for coherent interactions
- **HTML Response Generation**: AI generates rich HTML content with Tailwind styling
- **Content Sanitization**: DOMPurify for safe HTML rendering

### UI Components
- **Component Library**: Comprehensive Shadcn/ui component set
- **Theming**: Light/dark mode support with CSS custom properties
- **Responsive Design**: Mobile-first approach with responsive breakpoints
- **Accessibility**: ARIA labels and keyboard navigation support

## Data Flow

1. **User Input**: User types message in chat input component
2. **Session Management**: System creates or retrieves existing conversation session
3. **Message Storage**: User message saved to storage with conversation context
4. **AI Processing**: Message sent to OpenAI with conversation history for context
5. **Response Generation**: AI generates HTML-formatted response with rich content
6. **Message Display**: Response sanitized and displayed in chat interface
7. **State Updates**: React Query manages cache invalidation and UI updates

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database driver for Neon
- **@tanstack/react-query**: Server state management and caching
- **drizzle-orm**: Type-safe ORM for database operations
- **openai**: Official OpenAI API client for AI responses

### UI Dependencies
- **@radix-ui/***: Headless UI components for accessibility
- **tailwindcss**: Utility-first CSS framework
- **lucide-react**: Icon library for consistent iconography
- **dompurify**: HTML sanitization for security

### Development Dependencies
- **vite**: Fast build tool and development server
- **typescript**: Type safety and developer experience
- **tsx**: TypeScript execution for Node.js development

## Deployment Strategy

### Development
- **Hot Reloading**: Vite development server with HMR
- **TypeScript**: Compile-time type checking
- **Environment**: NODE_ENV=development with memory storage

### Production Build
- **Client Build**: Vite builds React app to `dist/public`
- **Server Build**: esbuild bundles Express server to `dist/index.js`
- **Static Serving**: Express serves built React app for SPA routing
- **Database**: PostgreSQL via DATABASE_URL environment variable

### Environment Configuration
- **DATABASE_URL**: PostgreSQL connection string (required for production)
- **OPENAI_API_KEY**: OpenAI API authentication (required)
- **NODE_ENV**: Environment mode (development/production)

### Scaling Considerations
- **Database Migration**: Ready to switch from memory storage to PostgreSQL via Drizzle
- **Session Persistence**: Database-backed session management for multi-instance deployment
- **CDN Integration**: Static assets can be served via CDN
- **Container Deployment**: Application is containerization-ready