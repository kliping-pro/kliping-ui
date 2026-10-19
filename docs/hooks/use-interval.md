---
title: useInterval
description: "Menjalankan sesuatu berulang kali, dengan jeda yang boleh berubah."
---

<ComponentPreview name="UseIntervalDemo" code="none" />

Bedanya dari `setInterval` telanjang ada tiga, dan ketiganya sering jadi
sumber cacat: timernya ikut mati bersama scope, jedanya bisa diganti tanpa
memasang ulang, dan `null` menghentikannya tanpa perlu cabang `if` di
pemanggilnya.

`delay` berupa `null` atau angka negatif berarti berhenti. Itu yang membuat
pola "jalan hanya saat tab terlihat" jadi satu baris:

```ts
const terlihat = useDocumentVisibility()
useInterval(muatUlang, () => (terlihat.value === 'visible' ? 5000 : null))
```

## Installation

<Tabs>

<TabItem value="cli" label="CLI">

<InstallCLI name="use-interval" />

Ikut terpasang sendiri: [`is-browser`](/hooks/is-browser).

</TabItem>

<TabItem value="manual" label="Manual">

Salin dulu [`is-browser`](/hooks/is-browser) — masing-masing memuat sumbernya di halamannya sendiri — lalu tempel berkas ini.

```ts [composables/use-interval.ts]
import { getCurrentScope, onScopeDispose, readonly, ref, toValue, watch } from 'vue'
import type { MaybeRefOrGetter } from 'vue'
import { isBrowser } from '@/lib/is-browser'

export interface UseIntervalOptions {
  /** Run once immediately, before the first delay elapses. */
  immediate?: boolean
}

export function useInterval(
  fn: () => void,
  delay: MaybeRefOrGetter<number | null> = 1000,
  options: UseIntervalOptions = {},
) {
  const { immediate = false } = options

  const isActive = ref(false)
  let timer: ReturnType<typeof setInterval> | undefined

  const pause = () => {
    if (timer !== undefined) {
      clearInterval(timer)
      timer = undefined
    }
    isActive.value = false
  }

  const start = (interval: number) => {
    pause()
    if (!isBrowser) return
    if (immediate) fn()
    timer = setInterval(fn, interval)
    isActive.value = true
  }

  const resume = () => {
    const interval = toValue(delay)
    if (typeof interval === 'number' && interval >= 0) start(interval)
  }

  watch(
    () => toValue(delay),
    (interval) => {
      if (typeof interval !== 'number' || interval < 0) {
        pause()
        return
      }
      start(interval)
    },
    { immediate: true },
  )

  if (getCurrentScope()) onScopeDispose(pause)

  return {
    /** Whether the interval is running. Reactive. */
    isActive: readonly(isActive),
    /** Stops the interval. */
    pause,
    /** Restarts the interval with the current delay. */
    resume,
  }
}
```

</TabItem>

</Tabs>

## Requirements

| Requirement | Value |
|---|---|
| Project | Vue 3.5+, alias `@` — disiapkan `kliping init` |
| Kliping items | `is-browser` |
| Files | `composables/use-interval.ts` |

## API Reference

```ts
export interface UseIntervalOptions {
  /** Run once immediately, before the first delay elapses. */
  immediate?: boolean
}

export function useInterval(
  fn: () => void,
  delay: MaybeRefOrGetter<number | null> = 1000,
  options: UseIntervalOptions = {},
)
```

### Parameters

| Parameter | Type | Default | Description |
|---|---|---|---|
| `fn` | `() => void` | — | Function called on every tick. |
| `delay?` | `MaybeRefOrGetter<number \| null>` | `1000` | Milliseconds between ticks; `null` or a negative number pauses. May be reactive. |
| `options?` | `UseIntervalOptions` | `{}` | Interval settings. |
| `options.immediate?` | `boolean` | — | Run once immediately, before the first delay elapses. |

### Returns

| Property | Type | Description |
|---|---|---|
| `isActive` | `Readonly<Ref<boolean, boolean>>` | Whether the interval is running. Reactive. |
| `pause` | `() => void` | Stops the interval. |
| `resume` | `() => void` | Restarts the interval with the current delay. |

## Credits

Berasal dari [shadcn-hooks](https://github.com/Debbl/shadcn-hooks) (MIT, Copyright (c) 2025 Brendan Dash). Bentuk API-nya dari [ahooks](https://github.com/alibaba/hooks) lewat shadcn-hooks. Rantai lengkapnya di [Credits](/credits).
