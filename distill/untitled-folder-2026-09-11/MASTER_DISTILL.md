# MASTER DISTILL — Untitled folder (×5 methodical, every-word P0)
As-of: 2026-09-11T07:30Z PDT
Folder: Untitled folder (1r1JJBglpT2miT3EPWhpKeyMJG_lnj6o_)
Sources: OpenCode docs scrapes (models/agents/commands/rules/skills) + ClaudSkills/SkillMD/AgenticSkills/skills.sh + large course/hub scrapes
Ceiling: public documentation only. No API keys. Ethical-hacking skill = authorized white-hat only.

---

## PASS 1 — What this folder is (whole-corpus)
A harvest of **agent platform documentation and skill registries**, primarily:
1. **OpenCode** (opencode.ai, Anomaly, docs last updated Sep 10 2026) — models, agents, commands, rules (AGENTS.md), skills (SKILL.md)
2. **Skill registries** — ClaudSkills, SkillMD.ai, AgenticSkills INDEX LIVE V1.6.1, skills.sh (Vercel)
3. **Courses / hubs** — ChatGPT Course (~2.2MB×2), ClawHub (~2.4MB), Matveev Tech, Yandex Praktikum, Happycapy, openclaw
4. Operator meta docs about distilling everything
5. Large unstructured HTML chrome dumps ("Skip to content") — INDEX only

**Total corpus size**: ~18+ MB raw Google Docs text equivalent. P0 body fully ingested; multi-MB chrome left as INDEX.

---

## PASS 2 — models (FULL every-word extract) — source for /models skill
Source: Drive `models` doc = https://opencode.ai/docs/models/ (Last updated: Sep 10, 2026)

### Overview
OpenCode uses the **AI SDK** (ai-sdk.dev) and **Models.dev** to support **75+ LLM providers** and local models.

### Providers
Most popular providers preloaded by default. Credentials via `/connect` command → available at start. See providers docs.

### Select a model
Type in TUI/chat: **`/models`**

### Recommended models (doc snapshot — time-sensitive MAYBE)
"only a few … good at both generating code and tool calling"
- GPT 5.2
- GPT 5.1 Codex
- Claude Opus 4.5
- Claude Sonnet 4.5
- Minimax M2.1
- Gemini 3 Pro
(Not exhaustive; not necessarily up to date)

### Set a default
```json
{
  "$schema": "https://opencode.ai/config.json",
  "model": "lmstudio/google/gemma-3n-e4b"
}
```
Full ID format: **`provider_id/model_id`**
- OpenCode Zen example: `opencode/gpt-5.1-codex`
- Custom provider: provider_id = key under `provider`, model_id = key under `provider.models`

### Configure models (global options)
```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "openai": {
      "models": {
        "gpt-5": {
          "options": {
            "reasoningEffort": "high",
            "textVerbosity": "low",
            "reasoningSummary": "auto",
            "include": ["reasoning.encrypted_content"]
          }
        }
      }
    },
    "anthropic": {
      "models": {
        "claude-sonnet-4-5-20250929": {
          "options": {
            "thinking": { "type": "enabled", "budgetTokens": 16000 }
          }
        }
      }
    }
  }
}
```
Agent config **overrides** global. Built-in provider/model names on Models.dev.

### Variants
Many models support variants. Built-in defaults:

**Anthropic**
- `high` — High thinking budget (default)
- `max` — Maximum thinking budget

**OpenAI** (varies by model, roughly)
- `none` | `minimal` | `low` | `medium` | `high` | `xhigh`

**Google**
- `low` | `high`

Custom variants example:
```jsonc
{
  "provider": {
    "openai": {
      "models": {
        "gpt-5": {
          "variants": {
            "thinking": { "reasoningEffort": "high", "textVerbosity": "low" },
            "fast": { "disabled": true }
          }
        }
      }
    }
  }
}
```
**Cycle variants**: keybind `variant_cycle` (see keybinds docs).

### Loading models priority
1. CLI `--model` / `-m` (format `provider_id/model_id`)
2. Config `model` key in opencode.json
3. Last used model
4. First model by internal priority

### xAI / Grok mapping (operator extension — public)
| Use case | Candidate IDs (verify live) |
|----------|------------------------------|
| Flagship | grok-4.6, grok-4.5 |
| Coding/tools | grok-4.6, Grok Build 0.1 |
| Fast/cheap | grok-4.1 Fast |
| Long context | grok-4.20 class |
| Image/video | Grok Imagine (see `imagine` skill) |

---

## PASS 3 — agent types (FULL extract)
Source: https://opencode.ai/docs/agents/

### Types
- **Primary agents**: main assistants; Tab / `switch_agent` to cycle. Tool access via permissions.
- **Subagents**: specialized; auto-invoked by primary OR manual `@mention`.

### Built-in primary
| Agent | Mode | Behavior |
|-------|------|----------|
| **Build** | primary | Default; all tools enabled; full file ops + system commands |
| **Plan** | primary | Restricted; `edit` and `bash` default to **ask**; analyze/suggest without unintended changes |
| **compaction** | primary (hidden) | Compacts long context; auto; not selectable |
| **title** | primary (hidden) | Session titles; auto |
| **summary** | primary (hidden) | Session summaries; auto |

### Built-in subagents
| Agent | Mode | Behavior |
|-------|------|----------|
| **General** | subagent | Complex Qs + multi-step; full tools except todo; parallel units of work |
| **Explore** | subagent | Fast **read-only** codebase exploration; find files, search keywords |
| **Scout** | subagent | Read-only external docs/deps; clone dep into managed cache; no workspace modify |

### Usage
- Primary: Tab / `switch_agent`
- Subagents: auto by description OR `@general help me…`
- Child sessions: `session_child_first` (Leader+Down), `session_child_cycle` (Right), reverse (Left), `session_parent` (Up)

### Configure — JSON
```json
{
  "$schema": "https://opencode.ai/config.json",
  "agent": {
    "build": {
      "mode": "primary",
      "model": "anthropic/claude-sonnet-4-20250514",
      "prompt": "{file:./prompts/build.txt}",
      "permission": { "edit": "allow", "bash": "allow" }
    },
    "plan": {
      "mode": "primary",
      "model": "anthropic/claude-haiku-4-20250514",
      "permission": { "edit": "deny", "bash": "deny" }
    },
    "code-reviewer": {
      "description": "Reviews code for best practices and potential issues",
      "mode": "subagent",
      "model": "anthropic/claude-sonnet-4-20250514",
      "prompt": "You are a code reviewer. Focus on security, performance, and maintainability.",
      "permission": { "edit": "deny" }
    }
  }
}
```

### Configure — Markdown
Paths: `~/.config/opencode/agents/` or `.opencode/agents/`
Filename = agent name (e.g. `review.md` → agent `review`)
Frontmatter: description, mode, model, temperature, permission

### Options (complete)
| Option | Purpose |
|--------|---------|
| `description` | **Required** — when to use |
| `temperature` | 0.0–0.2 analyze/plan; 0.3–0.5 general; 0.6–1.0 brainstorm. Default model-specific (0 most; 0.55 Qwen) |
| `steps` | Max agentic iterations (cost control). Legacy `maxSteps` deprecated |
| `disable` | true → hide agent |
| `prompt` | Custom system prompt path `{file:./…}` relative to config |
| `model` | `provider/model_id` override. Primary defaults to global; subagent inherits invoker if unset |
| `tools` | **Deprecated** — use `permission` |
| `permission` | allow / ask / deny per key |
| `mode` | primary | subagent |
| `hidden` | system agents |
| `task` permissions | fine-grained task tool |
| `color` | TUI color |
| `top_p` | nucleus sampling |
| Additional | provider-specific options override global |

### Permission keys
| KEY | GATES |
|-----|-------|
| read | read |
| edit | write, edit, apply_patch |
| glob | glob |
| grep | grep |
| list | list |
| bash | bash |
| task | task |
| external_directory | tools outside worktree |
| todowrite | todowrite, todoread |
| webfetch | webfetch |
| websearch | websearch |
| lsp | lsp |
| skill | skill |
| question | question |
| doom_loop | stuck recovery |

Shorthand `"allow"|"ask"|"deny"` OR object of glob/pattern → action. Wildcards work for MCP (`mymcp_*`).

### Examples in doc
- Documentation agent
- Security auditor (subagent, edit deny)

---

## PASS 4 — commands (FULL extract)
Source: https://opencode.ai/docs/commands/

### Purpose
Custom `/command` prompts for repetitive tasks. In addition to built-ins: `/init`, `/undo`, `/redo`, `/share`, `/help`.

### Create — Markdown
`.opencode/commands/test.md` or `~/.config/opencode/commands/`
```md
---
description: Run tests with coverage
agent: build
model: anthropic/claude-3-5-sonnet-20241022
---
Run the full test suite with coverage report and show any failures.
Focus on the failing tests and suggest fixes.
```
Filename → command name (`test.md` → `/test`)

### Create — JSON
```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "command": {
    "test": {
      "template": "Run the full test suite…",
      "description": "Run tests with coverage",
      "agent": "build",
      "model": "anthropic/claude-3-5-sonnet-20241022"
    }
  }
}
```

### Prompt placeholders
| Token | Meaning |
|-------|---------|
| `$ARGUMENTS` | all args as string |
| `$1` `$2` `$3`… | positional args |
| `!`\`shell\`` | inject bash output (project root) |
| `@path/to/file` | include file content |

### Options
| Option | Required | Notes |
|--------|----------|-------|
| template | yes (JSON) | prompt body |
| description | no | TUI description |
| agent | no | which agent; subagent → auto invoke unless `subtask: false` |
| subtask | no | force subagent invocation |
| model | no | override model |

Custom commands **can override** built-ins if same name.

---

## PASS 5 — rules (FULL extract)
Source: https://opencode.ai/docs/rules/

### Purpose
`AGENTS.md` = project rules (Cursor-like). Included in LLM context.

### Initialize
`/init` — scans repo, asks targeted Qs, creates/updates AGENTS.md with:
- build/lint/test commands
- architecture not obvious from filenames
- conventions, setup quirks
- references to Cursor/Copilot rules
Commits recommended.

### Types
| Location | Scope |
|----------|-------|
| Project `AGENTS.md` | this dir + subdirs |
| Global `~/.config/opencode/AGENTS.md` | all sessions (personal) |
| Claude fallback project `CLAUDE.md` | if no AGENTS.md |
| Claude fallback global `~/.claude/CLAUDE.md` | if no global AGENTS.md |
| Skills Claude `~/.claude/skills/` | see skills docs |

Disable Claude compat:
```
export OPENCODE_DISABLE_CLAUDE_CODE=1
export OPENCODE_DISABLE_CLAUDE_CODE_PROMPT=1
export OPENCODE_DISABLE_CLAUDE_CODE_SKILLS=1
```

### Precedence
1. Local walk-up (`AGENTS.md`, then `CLAUDE.md`)
2. Global `~/.config/opencode/AGENTS.md`
3. `~/.claude/CLAUDE.md` (unless disabled)
First match wins per category.

### Custom instructions (opencode.json)
```json
{
  "$schema": "https://opencode.ai/config.json",
  "instructions": [
    "CONTRIBUTING.md",
    "docs/guidelines.md",
    ".cursor/rules/*.md",
    "https://raw.githubusercontent.com/my-org/shared-rules/main/style.md"
  ]
}
```
Remote: 5s timeout. Combined with AGENTS.md.

### External file lazy-load pattern in AGENTS.md
Teach agent: when `@rules/foo.md` seen → Read tool on need-to-know; do not preemptively load all; treat as mandatory when loaded; follow recursively.

---

## PASS 5b — skills (FULL extract, RU locale page + EN patterns)
Source: https://opencode.ai/docs/ru/skills/ (and EN twin)

### Purpose
Reusable SKILL.md loaded **on demand** via built-in tool `skill`. Agents see name+description list, load full body when needed.

### Discovery paths (priority-compatible)
- `.opencode/skills/<name>/SKILL.md`
- `~/.config/opencode/skills/<name>/SKILL.md`
- `.claude/skills/<name>/SKILL.md`
- `~/.claude/skills/<name>/SKILL.md`
- `.agents/skills/<name>/SKILL.md`
- `~/.agents/skills/<name>/SKILL.md`

Local: walk cwd → git root; load all matching. Global also loaded.

### Frontmatter (only recognized)
- `name` (required)
- `description` (required)
- `license` (optional)
- `compatibility` (optional)
- `metadata` (optional string→string map)
Unknown fields ignored.

### Name rules
- 1–64 chars
- lowercase letters/numbers + single hyphens
- no leading/trailing `-`, no consecutive `--`
- must match directory name
- regex: `^[a-z0-9]+(-[a-z0-9]+)*$`

### Description length
1–1024 characters; specific enough for agent choice.

### Example
```md
---
name: git-release
description: Create consistent releases and changelogs
license: MIT
compatibility: opencode
metadata:
  audience: maintainers
  workflow: github
---
## What I do
- Draft release notes from merged PRs
- Propose a version bump
- Provide copy-pasteable `gh release create` command
```

### Tool surface
```
skill({ name: "git-release" })
```
`<available_skills>` lists name+description for each.

### Permission on skills
```json
{
  "permission": {
    "skill": {
      "*": "allow",
      "pr-review": "allow",
      "internal-*": "deny",
      "experimental-*": "ask"
    }
  }
}
```
| Value | Behavior |
|-------|----------|
| allow | load immediately |
| deny | hidden + rejected |
| ask | user approval |

Per-agent override in agent frontmatter or `agent.plan.permission.skill`.

Disable skill tool entirely: `tools: { skill: false }` (legacy) or permission deny.

### Troubleshooting load
- SKILL.md must be uppercase filename
- name + description required
- unique names across locations
- deny permission hides skill

---

## PASS 5c — Skills (skills.sh Ethical Hacking Methodology) — CEILING GATED
Source: skills.sh / davila7/claude-code-templates / Ethical Hacking Methodology
Install: `npx skills add https://github.com/davila7/claude-code-templates --skill 'Ethical Hacking Methodology'`
Stars: 30.6K; audits: Agent Trust Hub PASS, Socket PASS, Snyk FAIL

**HARD CEILING for this operator vault**:
- **Authorized use only** — written owner authorization required
- Public-record / white-hat lifecycle framing only
- Do NOT expand unauthorized exploit methods beyond public documentation already present
- Align with `osint-public-ceiling` + `hitl-governance` + `secret-store-hygiene`

Phases documented in source (summary only for candidate skill):
1. Hacker types (white/black/grey/script kiddie/hacktivist/nation-state)
2. Reconnaissance (passive OSINT: WHOIS, DNS, theHarvester, Google dorks, social)
3. Scanning (nmap host/port/service)
4. Vulnerability analysis (Nikto, OWASP Top 10, gobuster, whatweb)
5. Exploitation (Metasploit, hydra, sqlmap — **authorized lab only**)
6. Maintaining access (persistence patterns — document for reporting only)
7. Reporting (exec + technical + risk ratings + remediation)
8. Attack type taxonomy (phishing, malware classes, network attacks)
9. Kali setup notes
10. Ethical/legal guidelines (written auth, scope, confidentiality)

Candidate skill name: `ethical-hacking-methodology` — **P3, ceiling-gated, no unauthorized expansion**.

---

## PASS 5d — INDEX LIVE · V1 (ImageGen skill full body)
Source: agenticskills.io ImageGen by OpenAI, A-RANK, 25.4K stars
Install: `npx skills add openai/skills@imagegen`
Synced from openai/skills@8819588 fetched May 24 2026; INDEX LIVE V1.6.1 Sep 11 2026 stats: 192+ skills, 200+ MCP, 9 platforms

### Modes
1. **Default built-in** `image_gen` tool (preferred; no OPENAI_API_KEY)
2. **Fallback CLI** `scripts/image_gen.py` only when user explicitly asks; needs OPENAI_API_KEY
   Subcommands: generate | edit | generate-batch

### Rules (key)
- Never auto-switch to CLI
- Never modify scripts/image_gen.py
- Built-in saves under `$CODEX_HOME/*`; move project assets into workspace
- Non-destructive versioned filenames
- Taxonomy slugs for generate (photorealistic-natural, product-mockup, ui-mockup, …) and edit (text-localization, identity-preserve, …)
- Shared prompt schema: Use case / Asset type / Primary request / Input images / Scene / Subject / Style / Composition / Lighting / Palette / Materials / Text / Constraints / Avoid

Port candidate: `skillmd-imagegen-port` → map to Grok `imagine` skill tools.

---

## Claim tags
| Claim | Tag |
|-------|-----|
| OpenCode docs content | **RS** (documentation of product) |
| Recommended model lists | **MAYBE** (time-sensitive; verify Models.dev / xAI) |
| Ethical hacking skill body | **authorized-use-only**; do not expand exploits |
| AgenticSkills ImageGen | **RS** public skill body |

## NOT for elevation
- Empty `examples` file (0 bytes)
- Multi-MB "Skip to content" HTML chrome without structure
- Any credential material (none found)

## Next leads
1. Ship full `/models` skill (this run) — dual-persist Drive+GitHub
2. P1 companions: opencode-agents, opencode-commands, opencode-rules, opencode-skills
3. Optional: ClaudSkills harvest (skill-registry-harvest already exists)
4. Optional: ethical-hacking-methodology (ceiling-gated)
5. Optional: skillmd-imagegen-port to imagine
