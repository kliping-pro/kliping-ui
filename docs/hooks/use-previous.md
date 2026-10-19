---
title: usePrevious
description: "Nilai sebelumnya dari sesuatu yang berubah."
---

<ComponentPreview name="UsePreviousDemo" code="none" />

`flush: 'sync'` bukan pilihan gaya. Nilai sebelumnya paling sering dibaca dari
dalam `watch` lain yang memantau nilai yang sama, dan dengan flush bawaan
urutannya tidak dijamin — pembacanya bisa mendapat nilai yang sudah ikut
bergeser. Sinkron membuat "sebelumnya" benar-benar berarti sebelumnya.

Panggilan pertama mengembalikan `undefined`, sama seperti sumbernya: belum ada
yang mendahului nilai awal.

## Installation

<Tabs>

<TabItem value="cli" label="CLI">

<InstallCLI name="use-previous" />

Tanpa dependensi — tidak ada berkas lain yang ikut terpasang.

</TabItem>

<TabItem value="manual" label="Manual">

Salin kode berikut ke project Anda.

```ts [composables/use-previous.ts]
import { shallowRef, toValue, watch } from 'vue'
import type { MaybeRefOrGetter } from 'vue'

export type PreviousComparator<T> = (previous: T | undefined, current: T) => boolean

const defaultShouldUpdate = <T,>(previous: T | undefined, current: T) =>
  !Object.is(previous, current)

export function usePrevious<T>(
  value: MaybeRefOrGetter<T>,
  shouldUpdate: PreviousComparator<T> = defaultShouldUpdate,
) {
  const previousValue = shallowRef<T | undefined>(undefined)
  let current = toValue(value)

  watch(
    () => toValue(value),
    (next) => {
      if (!shouldUpdate(current, next)) return
      previousValue.value = current
      current = next
    },
    { flush: 'sync' },
  )

  return previousValue
}
```

</TabItem>

</Tabs>

## Requirements

| Requirement | Value |
|---|---|
| Project | Vue 3.5+, alias `@` — disiapkan `kliping init` |
| Files | `composables/use-previous.ts` |

## API Reference

```ts
export type PreviousComparator<T> = (previous: T | undefined, current: T) => boolean

export function usePrevious<T>(
  value: MaybeRefOrGetter<T>,
  shouldUpdate: PreviousComparator<T> = defaultShouldUpdate,
)
```

### Parameters

| Parameter | Type | Default | Description |
|---|---|---|---|
| `value` | `MaybeRefOrGetter<T>` | — | Value to track. May be a ref or getter. |
| `shouldUpdate?` | `PreviousComparator<T>` | `defaultShouldUpdate` | Decides when the stored previous value moves; by default whenever the value changes (`Object.is`). |

### Returns

`Ref<any, any> extends T \| undefined ? ShallowRef<undefined, undefined> \| (T extends T & Ref<any, any> ? IfAny<T, ShallowRef<T, T>, T> : ShallowRef<T, T>) : ShallowRef<T \| undefined, T \| undefined>` — Value before the latest change; `undefined` at first. Reactive.

## Credits

Berasal dari [shadcn-hooks](https://github.com/Debbl/shadcn-hooks) (MIT, Copyright (c) 2025 Brendan Dash). Bentuk API-nya dari [ahooks](https://github.com/alibaba/hooks) lewat shadcn-hooks. Rantai lengkapnya di [Credits](/credits).
