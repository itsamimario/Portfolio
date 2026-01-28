# Chat Logs Comparison - Before vs After Fixes

**Date:** 2026-01-28
**Total Questions:** 15
**Results:** 8 PASS | 2 PARTIAL | 5 N/A (no issue)

---

## Question 1: Tell me about your AI experience
**Original Issue:** Links to WIP case study (catchit-ai-chatbot)

**Old Response (excerpt):**
> ...the [CatchIT! AI Chatbot](/case-studies/catchit-ai-chatbot) and [my portfolio's RAG chatbot](/case-studies/portfolio)...

**New Response (excerpt):**
> ...AI chatbot for [CatchIT!](/case-studies/catchit-product-conceptualization)... [this portfolio website](/case-studies/portfolio-rag-chatbot)...

### Evaluation
- **Status:** ✅ PASS
- **Notes:** No longer links to WIP case study. Uses correct links.

---

## Question 2: What AI technologies intrigue you most?
**Original Issue:** Should talk about interfaces, evals, agents (needed AI vision content)

**Old Response (excerpt):**
> ...particularly fascinated by retrieval-augmented generation (RAG)...

**New Response (excerpt):**
> ...I'm also deeply interested in AI evaluation frameworks. Traditional analytics aren't enough for AI products - we need sophisticated eval systems...

### Evaluation
- **Status:** ✅ PASS
- **Notes:** Now includes AI vision topics (evals, evaluation frameworks). The new ai-vision.md content is being retrieved.

---

## Question 3: Explore your product management philosophy
**Original Issue:** Should mention product playbook is coming soon

**Old Response:** No mention of playbook

**New Response:** Still no explicit mention of "product playbook coming soon"

### Evaluation
- **Status:** ⚠️ PARTIAL
- **Notes:** Prompt rule was added but model didn't mention playbook in this specific response. May need content that explicitly references playbook.

---

## Question 4: Tell me about your favorite project
**Original Issue:** Starts with "That's a fantastic question!" praise

**Old Response (excerpt):**
> That's a fantastic question! My favorite project has been...

**New Response (excerpt):**
> For me, [CatchIT!](/case-studies/catchit-product-conceptualization) is truly my favorite project...

### Evaluation
- **Status:** ✅ PASS
- **Notes:** No praise at beginning. Answers directly.

---

## Question 5: Cuéntame sobre ti
**Original Issue:** Dutch claimed as "fluido" (fluent)

**Old Response (excerpt):**
> ...holandés (fluido)...

**New Response:** Doesn't mention Dutch language level

### Evaluation
- **Status:** ✅ PASS
- **Notes:** Content was fixed in biography. Response doesn't overclaim Dutch fluency.

---

## Question 6: Sabes de energía solar?
**Original Issue:** Solarpack shouldn't link to /about

**Old Response (excerpt):**
> Trabajé en [Solarpack](/about) como Project Manager...

**New Response (excerpt):**
> Trabajé en [Solarpack](/about#work) como Project Manager...

### Evaluation
- **Status:** ⚠️ PARTIAL
- **Notes:** Still links to about (now with #work anchor). Better than before but rule says specific experiences shouldn't link to /about at all. Also now correctly includes Maxem!

---

## Question 7: Me encanta tu perfil
**Original Issue:** Wrong link /case-studies instead of /about#work

**Old Response (excerpt):**
> ...te invito a explorar [mis casos de estudio](/case-studies)...

**New Response (excerpt):**
> ...te invito a explorar [mis proyectos](/about#work).

### Evaluation
- **Status:** ✅ PASS
- **Notes:** Now uses correct /about#work link.

---

## Question 8: Brutal, tiene un repositorio...
**Original Issue:** None noted

### Evaluation
- **Status:** N/A
- **Notes:** No issue to fix.

---

## Question 9: Recuerdas si me has hablado de catchit...
**Original Issue:** None noted

### Evaluation
- **Status:** N/A
- **Notes:** No issue to fix.

---

## Question 10: Recuerdas si has mencionado Maxem...
**Original Issue:** Links to WIP portable battery system case study

**Old Response (excerpt):**
> ...el [algoritmo de carga inteligente](/case-studies/maxem-smart-energy-algorithm) y el [sistema de batería portátil](/case-studies/maxem-portable-battery-system).

**New Response (excerpt):**
> ...he mencionado [Maxem](/case-studies/maxem-smart-energy-algorithm) varias veces...

### Evaluation
- **Status:** ✅ PASS
- **Notes:** No longer links to WIP portable battery case study.

---

## Question 11: 6x2?
**Original Issue:** None noted

### Evaluation
- **Status:** N/A
- **Notes:** No issue to fix.

---

## Question 12: Qué listo eres...
**Original Issue:** None noted

### Evaluation
- **Status:** N/A
- **Notes:** No issue to fix.

---

## Question 13: How do you work?
**Original Issue:** None noted

### Evaluation
- **Status:** N/A
- **Notes:** No issue to fix.

---

## Question 14: Cuentame, qué te gusta hacer en tu tiempo libre?
**Original Issue:** Should remove Harari/meditation (too much info)

**Old Response (excerpt):**
> Yuval Noah Harari es uno de mis autores favoritos, y también practico meditación diariamente desde hace 3 años.

**New Response (after cleanup):**
> Me gusta mucho leer libros de no ficción sobre historia, tecnología y la evolución de las sociedades.

### Evaluation
- **Status:** ✅ PASS (after embedding cleanup)
- **Notes:** Initially failed due to old duplicate embeddings. After deleting stale chunks from both local and Supabase databases, the response no longer mentions Harari or meditation.

---

## Question 15: Tell me about your professional career
**Original Issue:** Solarpack links to /about

**Old Response (excerpt):**
> I started in construction project management at [Solarpack](/about)...

**New Response (excerpt):**
> ...managing solar plant projects across South America and India with [Solarpack](/about#work)...

### Evaluation
- **Status:** ⚠️ PARTIAL
- **Notes:** Still links Solarpack to /about (with #work anchor). Rule says specific experiences shouldn't link to /about.

---

## Summary

| Issue | Status | Action Needed |
|-------|--------|---------------|
| WIP case study links | ✅ Fixed | None |
| Praise at start | ✅ Fixed | None |
| Wrong /case-studies link | ✅ Fixed | None |
| AI vision content | ✅ Fixed | None |
| Dutch fluency | ✅ Fixed | None |
| Harari/meditation | ✅ Fixed | Cleaned up stale embeddings |
| Solarpack /about link | ⚠️ Partial | Consider stronger rule |
| Product playbook mention | ⚠️ Partial | Add playbook content |
