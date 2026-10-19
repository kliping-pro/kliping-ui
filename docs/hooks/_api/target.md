## Requirements

| Requirement | Value |
|---|---|
| Project | Vue 3.5+, alias `@` — disiapkan `kliping init` |
| Files | `lib/target.ts` |

## API Reference

```ts
export type TargetType = HTMLElement | SVGElement | Element | Window | Document

export type TargetValue =
  | TargetType
  | ComponentPublicInstance
  | null
  | undefined

export type BasicTarget = MaybeRefOrGetter<TargetValue>

export function getTargetElement(target?: BasicTarget): TargetType | undefined
```

### Parameters

| Parameter | Type | Default | Description |
|---|---|---|---|
| `target?` | `BasicTarget` | — | Element, component instance, ref, or getter. |

### Returns

`TargetType \| undefined` — The DOM element (a component's root element), or `undefined`.
