---
title: useHover
description: "Apakah penunjuk sedang berada di atas sebuah elemen."
---

<ComponentPreview name="UseHoverDemo" code="none" />

`mouseenter` dan `mouseleave`, bukan `mouseover` dan `mouseout` — dua yang
terakhir ikut menyala saat penunjuk berpindah antar anak di dalam elemen yang
sama, dan hasilnya berkedip. Sama seperti sumbernya.

## Installation

<Tabs>

<TabItem value="cli" label="CLI">

<InstallCLI name="use-hover" />

Ikut terpasang sendiri: [`target`](/hooks/target), [`use-boolean`](/hooks/use-boolean), [`use-event-listener`](/hooks/use-event-listener).

</TabItem>

<TabItem value="manual" label="Manual">

Salin dulu [`target`](/hooks/target), [`use-toggle`](/hooks/use-toggle), [`use-boolean`](/hooks/use-boolean), [`is-browser`](/hooks/is-browser), [`use-event-listener`](/hooks/use-event-listener) — masing-masing memuat sumbernya di halamannya sendiri — lalu tempel berkas ini.

```ts [composables/use-hover.ts]
import { useBoolean } from '@/composables/use-boolean'
import { useEventListener } from '@/composables/use-event-listener'
import type { BasicTarget } from '@/lib/target'

export interface UseHoverOptions {
  /** Called when the pointer enters. */
  onEnter?: () => void
  /** Called when the pointer leaves. */
  onLeave?: () => void
  /** Called on enter and leave with the new state. */
  onChange?: (isHovering: boolean) => void
}

export function useHover(target: BasicTarget, options: UseHoverOptions = {}) {
  const { onEnter, onLeave, onChange } = options
  const { value, setTrue, setFalse } = useBoolean(false)

  useEventListener(
    'mouseenter',
    () => {
      onEnter?.()
      setTrue()
      onChange?.(true)
    },
    { target },
  )

  useEventListener(
    'mouseleave',
    () => {
      onLeave?.()
      setFalse()
      onChange?.(false)
    },
    { target },
  )

  return value
}
```

</TabItem>

</Tabs>

## Requirements

| Requirement | Value |
|---|---|
| Project | Vue 3.5+, alias `@` — disiapkan `kliping init` |
| Kliping items | `target`, `use-boolean`, `use-event-listener` |
| Files | `composables/use-hover.ts` |

## API Reference

```ts
export interface UseHoverOptions {
  /** Called when the pointer enters. */
  onEnter?: () => void
  /** Called when the pointer leaves. */
  onLeave?: () => void
  /** Called on enter and leave with the new state. */
  onChange?: (isHovering: boolean) => void
}

export function useHover(target: BasicTarget, options: UseHoverOptions = {})
```

### Parameters

| Parameter | Type | Default | Description |
|---|---|---|---|
| `target` | `BasicTarget` | — | Element, ref, or getter to watch. |
| `options?` | `UseHoverOptions` | `{}` | Enter, leave, and change callbacks. |
| `options.onEnter?` | `(() => void)` | — | Called when the pointer enters. |
| `options.onLeave?` | `(() => void)` | — | Called when the pointer leaves. |
| `options.onChange?` | `((isHovering: boolean) => void)` | — | Called on enter and leave with the new state. |

### Returns

`Ref<boolean, boolean>` — Reactive `true` while the pointer is over the target.

## Credits

Berasal dari [shadcn-hooks](https://github.com/Debbl/shadcn-hooks) (MIT, Copyright (c) 2025 Brendan Dash). Bentuk API-nya dari [ahooks](https://github.com/alibaba/hooks) lewat shadcn-hooks. Rantai lengkapnya di [Credits](/credits).
