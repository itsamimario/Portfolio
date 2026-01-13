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

**Bonus Output:** This calculation naturally produced CAD profile drawings showing exactly how each structure sat relative to terrain - valuable documentation clients could use for validation. We also included pile measurement calculations accounting for terrain slopes and manufacturer limitations.

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

### Cross-functional Collaboration
The **Customer Success team** (industrial engineers themselves) was deeply involved throughout:
- Gathered detailed feedback from customers facing topography challenges
- Helped test and validate implementations against real-world scenarios
- Connected me directly with customers for validation calls

### Customer Validation Process
I embedded myself in the feedback loop:
- Asked CS to include me in calls with customers who had complained about the missing feature
- As the solution took shape, I shared our approach with these customers to validate it would meet their needs
- Maintained a group of **4-5 power users** who I updated regularly to validate ideas before building

### Professional Deliverables
We built professional report exports (.pdf, .docx) containing all calculations, profiles, and earthwork volumes - documentation that stakeholders (investors, regulators) required for project approval.

### No Major Pivots
The thorough discovery process paid off - when we had to choose between approaches (NNI vs TIN, per-structure vs global earthworks), we had the data to decide confidently. We didn't have to backtrack on any major decisions.

---

## Results & Impact

### Business Impact

**Won back lost customers:** Several clients who had chosen PVCase the previous year switched to RatedPower after this release.

**Shifted market perception:** RatedPower's positioning evolved from "software for very early designs that needed no accuracy" to "sophisticated tool that developers could use for detailed engineering without hiring an engineer."

**Opened new market segment:** The earthwork calculations caught the attention of technical users at companies who had previously dismissed our software. Some became customers after comparing our results against their manual methods.

### Adoption & Efficiency

| Feature | Adoption | Notes |
|---------|----------|-------|
| Topography Restrictions | Very high | Easy to use with default Google Maps data - almost all designs started using it |
| Earthwork Calculations | Moderate | Required more user expertise, but users who adopted it were impressed |

**Processing time:** What previously took engineers weeks of manual work in AutoCAD/Excel now completed in minutes within our automated workflow.

### User Feedback

**Positive:**
- Impressed that a fully automated tool could provide earthwork calculations
- Users understood and accepted the speed vs. accuracy trade-off for preliminary design
- Changed perception of cloud tools: "as accurate as AutoCAD but with collaboration, no expensive hardware, safe storage, and easy iteration"

**Constructive:**
- Some technical users found accuracy gaps too large for their needs - expected and acceptable, as they weren't in our target phase of the design process
- Feedback helped shape roadmap for future accuracy improvements

### Learnings

1. **Domain knowledge compounds:** My civil engineering background and PV construction experience accelerated discovery and helped me speak credibly with technical users.

2. **Focus on your value proposition:** Speed and efficiency with "good enough" accuracy was the right trade-off for our target users. Trying to match AutoCAD's precision would have slowed us down without meaningful benefit.

3. **Customer Success is a product superpower:** CS team's direct line to customer pain points and their engineering expertise made them invaluable partners throughout discovery, validation, and iteration.

4. **Phased releases reduce risk:** Shipping in 3 phases let us validate with real users between releases, building confidence in our approach before investing in more complex features.

---

## Artifacts

- [RatedPower Earthwork Tool](https://ratedpower.com/platform/earthwork/) - The feature I built is now one of RatedPower's flagship capabilities, marketed as a major platform differentiator

[TODO: Add screenshots from original implementation if available]

---

## Skills Demonstrated

- [x] Business orientation (competitive response, revenue protection)
- [x] User research (customer interviews, power user validation group)
- [x] Technical depth (topography, slope calculations, interpolation algorithms)
- [x] Data-driven decisions (feedback pipeline, validation against real examples)
- [x] Cross-functional leadership (CS team collaboration, engineering alignment)
- [x] Hands-on execution (tested competitors, used domain expertise)
