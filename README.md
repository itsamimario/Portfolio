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

## 🗄️ Database Setup

### PostgreSQL + pgvector Installation

**macOS (Homebrew):**
```bash
# Install PostgreSQL
brew install postgresql@15

# Start PostgreSQL service
brew services start postgresql@15

# Install pgvector extension
brew install pgvector

# Create database
createdb portfolio_dev
```

**Linux (Ubuntu/Debian):**
```bash
# Install PostgreSQL
sudo apt update
sudo apt install postgresql postgresql-contrib

# Install pgvector
sudo apt install postgresql-15-pgvector

# Start PostgreSQL
sudo systemctl start postgresql

# Create database (as postgres user)
sudo -u postgres createdb portfolio_dev
```

**Windows:**
1. Download and install PostgreSQL from [postgresql.org](https://www.postgresql.org/download/windows/)
2. Install pgvector by following [pgvector installation guide](https://github.com/pgvector/pgvector#installation)
3. Create database using pgAdmin or psql

### Database Schema Setup

Run the migration to create the embeddings table:

```bash
# Connect to your database
psql -d portfolio_dev

# Run the migration
\i db/migrations/001_initial_schema.sql

# Verify the table was created
\dt

# Check pgvector extension
\dx
```

You should see:
- `embeddings` table with vector column
- `vector` extension installed
- Indexes created for vector similarity search

### Verify Connection

Test your database connection:

```bash
# Create a .env file with your database URL
cp .env.example .env

# Edit .env and update DATABASE_URL if needed
# DATABASE_URL=postgresql://postgres:password@localhost:5432/portfolio_dev
```

The database is now ready for the RAG chatbot embeddings.

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

### PR Review Process

For each phase:

1. **Open PR** from feature branch to main
2. **Manual review** (optional): Use a second Claude Code window to review the PR
3. **Create issues** for any feedback that should be addressed later
4. **Merge** when satisfied with the implementation

Review focus areas:
- Code quality and TypeScript best practices
- Architecture and component design
- Test coverage (80%+ threshold)
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
