---
name: skill-md-authoring
description: >
  Author production SKILL.md packages using registry best practices distilled from
  SkillMD.ai, AgenticSkills ImageGen, OpenAI Codex skills, and ClaudSkills patterns:
  frontmatter triggers, modes, decision trees, references/, examples, save-path policy.
  Use when writing SKILL.md, Codex skill, Claude skill format, ImageGen skill style.
metadata:
  short-description: "SKILL.md authoring standards from major registries"
user-invocable: true
---

# Skill.md Authoring Standards

As-of: 2026-09-11 · Sources: Drive SkillMD Docs, INDEX LIVE · V1 (ImageGen), ClaudSkills scrapes

## Package layout (canonical)
```
.grok/skills/<skill-id>/
  SKILL.md
  references/
    workflows.md
    tools.md
    examples.md
    deployments.md
    encyclopedia.md   # optional
```

## Frontmatter contract
```yaml
---
name: kebab-id
description: >
  What it does + WHEN to use (trigger phrases agents match).
metadata:
  short-description: "≤12 words"
user-invocable: true
---
```

## Authoring rules (from registries + operator)
1. **Triggers first** — name phrases in description.
2. **Modes / decision tree** — ImageGen pattern: generate vs edit; built-in vs CLI fallback.
3. **Steps over vibes** — numbered workflows with I/O.
4. **Examples** — ≥2 basic, ≥2 advanced, ≥1 failure recovery.
5. **Tools** — real tool names only.
6. **Depth in references/** — keep SKILL.md loadable.
7. **Never** bake API keys.
8. **Version** As-of ISO + source paths.

## ImageGen-class lessons (AgenticSkills / OpenAI)
- Prefer built-in image tool; CLI only if user explicitly asks
- Save-path policy: project assets into workspace, not temp-only
- Prompt schema: Use case / Asset type / Primary request / Constraints
- Edit invariants: change only X; keep Y unchanged
