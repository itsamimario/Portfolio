# Portfolio Website

**Company:** Personal Project
**Role:** Designer & Developer
**Period:** January 2026

---

## Context

Building a professional portfolio to land a Product Manager role, with a RAG-powered chatbot as the star differentiator. The goal: demonstrate both product thinking and hands-on technical execution in a single, cohesive experience.

### Why This Matters
- Hiring managers see dozens of generic portfolios
- A conversational AI assistant showcases practical AI/ML skills
- The chat-first interface demonstrates UX innovation

---

## Discovery & Research

### Target Audience Analysis
- **Primary:** Hiring managers at tech companies looking for PMs with technical depth
- **Secondary:** Recruiters scanning for differentiators
- **Tertiary:** Fellow PMs interested in portfolio approaches

### Competitive Analysis
- Most PM portfolios are static case study collections
- Few demonstrate actual technical implementation
- Almost none have interactive AI components

---

## Approach & Key Decisions

### Architecture Decision: Chat-First Interface
Instead of a traditional portfolio layout, the homepage IS the chat interface. Visitors land directly in a conversational experience.

**Options Considered:**
1. Traditional layout with chatbot in corner widget
2. Separate chat page linked from navigation
3. Chat-first: homepage IS the conversation

**Why Chat-First:**
- Immediate differentiation from other portfolios
- Forces the AI to be good (it's the first thing visitors see)
- Demonstrates confidence in the technical implementation

### Message-Based Architecture
All content (intro text, navigation, user messages, bot responses) rendered as chat messages. This unified approach enables:
- Sequential typing animations
- Consistent styling and behavior
- Smooth transitions between static and dynamic content

---

## Execution

### Sequential Typing Animation
Built a sophisticated typing animation system that reveals intro messages one by one:

**Technical challenges solved:**
- **Layout shifts:** Split intro into 5 separate messages to prevent text "resizing" during animation
- **Animation loops:** Fixed infinite re-render bug by using refs for callbacks instead of effect dependencies
- **Scroll coordination:** Added onTypingUpdate callback that fires on each character for smooth auto-scroll

### React Hooks Architecture
Custom `useTypingAnimation` hook with careful attention to React patterns:
```typescript
// Used refs to avoid triggering effects when callbacks change
const onCompleteRef = useRef(onComplete);
onCompleteRef.current = onComplete;

// Animation ID tracking to prevent stale callbacks
const animationIdRef = useRef(0);
```

### Intersection Observer for Sticky Navigation
When the inline navigation links scroll out of view, a sticky header appears. Implementation required:
- Re-running observer when nav-links message becomes visible (sequential animation)
- Proper cleanup to prevent memory leaks
- Root margin tuning for smooth transition

### RAG Chatbot Implementation
- **Embedding:** OpenAI text-embedding-3-small for content vectorization
- **Storage:** PostgreSQL + pgvector for similarity search
- **Retrieval:** Cosine similarity search with configurable threshold
- **Generation:** Claude API with retrieved context injection

### Test-Driven Development
201 tests covering:
- Component rendering and accessibility
- Hook behavior and state management
- API routes and error handling
- Animation timing and callbacks

---

## Results & Impact

| Metric | Value | Description |
|--------|-------|-------------|
| Test Coverage | 201 tests | Comprehensive TDD approach |
| Content Chunks | 25 | Embedded in vector database |
| Phases Completed | 8/13 | Ahead of schedule |
| Animation States | 5 | Sequential intro messages |

### Technical Learnings
- **React effects are tricky:** Callback dependencies in useEffect can cause infinite loops; refs are the solution
- **Animation UX matters:** Small delays between messages (200ms) feel more natural than instant reveals
- **Intersection Observer gotchas:** Must re-observe when target elements are dynamically added

---

## Artifacts

- [GitHub Repository](https://github.com/itsamimario/Portfolio)
- Live site: [Coming soon]

---

## Tech Stack

Next.js 14, TypeScript, Tailwind CSS, PostgreSQL, pgvector, Claude API, OpenAI Embeddings

---

## Skills Demonstrated

- [x] Product thinking - Chat-first UX as differentiator
- [x] Architecture decisions - Message-based unified content model
- [x] TypeScript/React - Custom hooks, refs, effect management
- [x] RAG implementation - Embeddings, vector search, Claude integration
- [x] Debugging complex bugs - Animation loop fix via ref pattern
- [x] TDD discipline - 201 tests, comprehensive coverage
- [x] UX polish - Sequential animations, sticky nav, cursor behavior
