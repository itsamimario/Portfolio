# CRM Integration

**Company:** RatedPower
**Role:** Product Manager
**Period:** 2019 - 2022

---

## Context

As RatedPower grew, our go-to-market teams (SDRs, Account Executives, and Customer Success Managers) faced an increasingly painful workflow. They had to input data across three separate platforms:

- **HubSpot** — CRM for acquisition/renewal pipelines, contacts, contracts
- **pvDesign** — Our product, where they created company licenses and user accounts
- **Notion** — Product feedback pipeline I had built for roadmap prioritization

Each platform served a purpose, but as the sales and CS teams scaled, the manual overhead became unsustainable. We started seeing data quality issues: missing customer information, licenses assigned with wrong features, and frustrated teams who couldn't focus on what mattered — helping clients.

---

## Discovery & Research

The problem surfaced through daily interactions with GTM teams. They were vocal: the system was eating their time.

**What I did:**
- Created a discovery team with heads of Marketing, Sales, and Customer Success
- Ran workshops to map their pains and brainstorm solutions
- **Shadowed team members** during their daily work to understand workflows in detail
- Partnered with the engineer who would own the implementation to assess technical feasibility

The shadowing sessions were eye-opening. I watched reps toggle between platforms, copy-pasting the same information multiple times per deal. The cognitive load was real.

---

## Approach & Key Decisions

### Opportunity Beyond Efficiency

While solving the data entry problem, we identified additional opportunities:

1. **Usage analytics** — Feed pvDesign usage data into HubSpot to automate marketing and follow-up emails throughout acquisition and renewal cycles
2. **Smart alerts** — Notify sales/CS when to contact clients based on usage patterns (re-engage low users, upsell high users)
3. **Lead scoring** — Use product usage to qualify leads automatically

### What We Built

After investigating HubSpot's capabilities and our data architecture, we designed a solution where:

- **HubSpot became the single source of truth** for GTM teams
- **Usage data flowed automatically** from pvDesign into HubSpot
- **Automated workflows** handled follow-up emails, reminders, and segmented campaigns based on account status and usage
- **Feedback capture simplified** — Sales and CS could tag meeting notes with hashtags; Product team would process and follow up on tagged feedback

### What We Deliberately Left Out

We decided **not to automate license provisioning** in phase 1. It was too risky — a bug could affect customer access to the product. We scoped it for phase 2 after validating the integration worked reliably.

---

## Execution

I worked closely with one dedicated engineer throughout the implementation. My role:

- Defined requirements and acceptance criteria
- Coordinated with HubSpot admin and GTM teams on workflow design
- Ran UAT sessions with actual users before rollout
- Iterated on alert thresholds based on early feedback

---

## Results & Impact

| Metric | Result | Description |
|--------|--------|-------------|
| Time Saved | **~5 hours/week per rep** | Eliminated duplicate data entry across platforms |
| Data Accuracy | **~60% → ~95%** | Complete records enabled better automation |
| CAC | **~20% reduction** | More efficient GTM team, better conversion rates |

### Business Impact
- Reduced cost of customer acquisition and renewal
- GTM teams could finally focus on helping clients instead of fighting tools
- Product team got cleaner, more consistent feedback data

### Learnings
- **Internal efficiency = business impact** — Investing in tools that help your team work better often delivers more ROI than building new customer features
- **Shadowing beats interviews** — Watching people work reveals friction that they've normalized and won't mention
- **Single source of truth matters** — Consolidating where teams work reduces errors more than training ever will
- **Scope ruthlessly** — Leaving license automation for phase 2 was the right call; shipping fast and iterating built trust

---

## Skills Demonstrated

- [x] Business orientation
- [x] User research (shadowing, discovery workshops)
- [x] Technical depth (HubSpot APIs, data architecture)
- [x] Data-driven decisions
- [x] Cross-functional leadership
- [x] Hands-on execution
