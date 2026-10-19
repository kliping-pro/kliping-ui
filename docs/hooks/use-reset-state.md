---
title: useResetState
description: "State yang bisa dikembalikan ke nilai awalnya."
---

<ComponentPreview name="UseResetStateDemo" code="none" />

**Pabrik nilai awalnya dipanggil ulang di tiap `reset`**, bukan sekali di awal.
Itu bagian terpenting dari composable ini.

Di Vue, `state.value.nama = '...'` adalah pemakaian yang wajar — objek state
memang biasa diutak-atik di tempat. Kalau pabriknya cuma dipanggil sekali,
objek awalnya ikut termutasi, dan `reset` mengembalikan keadaan yang sudah
kotor: persis kebalikan dari yang diminta namanya.

Nilai biasa yang bukan pabrik tetap disimpan apa adanya.

## Installation

<Tabs>

<TabItem value="cli" label="CLI">

<InstallCLI name="use-reset-state" />

Tanpa dependensi — tidak ada berkas lain yang ikut terpasang.

</TabItem>

<TabItem value="manual" label="Manual">

Salin kode berikut ke project Anda.

```ts [composables/use-reset-state.ts]
import { ref } from 'vue'
import type { Ref } from 'vue'

export function useResetState<S>(initialState: S | (() => S)) {
  const createInitial = (): S =>
    typeof initialState === 'function' ? (initialState as () => S)() : initialState

  const state = ref(createInitial()) as Ref<S>

  return {
    /** Current state. Reactive. */
    state,
    /** Sets the state, or updates it from the current value. */
    set: (value: S | ((current: S) => S)) => {
      state.value = typeof value === 'function' ? (value as (current: S) => S)(state.value) : value
    },
    /** Restores the initial state. */
    reset: () => {
      state.value = createInitial()
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
| Files | `composables/use-reset-state.ts` |

## API Reference

```ts
export function useResetState<S>(initialState: S | (() => S))
```

### Parameters

| Parameter | Type | Default | Description |
|---|---|---|---|
| `initialState` | `S \| (() => S)` | — | Initial value, or a function returning it; `reset` restores it. |

### Returns

| Property | Type | Description |
|---|---|---|
| `state` | `Ref<S, S>` | Current state. Reactive. |
| `set` | `(value: S \| ((current: S) => S)) => void` | Sets the state, or updates it from the current value. |
| `reset` | `() => void` | Restores the initial state. |

## Credits

Berasal dari [shadcn-hooks](https://github.com/Debbl/shadcn-hooks) (MIT, Copyright (c) 2025 Brendan Dash). Bentuk API-nya dari [ahooks](https://github.com/alibaba/hooks) lewat shadcn-hooks. Rantai lengkapnya di [Credits](/credits).
