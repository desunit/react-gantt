---
description: Research-first implementation with subagents and verification
allowed-tools: Task, Bash(*), Read, Write, Edit, Glob, Grep, TodoWrite, AskUserQuestion
---

# Implementation Task: $ARGUMENTS

You MUST follow this strict workflow. Do not skip steps.

## Phase 1: Research (MANDATORY)

Before writing ANY code, use the Task tool with `subagent_type=Explore` to:

1. **Find existing patterns** - Search for similar implementations in the codebase
2. **Identify target locations** - Determine where new code should live
3. **Map dependencies** - Find related files, imports, and services
4. **Check conventions** - Look at naming, structure, and style patterns

Example research prompt:
```
Research the codebase for: [task description]
- Find existing similar patterns
- Identify files that will need changes
- Determine where new code should be placed
- List relevant imports and dependencies
- Note any conventions to follow
```

## Phase 2: Plan

After research completes:

1. Use TodoWrite to create a granular task list
2. Each todo should be a small, testable change
3. Group related changes that can be verified together

## Phase 3: Implement (Small Increments)

For EACH todo item:

### 3a. Make the change
- Keep changes minimal and focused
- One logical change at a time

### 3b. Verify immediately
After each change, use Task tool with `subagent_type=code-quality-reviewer`:
```
Review the changes just made for:
- TypeScript correctness
- Pattern consistency with codebase
- Security issues
- Missing error handling
```

### 3c. Run checks
```bash
pnpm typecheck
pnpm lint:fix
```

### 3d. Mark todo complete only after verification passes

## Phase 4: Final Verification

When all todos complete, use Task tool with `subagent_type=code-quality-reviewer` for final review of all changes together.

## Context Management Rules

- Delegate exploration to subagents - don't read many files directly
- Use Glob/Grep results to inform subagent prompts, not to read content yourself
- Let verification agents report back summaries, not full file contents
- Clear completed work from mental context by marking todos done

## Subagent Usage

| Task Type | Subagent |
|-----------|----------|
| Finding files/patterns | `Explore` |
| Understanding architecture | `Explore` |
| Code review | `code-quality-reviewer` |
| Database changes | `postgres-expert` |
| Complex planning | `Plan` |

## Output Format

After completion, provide:
1. Summary of changes made
2. Files modified/created
3. Any follow-up tasks identified
