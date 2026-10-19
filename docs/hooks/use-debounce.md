---
title: useDebounce
description: "Salinan sebuah nilai yang tertinggal beberapa saat di belakangnya."
---

<ComponentPreview name="UseDebounceDemo" code="none" />

Dipakai untuk memisahkan yang cepat dari yang mahal: kotak pencarian
memperbarui `query` di tiap ketukan, sementara permintaan jaringannya
mengikuti `debouncedQuery` yang cuma berubah setelah pengetikan berhenti.

Sumbernya boleh berupa nilai biasa, `ref`, atau getter — dibaca lewat
`toValue()`, jadi ketiganya bekerja tanpa pembungkus.

## Installation

<Tabs>

<TabItem value="cli" label="CLI">

<InstallCLI name="use-debounce" />

Ikut terpasang sendiri: [`use-debounce-fn`](/hooks/use-debounce-fn).

</TabItem>

<TabItem value="manual" label="Manual">

Salin dulu [`use-debounce-fn`](/hooks/use-debounce-fn) — masing-masing memuat sumbernya di halamannya sendiri — lalu tempel berkas ini.

```ts [composables/use-debounce.ts]
import { getCurrentScope, onScopeDispose, ref, toValue, watch } from 'vue'
import type { MaybeRefOrGetter, Ref } from 'vue'
import { useDebounceFn } from '@/composables/use-debounce-fn'
import type { UseDebounceFnOptions } from '@/composables/use-debounce-fn'

export function useDebounce<T>(
  value: MaybeRefOrGetter<T>,
  wait: MaybeRefOrGetter<number> = 1000,
  options?: UseDebounceFnOptions,
) {
  const debounced = ref(toValue(value)) as Ref<T>

  const { run, cancel } = useDebounceFn(
    (next: T) => {
      debounced.value = next
    },
    wait,
    options,
  )

  watch(
    () => toValue(value),
    (next) => run(next),
  )

  if (getCurrentScope()) onScopeDispose(cancel)

  return debounced
}
```

</TabItem>

</Tabs>

## Requirements

| Requirement | Value |
|---|---|
| Project | Vue 3.5+, alias `@` — disiapkan `kliping init` |
| Kliping items | `use-debounce-fn` |
| Files | `composables/use-debounce.ts` |

## API Reference

```ts
export function useDebounce<T>(
  value: MaybeRefOrGetter<T>,
  wait: MaybeRefOrGetter<number> = 1000,
  options?: UseDebounceFnOptions,
)
```

### Parameters

| Parameter | Type | Default | Description |
|---|---|---|---|
| `value` | `MaybeRefOrGetter<T>` | — | Value, ref, or getter to follow. |
| `wait?` | `MaybeRefOrGetter<number>` | `1000` | Delay in milliseconds; may be reactive. Default: 1000. |
| `options?` | `UseDebounceFnOptions` | — | Leading and trailing edge behaviour. |
| `options.leading?` | `boolean` | — | Invoke once on the leading edge, before the wait starts. Default: false. |
| `options.trailing?` | `boolean` | — | Invoke on the trailing edge of the wait. Default: true. |

### Returns

`Ref<T, T>` — Reactive copy of `value` that updates after `wait` ms of quiet.

## Credits

Berasal dari [shadcn-hooks](https://github.com/Debbl/shadcn-hooks) (MIT, Copyright (c) 2025 Brendan Dash). Bentuk API-nya dari [ahooks](https://github.com/alibaba/hooks) lewat shadcn-hooks. Rantai lengkapnya di [Credits](/credits).
