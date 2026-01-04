# Mario Bennekers - Portfolio

Professional minimalist portfolio showcasing product management expertise with subtle pixel-art elements from CatchIT!

## 🎯 Features

- **RAG Chatbot**: Interactive AI assistant powered by Claude API + pgvector
- **Case Studies**: Strategic product work at CatchIT!, RatedPower, and Maxem Energy
- **Product Playbook**: Frameworks and methodologies for building products
- **Clean Code**: TypeScript, React best practices, and modern architecture

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL + pgvector (local) → Supabase (production)
- **AI**: Claude API (Anthropic)
- **Deployment**: Vercel

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL with pgvector extension
- Anthropic API key

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your database URL and Anthropic API key.

3. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
portfolio/
├── app/                  # Next.js App Router pages
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home page
│   └── globals.css      # Global styles
├── components/          # React components
├── lib/                 # Utilities and helpers
├── types/              # TypeScript type definitions
└── public/             # Static assets
```

## 🗄️ Database Setup (Coming Soon)

Instructions for setting up PostgreSQL with pgvector extension will be added here.

## 📝 License

© 2026 Mario Bennekers

---

**Built with Next.js, TypeScript, and PostgreSQL**
