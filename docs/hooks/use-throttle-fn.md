---
title: useThrottleFn
description: "Membatasi sebuah fungsi agar tidak jalan lebih sering dari sekali per jeda."
---

<ComponentPreview name="UseThrottleFnDemo" code="none" />

Bedanya dengan debounce sering tertukar, jadi disebutkan di sini: debounce
menunggu sampai panggilannya berhenti, throttle tetap jalan sepanjang
panggilannya datang — cuma dijatah. Untuk pengetikan pakai debounce; untuk
scroll, resize, dan pointermove pakai throttle.

Ditulis sendiri dengan alasan yang sama seperti `useDebounceFn`: nol
dependensi, dan timernya ikut mati bersama scope-nya.

## Installation

<Tabs>

<TabItem value="cli" label="CLI">

<InstallCLI name="use-throttle-fn" />

Tanpa dependensi — tidak ada berkas lain yang ikut terpasang.

</TabItem>

<TabItem value="manual" label="Manual">

Salin kode berikut ke project Anda.

```ts [composables/use-throttle-fn.ts]
import { getCurrentScope, onScopeDispose, toValue } from 'vue'
import type { MaybeRefOrGetter } from 'vue'

export interface UseThrottleFnOptions {
  /** Invoke the first call immediately. Default: true. */
  leading?: boolean
  /** Invoke the last call after the wait elapses. Default: true. */
  trailing?: boolean
}

export function useThrottleFn<Fn extends (...args: any[]) => any>(
  fn: Fn,
  wait: MaybeRefOrGetter<number> = 1000,
  options: UseThrottleFnOptions = {},
) {
  const { leading = true, trailing = true } = options

  let timer: ReturnType<typeof setTimeout> | undefined
  let lastArgs: Parameters<Fn> | undefined
  let lastRunAt = 0

  const clearTimer = () => {
    if (timer !== undefined) {
      clearTimeout(timer)
      timer = undefined
    }
  }

  const cancel = () => {
    clearTimer()
    lastArgs = undefined
    lastRunAt = 0
  }

  const flush = () => {
    if (timer === undefined || !lastArgs) return
    const pendingArgs = lastArgs
    clearTimer()
    lastArgs = undefined
    lastRunAt = Date.now()
    fn(...pendingArgs)
  }

  const run = (...args: Parameters<Fn>) => {
    const delay = toValue(wait)
    const now = Date.now()

    if (lastRunAt === 0 && !leading) lastRunAt = now

    const remaining = delay - (now - lastRunAt)
    lastArgs = args

    if (remaining <= 0 || remaining > delay) {
      clearTimer()
      lastRunAt = now
      lastArgs = undefined
      fn(...args)
      return
    }

    if (timer === undefined && trailing) {
      timer = setTimeout(() => {
        timer = undefined
        lastRunAt = leading ? Date.now() : 0
        if (lastArgs) {
          const pendingArgs = lastArgs
          lastArgs = undefined
          fn(...pendingArgs)
        }
      }, remaining)
    }
  }

  if (getCurrentScope()) onScopeDispose(cancel)

  return {
    /** Calls `fn`, at most once per `wait`. */
    run,
    /** Drops the pending trailing call. */
    cancel,
    /** Runs the pending trailing call now. */
    flush,
  }
}
```

</TabItem>

</Tabs>

## Requirements

| Requirement | Value |
|---|---|
| Project | Vue 3.5+, alias `@` — disiapkan `kliping init` |
| Files | `composables/use-throttle-fn.ts` |

## API Reference

```ts
export interface UseThrottleFnOptions {
  /** Invoke the first call immediately. Default: true. */
  leading?: boolean
  /** Invoke the last call after the wait elapses. Default: true. */
  trailing?: boolean
}

export function useThrottleFn<Fn extends (...args: any[]) => any>(
  fn: Fn,
  wait: MaybeRefOrGetter<number> = 1000,
  options: UseThrottleFnOptions = {},
)
```

### Parameters

| Parameter | Type | Default | Description |
|---|---|---|---|
| `fn` | `Fn` | — | Function to throttle. |
| `wait?` | `MaybeRefOrGetter<number>` | `1000` | Minimum milliseconds between calls. May be reactive. |
| `options?` | `UseThrottleFnOptions` | `{}` | Leading and trailing edge settings. |
| `options.leading?` | `boolean` | — | Invoke the first call immediately. Default: true. |
| `options.trailing?` | `boolean` | — | Invoke the last call after the wait elapses. Default: true. |

### Returns

| Property | Type | Description |
|---|---|---|
| `run` | `(...args: Parameters<Fn>) => void` | Calls `fn`, at most once per `wait`. |
| `cancel` | `() => void` | Drops the pending trailing call. |
| `flush` | `() => void` | Runs the pending trailing call now. |

## Credits

Berasal dari [shadcn-hooks](https://github.com/Debbl/shadcn-hooks) (MIT, Copyright (c) 2025 Brendan Dash). Bentuk API-nya dari [ahooks](https://github.com/alibaba/hooks) lewat shadcn-hooks. Rantai lengkapnya di [Credits](/credits).
