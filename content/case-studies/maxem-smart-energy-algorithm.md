# Smart Energy Management Algorithm

**Company:** Maxem Energy
**Role:** Product Manager
**Period:** 2022 - 2023

---

## Context

Maxem is a Dutch energy management company accelerating the energy transition. They started selling a local hardware load balancer for consumers—a device that communicated with charging points, solar panels, batteries, and smart meters to prevent electrical overloads. After pivoting to B2B for industrial facilities, they built a cloud platform (Maxem Energy Cloud) for partners to manage installations.

When I joined, Maxem was considering a major shift: moving load balancing intelligence from hardware to cloud. The concept existed, but nothing was developed. This would be a fundamental product change with high stakes—if the algorithm failed, client EVs wouldn't charge, disrupting logistics operations.

**The opportunity was significant**: no competitor offered a flexible, hardware-agnostic solution that could optimize charging based on solar production, battery storage, driver priorities, and energy market prices. We envisioned a 6-phase roadmap from basic load balancing to a full Virtual Power Plant capability.

---

## Discovery & Research

### Structured De-risking with TRL

Given the critical nature of this system, we adopted the Technology Readiness Levels (TRL) framework for each phase:

- **TRL 1-2**: Concept validation through initial discovery
- **TRL 3**: Algorithm simulator testing across scenarios (also served as a concept tool for the asset manager configuration interface)
- **TRL 4-5**: Real hardware tests in our office lab with charging points and inverters
- **TRL 6-7**: Field tests at client locations with their EVs and ours
- **TRL 8**: First customers with "still in testing" status and close monitoring
- **TRL 9**: Commercial deployment

### Enterprise Stakeholder Research

Working with flagship projects (Watthub—world's largest truck charging station; CTPark Amsterdam—major logistics hub) revealed key insights:

- **Complex stakeholder maps**: Asset managers, facility operators, grid operators, and contractors—sometimes we were subcontractors of subcontractors. Each had different priorities.
- **Hidden requirements**: At one location, grid consumption limitations weren't known until meeting the grid agreement manager. We discovered we needed to handle a time-variable grid limits + the already agreed 1MW windmill + 1MW solar, leading to the planner tool prototype.
- **Communication gaps**: Being removed from the end client caused misunderstandings about our technology readiness. Direct client contact became essential.

### Technical Feasibility Analysis

Cloud vs. local control testing revealed critical constraints:
- Charging points responded slowly to cloud commands
- Cloud signals arrived every 30 seconds vs. 1-second intervals for local hardware
- Internet dependency created unacceptable risk for safety-critical scenarios

---

## Approach & Key Decisions

### Option 1: Cloud-Only Architecture
Replace local hardware entirely with cloud-based control.
- **Pro**: Lower cost for customers, simpler deployment
- **Con**: 30-second response time insufficient for safety; internet dependency unacceptable

### Option 2: Local-Only (Status Quo)
Keep the existing local load balancer without cloud intelligence.
- **Pro**: Proven reliability, fast response
- **Con**: No optimization capabilities, no forecasting, each device operates in isolation

### Option 3: Hybrid Cloud-Local Architecture ✓
Cloud handles intelligence and optimization; simplified local device handles safety.
- **Pro**: Best of both worlds—smart optimization with reliable safety fallback
- **Con**: Requires maintaining two systems; more complex architecture

**Decision**: We chose the hybrid approach. The cloud algorithm became the "brain" handling forecasting, optimization, and complex decisions. The local load balancer was simplified but retained direct meter/charger connections with 1-second response time. If it detected overload approaching, it immediately reduced charging speed—independent of cloud state.

### Phased Rollout Strategy

We structured delivery in 6 phases of increasing complexity:

1. **Socket Balancing** - Balance power between sockets on individual chargers
2. **Location Balancing** - Distribute available capacity across all chargers at a location
3. **Solar Charging** - Minimize grid feed-in, maximize renewable consumption
4. **Optimized Solar Charging** - Integrate driver inputs (departure time, charge needed) and vehicle priority
5. **Solar Charging & Storage** - Add stationary battery management
6. **Virtual Power Plant** - Connect with energy markets for cost-optimized buying/selling

Each phase went through the full TRL validation before commercial release.

---

## Execution

### Cross-Functional Collaboration

Worked closely with:
- **Engineering**: Algorithm design, simulator development, cloud-local integration
- **Hardware team**: Local load balancer simplification, lab testing setup
- **Customer Success**: TRL 6-8 field testing coordination, customer onboarding
- **Sales**: Flagship deal support (Watthub, CTPark, DHL, Schiphol), requirement gathering, pricing strategy redesign based on algorithm complexity tiers

### Hands-On Involvement

- Built and ran test scenarios in the simulator
- Participated in field tests at customer locations
- Direct stakeholder management with enterprise clients
- Defined the planner tool requirements when unexpected grid limitations emerged

### Iteration Through TRL Stages

Each phase followed the same validation cycle, with learnings feeding back into the next. The simulator from TRL 3 became a reusable asset—both for internal testing and as a concept demo for how asset managers would configure their locations.

### Timeline

- Joined with concept only, nothing developed
- Implemented through Phase 5 (Solar Charging & Storage) during tenure
- Phase 6 (Virtual Power Plant) in early development when I left

---

## Results & Impact

| Metric | Value |
|--------|-------|
| Charging points under algorithm management | 50% of total base (basic load balancing) |
| Charging point growth | 2x YoY |
| Revenue growth | 2x YoY |
| Major deals signed | DHL Netherlands, Watthub, CTPark, Schiphol expansion |

### Business Impact

**Unlocked largest deals of the year**: The smart charging capability became the key differentiator in enterprise sales:
- **DHL Netherlands**: Signed as load balancing platform for all locations as they transitioned their fleet to electric
- **Watthub**: World's largest truck charging station—managing 36 DC chargers (350kW each) + 6 AC chargers
- **CTPark Amsterdam**: Major logistics hub with up to 1000 AC and 250 DC chargers planned
- **Schiphol Airport**: Upsale to expand implementation across public and private parking facilities

**Enabled new pricing strategy**: The phased algorithm allowed us to create tiers based on load balancing complexity, not just charger count. This opened upsale conversations with existing partners and improved renewal negotiations.

### Customer Outcomes

- **Grid upgrade avoidance**: Customers using solar and battery integration significantly reduced grid consumption or expanded charging capacity without infrastructure upgrades
- **Adoption catalyst**: Potential clients hesitant about EV fleet transition took the step—their fears about cars not charging and high costs faded with this feature
- **Operational confidence**: The hybrid cloud-local architecture gave logistics companies the reliability guarantees they needed

### Learnings

- **Align stakeholders early**: In multi-party projects (client → contractor → subcontractor), push for all stakeholders to meet from the beginning. Dependencies and requirements need to be visible to everyone. Not being the main organizer makes this harder, but it must be communicated and prioritized.

- **TRL framework for critical features**: When failure has severe consequences, structured de-risking pays off. The discipline of TRL stages prevented us from shipping something that could have damaged client operations and our reputation.

- **Multi-purpose tools**: The simulator built for TRL 3 testing became a reusable asset—internal testing tool, UX concept demo for asset managers, and sales demonstration. Building tools that serve multiple purposes multiplies their value.

- **Hybrid beats either/or**: The cloud-only vs. local-only debate resolved into a hybrid that was better than both. Sometimes the right answer isn't choosing between options but combining their strengths.

- **Transparency builds trust**: Launching with "still in testing" status and close monitoring (TRL 8) built customer confidence. They appreciated being partners in validation rather than guinea pigs.

- **Pricing should evolve with product**: As capabilities grew, so did pricing sophistication. Tiers based on algorithm complexity created natural upgrade paths and better conversations with customers.

---

## Artifacts

- [Maxem Energy Platform](https://maxem.energy)
[TODO: Screenshots, diagrams, links to relevant materials]

---

## Skills Demonstrated

- [x] Business orientation
- [x] User research
- [x] Technical depth
- [x] Data-driven decisions
- [x] Cross-functional leadership
- [x] Hands-on execution
