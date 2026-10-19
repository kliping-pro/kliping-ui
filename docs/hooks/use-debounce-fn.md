---
title: useDebounceFn
description: "Menunda sebuah fungsi sampai pemanggilannya berhenti sejenak."
---

<ComponentPreview name="UseDebounceFnDemo" code="none" />

Ditulis sendiri, bukan membungkus paket debounce mana pun. Itu keputusan yang
disengaja: composable Kliping tidak boleh membawa dependensi runtime. Kalau
memasang `@kliping/use-debounce-fn` memaksa orang menambah satu paket, mereka
akan memakai paketnya langsung dan registry ini kehilangan alasan keberadaannya.

Yang didapat sebagai gantinya bukan cuma nol dependensi: timernya ikut mati
bersama scope-nya. Debounce dari paket mana pun tidak tahu apa-apa soal siklus
hidup Vue, jadi pemanggilnya harus ingat membatalkannya sendiri — dan itu
jenis hal yang selalu terlupa.

`wait` boleh reaktif. Yang dibaca adalah nilainya saat `run()` dipanggil,
bukan saat composable-nya dibuat.

## Installation

<Tabs>

<TabItem value="cli" label="CLI">

<InstallCLI name="use-debounce-fn" />

Tanpa dependensi — tidak ada berkas lain yang ikut terpasang.

</TabItem>

<TabItem value="manual" label="Manual">

Salin kode berikut ke project Anda.

```ts [composables/use-debounce-fn.ts]
import { getCurrentScope, onScopeDispose, toValue } from 'vue'
import type { MaybeRefOrGetter } from 'vue'

export interface UseDebounceFnOptions {
  /** Invoke once on the leading edge, before the wait starts. Default: false. */
  leading?: boolean
  /** Invoke on the trailing edge of the wait. Default: true. */
  trailing?: boolean
}

export function useDebounceFn<Fn extends (...args: any[]) => any>(
  fn: Fn,
  wait: MaybeRefOrGetter<number> = 1000,
  options: UseDebounceFnOptions = {},
) {
  const { leading = false, trailing = true } = options

  let timer: ReturnType<typeof setTimeout> | undefined
  let lastArgs: Parameters<Fn> | undefined

  const clearTimer = () => {
    if (timer !== undefined) {
      clearTimeout(timer)
      timer = undefined
    }
  }

  /** Discards the pending call; calls that already ran are not undone. */
  const cancel = () => {
    clearTimer()
    lastArgs = undefined
  }

  /** Runs the pending call immediately, without waiting for the delay. */
  const flush = () => {
    if (timer === undefined || !lastArgs) return
    const pendingArgs = lastArgs
    cancel()
    fn(...pendingArgs)
  }

  const run = (...args: Parameters<Fn>) => {
    const isLeading = timer === undefined

    clearTimer()
    lastArgs = args

    if (leading && isLeading) {
      lastArgs = undefined
      fn(...args)
    }

    timer = setTimeout(() => {
      timer = undefined
      if (trailing && lastArgs) {
        const pendingArgs = lastArgs
        lastArgs = undefined
        fn(...pendingArgs)
      }
    }, toValue(wait))
  }

  if (getCurrentScope()) onScopeDispose(cancel)

  return {
    /** Schedules `fn` with these arguments, restarting the delay. */
    run,
    /** Drops the pending call. */
    cancel,
    /** Runs the pending call now. */
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
| Files | `composables/use-debounce-fn.ts` |

## API Reference

```ts
export interface UseDebounceFnOptions {
  /** Invoke once on the leading edge, before the wait starts. Default: false. */
  leading?: boolean
  /** Invoke on the trailing edge of the wait. Default: true. */
  trailing?: boolean
}

export function useDebounceFn<Fn extends (...args: any[]) => any>(
  fn: Fn,
  wait: MaybeRefOrGetter<number> = 1000,
  options: UseDebounceFnOptions = {},
)
```

### Parameters

| Parameter | Type | Default | Description |
|---|---|---|---|
| `fn` | `Fn` | — | The function to debounce. |
| `wait?` | `MaybeRefOrGetter<number>` | `1000` | Delay in milliseconds; may be reactive. Default: 1000. |
| `options?` | `UseDebounceFnOptions` | `{}` | Leading and trailing edge behaviour. |
| `options.leading?` | `boolean` | — | Invoke once on the leading edge, before the wait starts. Default: false. |
| `options.trailing?` | `boolean` | — | Invoke on the trailing edge of the wait. Default: true. |

### Returns

| Property | Type | Description |
|---|---|---|
| `run` | `(...args: Parameters<Fn>) => void` | Schedules `fn` with these arguments, restarting the delay. |
| `cancel` | `() => void` | Drops the pending call. |
| `flush` | `() => void` | Runs the pending call now. |

## Credits

Berasal dari [shadcn-hooks](https://github.com/Debbl/shadcn-hooks) (MIT, Copyright (c) 2025 Brendan Dash). Bentuk API-nya dari [ahooks](https://github.com/alibaba/hooks) lewat shadcn-hooks. Rantai lengkapnya di [Credits](/credits).
