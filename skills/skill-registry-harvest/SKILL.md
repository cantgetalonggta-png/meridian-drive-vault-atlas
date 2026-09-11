---
name: skill-registry-harvest
description: >
  Harvest and normalize skill catalogs from ClaudSkills, SkillMD.ai, AgenticSkills,
  and Drive LEARN DISTILL ALL / ORGANIZED SKILLS folders into operator skill map.
  Use for ClaudSkills browse, skill registry, harvest skills, ORGANIZED SKILLS.
metadata:
  short-description: "Harvest ClaudSkills/SkillMD catalogs into map"
user-invocable: true
---

# Skill Registry Harvest

As-of: 2026-09-11

## Sources in Drive
- ClaudSkills1 + CLAUDSKILLS* Docs (browse/categories/tags)
- SkillMD* Docs (tutorials, rankings, image-generation skill)
- INDEX LIVE · V1 (AgenticSkills ImageGen)
- LEARN DISTILL ALL / Skills / ORGANIZED SKILLS 1–14
- Hundreds of SKILL (1000+).md files (session-logs, 10x-*, 1c-*, etc.)

## Harvest rules
1. Prefer structure over raw HTML chrome.
2. Extract: name, description, category, install one-liner if present.
3. Security: do not execute untrusted install scripts blindly.
4. Map useful patterns into skill-md-authoring standards.
5. Deduplicate by skill-id.
