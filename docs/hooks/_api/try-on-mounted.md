## Requirements

| Requirement | Value |
|---|---|
| Project | Vue 3.5+, alias `@` — disiapkan `kliping init` |
| Kliping items | `is-browser` |
| Files | `lib/try-on-mounted.ts` |

## API Reference

```ts
export function tryOnMounted(fn: () => void)
```

### Parameters

| Parameter | Type | Default | Description |
|---|---|---|---|
| `fn` | `() => void` | — | Runs on mount inside a component, or right away in the browser outside one. |

### Returns

`void`
