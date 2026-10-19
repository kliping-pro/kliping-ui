---
title: useThrottle
description: "Salinan sebuah nilai yang diperbarui paling sering sekali per jeda."
---

<ComponentPreview name="UseThrottleDemo" code="none" />

Pasangan `useDebounce`, untuk kasus sebaliknya: nilai yang berubah terus
menerus dan tidak akan pernah "berhenti" — posisi pointer, jarak scroll,
ukuran jendela. Debounce di sana tidak pernah memicu apa pun sampai
gerakannya berhenti; throttle tetap memberi kabar sepanjang jalan.

## Installation

<Tabs>

<TabItem value="cli" label="CLI">

<InstallCLI name="use-throttle" />

Ikut terpasang sendiri: [`use-throttle-fn`](/hooks/use-throttle-fn).

</TabItem>

<TabItem value="manual" label="Manual">

Salin dulu [`use-throttle-fn`](/hooks/use-throttle-fn) — masing-masing memuat sumbernya di halamannya sendiri — lalu tempel berkas ini.

```ts [composables/use-throttle.ts]
import { getCurrentScope, onScopeDispose, ref, toValue, watch } from 'vue'
import type { MaybeRefOrGetter, Ref } from 'vue'
import { useThrottleFn } from '@/composables/use-throttle-fn'
import type { UseThrottleFnOptions } from '@/composables/use-throttle-fn'

export function useThrottle<T>(
  value: MaybeRefOrGetter<T>,
  wait: MaybeRefOrGetter<number> = 1000,
  options?: UseThrottleFnOptions,
) {
  const throttled = ref(toValue(value)) as Ref<T>

  const { run, cancel } = useThrottleFn(
    (next: T) => {
      throttled.value = next
    },
    wait,
    options,
  )

  watch(
    () => toValue(value),
    (next) => run(next),
  )

  if (getCurrentScope()) onScopeDispose(cancel)

  return throttled
}
```

</TabItem>

</Tabs>

## Requirements

| Requirement | Value |
|---|---|
| Project | Vue 3.5+, alias `@` — disiapkan `kliping init` |
| Kliping items | `use-throttle-fn` |
| Files | `composables/use-throttle.ts` |

## API Reference

```ts
export function useThrottle<T>(
  value: MaybeRefOrGetter<T>,
  wait: MaybeRefOrGetter<number> = 1000,
  options?: UseThrottleFnOptions,
)
```

### Parameters

| Parameter | Type | Default | Description |
|---|---|---|---|
| `value` | `MaybeRefOrGetter<T>` | — | Value to follow. May be a ref or getter. |
| `wait?` | `MaybeRefOrGetter<number>` | `1000` | Minimum milliseconds between updates. May be reactive. |
| `options?` | `UseThrottleFnOptions` | — | Leading and trailing edge settings. |
| `options.leading?` | `boolean` | — | Invoke the first call immediately. Default: true. |
| `options.trailing?` | `boolean` | — | Invoke the last call after the wait elapses. Default: true. |

### Returns

`Ref<T, T>` — Copy of `value` updated at most once per `wait`. Reactive.

## Credits

Berasal dari [shadcn-hooks](https://github.com/Debbl/shadcn-hooks) (MIT, Copyright (c) 2025 Brendan Dash). Bentuk API-nya dari [ahooks](https://github.com/alibaba/hooks) lewat shadcn-hooks. Rantai lengkapnya di [Credits](/credits).
