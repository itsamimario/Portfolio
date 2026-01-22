# Development Workflow

## Git Branch Strategy

Every phase gets its own branch:
```
main
├── phase-5-content-embedding
├── phase-6-chat-api
├── phase-7-chat-ui
└── ...
```

**Before starting any phase:**
1. Ensure `main` is up to date: `git checkout main && git pull`
2. Create phase branch: `git checkout -b phase-X-description`
3. Work on branch, commit frequently
4. Create PR to main when phase is complete
5. Merge only after tests pass

## Available Agents

| Agent | Purpose | When to Consider |
|-------|---------|------------------|
| **planner** | Create detailed implementation plan | Complex features, multi-file changes |
| **architect** | Review & validate architecture decisions | New systems, API design, data models |
| **tdd-guide** | Write tests first (RED phase) | Any new code |
| **code-reviewer** | Review code quality, patterns, issues | After writing any code |
| **security-reviewer** | Review security concerns | API routes, auth, secrets, user input |
| **build-error-resolver** | Fix build/type errors | When build fails |
| **e2e-runner** | Run end-to-end tests | Critical user flows |
| **refactor-cleaner** | Clean up dead code | Code maintenance |
| **doc-updater** | Update documentation | End of phase |
| **Explore** | Explore unfamiliar codebase | Understanding existing code |

## Agent Approval Gate

**CRITICAL: Before starting ANY feature, Claude MUST:**

1. **Analyze the feature** and decide which agents are needed
2. **Present the FULL agent selection** for the entire feature:
```
📋 AGENT SELECTION FOR: [feature name]

I plan to run the following agents:
┌──────────────────────┬─────────────────────────────┬──────────┐
│ Agent                │ Purpose                     │ Order    │
├──────────────────────┼─────────────────────────────┼──────────┤
│ [agent 1]            │ [why needed]                │ [order]  │
│ [agent 2]            │ [why needed]                │ [order]  │
│ ...                  │ ...                         │ ...      │
└──────────────────────┴─────────────────────────────┴──────────┘

Approve? (yes/no/modify)
```

3. **Wait for user approval**
4. **Start Ralph Wiggum** to execute everything autonomously
5. **Return when done** with PR ready

## Ralph Wiggum Autonomous Execution

After user approves the agent selection, **Ralph Wiggum runs everything autonomously** until completion:

- Executes all selected agents in the planned order
- Runs agents in parallel where possible
- Handles TDD cycle: tests first → implement → review
- Fixes issues found by reviewers
- Creates PR when done

**Completion:** Outputs `<promise>PHASE_COMPLETE</promise>` when:
- All tests passing
- All reviews complete
- PR created

## Commit Message Format

```
<type>(<scope>): <description>

<body with details>

Reviewed-by: code-reviewer agent
Security-checked: yes/no/na
Tests: passing
```

Types: feat, fix, refactor, test, docs, chore
