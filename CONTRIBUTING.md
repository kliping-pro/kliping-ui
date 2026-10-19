# Contributing to Kliping

Thanks for helping. Kliping is a Vue 3 + Tailwind CSS v4 component registry
(https://kliping.pro) and the `kliping` CLI (`packages/cli`).

## Setup

Node.js 22.12 or newer, npm 10.

```bash
npm ci
npm run check        # every fast quality gate, about 3 minutes
npm run docs:dev     # the site at http://localhost:5173
```

Use `npm ci`, not `npm install`, unless you are adding or changing a
dependency: a lockfile rewritten by another npm version can break the
Cloudflare build (`npm run check:lockfile` catches it).

`npm ci` also installs the git hooks (Husky):

| Hook | Runs | Time |
|---|---|---|
| `pre-commit` | secret check on staged changes, language, CLI commands, lockfile | ~3 s |
| `commit-msg` | commit message format (commitlint) | instant |
| `pre-push` | typecheck, SFC, registry, README counts, bundle budget | ~1.5 min |

Commit messages follow `type(scope): summary` — types: `feat`, `fix`, `docs`,
`refactor`, `chore`, `style`, `test`, `perf`, `ci`, `build`, `revert`.

## Where things live

| Folder | What |
|---|---|
| `src/components`, `src/blocks`, `src/variants`, `src/charts`, `src/composables`, `src/lib` | registry items — the code users install |
| `src/demo` | examples shown on the site |
| `docs/` | the site (VitePress) |
| `packages/cli` | the `kliping` CLI |
| `packages/tests` | CLI integration tests against real projects |
| `scripts/` | registry generator and quality gates |

## Rules

- **English for everything that ships or is named**: file and folder names,
  identifiers, props, UI text, demo text, error messages, JSON keys, CLI
  flags. Code comments may be in Indonesian (they are stripped from the
  published code). `npm run check:language` enforces this.
- **Design tokens only** — no raw colors; use the theme variables.
- After changing a registry item, run `node scripts/generate-registry.mjs`
  and commit `registry.json`. It fails with a clear message when an import,
  package or dependency cannot be mapped.
- CLI changes need a test (`packages/cli`, `vitest`) and a line in
  `packages/cli/CHANGELOG.md`.

## Pull requests

1. Branch from `main`.
2. `npm run check` passes. For site or UI changes, also `npm run docs:build`.
   For CLI or registry changes, run the relevant integration tests:
   `npm run cli:build && npm run test:e2e` (needs pnpm and network access to npm).
3. Describe what changed and how you verified it.

CI runs the same `check` job on every pull request, plus the integration
tests and a full site build.

## License

By contributing you agree that your contribution is licensed under the MIT
license of this repository.
