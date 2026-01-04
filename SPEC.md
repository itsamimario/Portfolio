# Portfolio Project Specification

**Project:** Mario Bennekers Professional Portfolio
**Deadline:** January 15, 2026 (11 days remaining)
**Goal:** Land a Product Manager role with a standout portfolio featuring RAG chatbot
**Approach:** Professional minimalist with subtle pixel-art elements

---

## 🎯 Project Objectives

### Primary Goal
Build a professional portfolio that demonstrates:
1. **Strategic PM thinking** - Case studies showing product impact
2. **Technical capabilities** - Clean TypeScript/Next.js code, AI integration
3. **Unique differentiator** - RAG chatbot powered by Claude API

### Success Metrics
- ✅ Deployed live portfolio by January 15, 2026
- ✅ RAG chatbot functional with 95%+ response quality
- ✅ 3 compelling case studies (CatchIT!, RatedPower, Maxem)
- ✅ Public GitHub repository with clean, documented code
- ✅ Mobile-responsive professional design

---

## 🏗️ Technical Architecture

### Stack
**Frontend:**
- Next.js 14 (App Router)
- React 18
- TypeScript (strict mode)
- Tailwind CSS

**Backend:**
- Next.js API Routes
- PostgreSQL + pgvector (local: PostgreSQL, production: Supabase)
- Claude API (Anthropic) for RAG

**Deployment:**
- Vercel (hosting)
- GitHub (public repository)
- Custom domain: TBD

### Project Structure
```
/
├── app/
│   ├── layout.tsx              # Root layout with fonts
│   ├── page.tsx                # Home page
│   ├── api/
│   │   └── chat/
│   │       └── route.ts        # RAG chatbot endpoint
│   └── globals.css             # Global styles
├── components/
│   ├── Hero.tsx                # Hero section
│   ├── About.tsx               # About section
│   ├── Skills.tsx              # Skills section
│   ├── CaseStudies.tsx         # Case studies grid
│   ├── CaseStudy.tsx           # Individual case study
│   ├── Chatbot.tsx             # RAG chatbot UI
│   ├── ProductPlaybook.tsx     # Product playbook
│   ├── Contact.tsx             # Contact section
│   └── Navigation.tsx          # Nav component
├── lib/
│   ├── db.ts                   # Database connection
│   ├── embeddings.ts           # Vector embeddings logic
│   ├── rag.ts                  # RAG implementation
│   └── claude.ts               # Claude API client
├── types/
│   ├── chat.ts                 # Chat types
│   └── content.ts              # Content types
├── public/
│   └── fonts/
│       ├── Catchifont-regular.ttf
│       └── Catchifont-bold.ttf
└── SPEC.md                     # This file
```

---

## 🎨 Design System

### Visual Approach
**Philosophy:** Professional minimalist with subtle pixel-art personality from CatchIT!

**Typography:**
- Headlines: Catchitfont (pixel-art, display)
- Body: Inter (Google Font, readable)
- Code: JetBrains Mono (monospace)

**Color Palette:**
- Primary: `#2563EB` (professional blue)
- Secondary: `#10B981` (accent green)
- Background: `#FFFFFF` / `#F9FAFB` (white/light grey)
- Text: `#111827` (dark grey)
- Pixel accents: Catchit brand colors (subtle use)

**Spacing & Layout:**
- Generous white space
- Clean section divisions
- Mobile-first responsive design
- Max content width: 1200px

**Components:**
- Minimal cards with subtle hover effects
- Clean buttons (primary/secondary)
- Subtle animations (no aggressive motion)
- Pixel-art details as accents, not dominant

---

## 📋 Features Specification

### 1. Hero Section
**Requirements:**
- Name in Catchitfont (pixel-art typography)
- Professional tagline showcasing PM + technical skills
- Two CTAs:
  - Primary: "Talk to my AI assistant" (opens chatbot)
  - Secondary: "View Case Studies" (scrolls to case studies)
- Clean background with subtle pixel-art animation
- Mobile responsive

**Content:**
```
Headline: "Mario Bennekers"
Subheadline: "Product Manager & Technical Builder"
Tagline: "I combine strategic product thinking with hands-on technical
execution to build products that scale and teams that thrive."
```

### 2. About Section
**Requirements:**
- Brief intro (1-2 paragraphs)
- Background highlights (education, experience, current role)
- Languages badges (ES/EN/NL)
- Key strengths (4-5 bullet points)
- What I do (product management approach)

**Content:** See draft-portfolio.md lines 38-59

### 3. Skills Section
**Requirements:**
- Three categories:
  1. Product Management Skills
  2. Technical Skills (Frontend/Backend/AI/Design/Tools)
  3. Languages
- Clean grid layout
- Icon + label for each skill
- Subtle hover effects

**Content:** See draft-portfolio.md lines 63-86

### 4. Case Studies ⭐
**Requirements:**
- Grid of 3 case study cards
- Each card shows: title, role, key metric, thumbnail
- Click opens detailed case study page/section
- Must include:
  1. **CatchIT!** - with embedded Figma design system
  2. **RatedPower** - €230k → €2.5M growth story
  3. **Maxem Energy** - B2B SaaS leadership

**Case Study Template:**
- Role & timeframe
- The Challenge
- My Approach (numbered steps)
- Key Decisions
- Results (metrics)
- Tech Stack
- Links (Figma, live site, blog post)

**Content:** See draft-portfolio.md lines 120-196

### 5. RAG Chatbot 🤖 (Star Feature)
**Requirements:**

**Database Setup:**
- PostgreSQL with pgvector extension
- Schema:
  ```sql
  CREATE TABLE embeddings (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    embedding vector(1536),
    metadata JSONB,
    created_at TIMESTAMP DEFAULT NOW()
  );
  CREATE INDEX ON embeddings USING ivfflat (embedding vector_cosine_ops);
  ```

**Content to Embed:**
- CV/resume
- Case studies (all 3)
- Product Playbook
- Skills & experience details

**API Route (`/api/chat`):**
1. Receive user query
2. Generate query embedding (Claude API)
3. Vector similarity search (pgvector)
4. Retrieve top 5 relevant chunks
5. Construct prompt with context
6. Call Claude API for response
7. Return response to UI

**UI Component:**
- Chat interface (messages list + input)
- Example questions displayed initially:
  - "What experience does Mario have in product management?"
  - "How did Mario scale the team at RatedPower?"
  - "What frameworks does Mario use for product discovery?"
- Loading states (subtle pixel-art animation)
- Error handling
- Mobile responsive

**Tech Note Displayed:**
"Built with Next.js, TypeScript, PostgreSQL + pgvector, and Claude API"

### 6. Product Playbook
**Requirements:**
- 4 main sections:
  1. Vision & Alignment
  2. Discovery & Validation
  3. Delivery Rituals
  4. Launch & Growth
- Each section: description + 3-4 practices
- Optional: Example artifacts (opportunity tree, roadmap snapshot)

**Content:** See draft-portfolio.md lines 198-237

### 7. Contact Section
**Requirements:**
- Headline: "Let's work together"
- Supporting copy (1-2 sentences)
- Contact methods:
  - Email: m.bennekers@gmail.com
  - WhatsApp: +34 633 04 04 23
  - LinkedIn: linkedin.com/in/mariobennekers
  - GitHub: github.com/mariobennekers
  - Calendar link (optional)
- Location: Madrid, Spain (remote-friendly)

### 8. Footer
**Requirements:**
- Copyright © 2026 Mario Bennekers
- Tech stack note: "Built with Next.js, TypeScript, and PostgreSQL"
- Link to GitHub source code
- Subtle pixel-art easter egg (optional)

### 9. Navigation
**Requirements:**
- Fixed/sticky header (appears on scroll)
- Links: About, Skills, Case Studies, Playbook, Contact, Chat
- Mobile hamburger menu
- Smooth scroll behavior

---

## 🧪 Development Principles

### Test-Driven Development
- Write tests BEFORE implementation
- Minimum 80% code coverage
- Test files alongside components: `Component.test.tsx`
- API routes must have integration tests

### Code Quality
- TypeScript strict mode enabled
- ESLint + Prettier configured
- No `any` types (use proper typing)
- Meaningful variable/function names
- Comments only where logic is non-obvious

### Git Workflow
- Feature branches for each phase: `phase-N-description`
- Commit messages: "feat: description" or "fix: description"
- Open PR for each phase
- PR reviewed by Claude Code via GitHub Actions
- Create GitHub issues for review comments (parallel fixes later)

### Performance
- Optimize images (Next.js Image component)
- Lazy load components where appropriate
- Minimize bundle size
- Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1

---

## 📅 Development Phases

### Phase 1: Case Studies Structure
**Branch:** `phase-1-case-studies-structure`
**Goal:** Build reusable case study components

**Tasks:**
- Create `CaseStudy.tsx` component (reusable template)
- Create `CaseStudies.tsx` grid component
- Add case studies data structure in `types/content.ts`
- Style with Tailwind (professional minimal)
- Write tests

**Deliverable:** Case studies grid with placeholder content

---

### Phase 2: CatchIT! Case Study
**Branch:** `phase-2-catchit-case-study`
**Goal:** Complete CatchIT! case study with Figma embed

**Tasks:**
- Add CatchIT! content to case study data
- Embed Figma design system (iframe or embed)
- Add images/screenshots
- Ensure mobile responsive
- Write tests

**Deliverable:** Fully functional CatchIT! case study

---

### Phase 3: RatedPower & Maxem Case Studies
**Branch:** `phase-3-ratedpower-maxem-case-studies`
**Goal:** Complete remaining case studies

**Tasks:**
- Add RatedPower content (€230k → €2.5M growth)
- Add Maxem Energy content
- Add metrics visualizations (optional)
- Write tests

**Deliverable:** All 3 case studies complete

---

### Phase 4: Database Setup for RAG
**Branch:** `phase-4-database-setup`
**Goal:** Set up PostgreSQL + pgvector

**Tasks:**
- Create database schema
- Set up pgvector extension
- Create migration scripts
- Add database connection in `lib/db.ts`
- Write database tests
- Document setup in README.md

**Deliverable:** Database ready for embeddings

---

### Phase 5: Content Embedding
**Branch:** `phase-5-content-embedding`
**Goal:** Generate and store embeddings

**Tasks:**
- Create embedding generation script (`lib/embeddings.ts`)
- Prepare content files (CV, case studies, playbook)
- Chunk content appropriately (500-1000 tokens)
- Generate embeddings via Claude API
- Store in PostgreSQL with metadata
- Write tests

**Deliverable:** Database populated with embeddings

---

### Phase 6: RAG Implementation
**Branch:** `phase-6-rag-implementation`
**Goal:** Build RAG retrieval and generation logic

**Tasks:**
- Create `lib/rag.ts` with:
  - Query embedding function
  - Vector similarity search
  - Context retrieval
  - Prompt construction
- Create `lib/claude.ts` API client
- Write comprehensive tests
- Document RAG flow

**Deliverable:** Working RAG logic (backend)

---

### Phase 7: Chat API Route
**Branch:** `phase-7-chat-api-route`
**Goal:** Build Next.js API endpoint for chat

**Tasks:**
- Create `/app/api/chat/route.ts`
- Implement POST handler:
  1. Validate request
  2. Generate query embedding
  3. Retrieve relevant context (RAG)
  4. Call Claude API
  5. Return response
- Add error handling
- Rate limiting (optional)
- Write integration tests

**Deliverable:** Functional `/api/chat` endpoint

---

### Phase 8: Chatbot UI
**Branch:** `phase-8-chatbot-ui`
**Goal:** Build chat interface component

**Tasks:**
- Create `Chatbot.tsx` component
- Message list with user/assistant bubbles
- Input field with send button
- Example questions displayed initially
- Loading states (pixel-art animation)
- Error handling UI
- Mobile responsive
- Write component tests

**Deliverable:** Complete chatbot UI

---

### Phase 9: Product Playbook
**Branch:** `phase-9-product-playbook`
**Goal:** Build Product Playbook section

**Tasks:**
- Create `ProductPlaybook.tsx` component
- Add 4 sections with content
- Optional: Add example artifacts (images/diagrams)
- Style with Tailwind
- Mobile responsive
- Write tests

**Deliverable:** Product Playbook section complete

---

### Phase 10: Navigation Component
**Branch:** `phase-10-navigation`
**Goal:** Build navigation header

**Tasks:**
- Create `Navigation.tsx` component
- Sticky/fixed header on scroll
- Smooth scroll to sections
- Mobile hamburger menu
- Active section highlighting
- Write tests

**Deliverable:** Fully functional navigation

---

### Phase 11: Contact Section
**Branch:** `phase-11-contact`
**Goal:** Build contact section

**Tasks:**
- Create `Contact.tsx` component
- Add all contact methods (email, WhatsApp, LinkedIn, GitHub)
- Calendar integration (optional)
- Style with Tailwind
- Mobile responsive
- Write tests

**Deliverable:** Contact section complete

---

### Phase 12: Responsive Polish
**Branch:** `phase-12-responsive-polish`
**Goal:** Ensure mobile responsiveness across all sections

**Tasks:**
- Test on mobile (375px, 768px, 1024px, 1440px)
- Fix any layout issues
- Optimize images
- Check Core Web Vitals
- Add meta tags for SEO

**Deliverable:** Fully responsive portfolio

---

### Phase 13: GitHub & Deployment
**Branch:** `phase-13-deployment`
**Goal:** Deploy to production

**Tasks:**
- Create public GitHub repository
- Push all code
- Configure Vercel deployment
- Set up Supabase (production database)
- Configure environment variables
- Test production deployment
- Configure custom domain (optional)

**Deliverable:** Live portfolio at production URL

---

## 📊 Success Criteria

### Functional Requirements
- ✅ All sections render correctly
- ✅ RAG chatbot responds accurately (95%+ quality)
- ✅ Mobile responsive (all breakpoints)
- ✅ No console errors
- ✅ All tests passing

### Performance Requirements
- ✅ Lighthouse score > 90 (all categories)
- ✅ LCP < 2.5s
- ✅ FID < 100ms
- ✅ CLS < 0.1

### Code Quality
- ✅ TypeScript strict mode (no errors)
- ✅ Test coverage > 80%
- ✅ ESLint passing
- ✅ No security vulnerabilities (npm audit)

---

## 🔑 Environment Variables

Create `.env.local`:
```bash
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/portfolio

# Claude API
ANTHROPIC_API_KEY=sk-ant-xxx

# Production (Supabase)
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_KEY=xxx
```

---

## 📝 Notes

### Current Status (January 4, 2026)
- ✅ Project initialized
- ✅ Hero, About, Skills sections complete
- ✅ Catchitfont integrated
- ⏳ Ready for Phase 1 (Case Studies)

### Key Decisions
1. **PostgreSQL + pgvector** over Pinecone (open source, single database, no vendor lock-in)
2. **Professional minimalist** design over full pixel-art (appropriate for PM roles)
3. **RAG chatbot** as star differentiator (demonstrates AI capabilities)
4. **Test-driven development** to ensure quality and maintainability

---

## 🔗 References

**Design Inspiration:**
- Linear (minimal with subtle details)
- Stripe (technical but accessible)

**Technical Documentation:**
- Next.js 14 App Router: https://nextjs.org/docs
- Supabase pgvector: https://supabase.com/docs/guides/ai
- Claude API: https://docs.anthropic.com/claude/reference/getting-started-with-the-api

**Content Sources:**
- `draft-portfolio.md` - Content specifications
- `portfolio-personal.md` - Project tracking
- `.claude/CLAUDE.md` - Project instructions

---

**Last Updated:** January 4, 2026
**Next Phase:** Phase 1 - Case Studies Structure
