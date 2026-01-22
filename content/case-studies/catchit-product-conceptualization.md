# Product Conceptualization and Implementation

**Company:** CatchIT!
**Role:** Founder & CEO
**Period:** 2024 - Present

---

## Context

CatchIT! started in September 2024 as a side project to experiment with AI coding tools, but quickly evolved into a full venture after we identified a market opportunity in the wake of the NFT market collapse.

**The Insight:** While the NFT market had crashed, we believed the core technology (limited digital ownership) was sound but had been misused. We asked: what if we combined the mechanics of limited digital collectibles with geolocation gameplay like Pokémon GO? Players would discover real treasures in the form of digital illustrations hidden by other players, add them to collections, and trade assets to complete sets.

**Market Opportunity:** We saw a gap for something between a game and a social platform that pushes users to explore cities and discover art. A gamified social platform for discovering art while exercising, combining user-generated content with geolocation mechanics in a way never seen before.

**Two-Sided Value Proposition:**
- **For Collectors:** A Pokémon GO-like experience but with real treasures—limited edition digital art that only a few players can own
- **For Creators:** A new channel to gamify their art, reach new audiences, and monetize their work through our 70/30 revenue sharing model

**Vision:** Create a platform where consuming art becomes fun and accessible to everyone. We want to become the go-to art discovery and marketplace that makes creativity an adventure.

---

## Discovery & Research

### Market Research

We began with competitive analysis—reviewing competitor products, customer reviews, and app store rankings. We mapped the competitive landscape, analyzed feature sets and pricing models, and synthesized user feedback from forums and social channels.

**Key Findings:**
- **Market Size:** Geolocation gaming generated $1.2 billion revenue in 2024
- **Low Saturation:** The genre is dominated by 3 titles, but far from saturated—no major player has combined UGC with geolocation gaming
- **Strong Retention:** Geolocation games show significantly better retention than other genres, meaning players stick around for the long run

**Competitor Benchmarks:**
| Game | Revenue | Downloads |
|------|---------|-----------|
| Pokémon GO | ~$8.8B+ lifetime | 1B+ |
| Monster Hunter Now | ~$250M+ lifetime | 15M+ |
| Pikmin Bloom | ~$100M+ lifetime | 10M+ |
| Geocaching | ~$10M/year | 20M+ |
| Orna | ~$600K+ (2 years) | 2M+ |

### User Research

We conducted interviews at micro-illustrator art fairs (artists with ~10k followers), speaking directly with creators and their fan bases. This proved to be our richest source of potential users—both collectors and creators.

After launching the MVP webapp, we combined quantitative studies (surveys and usage data) with qualitative inputs (interviews and review mining) to identify pain points, broken workflows, and problems important enough that users were already hacking together workarounds.

---

## Approach & Key Decisions

### Options Considered

**1. NFT/Blockchain Integration**
- Pro: True digital ownership, potential for secondary market royalties
- Con: Massive negative perception after NFT market crash; users saw it as a scam

**2. Physical QR Code Hunting**
- Pro: More "real" treasure hunting experience; potential marketing asset
- Con: High friction for creators (print + hide QR codes); users don't scan unknown QR codes

**3. Proximity-Based Digital Collection (Catchits)**
- Pro: Low friction for both creators and collectors; scalable
- Con: Less "physical" feel than QR hunting; depends on creator content supply

**4. Random Generation System (Catchapons)**
- Concept: Randomly generated pieces scattered across the map; when collected, gives you a random piece from anywhere in the world
- Pro: Solves the cold start problem—fills the map with collectibles without requiring creator content
- Pro: Creates engaging gambling-like behavior—users can pay catchicoins to collect from distance, betting that a 50-coin spend might yield a 100-coin piece
- Con: Less meaningful than creator content; doesn't drive the creator flywheel

### Trade-offs Evaluated

| Decision | What We Chose | Trade-off |
|----------|--------------|-----------|
| Blockchain | Excluded entirely | Lost true ownership semantics, but avoided toxic brand association |
| Collection Method | Proximity-based (100m radius) | Less exciting than physical QR, but dramatically lower friction |
| Content Supply | Hybrid (Catchits + Catchapons) | Catchapons solve cold start but don't drive creator flywheel; needed both |
| Art Style | Full pixel-art aesthetic | Limits some artistic expression, but creates strong brand differentiation |
| Revenue Model | Freemium + 70/30 creator share | Lower margin, but aligns incentives with creators |
| MVP Focus | Single-player first | Delayed social features, but validated core loop faster |

### Why This Approach

**Pixel-Art Aesthetic:** During beta testing, we added "Catchito"—a pixel-art treasure chest character—as an onboarding guide. Beta testers immediately highlighted how it gave the app a different, more cohesive vibe. We realized the aesthetic was essential to the value proposition and the feeling we wanted to convey. This led us to bring on an art director (Álvaro) and commit fully to pixel-art.

**No NFTs:** User interviews revealed strong aversion to blockchain terminology. When we described mechanics without mentioning NFTs, reception was positive. With NFT branding, users assumed scam. The decision to exclude blockchain reduced both technical complexity and market risk.

**Freemium + Creator Revenue Share:** We designed a dual-currency system:
- **Catchicoins** (earned playing): Used for catchapons, trades, minigames, basic items
- **Catchigems** (purchased): Used for premium items, direct purchases from creators, accelerated features

Creators earn 70% on direct sales, incentivizing quality content that attracts paying users.

---

## Execution

### Timeline

| Phase | Period | Milestones |
|-------|--------|------------|
| **Concept** | Q4 2024 | Alpha version, personal project, positive feedback from professional illustrators |
| **Pre-production** | Q1 2025 | Functional beta with core mechanics, art director joined, visual design development |
| **Beta Launch** | Q2 2025 | Launch in Spain for beta testers with positive feedback |

### My Involvement

**Product & Strategy:**
- Defined product vision ("making cities playgrounds")
- Led user research and competitive analysis
- Designed business model and pricing strategy
- Created product roadmap and prioritization

**Hands-on Development:**
- Built entire frontend using Cursor (AI-assisted coding)
- Implemented React + Ionic Capacitor for cross-platform mobile
- Integrated Mapbox for geolocation features

**Design System:**
- Started with Figma, migrated to Storybook when pixel-art couldn't be properly represented
- Implemented asset pipeline using Aseprite with automation scripts

---

## Results & Impact

### Retention Metrics (Beta)

| Metric | CatchIT! | Top 25% Benchmark | Multiple |
|--------|----------|-------------------|----------|
| D1 Retention | 50% | 26-28% | ~1.8x |
| D7 Retention | 35% | 7-8% | ~4.5x |
| D30 Retention | 12% | 2.4-3.2% | ~4x |

*Source: GameAnalytics 2025 Mobile Gaming Benchmarks*

### Business Outcomes

- **Beta Launched:** Available in Spain on iOS and Android with positive user feedback
- **Core Loop Validated:** Create → Collect → Trade mechanics working; Catchapons driving engagement

### Key Learnings

1. **Brand perception matters more than technology:** Dropping NFT terminology completely changed user reception, even though the underlying mechanics were similar.

2. **Aesthetic drives emotional connection:** The pixel-art decision transformed the product from "another app" to something with personality and depth.

3. **Gaming iteration is fundamentally different from SaaS:** Unlike web products where you can ship-measure-iterate quickly, games require something close to the final version before you can test critical hypotheses. To validate monetization, you need polished cosmetics. To validate attraction, you need marketing assets and paid acquisition budget. This makes the feedback loop much slower and more capital-intensive.

4. **We validated retention, but couldn't test the full funnel:** Of the three pillars every game needs to prove: attraction, retention, and monetization—we've only validated one. Retention metrics are strong (D1: 50%, D7: 35%, D30: 12%), but attraction requires marketing resources we don't have (paid ads, content creation), and monetization requires creative resources to build the cosmetics users would pay for. We attempted to raise capital in H2 2025 to fund these efforts but were unsuccessful.

---

## Artifacts

- [Figma Design System](https://www.figma.com/design/Z8yhY4aOz9WKLYbBvNkmdM/CatchIT)
- [Pitch Deck](pitch deck available on request)
- Beta available on iOS App Store and Google Play (Spain only)

---

## Skills Demonstrated

- [x] Business orientation
- [x] User research
- [x] Technical depth
- [x] Data-driven decisions
- [x] Cross-functional leadership
- [x] Hands-on execution
- [x] 0→1 product development
- [x] Full ownership
