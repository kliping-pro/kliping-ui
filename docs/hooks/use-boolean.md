---
title: useBoolean
description: "Membalik nilai boolean, dengan nama aksi yang menyebut maksudnya."
---

<ComponentPreview name="UseBooleanDemo" code="none" />

Tipis di atas `useToggle`. Gunanya bukan menambah kemampuan, melainkan
membuat pemanggilnya terbaca: `setFalse()` di tempat pemakaian lebih jelas
daripada `setLeft()`, dan lebih jelas daripada `set(false)` yang tidak
memberi tahu apa pun soal niatnya.

## Installation

<Tabs>

<TabItem value="cli" label="CLI">

<InstallCLI name="use-boolean" />

Ikut terpasang sendiri: [`use-toggle`](/hooks/use-toggle).

</TabItem>

<TabItem value="manual" label="Manual">

Salin dulu [`use-toggle`](/hooks/use-toggle) — masing-masing memuat sumbernya di halamannya sendiri — lalu tempel berkas ini.

```ts [composables/use-boolean.ts]
import { useToggle } from '@/composables/use-toggle'

export function useBoolean(defaultValue = false) {
  const { value, set, toggle } = useToggle<boolean, boolean>(defaultValue, !defaultValue)

  return {
    /** The current value. Reactive. */
    value,
    /** Sets the value. */
    set,
    /** Sets the value to `true`. */
    setTrue: () => set(true),
    /** Sets the value to `false`. */
    setFalse: () => set(false),
    /** Flips the value. */
    toggle,
  }
}
```

</TabItem>

</Tabs>

## Requirements

| Requirement | Value |
|---|---|
| Project | Vue 3.5+, alias `@` — disiapkan `kliping init` |
| Kliping items | `use-toggle` |
| Files | `composables/use-boolean.ts` |

## API Reference

```ts
export function useBoolean(defaultValue = false)
```

### Parameters

| Parameter | Type | Default | Description |
|---|---|---|---|
| `defaultValue?` | `boolean` | `false` | Initial value. Default: false. |

### Returns

| Property | Type | Description |
|---|---|---|
| `value` | `Ref<boolean, boolean>` | The current value. Reactive. |
| `set` | `(next: boolean) => void` | Sets the value. |
| `setTrue` | `() => void` | Sets the value to `true`. |
| `setFalse` | `() => void` | Sets the value to `false`. |
| `toggle` | `() => void` | Flips the value. |

## Credits

Berasal dari [shadcn-hooks](https://github.com/Debbl/shadcn-hooks) (MIT, Copyright (c) 2025 Brendan Dash). Bentuk API-nya dari [ahooks](https://github.com/alibaba/hooks) lewat shadcn-hooks. Rantai lengkapnya di [Credits](/credits).
