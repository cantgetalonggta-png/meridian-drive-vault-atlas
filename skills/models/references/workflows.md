# Workflows — models

## W1 · /models interactive select
1. User invokes `/models` or "list models" / "which model".
2. Show: current default (if known), recommended table, provider families.
3. Ask use case: coding | plan | cheap | long-context | image | voice | brainstorm.
4. Propose `provider/model` + optional variant + temperature band.
5. Optionally emit config snippet (**no keys**).
6. Offer to write project `opencode.json` only with user confirm.

## W2 · Set default model
1. Confirm target config path (`opencode.json` project or `~/.config/opencode/`).
2. Write `"model": "provider/model_id"`.
3. Validate ID format (must contain `/` for multi-provider stacks).
4. Smoke: restart session / re-read config / CLI `--model` override still wins.
5. Commit AGENTS.md note if team should share default (optional).

## W3 · Configure variants
1. Identify provider family (Anthropic / OpenAI / Google / xAI / custom).
2. Add `variants` map under `provider.<id>.models.<model>.variants`.
3. Optionally set global `options` for default reasoningEffort / thinking budget.
4. Document `variant_cycle` keybind if used.
5. Test one high + one low path on a short task.

## W4 · Per-agent model routing
1. Plan agent → fast/cheap model, `edit` deny / bash ask.
2. Build agent → flagship tool-caller, full allow.
3. Subagent explore → read-only + fast model.
4. Subagent general → flagship if multi-step edits needed.
5. Write agent blocks in `opencode.json` or `.opencode/agents/*.md`.
6. Optional: `steps: 5` on quick-thinker agents for cost control.

## W5 · Verify live availability
1. `web_search` or browse Models.dev / docs.x.ai / opencode.ai/docs/models for current IDs.
2. Note retirements/redirects (historical Grok redirects; date-stamp tables).
3. Update recommended table in this skill if stale.
4. Bump As-of date in SKILL.md frontmatter + body.
5. Dual-persist update (W6 / deployments).

## W6 · Failure recovery
| Symptom | Fix |
|---------|-----|
| Unknown model ID | Check provider docs; use Models.dev slug; fix `provider/model` format |
| Retired model | Switch to redirect target explicitly; do not rely on silent aliases |
| High cost | Lower variant / set `steps` / Fast tier / Plan agent for analysis |
| Bad tool calling | Prefer models known for tools (flagship, Codex, not mini) |
| Local model not found | Confirm LM Studio / local provider running; ID `lmstudio/...` |
| Agent ignores model | Check agent-level override vs global; primary vs subagent inheritance |

## W7 · Dual-persist this skill after change
1. Mirror workspace → `artifacts/skill-packages/models/`
2. Drive upload to skill-tree folder
3. GitHub push `skills/models/**` on meridian-drive-vault-atlas
4. Update ENCYCLOPEDIA_INDEX models row
