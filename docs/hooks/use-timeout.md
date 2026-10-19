---
title: useTimeout
description: "Menjalankan sesuatu sekali, setelah jeda."
---

<ComponentPreview name="UseTimeoutDemo" code="none" />

Timernya dipasang begitu composable-nya dipanggil, sama seperti sumbernya,
dan ikut dibatalkan saat scope-nya mati. `start()` memasang ulang dari awal —
berguna untuk pola "sembunyikan pesan tiga detik setelah kemunculan
terakhirnya", di mana tiap kemunculan baru harus menyetel ulang hitungannya.

`delay` negatif berarti jangan dijalankan sama sekali.

## Installation

<Tabs>

<TabItem value="cli" label="CLI">

<InstallCLI name="use-timeout" />

Ikut terpasang sendiri: [`is-browser`](/hooks/is-browser).

</TabItem>

<TabItem value="manual" label="Manual">

Salin dulu [`is-browser`](/hooks/is-browser) — masing-masing memuat sumbernya di halamannya sendiri — lalu tempel berkas ini.

```ts [composables/use-timeout.ts]
import { getCurrentScope, onScopeDispose, readonly, ref, toValue, watch } from 'vue'
import type { MaybeRefOrGetter } from 'vue'
import { isBrowser } from '@/lib/is-browser'

export function useTimeout(fn: () => void, delay: MaybeRefOrGetter<number> = 0) {
  const isPending = ref(false)
  let timer: ReturnType<typeof setTimeout> | undefined

  const stop = () => {
    if (timer !== undefined) {
      clearTimeout(timer)
      timer = undefined
    }
    isPending.value = false
  }

  const start = () => {
    stop()
    if (!isBrowser) return

    const ms = toValue(delay)
    if (ms < 0) return

    isPending.value = true
    timer = setTimeout(() => {
      timer = undefined
      isPending.value = false
      fn()
    }, ms)
  }

  watch(() => toValue(delay), start, { immediate: true })

  if (getCurrentScope()) onScopeDispose(stop)

  return {
    /** Whether the timer is running. Reactive. */
    isPending: readonly(isPending),
    /** Starts, or restarts, the timer. */
    start,
    /** Cancels the timer. */
    stop,
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
| Files | `composables/use-timeout.ts` |

## API Reference

```ts
export function useTimeout(
  fn: () => void,
  delay: MaybeRefOrGetter<number> = 0,
)
```

### Parameters

| Parameter | Type | Default | Description |
|---|---|---|---|
| `fn` | `() => void` | — | Function called once after the delay. |
| `delay?` | `MaybeRefOrGetter<number>` | `0` | Milliseconds to wait; a negative value does nothing. May be reactive; changing it restarts the timer. |

### Returns

| Property | Type | Description |
|---|---|---|
| `isPending` | `Readonly<Ref<boolean, boolean>>` | Whether the timer is running. Reactive. |
| `start` | `() => void` | Starts, or restarts, the timer. |
| `stop` | `() => void` | Cancels the timer. |

## Credits

Berasal dari [shadcn-hooks](https://github.com/Debbl/shadcn-hooks) (MIT, Copyright (c) 2025 Brendan Dash). Bentuk API-nya dari [ahooks](https://github.com/alibaba/hooks) lewat shadcn-hooks. Rantai lengkapnya di [Credits](/credits).
