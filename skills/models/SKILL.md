---
name: models
description: >
  Select, configure, and route LLM models for OpenCode, Grok/xAI, and multi-provider
  agent stacks. Use when user says /models, set default model, model variants,
  reasoning effort, provider/model_id, recommended models, cycle variants, or
  configure opencode.json model. Covers load priority, variants, agent model
  overrides, and safe defaults without secrets.
metadata:
  short-description: "Select/configure LLM models, variants, defaults"
  as-of: "2026-09-11"
  sources: "Drive Untitled/models OpenCode docs + xAI public"
user-invocable: true
---

# Models

As-of: 2026-09-11  
Sources: Drive Untitled folder `models` (OpenCode docs, last updated Sep 10 2026), Models.dev patterns, xAI public lineup.  
Ceiling: **no API keys** in this skill or configs committed to public git.

## When to use
- User types **`/models`**
- "Set default model", "which model for coding", "high reasoning", "switch variant"
- Configuring `opencode.json` / agent `model` fields / Grok API model IDs
- Routing Plan vs Build agents to different models
- Verifying retired IDs / load priority / custom variants

## Core concepts

### Model ID format
```
provider_id/model_id
```
Examples:
| Style | Example |
|-------|---------|
| Anthropic | `anthropic/claude-sonnet-4-5-20250929` |
| OpenAI | `openai/gpt-5` |
| OpenCode Zen | `opencode/gpt-5.1-codex` |
| xAI / Grok | `xai/grok-4.6` or platform-native `grok-4.6` |
| Local LM Studio | `lmstudio/google/gemma-3n-e4b` |
| Custom provider | `provider` key + nested `models` key |

### Load priority (OpenCode-compatible)
1. CLI `--model` / `-m` (`provider_id/model_id`)
2. Config `model` key in `opencode.json`
3. Last used model
4. First model by internal priority

### Select in TUI / chat
```
/models
```
Credentials for providers: `/connect` (see providers docs). OpenCode uses **AI SDK** + **Models.dev** (75+ providers + local).

## Recommended models (verify live — time-sensitive MAYBE)

### OpenCode doc snapshot (Sep 2026)
Models good at **both code generation and tool calling**:
- GPT 5.2
- GPT 5.1 Codex
- Claude Opus 4.5
- Claude Sonnet 4.5
- Minimax M2.1
- Gemini 3 Pro

### Operator table (OpenCode + xAI public)

| Use case | Candidates |
|----------|------------|
| General flagship | Grok 4.6 / 4.5, Claude Opus/Sonnet 4.5, GPT 5.x |
| Coding + tools | Grok 4.6, Grok Build 0.1, GPT 5.1 Codex, Claude Sonnet |
| Cheap/fast volume | Grok 4.1 Fast, Haiku-class |
| Long context / multi-agent | Grok 4.20-class (verify context window) |
| Images/video | Grok Imagine Image/Video (`imagine` skill) |
| Plan-only (no edits) | Smaller/faster model on Plan agent |

**Do not treat recommended lists as eternal** — re-check Models.dev / docs.x.ai / OpenCode docs.

## Set a default
```json
{
  "$schema": "https://opencode.ai/config.json",
  "model": "anthropic/claude-sonnet-4-5-20250929"
}
```
Local example from OpenCode docs:
```json
{
  "$schema": "https://opencode.ai/config.json",
  "model": "lmstudio/google/gemma-3n-e4b"
}
```

## Per-model options (global)
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
          },
          "variants": {
            "high": {
              "reasoningEffort": "high",
              "textVerbosity": "low",
              "reasoningSummary": "auto"
            },
            "low": {
              "reasoningEffort": "low",
              "textVerbosity": "low",
              "reasoningSummary": "auto"
            }
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
Agent-level `model` / options **override** global.

## Variants (reasoning / thinking)

| Provider family | Built-in variants (OpenCode defaults) |
|-----------------|----------------------------------------|
| Anthropic | `high` (default), `max` thinking budget |
| OpenAI | `none`, `minimal`, `low`, `medium`, `high`, `xhigh` (varies by model) |
| Google | `low`, `high` |
| xAI Grok | reasoning effort where supported: none/low/medium/high/xhigh |

### Custom variants + disable
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
Cycle with keybind **`variant_cycle`** when configured (see OpenCode keybinds).

## Per-agent model routing
```json
{
  "$schema": "https://opencode.ai/config.json",
  "agent": {
    "plan": {
      "mode": "primary",
      "model": "anthropic/claude-haiku-4-20250514",
      "temperature": 0.1,
      "permission": { "edit": "deny", "bash": "ask" }
    },
    "build": {
      "mode": "primary",
      "model": "xai/grok-4.6",
      "temperature": 0.3,
      "permission": { "edit": "allow", "bash": "allow" }
    }
  }
}
```
- Primary agents: default to global model if unset
- Subagents: inherit invoker primary model if unset
- Use `steps: N` for cost-limited quick thinkers

## Temperature bands (agent option)
| Range | Use |
|-------|-----|
| 0.0–0.2 | Analyze, plan, deterministic code review |
| 0.3–0.5 | General development |
| 0.6–1.0 | Brainstorm, creative exploration |
Defaults: 0 for most models; ~0.55 for Qwen-class.

## Do / Don't

**Do**
- Prefer explicit `provider/model` IDs
- Match model to agent mode (Plan → cheaper/restricted; Build → strong tool-caller)
- Verify retired IDs against current provider docs (W5)
- Stamp As-of when model lists change

**Don't**
- Paste API keys into skills, chat, or public git configs
- Assume recommended lists are eternal
- Put secrets in model config files committed publicly
- Use mini/fast models for heavy multi-tool agent loops without testing tool quality

## Related skills
- `xai-api` — xAI API calls
- `imagine` — image/video models
- `opencode-agents` (candidate) — per-agent model override
- `opencode-variants` (candidate) — deep variant presets
- `skill-creator` — author more model skills
- `secret-store-hygiene` — never bake keys
- `slash-command-router` (candidate) — map `/models` to this skill

## Open references
- `references/workflows.md` — step-by-step W1–W6
- `references/tools.md` — tools + verification
- `references/examples.md` — basic → advanced
- `references/deployments.md` — dual-persist Drive + GitHub
