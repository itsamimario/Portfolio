# Mario Bennekers Portfolio - Claude Project Context

**Last Updated:** January 4, 2026
**Deadline:** January 15, 2026 (11 days remaining)

## 📋 Primary Reference
**SPEC.md** - Complete technical specification with all features, phases, and architecture

## 🎯 Project Goal
Build a professional minimalist portfolio to land a Product Manager role, featuring a RAG chatbot as the star differentiator.

## ✅ Completed (Days 1-3)

### Setup & Infrastructure
- ✅ Next.js 14 + TypeScript + Tailwind CSS project initialized
- ✅ Project structure created (app/, components/, lib/, types/, public/)
- ✅ Git repository initialized
- ✅ Catchitfont (pixel-art font) integrated for headlines
- ✅ Tailwind configured with brand colors (#2563EB primary, #10B981 secondary)
- ✅ Environment variables template (.env.example)

### Content Sections Built
- ✅ **Hero Section**: Name with pixel-art font, tagline, 2 CTAs (AI assistant, Case Studies)
- ✅ **About Section**: Intro, Background (education, experience, current role, languages), What I do, Key strengths
- ✅ **Skills Section**: Product Management skills, Technical skills (Frontend/Backend/AI/Design/Tools), Languages badges
- ✅ **Footer**: Basic copyright and tech stack

## ✅ Recently Completed

### Phase 1: Case Studies Structure (PR #1 - MERGED ✅)
- ✅ TypeScript types for case studies
- ✅ CaseStudy component (card + full variants)
- ✅ CaseStudies grid component
- ✅ Placeholder data for 3 case studies
- ✅ 27/27 tests passing

### Phase 2: CatchIT! Case Study (PR #2 - MERGED ✅)
- ✅ Real Figma embed URL
- ✅ Clickable case study cards with detail pages
- ✅ Dynamic route /case-studies/[id]
- ✅ CatchIT! thumbnail image
- ✅ All 16 tests passing
- ✅ Consolidated SPEC.md as single source of truth

### Phase 3: RatedPower & Maxem Case Studies (PR #3 - MERGED ✅)
- ✅ RatedPower complete content (€230k → €2.5M growth story)
- ✅ Maxem complete content (B2B platform leadership)
- ✅ Updated all metrics (12+ features, 40% handoff reduction)
- ✅ Fixed thumbnail paths to standard location
- ✅ All 28 tests passing

### Phase 4: PostgreSQL + pgvector Setup (PR #4 - MERGED ✅)
- ✅ Created db/schema.sql with pgvector extension
- ✅ Created db/migrations/001_initial_schema.sql
- ✅ Created lib/db.ts with connection pool and vector search
- ✅ Installed pg and @types/pg dependencies
- ✅ Updated .env.example with DATABASE_URL
- ✅ Documented PostgreSQL setup in README (macOS/Linux/Windows)

## 🚧 Next Steps

### Priority 1: Phase 5 - RAG Chatbot Implementation
- [ ] Embed content (CV, case studies, playbook) into database
- [ ] Create embedding generation utilities
- [ ] Build Chat UI component
- [ ] Implement Next.js API routes for chat
- [ ] Integrate Claude API with RAG retrieval
- [ ] Add example questions UI

### Priority 2: RAG Chatbot ⭐ (Days 11-12)
- [ ] PostgreSQL + pgvector local setup
- [ ] Database schema for embeddings
- [ ] Embed content (CV, case studies, playbook)
- [ ] Chat UI component
- [ ] Next.js API routes for chat
- [ ] Claude API integration
- [ ] Example questions UI

### Priority 3: Product Playbook (Days 13-14)
- [ ] Vision & Alignment section
- [ ] Discovery & Validation section
- [ ] Delivery Rituals section
- [ ] Launch & Growth section
- [ ] Example artifacts (opportunity tree, roadmap snapshot)

### Priority 4: Contact & Polish (Day 15)
- [ ] Contact section (email, WhatsApp, LinkedIn, GitHub, calendar)
- [ ] Navigation component
- [ ] Responsive testing
- [ ] Create public GitHub repository
- [ ] Deploy to Vercel
- [ ] Configure domain

## 📁 Project Structure

```
/Users/mbennekers/Code/Portfolio/
├── app/
│   ├── layout.tsx          # Root layout with fonts
│   ├── page.tsx            # Home page (Hero, About, Skills)
│   └── globals.css         # Global styles + Tailwind
├── components/             # React components (to be built)
├── lib/                    # Utilities (to be built)
├── types/                  # TypeScript types (to be built)
├── public/
│   └── fonts/
│       ├── Catchifont-regular.ttf
│       └── Catchifont-bold.ttf
├── SPEC.md                 # Complete technical specification
└── README.md              # Project documentation
```

## 🛠️ Tech Stack

**Frontend:**
- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Catchitfont (pixel-art typography)

**Backend/Database (Pending):**
- PostgreSQL + pgvector
- Supabase (production deployment)

**AI:**
- Claude API (Anthropic)
- RAG implementation

**Deployment:**
- Vercel (hosting)
- GitHub (public repository)

## 🎨 Design Philosophy

**Approach:** Professional minimalist with subtle pixel-art elements from CatchIT!

**Typography:**
- Headlines: Catchitfont (pixel-art)
- Body: Inter (Google Font)
- Code: JetBrains Mono

**Colors:**
- Primary: #2563EB (blue)
- Secondary: #10B981 (green)
- Background: #FFFFFF / #F9FAFB
- Text: #111827

## 📊 Progress Tracking

**Timeline:**
- Days 1-2 (Jan 4-5): ✅ Setup complete (DONE EARLY on Jan 4)
- Days 3-4 (Jan 6-7): ✅ Hero + About + Skills (DONE EARLY on Jan 4)
- Days 5-7 (Jan 8-10): ✅ Case Studies (Phases 1-3 complete on Jan 4)
- Days 8-9 (Jan 11-12): 🔄 RAG Chatbot (NEXT)
- Days 10-11 (Jan 13-14): ⏳ Product Playbook + polish
- Day 12 (Jan 15): ⏳ Deploy + GitHub + testing

**Status:** 🟢 SIGNIFICANTLY AHEAD OF SCHEDULE (completed 7 days of work in 1 day)

## 🔑 Key Features

1. **RAG Chatbot** - Star differentiator, demonstrates AI skills
2. **Case Studies** - Strategic PM thinking (CatchIT!, RatedPower, Maxem)
3. **Product Playbook** - Frameworks and methodologies
4. **Clean Code** - Public GitHub repo showing technical capabilities
5. **Pixel-art Brand** - Subtle CatchIT! design elements for personality

## 📝 Notes

**Project Documentation:**
- **SPEC.md** is the single source of truth for all technical specifications, features, and phases
- This file (.claude/claude.md) provides quick context for Claude Code sessions
- **Project Tracking File:** `/Users/mbennekers/Documents/WorkSpace/Projects/portfolio-personal.md` - Actualizar este archivo al finalizar sesiones de trabajo

**Development:**
- Dev server runs at: http://localhost:3000
- Font files copied from: /Users/mbennekers/Library/Fonts/
- Ahead of schedule: completed Phases 1 & 2 in 1 day
- Following phase-based development workflow from pedram.md
- All changes tracked via PRs: https://github.com/itsamimario/Portfolio/pulls

**Current Focus:**
- ✅ Phase 4 merged into main
- 🔄 Ready to start Phase 5 - RAG Chatbot Implementation
- Progress: 4/13 phases complete (SIGNIFICANTLY AHEAD OF SCHEDULE)
