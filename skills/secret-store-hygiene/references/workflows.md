# Workflows — secret-store-hygiene

## W1 · Classify folder
1. list_folder Epstein's shit.
2. Mark *.env and Key_loader* as block.
3. .py architecture may be index-only without secrets.

## W2 · Redact skill draft
1. rg for sk-|api_key|OPENAI_API_KEY assignments with values.
2. Replace with placeholders.
3. Re-ship.

## W3 · GitHub push scan
1. Prefer github___run_secret_scanning when available.
2. Never force-push secrets.
