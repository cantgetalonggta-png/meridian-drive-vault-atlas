# Examples — models

## Basic 1 — List models
**User:** `/models`  
**Agent:**
1. Show recommended table (OpenCode snapshot + Grok).
2. Note As-of date and MAYBE tag on rankings.
3. Ask use case (coding / plan / cheap / long-context / image).

## Basic 2 — Set default
**User:** "Make Claude Sonnet default"  
**Agent:** Emit only:
```json
{
  "$schema": "https://opencode.ai/config.json",
  "model": "anthropic/claude-sonnet-4-5-20250929"
}
```
Confirm write path; never include keys.

## Basic 3 — Grok coding
**User:** "Best Grok for coding agents"  
**Agent:** Propose Grok 4.6 or Build 0.1; mention tool-calling strength; optional high reasoning variant; link `imagine` only if visuals needed.

## Basic 4 — Local model
**User:** "Use local Gemma"  
**Agent:**
```json
{ "model": "lmstudio/google/gemma-3n-e4b" }
```
Remind LM Studio must be running.

## Advanced 1 — Dual agent routing
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

## Advanced 2 — Custom variants
```jsonc
{
  "provider": {
    "openai": {
      "models": {
        "gpt-5": {
          "variants": {
            "thinking": {
              "reasoningEffort": "high",
              "textVerbosity": "low",
              "reasoningSummary": "auto"
            },
            "fast": { "reasoningEffort": "low" }
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

## Advanced 3 — Cost-limited steps
```json
{
  "agent": {
    "quick-thinker": {
      "description": "Fast reasoning with limited iterations",
      "model": "anthropic/claude-haiku-4-20250514",
      "steps": 5,
      "prompt": "Solve with minimal steps; summarize remaining work if capped."
    }
  }
}
```

## Advanced 4 — Command with model override
```json
{
  "command": {
    "analyze": {
      "template": "Deep analysis of $ARGUMENTS",
      "description": "High-reasoning analysis",
      "agent": "plan",
      "model": "anthropic/claude-opus-4-5-20250929"
    }
  }
}
```

## Failure recovery
**User passes retired `grok-3`:** explain redirect era; set explicit current ID (`grok-4.6` or whatever W5 returns); never invent IDs.
