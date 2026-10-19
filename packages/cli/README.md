# kliping

The Kliping CLI. Adds components, blocks, variants, charts and hooks from the
[Kliping](https://kliping.pro) registry to your Vue, Nuxt, Astro or Laravel
project — the source lands in your codebase, not in `node_modules`.

```bash
npx kliping@latest add accordion
pnpm dlx kliping@latest add accordion
yarn dlx kliping@latest add accordion
bunx --bun kliping@latest add accordion
```

## init

Sets up an existing project: writes `components.json`, installs the base
dependencies (`tw-animate-css`, `class-variance-authority`, `clsx`,
`tailwind-merge`), adds `lib/utils.ts` (`cn()`) and the theme tokens to your
global CSS.

```bash
npx kliping@latest init
```

- **Empty folder:** creates a new Vite or Nuxt project with Tailwind CSS and
  the `@` alias ready, then initializes it.
- **Existing Vite (TypeScript or JavaScript) or Nuxt project** without
  Tailwind CSS v4 or the `@` alias: sets them up first, then initializes.
  Astro, Laravel and Tailwind v3 projects: follow
  https://kliping.pro/installation.
- **Already has `components.json`**: nothing to do — `kliping add` works
  right away. `init --force` starts over.

| Option | Description |
| --- | --- |
| `-b, --base-color <color>` | `neutral`, `gray`, `zinc`, `stone`, `slate` |
| `--font <font>` | `inter`, `geist-sans`, `figtree`, `jetbrains-mono`, … |
| `--icon-library <lib>` | `lucide`, `tabler`, `hugeicons`, `phosphor`, `remixicon` |
| `-d, --defaults` | use the default configuration, no prompts |
| `-y, --yes` | skip the confirmation prompt |
| `-f, --force` | overwrite an existing `components.json` |
| `--no-base-style` | only write `components.json` |

`init` also accepts item names: `npx kliping@latest init button hero-01`.

## add

Adds items and everything they depend on — npm packages, other registry
items, CSS variables and keyframes.

```bash
npx kliping@latest add button hero-01 chart-bar-default use-boolean
```

Plain names come from the Kliping registry (`https://kliping.pro/r/<name>.json`).
The `@kliping/<name>` namespace means the same thing. Full URLs, local JSON
files, other namespaces from `components.json` and the upstream `@shadcn`
registry (`@shadcn/button`, served by shadcn-vue.com) work too.

With `--page src/LandingPage.vue` it also writes a page that renders the
added blocks in order — the page you assembled at https://kliping.pro/builder.

## create

Creates a new project whose first page already renders your blocks, in
order — from nothing to `npm run dev` in one command.

```bash
npx kliping@latest create my-landing navbar-01 hero-03 footer-01
npx kliping@latest create --from "https://kliping.pro/builder?b=navbar-01,hero-03,footer-01"
```

The page replaces the welcome page: `src/App.vue` (Vite, default) or
`app/pages/index.vue` (`--template nuxt`).

## Other commands

`view`, `search`, `diff`, `docs`, `info`, `migrate`, `build` (build your own
registry) and `mcp` (MCP server for AI editors) work as in shadcn-vue.

## Environment variables

| Variable | Default | |
| --- | --- | --- |
| `REGISTRY_URL` | `https://kliping.pro/r` | where plain names and `@kliping/*` resolve |
| `KLIPING_URL` | `https://kliping.pro` | site used for docs links |
| `HTTPS_PROXY` / `NO_PROXY` | — | proxy for registry requests; hosts in `NO_PROXY` bypass it |

## Credits

Kliping CLI is a fork of the [shadcn-vue](https://github.com/unovue/shadcn-vue)
CLI, itself based on [shadcn/ui](https://ui.shadcn.com). See [LICENSE](./LICENSE).

## License

MIT
