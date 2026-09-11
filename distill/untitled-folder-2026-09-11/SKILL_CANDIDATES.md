# EVERY POSSIBLE NEW SKILL — from Untitled folder distill
As-of: 2026-09-11T07:30Z PDT
Listed **BEFORE** learning/implementation in advanced language models.
Status: CANDIDATE unless marked SHIPPED / EXISTS

## A. OpenCode platform skills
1. **models** — `/models` LLM select, defaults, variants, providers, load priority — **SHIP THIS RUN**
2. **opencode-agents** — primary/subagent types, Build/Plan/General/Explore/Scout, permissions matrix
3. **opencode-commands** — custom `/command` markdown+JSON, $ARGUMENTS, $1..$n, !`shell`, @files
4. **opencode-rules** — AGENTS.md, CLAUDE.md fallback, instructions globs/URLs, precedence, /init
5. **opencode-skills** — SKILL.md discovery paths, name regex, skill tool, permission patterns
6. **opencode-config** — opencode.json schema, providers, model options, global vs project
7. **opencode-variants** — reasoningEffort/thinking budgets, variant_cycle, custom variants
8. **opencode-permissions** — allow/ask/deny matrix for tools/skills/MCP/wildcards
9. **opencode-tui** — TUI commands, keybinds, session_child navigation, Tab switch_agent
10. **opencode-providers** — /connect credentials, Models.dev, local models, AI SDK, custom providers

## B. Skill authoring / registry
11. **skill-md-v2** — expand skill-md-authoring with OpenCode + skills.sh frontmatter contracts
12. **claudskills-browse** — browse/install ClaudSkills catalog patterns
13. **skillmd-imagegen-port** — port ImageGen skill modes to Grok Imagine tools
14. **skills-sh-install** — `npx skills add` workflows, security audit grades (Snyk/Socket/Trust Hub)
15. **agentic-skills-index** — INDEX LIVE multi-platform skill index (192+ skills, 200+ MCP)
16. **happycapy-skills-runner** — run skills on Happycapy (from sponsored scrape)
17. **clawhub-agent-catalog** — ClawHub agent/skill catalog navigation

## C. Agent taxonomy / multi-agent
18. **agent-types-taxonomy** — primary vs subagent vs hidden system agents
19. **plan-vs-build-mode** — restricted plan agent vs full build agent playbook
20. **subagent-orchestration** — @mention, auto-invoke, child session navigation keybinds
21. **context-compaction-agent** — when/how compaction/title/summary agents fire
22. **temperature-routing** — task → temperature bands (0.0–0.2 analyze … 0.6–1.0 brainstorm)

## D. Learning / course distillation
23. **chatgpt-course-distiller** — distill ChatGPT Course scrapes (~2.2MB×2) into lesson skills
24. **yandex-praktikum-distiller** — RU magazine/course extract
25. **matveev-tech-notes** — Matveev Tech content → operator notes skill

## E. Security methodology (AUTHORIZED ONLY)
26. **ethical-hacking-methodology** — white-hat lifecycle from skills.sh (REQUIRES written auth; public-tools framing; **no unauthorized exploit expansion**)
27. **osint-recon-public** — passive recon methods aligned with osint-public-ceiling (EXISTS partial)
28. **security-report-writer** — executive/technical report structure from methodology skill

## F. Cross-cutting / meta
29. **slash-command-router** — map /models /skill-creator /init style commands to skills
30. **model-default-setter** — write opencode.json / grok config model defaults safely (no keys)
31. **variant-presets** — named presets: coding-high, plan-low, creative-0.7
32. **mcp-skill-bridge** — MCP servers × skill tool permissions
33. **local-llm-loader** — LM Studio / local model_id format (provider/model)
34. **multi-provider-failover** — fallback chain when primary model fails
35. **cost-step-limiter** — agent `steps` / max iterations cost control
36. **session-title-summary** — mimic title/summary agents for Meridian/NLLA sessions
37. **file-reference-loader** — @path and AGENTS.md external file lazy-load pattern
38. **release-notes-skill** — git-release style skill from OpenCode skills example
39. **code-reviewer-subagent** — documentation agent + security auditor examples
40. **documentation-agent** — OpenCode example doc agent
41. **openclaw-bridge** — openclaw scrape → operator agent bridge patterns
42. **product-pricing-scraper-notes** — ProductsCommunityResourcesPricing → competitive notes (INDEX)
43. **skill-zip-unpacker** — image-generation-10.zip → local skill package expand

## G. Already exist (do not duplicate)
- skill-creator, drive-skill-distiller, skill-md-authoring, skill-registry-harvest
- osint-public-ceiling, secret-store-hygiene, hitl-governance
- imagine, xai-api, nlla-debate-system, swarm-ops-desk, meridian-globe-atlas
- investigation cluster (east66, eastern-feeder, maxwell, discovery-methods-dm, palm-beach-pete, archive-unseals, …)

## Priority queue
| Priority | Skills |
|----------|--------|
| **P0** | models (this run) |
| **P1** | opencode-agents, opencode-commands, opencode-rules, opencode-skills |
| **P2** | slash-command-router, model-default-setter, variant-presets, opencode-permissions |
| **P3** | ethical-hacking-methodology (ceiling-gated), skillmd-imagegen-port, course distillers |
