# Agent Working Notes

## Project Shape

- Static TJMUN website built from HTML, CSS, JavaScript, and vendored browser libraries.
- Serve locally with `python3 -m http.server 8000`.
- Main pages live under `pages/`; TECHMUN pages live under `pages/techmun/`.
- Reusable markup lives under `templates/`.
- Project-owned CSS and JS live under `assets/css/` and `assets/js/`.
- Third-party code lives under `assets/vendor/`; do not reformat or hand-edit vendor files unless replacing a library intentionally.

## Workflow

- Check `git status --short` before edits.
- Keep changes scoped. Avoid unrelated copy rewrites or design changes during maintenance tasks.
- Preserve existing static-hosting assumptions: root-relative template fetches such as `/templates/navigation.html` require a local/server deploy context, not direct `file://` browsing.
- If Archon MCP tools are available, use them for task tracking before coding. If they are not available in the current agent environment, state that and continue with local repo checks.

## Formatting

- Use Prettier for owned HTML, CSS, JS, and Markdown:

```bash
npx prettier@3 --write "**/*.{html,css,js,md}"
```

- `.prettierignore` excludes images, PDFs, source maps, minified files, and `assets/vendor/`.
- Python uses 4-space indentation. HTML/CSS/JS/Markdown use 2 spaces.

## Verification

- Run the narrowest useful checks for the change:

```bash
python3 -m py_compile scripts/*.py
node --check scripts/template-generator.js
node --check assets/js/main.js
node --check assets/js/event-signup.js
```

- For page/link work, start a local static server and inspect affected pages:

```bash
python3 -m http.server 8000
```

## Cleanup Rules

- Do not commit OS/editor artifacts (`.DS_Store`, `.idea/`, `.cursor/`).
- Keep real media assets under `assets/img/`.
- Keep PDF resources under `guides/` unless a page intentionally owns a download in its section.
- Keep README structure in sync with actual folders when pages move.
