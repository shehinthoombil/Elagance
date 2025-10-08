# Eleganza Property Chat Platform

An advanced AI chatbot platform for the luxury Eleganza property development that delivers intelligent, multimedia-rich conversational experiences about real estate in Dubai.

**Property**: Eleganza - Luxury residential development in Jumeirah Village Circle, Dubai  
**Developer**: Danube Properties (Top 5 developer in UAE)  
**Location**: Jumeirah Village Circle (JVC), Dubai  
**Property Types**: 1BR, 2BR, 2BR Duplex Apartments & 4BR Townhouses  
**Contact**: 800 17 17 17

## Features

- 🤖 AI-powered chat interface with OpenAI GPT-4o integration
- 💬 Rich HTML content generation with multimedia support
- 📱 Responsive design with light/dark mode support
- 🔄 Real-time conversation management
- 🛡️ Secure HTML sanitization with DOMPurify
- 📊 PostgreSQL database integration with Drizzle ORM
- ⚡ Modern TypeScript full-stack architecture

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Wouter** for client-side routing
- **TanStack Query** for server state management
- **Shadcn/ui** components built on Radix UI
- **Tailwind CSS** with CSS variables for theming
- **Vite** for development and production builds

### Backend
- **Express.js** with TypeScript
- **Drizzle ORM** with PostgreSQL
- **OpenAI API** integration
- **Session management** with conversation persistence
- **RESTful API** design

## Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL database (optional for development)
- OpenAI API key

### Installation

1. Clone the repository:
```bash
git clone <your-new-repo-url>
cd eleganza-property-platform
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Add your OPENAI_API_KEY and DATABASE_URL
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Application pages
│   │   └── lib/            # Utilities and helpers
│   └── index.html
├── server/                 # Express.js backend
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API routes
│   ├── services/          # Business logic
│   └── storage.ts         # Data layer
├── shared/                # Shared TypeScript types
│   └── schema.ts          # Data models and validation
└── package.json
```

## API Endpoints

- `GET /api/welcome` - Get welcome message
- `POST /api/chat` - Send chat message and get AI response

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run check` - Run TypeScript checks
- `npm run db:push` - Push database schema changes

## Environment Variables

- `OPENAI_API_KEY` - Your OpenAI API key (required)
- `DATABASE_URL` - PostgreSQL connection string (optional for development)
- `NODE_ENV` - Environment mode (development/production)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and type checks
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For property inquiries, call 800 17 17 17 to speak with Danube Properties