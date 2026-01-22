# Mario Bennekers Portfolio - Claude Project Context

**Last Updated:** January 20, 2026
**Deadline:** January 15, 2026 (PAST)

## 📋 Primary Reference
**SPEC.md** - Complete technical specification with all features, phases, and architecture

## 🎯 Project Goal
Build a professional minimalist portfolio to land a Product Manager role, featuring a RAG chatbot as the star differentiator.

## 🏠 Homepage Design (Chat-First)
The homepage IS the chat interface. Visitors land directly in a conversational experience.

**Initial State:**
```
Hi! I'm Mario Bennekers, Product Manager

This is my portfolio, feel free to navigate through it
or ask directly any question about myself.

Or you can navigate directly to:
About    Case Studies    Product Playbook    ← Plain text links (no borders)

┌─────────────────────────────────────────┐
│ Ask me anything...                      │  ← Chat input
└─────────────────────────────────────────┘
```

**After User Sends Message:**
- Intro text fades out
- Navigation links become sticky header at top
- Messages appear in scrollable area above input
- Input stays at bottom

## ✅ Completed (Days 1-3)

### Setup & Infrastructure
- ✅ Next.js 14 + TypeScript + Tailwind CSS project initialized
- ✅ Project structure created (app/, components/, lib/, types/, public/)
- ✅ Git repository initialized
- ✅ Catchitfont (pixel-art font) integrated for headlines
- ✅ Tailwind configured with brand colors (#2563EB primary, #10B981 secondary)
- ✅ Environment variables template (.env.example)

### Content Sections Built
- ✅ **Homepage**: Chat-first interface with terminal-style intro
- ✅ **About Page**: Full portfolio (Hero, About, Skills, Case Studies, Footer)
- ✅ **Case Study Pages**: Dynamic routes for detailed case studies

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

### Phase 5: Content Embedding (PR #5 - MERGED ✅)
- ✅ Created `lib/content-loader.ts` - Loads markdown content from files
- ✅ Created `lib/chunker.ts` - Splits content into semantic chunks
- ✅ Created `lib/openai-embeddings.ts` - OpenAI embedding generation
- ✅ Created `types/embeddings.ts` - Type definitions
- ✅ Created `scripts/embed-content.ts` - CLI script to embed all content
- ✅ 25 content chunks embedded in PostgreSQL database
- ✅ All tests passing

### Phase 6: Chat API (PR #6 - MERGED ✅)
- ✅ Created `types/chat.ts` - Chat request/response types
- ✅ Created `lib/chat.ts` - RAG chat service (search + Claude integration)
- ✅ Created `app/api/chat/route.ts` - Next.js API endpoint
- ✅ 18 tests passing (9 service tests + 10 API route tests)
- ✅ Code review approved
- ✅ Security review approved

### Phase 7: Chat UI (PR #7 - MERGED ✅)
- ✅ Created `types/chat-ui.ts` - Chat UI type definitions
- ✅ Created `lib/hooks/useChat.ts` - Custom hook for chat state management
- ✅ Created `components/chat/ChatInput.tsx` - Input with send button
- ✅ Created `components/chat/MessageBubble.tsx` - Message display
- ✅ Created `components/chat/MessageList.tsx` - Scrollable message list
- ✅ Created `components/chat/NavigationLinks.tsx` - Sticky nav links
- ✅ Created `components/chat/ChatContainer.tsx` - Main chat orchestration
- ✅ 112 component tests passing
- ✅ Auto-scroll to new messages
- ✅ Loading indicator with animated dots
- ✅ Input length validation (max 2000 chars)
- ✅ Code review approved
- ✅ Security review approved

### Phase 7b: Chat Flow Refactor (MERGED ✅)
- ✅ Message-based architecture: all content rendered as chat messages
- ✅ Sequential typing animation for intro messages (hi → name → title → description → nav)
- ✅ Split intro into 5 separate messages for smooth animation without layout shifts
- ✅ Navigation links with classic blue underline styling
- ✅ Sticky header appears when nav links scroll out of view
- ✅ Auto-scroll during typing animation
- ✅ Input cursor positioned on left, only visible after intro completes
- ✅ Placeholder text "type something here" when input not focused
- ✅ 201 tests passing

## 🚧 Next Steps

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
│   ├── layout.tsx              # Root layout with fonts
│   ├── page.tsx                # Homepage (chat-first interface)
│   ├── about/page.tsx          # About page (full portfolio)
│   ├── case-studies/[id]/      # Dynamic case study pages
│   └── api/chat/route.ts       # RAG chatbot API endpoint ✅
├── components/
│   ├── TerminalText.tsx        # Animated intro text ✅
│   ├── CaseStudies.tsx         # Case studies grid ✅
│   ├── CaseStudy.tsx           # Individual case study ✅
│   └── chat/                   # Chat UI components ✅
│       ├── ChatContainer.tsx   # Main chat orchestration
│       ├── ChatInput.tsx       # Message input + send
│       ├── MessageBubble.tsx   # Individual message
│       ├── MessageList.tsx     # Scrollable messages
│       └── NavigationLinks.tsx # Sticky navigation
├── lib/
│   ├── db.ts                   # Database connection ✅
│   ├── chat.ts                 # Chat service (RAG) ✅
│   ├── openai-embeddings.ts    # Embedding generation ✅
│   ├── content-loader.ts       # Content loading ✅
│   ├── chunker.ts              # Text chunking ✅
│   └── hooks/
│       └── useChat.ts          # Chat state management hook ✅
├── types/
│   ├── chat.ts                 # Chat types ✅
│   ├── chat-ui.ts              # Chat UI types ✅
│   ├── content.ts              # Content types ✅
│   └── embeddings.ts           # Embedding types ✅
├── content/                    # Markdown content for RAG ✅
├── scripts/embed-content.ts    # Embedding CLI ✅
├── db/schema.sql               # Database schema ✅
├── SPEC.md                     # Complete technical specification
└── README.md                   # Project documentation
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
- Days 1-2 (Jan 4-5): ✅ Setup complete
- Days 3-4 (Jan 6-7): ✅ Hero + About + Skills
- Days 5-7 (Jan 8-10): ✅ Case Studies (Phases 1-3)
- Days 8-9 (Jan 11-12): ✅ Database + Embeddings (Phases 4-5)
- Days 10-11 (Jan 13-14): ✅ Chat API (Phase 6)
- Day 12 (Jan 15): ✅ Chat UI (Phase 7)
- Day 13 (Jan 20): ✅ Chat Flow Refactor (Phase 7b)
- Day 14+: ⏳ Bot response tuning + Product Playbook + Deploy

**Status:** 🟢 Phase 7b complete - 8/13 phases done

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
- ✅ Phase 7 + 7b complete (Chat UI with sequential typing animation)
- 🔄 Next: Tune bot responses and Product Playbook
- Progress: 8/13 phases complete
