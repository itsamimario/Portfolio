# Portfolio Website

**Company:** Personal Project
**Role:** Product Manager & Developer
**Period:** January 2026

---

## Context

Building a professional portfolio to demonstrate Product Manager capabilities with hands-on technical execution. The differentiator: a RAG-powered AI chatbot that can answer questions about my experience, skills, and case studies.

---

## Approach & Key Decisions

### Chat-First Interface
The homepage IS the chat interface. Visitors land directly in a conversation with an AI that knows everything about me. This forces the AI implementation to be excellent—it's the first thing people see.

### Design
Minimalist aesthetic with subtle pixel-art elements from CatchIT! project. Clean typography, professional colors, focused on content over decoration.

---

## RAG System Architecture

### Vector Database Setup
PostgreSQL with pgvector extension for storing and searching embeddings:
- Created schema with `embedding vector(1536)` column for OpenAI embeddings
- Implemented cosine similarity search using `<=>` operator
- Connection pooling for efficient database access

### Content Embedding Pipeline
Built a complete pipeline to vectorize portfolio content:

1. **Content Loader** - Recursively loads markdown files from content directory
2. **Chunker** - Splits content into semantic chunks (max 500 tokens) preserving context
3. **Embedding Generator** - OpenAI text-embedding-3-small (1536 dimensions)
4. **Storage** - Chunks stored with metadata (source, title, content type)

### Retrieval-Augmented Generation
The chat API combines semantic search with Claude:
1. User query → embed with OpenAI
2. Vector similarity search → top 5 relevant chunks
3. Inject retrieved context into Claude prompt
4. Stream response back to user with source attribution

---

## Development Process: Claude Code + Ralph Wiggum

### Agent-Based Development
Used Claude Code with specialized agents orchestrated through a structured workflow:

| Agent | Purpose |
|-------|---------|
| **planner** | Creates implementation plans for each phase |
| **architect** | Validates technical decisions and patterns |
| **tdd-guide** | Writes tests FIRST before implementation |
| **code-reviewer** | Reviews all code before commit |
| **security-reviewer** | Audits API routes and data handling |

### Ralph Wiggum Process
Autonomous development loop that dramatically accelerated delivery:
- Agent works through implementation plan autonomously
- Runs tests, fixes issues, iterates without manual intervention
- Human reviews at phase completion, not every step
- Completed 8 phases in a single day

### Workflow Rules
Strict gates ensured quality:
- No code written without tests first (TDD)
- No commits without code review approval
- Security review required for all API endpoints
- Documentation updated at each phase completion

---

## Results & Impact

| Metric | Value |
|--------|-------|
| Content Chunks | 25 embedded in vector DB |
| Test Coverage | 201 tests passing |
| Development Speed | 8 phases in 1 day |
| RAG Response Time | < 2 seconds |

### What Made This Work
- **Structured phases** - Clear boundaries and deliverables
- **Agent specialization** - Right tool for each task
- **Autonomous loops** - Ralph Wiggum reduced manual overhead
- **Quality gates** - TDD + reviews caught issues early

---

## Tech Stack

- **Frontend:** Next.js 14, TypeScript, Tailwind CSS
- **Database:** PostgreSQL + pgvector
- **AI:** Claude API (generation), OpenAI (embeddings)
- **Development:** Claude Code, specialized agents, Ralph Wiggum

---

## Skills Demonstrated

- [x] RAG system design and implementation
- [x] Vector database architecture (pgvector)
- [x] AI/ML pipeline development
- [x] Agent-based development workflows
- [x] Autonomous development process design
- [x] TDD with comprehensive test coverage
- [x] Product thinking with technical execution

---

## Artifacts

- [GitHub Repository](https://github.com/itsamimario/Portfolio)
