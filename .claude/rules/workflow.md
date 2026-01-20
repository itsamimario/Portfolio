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

## Agent Approval Gate

**CRITICAL: Before running ANY agents, Claude MUST:**

1. **Present the agent selection** to the user:
```
📋 AGENT SELECTION FOR: [task description]

I plan to run the following agents:
┌──────────────────────┬─────────────────────────────┬──────────┐
│ Agent                │ Purpose                     │ Parallel │
├──────────────────────┼─────────────────────────────┼──────────┤
│ planner              │ Create implementation plan  │ ✅       │
│ architect            │ Validate architecture       │ ✅       │
└──────────────────────┴─────────────────────────────┴──────────┘

Approve this agent selection? (yes/no/modify)
```

2. **Wait for user approval** before proceeding
3. **Only run agents after explicit "yes"** or confirmation
4. If user says "modify", adjust selection and re-present

This applies to ALL agent executions, including:
- Phase start (planner, architect)
- Implementation (tdd-guide)
- Reviews (code-reviewer, security-reviewer)
- Any other agent usage

## Agent Orchestration Workflow

Claude acts as **coordinator**, delegating to specialized agents.

### Phase Start Sequence

When starting a new feature/phase:

**Step 1: Present agent selection for approval**
```
📋 AGENT SELECTION FOR: Phase X Start

Agents to run:
│ planner    │ Create implementation plan  │ ✅ Parallel │
│ architect  │ Validate architecture       │ ✅ Parallel │

Approve? (yes/no/modify)
```

**Step 2: After approval, run agents in parallel**

**Step 3: Synthesize recommendations and present plan**

### Implementation Sequence

For each file/component to implement:

**Step 1: Present agent selection**
```
📋 AGENT SELECTION FOR: Implement [component]

Agents to run:
│ tdd-guide  │ Write tests first (RED)     │ Sequential │

Approve? (yes/no/modify)
```

**Step 2: After approval, tdd-guide writes tests**

**Step 3: Claude implements (GREEN phase)**

**Step 4: Present review agents**
```
📋 AGENT SELECTION FOR: Review [component]

Agents to run:
│ code-reviewer     │ Quality review        │ ✅ Parallel │
│ security-reviewer │ Security check        │ ✅ Parallel │

Approve? (yes/no/modify)
```

**Step 5: After approval, run review agents in parallel**

**Step 6: Fix issues from reviews**

### Pre-Commit Sequence

Before committing, present:
```
📋 AGENT SELECTION FOR: Pre-commit checks

Agents to run:
│ security-reviewer │ Final security scan   │ Sequential │

Also running: npm test (not an agent)

Approve? (yes/no/modify)
```

### Phase Completion Sequence

When phase is complete:
```
📋 AGENT SELECTION FOR: Phase completion

Agents to run:
│ doc-updater │ Update CLAUDE.md, README   │ Sequential │

Approve? (yes/no/modify)
```

Then create PR after approval.

## Agent Usage Rules

### ALWAYS Use Agents For:

| Situation | Agent(s) | Parallel? |
|-----------|----------|-----------|
| New feature/phase start | planner + architect | ✅ Yes |
| Writing new code | tdd-guide first | No |
| After writing ANY code | code-reviewer | - |
| API routes, auth, secrets | security-reviewer | ✅ With code-reviewer |
| Build/type errors | build-error-resolver | No |
| Exploring unfamiliar code | Explore agent | No |
| Multiple file reviews | Multiple code-reviewer | ✅ Yes |

### NEVER Do Directly:

- ❌ Run agents without user approval
- ❌ Write implementation code without tdd-guide creating tests first
- ❌ Commit without code-reviewer approval
- ❌ Create API routes without security-reviewer
- ❌ Skip planner for complex features
- ❌ Run agents sequentially when they can run in parallel

## Parallel Execution Examples

### Good: Review multiple files in parallel (after approval)
```
📋 AGENT SELECTION FOR: Review Phase 5 files

Agents to run:
│ code-reviewer     │ Review lib/chunker.ts         │ ✅ Parallel │
│ code-reviewer     │ Review lib/content-loader.ts  │ ✅ Parallel │
│ security-reviewer │ Review lib/openai-embeddings  │ ✅ Parallel │

Approve? (yes/no/modify)
```

### Good: Phase start with parallel planning (after approval)
```
📋 AGENT SELECTION FOR: Phase 6 Start

Agents to run:
│ planner   │ Create implementation plan    │ ✅ Parallel │
│ architect │ Review architecture needs     │ ✅ Parallel │

Approve? (yes/no/modify)
```

## Commit Message Format

```
<type>(<scope>): <description>

<body with details>

Reviewed-by: code-reviewer agent
Security-checked: yes/no/na
Tests: passing
```

Types: feat, fix, refactor, test, docs, chore

## Phase Checklist

Before marking a phase complete:

- [ ] All tests passing (`npm test`)
- [ ] code-reviewer approved all new files
- [ ] security-reviewer approved (if applicable)
- [ ] No TypeScript errors
- [ ] Branch is up to date with main
- [ ] PR created with proper description
- [ ] CLAUDE.md updated with progress
