# Ecometro - Product Strategy & Architecture Refactor

**Company:** Ecometro
**Role:** Product Consultant
**Period:** 2024 (9 months, 4 months execution)

---

## Context

Ecometro is a pioneer in Life Cycle Analysis (LCA) for buildings in Spain—a consulting firm with recognized experts who participate in government advisory boards shaping sustainability regulations. Their software platform calculates environmental impacts of building materials, but it was built by an external consultancy that stopped providing services in 2023, leaving the company without technical ownership of their own product.

I joined as an external product consultant to establish an internal product team, internalize development knowledge, and define a product strategy that could scale beyond the consulting model—especially with EU regulations (EPBD 2024, Spain CTE 2026) about to make LCA mandatory for all new buildings. The board wanted to focus on small clients to democratize LCA, but I convinced them that targeting larger firms—who could sustain the P&L—was the precondition for eventually serving everyone.

---

## Discovery & Research

Hired a fullstack engineer to take ownership of the codebase and conducted discovery with 10+ architecture firms and construction companies including AEDAS Home, Metrovacesa, ARUP, and Morph Studio.

The critical insight: the software only accepted BC3 files (a Spanish construction measurement format), forcing users through a rigid workflow. But the market was moving toward BIM (Building Information Modeling), and larger firms already had their building data in BIM formats. The BC3 limitation meant Ecometro couldn't serve its most valuable potential customers.

Competitive analysis revealed OneClick LCA dominated internationally but lacked adaptability to Spanish regulations and local construction practices—a gap Ecometro's deep regulatory expertise could exploit, but only if the software could accept modern input formats.

---

## Approach & Key Decisions

### The Architecture Problem

The database was tightly coupled to the BC3 file format. Every data structure, calculation, and UI element assumed BC3 as the only input. This wasn't just a feature gap—it was an architectural constraint that blocked any new input format.

### The Solution: Decouple the Database

Rather than adding BIM as a parallel input path (which would duplicate logic and create maintenance nightmares), I defined a strategy to decouple the database from the BC3 format entirely. This meant:

1. Abstracting the data model to represent building impacts independently of their source format
2. Building format-specific importers (BC3 first, then BIM, then APIs)
3. Enabling direct manipulation of impacts through the UI—no file import required

### Why BIM First

After decoupling, we chose BIM as the primary new integration path because:
- Largest firms (our highest-value targets) already worked in BIM
- EU regulations were pushing BIM adoption across the industry
- BIM integration created a defensible moat against OneClick LCA's international scale

### Execution

Found and onboarded a specialized BIM development partner to handle the integration while our internal engineer focused on the core database refactor. This parallel execution let us move on both fronts simultaneously without overloading a small team.

### Validation with Partners

The 3 partner firms investing in BIM integration provided real production files and data, letting us validate format parsing and impact calculations against actual projects. They were co-building with us—not evaluating a finished product—which gave us fast feedback and tolerance for rough edges that paying pilot customers rarely offer.

---

## Results & Impact

| Metric | Value | Description |
|--------|-------|-------------|
| User Growth | 500→1,000 | Active users in 4 months of execution |
| Partnerships | 3 | Strategic partnerships signed |
| Funding Round | Closed | Strategy enabled 2024 round |
| Training | 1 | Program with Colegio de Arquitectos de Madrid |

### Business Impact

The product strategy directly contributed to closing the 2024 funding round by demonstrating a credible path from consulting-dependent revenue to scalable software. Three strategic partnerships validated market demand for the BIM-integrated approach.

### Market Positioning

The training program with Colegio de Arquitectos de Madrid (the architects' professional association) positioned Ecometro as the go-to LCA platform for Spanish professionals ahead of mandatory regulations—building a user base before compliance becomes required.

### Regulatory Timing

The strategy aligned with the regulatory wave: EU EPBD directive (2024) mandating building sustainability assessments, Spain's CTE review (2026) requiring LCA for new buildings, and Net Zero 2030 targets. By decoupling from BC3 and enabling BIM, Ecometro positioned itself to serve the coming surge in demand.

---

## Key Learnings

- Mission and business model can conflict—and that's okay. Framing enterprise revenue as the enabler of democratization resolved the board's tension between serving small firms and financial sustainability.
- Architecture encodes business decisions. The BC3 coupling reflected a consulting model where each client got custom file imports. Decoupling the data model was as much a business model decision as a technical one.
- Validation partners beat pilot customers. Firms co-building with us gave real files, fast feedback, and patience—something paying pilots rarely offer.
- As a consultant, your job is to make yourself replaceable. Hiring the internal engineer, documenting decisions, and building partner relationships meant Ecometro could continue after my engagement ended.
