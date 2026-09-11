# Deployments — models

## Workspace layout
```
.grok/skills/models/
  SKILL.md
  references/
    workflows.md
    tools.md
    examples.md
    deployments.md
```

Mirror:
```
artifacts/skill-packages/models/   (same tree)
artifacts/drive-distill-untitled-2026-09-11/  (source distill)
```

## Dual-persist checklist
1. **Workspace** — author under `.grok/skills/models/`
2. **Artifacts mirror** — copy to `artifacts/skill-packages/models/`
3. **Drive** — upload to skill-tree folder  
   ID: `12_VD_KWRsrhxLrVMXfXvlTKKQ4e11dmY`  
   URL: https://drive.google.com/drive/folders/12_VD_KWRsrhxLrVMXfXvlTKKQ4e11dmY
4. **GitHub** — `cantgetalonggta-png/meridian-drive-vault-atlas`  
   Path: `skills/models/`  
   Live: https://github.com/cantgetalonggta-png/meridian-drive-vault-atlas
5. Update `ENCYCLOPEDIA_INDEX.md` models row + As-of

## Version policy
- Stamp As-of on every model-list change
- After provider retirement notices, re-run W5 and bump skill
- Never commit secrets (api-keys-secret-store is separate private repo)

## Install (OpenCode-compatible users)
Copy package to:
- `.opencode/skills/models/SKILL.md` (+ references/)
- or `~/.config/opencode/skills/models/SKILL.md`

Also compatible paths: `.claude/skills/models/`, `.agents/skills/models/`

## Name contract
- name: `models` (matches folder)
- description: 1–1024 chars (see frontmatter)
- regex: `^[a-z0-9]+(-[a-z0-9]+)*$`

## Related next ships
P1: opencode-agents, opencode-commands, opencode-rules, opencode-skills  
P2: model-default-setter, variant-presets, slash-command-router
