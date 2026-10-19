## Requirements

| Requirement | Value |
|---|---|
| Project | Vue 3.5+, alias `@` — disiapkan `kliping init` |
| Files | `lib/create-context.ts` |

## API Reference

```ts
export function createContext<T>(rootName: string)
```

### Parameters

| Parameter | Type | Default | Description |
|---|---|---|---|
| `rootName` | `string` | — | Name of the root component, used in the error when a part is outside it. |

### Returns

`readonly [(value: T) => void, (consumerName: string) => T, () => T \| null]` — `[provide, inject, injectOptional]`: inject throws outside the root, injectOptional returns `null`.
