# Portfolio Website

**Company:** Personal Project
**Role:** Designer & Developer
**Period:** January 2026

---

## Context

Building a portfolio to land a Product Manager role presents an interesting challenge: how do you demonstrate PM skills through a personal project? Most PM portfolios are static documents listing past work. I wanted something different—a portfolio that itself demonstrates product thinking, technical capability, and the ability to ship.

**The differentiator**: A RAG-powered AI chatbot that can answer questions about my experience, trained on my CV, case studies, and product playbook. This showcases AI implementation skills while providing an interactive way for recruiters and hiring managers to learn about me.

**The constraint**: 11 days from concept to deployed product (January 4-15, 2026).

---

## Discovery & Research

### Target Audience Analysis

- **Primary**: Hiring managers evaluating PM candidates
- **Secondary**: Technical recruiters doing initial screening
- **Tertiary**: Peers and potential collaborators

**What they need**: Quick understanding of my experience, evidence of strategic thinking, proof of technical capability, easy way to dig deeper on specific topics.

### Competitive Analysis

Reviewed PM portfolios and identified patterns:
- Most are static pages or PDFs
- Few demonstrate technical skills beyond design
- Almost none have interactive elements
- Case studies often lack depth on PM-specific decisions

**Opportunity**: A portfolio that works like a product—interactive, technically impressive, and demonstrating the skills it claims to showcase.

### Design Research

Drew inspiration from:
- **Linear**: Minimal interface with subtle details
- **Stripe**: Technical but accessible documentation
- **CatchIT!**: My own pixel-art design system (subtle personality)

---

## Approach & Key Decisions

### Decision 1: Tech Stack

**Options:**
1. **No-code (Webflow, Framer)** - Fast but limited, doesn't showcase technical skills
2. **Static site generator (Astro, Hugo)** - Fast, but harder to add dynamic features
3. **Next.js + TypeScript** - Full control, demonstrates real engineering capability

**Choice**: Next.js 14 with TypeScript. Hiring managers can review the public GitHub repo and see production-quality code.

### Decision 2: RAG Infrastructure

**Options:**
1. **Pinecone** - Popular vector database, managed service
2. **PostgreSQL + pgvector** - Open source, single database, no vendor lock-in
3. **In-memory (no persistence)** - Simpler but doesn't scale

**Choice**: PostgreSQL + pgvector. Demonstrates understanding of database architecture without adding external dependencies. Single database for content and vectors.

### Decision 3: Design Philosophy

**Options:**
1. **Full pixel-art aesthetic** - Memorable but might feel unprofessional for PM roles
2. **Corporate minimal** - Safe but forgettable
3. **Professional minimal with pixel-art accents** - Best of both worlds

**Choice**: Professional minimalist with subtle CatchIT! pixel-art elements. Serious enough for enterprise PM roles while showing personality.

### Decision 4: Content Structure

**Initial approach**: 3 company-level case studies (CatchIT!, RatedPower, Maxem)

**Revised approach**: 10 feature-level case studies across 5 companies + this portfolio. Each case study focuses on a specific product feature I led, showing deeper PM thinking rather than broad company overviews.

### Decision 5: Development Process

**Options:**
1. **Build everything then deploy** - Risk of scope creep
2. **Iterative with manual testing** - Slow feedback loops
3. **Phase-based with TDD and PR reviews** - Structured but thorough

**Choice**: 13 phases with feature branches, pull requests, and test-driven development. Each phase delivers working functionality. Claude Code assists with implementation while I make product decisions.

---

## Execution

### Phase-Based Development

Structured into 13 phases:
1. Case studies structure (components + types)
2. CatchIT! case study with Figma embed
3. RatedPower & Maxem case studies
4. PostgreSQL + pgvector database setup
5. Content embedding pipeline
6. RAG retrieval implementation
7. Chat API endpoint
8. Chatbot UI component
9. Product Playbook section
10. Navigation component
11. Contact section
12. Responsive polish
13. Deployment to Vercel

**Current status**: Phase 4 complete, content restructuring in progress.

### Test-Driven Development

- Tests written before implementation
- 80%+ code coverage requirement
- Component tests for UI, integration tests for API routes
- All tests must pass before merging

### Content-First Approach

After completing Phase 4, I realized the case study content wasn't structured optimally. Paused code implementation to:
- Define all content in markdown files first
- Restructure from 3 company-level to 10 feature-level case studies
- Add new pages (timeline, map of countries lived in)

This is product thinking applied to a portfolio project—validating content before building the container.

### Claude Code as Development Partner

Using Claude Code for:
- Implementation assistance (code generation, debugging)
- Architecture discussions
- Test writing
- Documentation

I make all product decisions; Claude Code accelerates execution.

---

## Results & Impact

| Metric | Target | Status |
|--------|--------|--------|
| Development phases | 13 | 4 complete |
| Test coverage | 80%+ | On track |
| Case studies | 10 | 2 complete (RatedPower, Maxem) |
| RAG chatbot | Functional | In progress |
| Deployment | Live by Jan 15 | On track |

### Learnings (So Far)

- **Content-first development**: Define what you're building before how. Saved significant rework by restructuring case studies early.

- **Phase-based delivery**: Small, complete increments are easier to validate and debug than big-bang releases.

- **TDD pays off**: Writing tests first caught edge cases early and made refactoring safer.

- **AI-assisted development**: Claude Code accelerates implementation but doesn't replace product thinking. Best results come from clear requirements and architectural decisions.

- **Portfolio as product**: Applying PM principles (user research, prioritization, iteration) to a personal project demonstrates those skills more effectively than just describing past work.

---

## Artifacts

- [GitHub Repository](https://github.com/itsamimario/Portfolio)
- [Live Site](https://mariobennekers.com) *(pending deployment)*

---

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS
- **Database**: PostgreSQL + pgvector
- **AI**: Claude API (Anthropic) for RAG
- **Fonts**: Catchitfont (pixel-art), Inter, JetBrains Mono
- **Deployment**: Vercel, Supabase (production database)
- **Development**: Claude Code, Jest, React Testing Library

---

## Skills Demonstrated

- [x] Product thinking
- [x] Design
- [x] TypeScript/React
- [ ] RAG implementation *(in progress)*
- [ ] AI evaluation *(planned)*
- [x] Hands-on execution
