# Tests

Integration tests for the `kliping` CLI, after `packages/tests` in shadcn/ui.
They run the built CLI (`packages/cli/dist`) against real projects copied from
`fixtures/` and the Kliping registry served locally from `docs/public/r`, and
build each project at the end.

```bash
npm run cli:build
npm run test:e2e        # from the repository root
```

Needs network access to the npm registry (dependency installs) and `pnpm`
(the Nuxt fixture: npm 10 cannot install Nuxt 4 from scratch).

| Fixture | What it is |
| --- | --- |
| `vite-app` | `npm create vite -- --template vue-ts`, untouched |
| `vite-app-js` | `npm create vite -- --template vue`, untouched |
| `nuxt-app` | the Nuxt 4 starter, without Tailwind CSS |
| `no-framework` | a `package.json` and nothing else |
