# Topography Restriction & Earthwork Calculation Tool

**Company:** RatedPower
**Role:** Product Manager
**Period:** 2019 - 2022

---

## Context

### About RatedPower
RatedPower is a cloud-based software platform for designing and engineering utility-scale solar PV plants. The platform automates the entire design process - from site analysis to layout generation, energy yield modeling, and financial analysis - enabling developers to design solar plants 160x faster than manual methods.

### The Business Situation
RatedPower's initial focus was on **preliminary designs and basic engineering** - the phase where 90% accuracy is acceptable because developers need speed and volume to apply for as many grid connection points as possible. In this phase, velocity matters more than perfection: developers need confidence they're not committing to build something unbuildable, but don't need 100% precision yet.

### The Problem
Solar plants are often built on terrain with significant slopes. Depending on the structure type, there are limits to how much slope a structure can handle. Before this feature, we only provided users with a **slope heat map** (green to red visualization) generated from SRTM 30 data (Google Maps public elevation data with only 30-meter precision).

This left users with a painful workflow:
- See red areas on the map → manually remove them from available area
- But they suspected some "red" areas could still work with the right structures
- No way to validate without manually placing structures and checking restrictions
- Risk aversion led to excluding potentially usable land

### The Business Opportunity
**Competitive pressure:** Competitors like PVCase (AutoCAD plugins) already allowed users to upload topography files and validate structure placement against slope restrictions. We were losing potential customers specifically because of this capability gap.

**Differentiation opportunity:** While competitors could validate restrictions, none offered automated **earthwork calculations** - the cost of moving earth to make a location buildable. This is one of the major costs in solar plant civil works, and providing it within our automated workflow would be a significant competitive advantage.

---

## Discovery & Research

### Building the Feedback Pipeline
I led the implementation of a structured feedback pipeline used by Sales and Customer Success teams to systematically gather and classify customer requests. This database allowed us to:
- Track how many companies requested specific features
- Distinguish between current clients, prospects, and lost deals
- Identify exactly which companies were asking for what

**This feature was at the top of the list.** We could trace that we had lost specific deals to PVCase because of this capability gap. I personally joined customer calls with Sales and CS when speaking with larger clients, hearing firsthand their frustration with our slope map limitations.

### Hands-on Research
Once we decided to prioritize, I went deep:

1. **Customer Interviews:** Contacted clients who had requested or mentioned this feature to understand exactly what problem they were facing and how they were solving it today.

2. **Competitive Analysis:** Tested competitor tools myself - PVCase and others - to understand their approach and limitations.

3. **Domain Expertise:** As a civil engineer who had previously worked on PV plant construction, I reached out to former colleagues who sent me the internal Excel/AutoCAD tools they had built for these calculations. This gave me a complete view of the solution landscape.

4. **Workflow Mapping:** Used Excel and AutoCAD directly to understand the manual workflow, identifying pain points and automation opportunities.

### Prioritization
The decision was unanimous once we had the data:
- Top of our customer request list
- Requested by our biggest clients and highest-value prospects
- Clear link to lost deals

**Managing Constraints:** The ideal engineer for this feature was busy with another critical project (energy production estimation). Rather than wait, I ran discovery in parallel with his other work - defining the problem, mapping solutions, and preparing requirements. By the time he finished, we had a clear spec ready to build.

---

## Approach & Key Decisions

### Phased Delivery
We implemented this feature in **3 phases over ~6 months**, allowing validation with customers between releases:

| Phase | Feature | Key Challenge |
|-------|---------|---------------|
| 1 | Custom topography upload | File format standardization, interpolation tuning |
| 2 | Structure restriction validation | Defining slope restrictions, profile visualization |
| 3 | Earthwork calculations | Accuracy vs. computational efficiency |

### Phase 1: Custom Topography Upload

**Build vs. Buy Decision:** Used existing **Nearest Neighbor Interpolation (NNI)** algorithm rather than building from scratch. This allowed us to interpolate terrain height at each structure pole location from uploaded survey data.

**Technical Challenge:** NNI required extensive tuning - parameters like number of interpolation points and maximum distance significantly affected results. We tested against diverse real-world examples to find optimal configuration.

**Why NNI over TIN?** We evaluated Triangulated Irregular Network (TIN) but chose NNI because:
- Much more computationally efficient
- Results nearly identical when properly configured
- Better suited for our automated, high-volume workflow

**File Format Decision:** After gathering topography files from multiple clients, we found CAD files varied wildly in geographic references, scale, and formatting. We decided to support only **CSV/XYZ files with UTM coordinates** - a standardized format common among topographers. This reduced edge cases and support burden significantly.

### Phase 2: Structure Restriction Validation

**Custom Algorithm:** No existing solution fit our needs, so we built our own:

1. **Structure Definition:** Define each structure type with its slope restrictions (max terrain slope, max pole height, min ground clearance)

2. **Terrain Profile Analysis:** For each structure, paint the terrain profile below it

3. **Optimal Placement:** Calculate the straight line (structure plane) that sits closest to terrain while respecting all constraints - minimum ground clearance, maximum pole heights, keeping poles as short as possible

**Bonus Output:** This calculation naturally produced CAD profile drawings showing exactly how each structure sat relative to terrain - valuable documentation clients could use for validation.

### Phase 3: Earthwork Calculations

**The Approach:** When a structure couldn't fit within slope restrictions, calculate how much earth to move to make it work. Our algorithm modified the terrain below each structure individually to allow the required slope.

**Trade-off: Speed vs. Accuracy**
- Our per-structure approach was computationally fast
- Real earthwork projects consider interactions between adjacent structures and terrain terraces
- We validated against real examples and confirmed we stayed within **90% accuracy** - acceptable for preliminary design phase
- The increase in accuracy from modeling structure interactions wasn't worth the computational cost and development time

### What We Explicitly Decided NOT to Do

1. **No inter-structure earthwork modeling:** Calculating how earthwork for one structure affects neighbors would dramatically increase complexity and computation time without meaningful accuracy gains for preliminary design.

2. **No CAD file support (Phase 1):** Too much variation in geographic references, scales, and formatting. Standardizing on CSV/XYZ with UTM was the pragmatic choice.

---

## Execution

[TODO: How did you ship it?]
- Timeline and phases
- Cross-functional collaboration (engineering, design, domain experts)
- Technical challenges
- Iterations and pivots

---

## Results & Impact

[TODO: What were the outcomes?]

| Metric | Value | Description |
|--------|-------|-------------|
| [Metric 1] | [Value] | [Description] |
| [Metric 2] | [Value] | [Description] |

### Business Impact
- [TODO: Won back customers? Reduced churn? New sales?]

### User Outcomes
- [TODO: Time saved? Better designs? More land utilized?]

### Learnings
- [TODO: What did you learn?]

---

## Artifacts

[TODO: Screenshots, diagrams, links to relevant materials]

---

## Skills Demonstrated

- [x] Business orientation (competitive response, revenue protection)
- [ ] User research
- [x] Technical depth (understanding topography, slope calculations, file formats)
- [ ] Data-driven decisions
- [ ] Cross-functional leadership
- [ ] Hands-on execution
