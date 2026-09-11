# Skill Creator — Tools

## Filesystem
- Write skills under `/workspace/.grok/skills/<id>/`
- Depth: `/workspace/.grok/skills/<id>/references/*.md`
- Artifacts for upload: `/workspace/artifacts/`

## Google Drive
| Tool | Use |
|------|-----|
| `google_drive_list_folder` | Inventory |
| `google_drive_search` | Find by name/query; folders need mime filter |
| `google_drive_read_file` | Text/PDF/Docs (lossy for huge PDFs) |
| `google_drive_download_artifact` | Binary → artifacts |
| `google_drive_create_folder` | skill-tree / encyclopedia folders |
| `google_drive_upload_artifact` | Dual-persist skills + distills |

## GitHub
| Tool | Use |
|------|-----|
| `github___create_repository` | New public/private skill or atlas repo |
| `github___push_files` / git CLI | Commit skill trees |
| `github___get_repository_tree` | Verify |

## Local / ship
- `npm run typecheck` / `npm run build` / `browser-smoke.mjs` for app skills
- `ffmpeg` + PIL for briefing videos when Imagine rate-limited
- `tar` source snapshots (exclude node_modules, .env, secrets)

## Do not use for skill bodies
- Raw contents of `keys.env`, `god_tier_keys.env`, `api-keys-secret-store`
- Private contact lists (H11)
- CSAM / exploitation material (hard block)
