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

## 🔄 Development Workflow

This project uses a phase-based development approach with automated Claude Code PR reviews:

### Phase-Based Development

1. **Create feature branch** for each phase: `phase-N-description`
2. **Implement feature** following SPEC.md requirements
3. **Write tests** (TDD approach, 80%+ coverage)
4. **Open Pull Request**
5. **Automated review** by Claude Code via GitHub Actions
6. **Create issues** for review feedback (to be fixed in parallel later)
7. **Merge** when ready

See `SPEC.md` for detailed phase specifications.

### GitHub Actions Setup

To enable automated PR reviews:

1. Install the Claude Code GitHub App on this repository
2. Add `ANTHROPIC_API_KEY` to repository secrets:
   - Go to Settings → Secrets and variables → Actions
   - Add new secret: `ANTHROPIC_API_KEY` = your Anthropic API key

The workflow (`.github/workflows/pr-review.yml`) will automatically review PRs focusing on:
- Code quality and TypeScript best practices
- Architecture and component design
- Test coverage
- Performance and accessibility
- Security

### Parallel Refinement (Later Phases)

For issue fixes, use git worktrees:
```bash
git worktree add ../portfolio-issue-123 -b fix/issue-123
cd ../portfolio-issue-123
# Make fixes, commit, push, open PR
```

## 📝 License

© 2026 Mario Bennekers

---

**Built with Next.js, TypeScript, and PostgreSQL**
