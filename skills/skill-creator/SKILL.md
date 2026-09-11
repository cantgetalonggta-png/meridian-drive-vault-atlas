---
name: skill-creator
description: >
  Author, expand, and ship agent skills (SKILL.md + references) from operator
  intent, Drive vaults, chat distill, or repo trees. Use when the user says
  /skill-creator, "make a skill", "skill encyclopedia", "distill into skills",
  or asks for structured step-by-step skill packages with examples, workflows,
  tools, and deployments. Produces filesystem skills under .grok/skills/ and
  optional dual-persist to Drive skill-tree + GitHub.
metadata:
  short-description: "Create/expand skills with examples, workflows, tools, deploy steps"
user-invocable: true
---

# Skill Creator

Build **complete, runnable skill packages** — not one-paragraph stubs.

## Package layout (always)

```text
.grok/skills/<skill-id>/
  SKILL.md                 # frontmatter + core doctrine (≤ ~400 lines prefer)
  references/              # depth that would bloat SKILL.md
    workflows.md           # step-by-step pipelines
    tools.md               # tools, APIs, Drive/GitHub calls
    examples.md            # basic → advanced worked examples
    deployments.md         # how to ship / dual-persist / version
    encyclopedia.md        # optional: entity index / glossary
```

## Frontmatter contract

```yaml
---
name: <kebab-id>
description: >
  What it does + WHEN to use it (triggers). Agents route on this string.
metadata:
  short-description: "≤12 words"
user-invocable: true|false
---
```

## Authoring rules

1. **Triggers first** — description must name phrases the agent will match.
2. **Do / don't** — closed lists for safety, auth, secrets, bulk Drive.
3. **Steps over vibes** — numbered procedures with inputs/outputs.
4. **Examples** — ≥2 basic, ≥2 advanced, ≥1 failure recovery.
5. **Tools** — real tool names (`google_drive_*`, `github___*`, bash, imagine_*).
6. **Depth in references/** — keep SKILL.md loadable; open refs on demand.
7. **Never** bake API keys, `.env`, secret-store, or private doxx into skills.
8. **Version** — stamp `As-of: ISO date` and source paths (Drive folder IDs, repos).

## When user pastes a stub skill

1. Parse name + intent from Description/Instructions.
2. Expand into full package (this skill's layout).
3. Add practical + advanced examples, workflows, tools, deployments.
4. Write to `.grok/skills/<id>/`.
5. Optionally dual-persist (see `drive-skill-distiller` + deployments).

## Related

- **drive-skill-distiller** — crawl Drive → distill → skill encyclopedia map
- Existing platform skills: `og`, `design-ui`, `threejs`, `auth`, `xai-api`, …

Open `references/` in this folder for templates and checklists.
