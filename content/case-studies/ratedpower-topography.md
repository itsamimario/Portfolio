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

### The Solution (Three Parts)

**1. Structure Placement Validation**
Allow the software to automatically check if each structure placement complies with slope restrictions, not just show a color-coded map.

**2. Custom Topography Upload**
Let users upload their own topography files for accurate analysis when they have surveyed data. Fall back to SRTM 30 (Google Maps) data for preliminary analysis when they don't.

**3. Earthwork Calculations**
When a structure doesn't comply with restrictions, calculate the amount of earthwork needed to make it buildable - a capability competitors didn't have.

### Options Considered
[TODO: What alternatives did you evaluate?]

### Trade-offs Evaluated
[TODO: What trade-offs did you weigh?]
- Accuracy vs. speed?
- Build vs. buy?
- Scope decisions?

### Why This Approach
[TODO: Why did you choose this path?]

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
