## Atomic design rules (as enforced by `scripts/lint-atomic.cjs`)

This document describes the rules implemented by `scripts/lint-atomic.cjs` and explains how imports are resolved, which imports are allowed from which layers, and how the linter reports problems.

## Project layout assumptions

- Root of source files: `src/` (variable `SRC` in the script).
- Optional folders used by checks:
  - `src/presentation/` (checked for `atoms` presence)
  - `src/application/` (expected to exist in some architectures)

The linter is conservative and works by resolving imports to absolute filesystem paths and then checking whether those resolved paths match allowed directories depending on the importing file's type.

## File collection and line limit

- The linter collects all `.jsx` files under `src/`.
- Default line-length rule: files are flagged if they exceed 200 lines. (This value is configurable in the script; increase if you prefer larger files.)

## Import resolution behaviour

- Relative imports (starting with `.`) are resolved by trying candidates in this order:
  1. The raw path as written
  2. The raw path with each of the valid extensions appended (`.js`, `.jsx`, `.ts`, `.tsx`, `.json`)
  3. The `index` file inside the path for each valid extension (e.g. `path/index.jsx`)

- Package imports (not starting with `.`) are resolved using `require.resolve(importPath, { paths: [ROOT] })` and the returned path is used for rule checks.

- If an import cannot be resolved to an existing file, the linter marks it as an unresolved-import error.

## Package root handling and subpath imports

- When checking whether an import is a whitelisted UI library, the linter derives a package root:
  - For scoped packages (starting with `@`), the root is the first two segments, e.g. `@org/pkg`.
  - For normal packages, the root is the first path segment, e.g. `react-icons` from `react-icons/fi`.

This allows subpath imports like `react-icons/fi` to be considered allowed when `react-icons` is whitelisted.

## Layered import rules

The linter classifies files by path to determine their layer:

- Pages: files with `/pages/` in their path
- Templates: files with `/templates/` in their path
- Molecules: files with `/molecules/` in their path

Rules applied per layer (the intent is to enforce an atomic/clean layering):

- Pages
  - Allowed to import from:
    - `.../templates/...` (project templates)
    - `.../application/...` (application-level modules)
    - `.../components/shared/...` (explicit shared components)
    - `.../components/core/...` (explicit core components)
    - Whitelisted UI libraries (e.g., `react`, `@tonejs/midi`, `react-icons`, etc.)
  - Any other resolved import path is flagged with: "Page imports \"X\". Only /templates, /application, /components/shared, /components/core, or whitelisted UI libraries allowed."

- Templates
  - Allowed to import from:
    - `.../molecules/...`
    - Whitelisted UI libraries
  - Other imports are flagged for violating template layering.

- Molecules
  - Allowed to import from:
    - `.../atoms/...`
    - Whitelisted UI libraries
  - Other imports are flagged for violating molecule layering.

These checks compare the normalized resolved path (filesystem path) for substrings like `/templates`, `/application`, `/components/shared`, `/components/core`, `/molecules`, and `/atoms`.

## Whitelisted UI libraries

The script contains a `uiLibs` set of allowed external packages such as:

- react, react-dom, react-icons, @tonejs/midi, tonal, axios, firebase, recharts, tailwindcss, etc.

Add to this set if your project relies on additional external UI or runtime libraries that should be allowed anywhere.

## Report generation and exit codes

- The linter writes `atomic-lint-report.html` to the repository root. The report groups errors by file and renders a collapsible tree view.
- The script prints errors to stderr and exits with code `1` when errors exist; otherwise it prints success and exits `0`.

## Recommendations & migration options

- Preferred long-term: keep pages thin and composed from `templates` and `application` to preserve atomic layering.

- Practical compromise used here: pages may import from `src/components/shared` or `src/components/core`. If many existing pages directly import many items from `src/components/`, consider migrating commonly used shared components into one of these folders.

- Migration approaches:
  - Move high-use components (Sidebar, BottomNavBar, Notifications, common layout pieces) into `src/components/shared/` or `src/components/core/` and update imports across pages.
  - Do the migration in small batches and re-run the linter after each batch.

- If you prefer to skip migration for now, relax the rule by allowing `rel.includes('/components')` in the pages check (this is less strict but faster).

## How to run the linter

From the repo root (PowerShell):

```pwsh
node .\scripts\lint-atomic.cjs
```

This command writes `atomic-lint-report.html` and will exit non-zero if issues are found.

## Notes and caveats

- The script currently scans only `.jsx` files. If your codebase uses `.tsx`/`.ts` heavily, update `getAllFiles` calls or add an additional pass.
- The script resolves packages using Node's resolution algorithm anchored at the repository root. Monorepos or non-standard module layouts may require adjusting `tryResolvePackage`.
- The line-length limit and specific allowed folders are intentionally opinionated—tune them to your team's priorities.

---

If you want, I can:

- Apply an automated migration moving a chosen list of shared components into `src/components/shared` and update imports across the repo.
- Relax the rule to allow `src/components` for pages if migration is not practical right now.

Pick which action to take next and I will implement it.
