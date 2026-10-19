# Changelog

All notable changes to the `kliping` CLI. Versions follow
[semver](https://semver.org); while the major version is `0`, minor releases
may contain breaking changes.

## 0.3.0 — 2026-10-19

### Added

- `kliping create [name] [blocks…]` creates a new project whose first page
  renders the given blocks in order: project files, Tailwind CSS and the `@`
  alias, `init`, the blocks, and the page in place of the welcome page
  (`src/App.vue` in Vite, `app/pages/index.vue` in Nuxt with
  `--template nuxt`). `--from <link>` takes the blocks and the project name
  from a https://kliping.pro/builder link.

### Changed

- `create` is its own command; it was another name for `init`.

### Fixed

- MCP: search results printed `Add command: [object Promise]` instead of the
  `kliping add` command for each item.

## 0.2.0 — 2026-10-18

### Added

- `kliping add <blocks…> --page <file>` also writes a page that renders the
  added blocks in the order given — the page assembled at
  https://kliping.pro/builder (`--page src/LandingPage.vue`, or
  `app/pages/index.vue` in Nuxt). Items without a single main file (hooks,
  lib helpers, multi-part components) are left off the page with a note; an
  existing file is only replaced with `--overwrite`.

## 0.1.1 — 2026-10-18

### Changed

- `kliping search hero` searches the Kliping registry; the registry name is
  optional (`@acme`, a URL or `owner/repo` still work, as does `-q`).
- `search` returns only items whose name or description contains every word
  of the query, best name matches first ("hero": 9 results instead of 454),
  and falls back to fuzzy matching for typos. Results print as a short table
  with an example `add` command; `--json` prints the full JSON as before.
  The default limit is 20 (100 with `--json`).
- `add --dry-run`, `--diff` and `--view` are hidden from `--help` until they
  are implemented (they still stop with a message).

### Fixed

- Without a terminal (CI, pipes) every line was prefixed with `[log]`,
  which also broke the JSON printed by `view`, `docs` and `info`; output now
  goes straight to stdout.
- MCP search tools use the same stricter search.

## 0.1.0 — 2026-10-18

First stable release. Forked from the
[shadcn-vue](https://github.com/unovue/shadcn-vue) CLI 2.8.2. Tested on
Linux (CI: every one of the 882 registry items installed into one Vite
project, then built) and on Windows (npm and pnpm). Previews:
`0.1.0-beta.0` to `0.1.0-beta.4` (17–18 October 2026, `beta` tag).

### Added

- `kliping add <name>` installs items from the Kliping registry
  (`https://kliping.pro/r/<name>.json`): components, blocks, variants,
  charts, hooks and lib helpers, with their npm packages, registry
  dependencies, CSS variables and keyframes. `@kliping/<name>` works too.
- `kliping init` installs the Kliping base (`cn()` in `lib/utils`,
  `class-variance-authority`, `clsx`, `tailwind-merge`, `tw-animate-css`) and
  the theme tokens for the chosen base color, and writes the `@kliping`
  registry to `components.json`, so other shadcn-vue compatible CLIs can
  resolve `@kliping/*` dependencies.
- `kliping init` sets up an existing project that lacks Tailwind CSS v4 or
  the `@` import alias, instead of stopping with an error:
  - **Vite + TypeScript**: installs `tailwindcss`, `@tailwindcss/vite` and
    `@types/node`; adds the plugin and `resolve.alias` to `vite.config`,
    `paths` to `tsconfig.json` / `tsconfig.app.json` (comments and
    formatting kept) and `@import "tailwindcss"` to the global CSS. An
    untouched create-vite demo (stylesheet, `App.vue`, `HelloWorld.vue`,
    demo assets) becomes a small Kliping welcome page; your own files are
    never replaced.
  - **Vite + JavaScript**: the same, with the alias in `jsconfig.json`
    (created when missing).
  - **Nuxt 3/4**: installs `tailwindcss`, `@tailwindcss/vite` and
    `shadcn-nuxt`; adds the vite plugin, `css: ['~/assets/css/tailwind.css']`
    and the module to `nuxt.config`, then runs `nuxt prepare`.
  - Tailwind v3 projects and function-form configs are left alone.
- `kliping init` in an empty folder creates a new Vite + TypeScript (default)
  or Nuxt 4 project from templates built into the CLI — no download, no
  third-party repository — then sets it up as above.
- `kliping diff <name>` shows what changed between an installed item and the
  registry, resolving items and file paths exactly like `add`.
- `KLIPING_URL` and `REGISTRY_URL` environment variables to point the CLI at
  another deployment or a local registry.

### Changed (compared with shadcn-vue 2.8.2)

- What `init` is about to set up itself is shown as a neutral note, not a
  red failure cross.
- An existing `components.json` is only replaced on request (`--force`, or
  "yes" to the prompt); otherwise `init` stops and points to `kliping add`.
- Without an interactive terminal (CI, piped stdin) `init` uses the default
  configuration instead of ending silently with nothing written.
- `add --yes` in a project without `components.json` runs `init` with
  defaults instead of stopping at a prompt.
- `init` no longer asks for a visual style (Kliping items come in one style;
  `--style` still sets it for `@shadcn/*` items) and `--defaults` no longer
  applies a shadcn-vue preset.
- The Astro and Laravel new-project templates are gone: create those
  projects with their own tools, then run `kliping init`
  (https://kliping.pro/installation/manual).
- Dependencies are installed with the package manager on `PATH` instead of
  through corepack.
- Requires Node.js 22.12 or newer.

### Fixed (compared with shadcn-vue 2.8.2)

- `NO_PROXY` / `no_proxy` is honored; registries on localhost or intranet
  hosts are no longer sent through the proxy.
- No more false "Circular dependency detected" warning when several items
  depend on the same item.
- A file that is alone of its kind among the installed items (for example
  `lib/utils.ts`, a single-file hook or block) is placed under its alias
  instead of `lib/kliping/lib/utils.ts`.
- Windows: paths written with both `\` and `/` no longer make a project look
  like part of a monorepo (blank and duplicate lines under "Updated files").

### Known issues

- npm 10 (bundled with Node.js 22) crashes installing a new Nuxt 4 project
  ("edgesOut", an npm bug that `npm create nuxt` hits too). `init` says so;
  use `pnpm dlx kliping@latest init` or update npm.
