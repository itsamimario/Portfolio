# My Thoughts on AI and the Future of Product Management

## The Interface Revolution

I believe we're witnessing the biggest shift in human-computer interaction since the smartphone. Interfaces are evolving from clicking buttons to having conversations—whether through text or voice. This isn't just a UX trend; it fundamentally changes how products are built and how users accomplish tasks.

The products that win will be the ones that understand when to use conversational interfaces and when traditional UI still makes sense. Not everything needs to be a chatbot, but the products that thoughtfully integrate AI assistance will feel magical compared to those that don't.

## Evals Are the New Analytics

For PMs working on AI products, evaluations (evals) are becoming as critical as traditional analytics. You can't improve what you can't measure, and with AI, the failure modes are more subtle than a broken button or slow page load.

I've learned that effective eval systems start with human review—actually reading outputs, categorizing failures, and building a taxonomy of what "bad" looks like for your specific use case. Only then can you create automated evaluators that catch real problems. Generic metrics like "hallucination score" don't connect to user value; you need evals tailored to your product's actual failure modes.

This is a new muscle for product managers. We need to think about retriever quality separately from generator quality, understand when the AI found the right information but presented it poorly versus when it retrieved the wrong context entirely. These distinctions matter for knowing where to invest improvement effort.

## Building Agents That Deliver Business Value

The hype around AI agents is enormous, but most agent projects fail to deliver real value. The difference between a demo and a product is reliability, and agents are notoriously hard to make reliable.

My approach: start with the simplest possible implementation that solves a real user problem. Often that's not an autonomous agent at all—it's a well-designed RAG system or a simple classification model. When agents are genuinely needed, scope them tightly. An agent that does one thing well beats an agent that attempts everything and fails unpredictably.

The business value comes from understanding the task deeply enough to know where AI helps and where it creates risk. PMs who can navigate this—who understand both the capabilities and limitations—will be incredibly valuable.

## AI-Assisted Development Changes Everything

Using AI tools like Claude Code has fundamentally changed how I work. I've moved from writing detailed specs for engineers to directing AI agents through implementation. This isn't about replacing engineers—it's about a new collaboration model where the PM can prototype faster, validate technical assumptions earlier, and have more informed conversations about trade-offs.

For technical PMs, this is a superpower. You can build functional prototypes to test ideas before committing engineering resources. You can understand codebases faster when evaluating technical debt or planning migrations. The barrier between "product thinking" and "building" is lower than ever.

## What This Means for Product Managers

The PMs who thrive in the AI era will be those who:

1. **Understand AI capabilities deeply enough to know what's possible** - not just reading about features, but building with them
2. **Can design eval systems** that connect AI quality to business outcomes
3. **Know when AI is the right solution** and when simpler approaches work better
4. **Can collaborate with AI tools** to move faster from idea to working prototype
5. **Think about failure modes** as carefully as they think about happy paths

This is why I built my portfolio as a RAG chatbot—not because it's the obvious choice, but because building it taught me more about AI product development than any course could. The best way to understand these tools is to ship something with them.
