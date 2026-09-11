# Drive Skill Distiller — Tools & calls

## Drive inventory

```text
google_drive_search
  exact_name: "Grok-Agent-Vault"
  mime_type_filter: application/vnd.google-apps.folder

google_drive_list_folder
  folder_id: <id>
  max_results: 100
```

## Read strategies

| Type | Tool | Notes |
|------|------|-------|
| Google Doc | `google_drive_read_file` | Markdown export |
| Plain text | `google_drive_read_file` | Full if small |
| PDF | `google_drive_read_file` pages / `download_artifact` | Truncation possible |
| Audio mp3 | list only | Meta; don't force transcript without need |
| .env / keys | **skip body** | Blocklist |

## Search inside vault

```text
google_drive_search
  folder_id: <investigations-id>
  query: "DISCOVERY_METHODS" OR "MASTER_DISTILL" OR "CORE"
  include_content: true  # only when summarizing top hits
```

## Dual-persist

```text
google_drive_create_folder
  folder_name: skill-encyclopedia-2026-09-11
  parent_folder_id: <skill-tree-id>

google_drive_upload_artifact
  artifact_path: /MASTER_DISTILL.md
  folder_id: <new-folder>
  mime_type: application/vnd.google-apps.document  # optional Doc conversion
```

## GitHub mirror

```text
github___create_repository
  name: operator-skill-encyclopedia
  private: false

# then git commit skills/ tree OR push_files for small sets
```

## Web link follow

```text
web_search
  query: site:archive.org epsteindocs
  # or exact claim verification
```

## Local distill helpers

- `node --experimental-strip-types` to export app seeds
- Python PIL + ffmpeg for briefing infographics if Imagine limited
- `tar czf` source backups excluding secrets

## Block patterns (filename)

```text
*keys*.env
god_tier*
api-keys-secret-store*
*password*
*token*store*
```
