# TJMUN Website

Official website for Thomas Jefferson High School for Science and Technology Model United Nations.

## Project Shape

This is a static HTML/CSS site with a small TypeScript layer for first-party behavior and tooling.

```text
tjmun-website/
├── index.html
├── pages/                       # Content pages
├── assets/
│   ├── css/                     # Site styles
│   ├── js/                      # First-party TypeScript source and browser JS output
│   ├── img/                     # Images and video
│   └── vendor/                  # Third-party browser bundles
├── templates/                   # Reusable HTML templates
├── forms/                       # PHP form handlers
├── guides/                      # Background-guide PDFs
└── scripts/                     # TypeScript utility scripts
```

## Development

Install development tooling:

```bash
npm install
```

Run TypeScript validation:

```bash
npm run typecheck
```

Build browser/runtime JavaScript from TypeScript:

```bash
npm run build
```

Serve locally:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## TypeScript Layout

First-party JavaScript has been moved to TypeScript:

- `assets/js/main.ts` controls shared browser behavior.
- `assets/js/event-signup.ts` handles legacy signup-form behavior.
- `scripts/template-generator.ts` builds pages from templates.

Compiled `.js` files are runtime output for static hosting. HTML pages should keep loading `.js` files, because browsers do not execute TypeScript directly. Edit `.ts` files, then run `npm run build`.

Third-party bundles in `assets/vendor/` stay as vendor JavaScript. Do not rewrite vendored libraries into TypeScript by hand. Replace them only by updating vendor packages or downloaded vendor assets.

## Typing Standards

TypeScript should make code easier to change, not harder to read. Keep typing practical and incremental.

- Prefer clear names and small functions before adding complex types.
- Use explicit types for shared data shapes, config objects, public class methods, and anything reused across files.
- Let TypeScript infer obvious local variables.
- Use DOM generics for queried elements when element-specific properties are needed, such as `document.querySelector<HTMLElement>(".selector")`.
- Guard nullable DOM lookups before using them.
- Avoid broad `any` in new code. If legacy code needs `any`, keep it local and add a short comment only when the reason is not obvious.
- Keep browser globals declared near the top of the file that uses them until a shared declarations file is worth adding.
- Do not add clever generic abstractions for one-off page behavior.
- Prefer `const` and pure helper functions where possible.
- Keep side effects inside named initialization functions, then call those functions from the entrypoint.

## Expansion Rules

When adding new TypeScript:

1. Put shared browser behavior in `assets/js/`.
2. Put build or maintenance scripts in `scripts/`.
3. Add narrow interfaces or type aliases when data crosses function or file boundaries.
4. Keep generated JavaScript out of manual edits.
5. Run `npm run typecheck` before committing.
6. Run `npm run build` when browser-loaded scripts changed.

## Template System

Templates live in `templates/`. Use `scripts/template-generator.ts` as the source for template generation logic. If generated pages need shared behavior, put that behavior in a TypeScript file under `assets/js/` and compile it.

## Content Notes

- Main page: `index.html`
- TECHMUN pages: `pages/techmun/`
- Event pages: `pages/events/`
- Leadership and awards: `pages/about/`
- Background guides: `guides/`

Asset paths vary by page depth. Keep existing relative path style unless moving a page.

## Verification Checklist

Before publishing:

```bash
npm run typecheck
npm run build
python -m http.server 8000
```

Then spot-check homepage navigation, mobile navigation, counters, scroll animations, and any page touched by the change.

## Contact

Thomas Jefferson High School for Science and Technology  
6560 Braddock Rd  
Alexandria, VA 22312  
United States

Email: tjmodelun@gmail.com

## License

Copyright TJMUN. All rights reserved.
