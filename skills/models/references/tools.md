# Tools — models

## Runtime (OpenCode)
- Chat/TUI: `/models`
- Connect providers: `/connect`
- Config: `opencode.json`, `opencode.jsonc`, `~/.config/opencode/`
- CLI: `--model provider/model_id` or `-m`
- Keybind: `variant_cycle` (when configured)

## Agent tools (this Grok environment)
| Tool | Use for models skill |
|------|----------------------|
| `web_search` | Verify current model lists / pricing / retirements (W5) |
| `run_terminal_command` | Edit local config when in workspace |
| `google_drive_read_file` | Re-read Drive `models` doc if docs drift |
| `github___push_files` / git | Dual-persist skill updates |
| `imagine_*` | When routing to image/video models |
| Voice tools | TTS/voice models when applicable |

## External references (no secrets)
- https://opencode.ai/docs/models/
- https://models.dev/
- https://ai-sdk.dev/
- https://docs.x.ai/ (Grok lineup)

## Do not
- Store API keys in skill files or public repos
- Call provider APIs with secrets pasted from chat
- Commit `.env` or auth-profiles into meridian-drive-vault-atlas
