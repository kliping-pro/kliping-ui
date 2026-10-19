---
title: useCounter
description: "Pencacah dengan aksi yang menyebut maksudnya."
---

<ComponentPreview name="UseCounterDemo" code="none" />

Sebuah `ref` dan empat fungsi biasa — tidak lebih.

Sengaja tanpa `min`/`max`. Pembatasan yang dibutuhkan hampir selalu punya
aturannya sendiri: ada yang menjepit, ada yang berputar, ada yang menolak. Satu
pasang opsi tidak pernah cukup untuk ketiganya, dan menuliskannya di tempat
pemakaian jauh lebih jelas daripada menebak-nebak di sini.

## Installation

<Tabs>

<TabItem value="cli" label="CLI">

<InstallCLI name="use-counter" />

Tanpa dependensi — tidak ada berkas lain yang ikut terpasang.

</TabItem>

<TabItem value="manual" label="Manual">

Salin kode berikut ke project Anda.

```ts [composables/use-counter.ts]
import { ref, toValue } from 'vue'
import type { MaybeRefOrGetter } from 'vue'

export function useCounter(initialValue: MaybeRefOrGetter<number> = 0) {
  const initial = toValue(initialValue)
  const count = ref(initial)

  const set = (value: number | ((current: number) => number)) => {
    count.value = typeof value === 'function' ? value(count.value) : value
  }

  return {
    /** The current count. Reactive. */
    count,
    /** Sets the count, or updates it from the current one. */
    set,
    /** Adds 1. */
    inc: () => {
      count.value += 1
    },
    /** Subtracts 1. */
    dec: () => {
      count.value -= 1
    },
    /** Restores the initial count. */
    reset: () => {
      count.value = initial
    },
  }
}
```

</TabItem>

</Tabs>

## Requirements

| Requirement | Value |
|---|---|
| Project | Vue 3.5+, alias `@` — disiapkan `kliping init` |
| Files | `composables/use-counter.ts` |

## API Reference

```ts
export function useCounter(initialValue: MaybeRefOrGetter<number> = 0)
```

### Parameters

| Parameter | Type | Default | Description |
|---|---|---|---|
| `initialValue?` | `MaybeRefOrGetter<number>` | `0` | Starting count; read once. Default: 0. |

### Returns

| Property | Type | Description |
|---|---|---|
| `count` | `Ref<number, number>` | The current count. Reactive. |
| `set` | `(value: number \| ((current: number) => number)) => void` | Sets the count, or updates it from the current one. |
| `inc` | `() => void` | Adds 1. |
| `dec` | `() => void` | Subtracts 1. |
| `reset` | `() => void` | Restores the initial count. |

## Credits

Berasal dari [shadcn-hooks](https://github.com/Debbl/shadcn-hooks) (MIT, Copyright (c) 2025 Brendan Dash). Rantai lengkapnya di [Credits](/credits).
