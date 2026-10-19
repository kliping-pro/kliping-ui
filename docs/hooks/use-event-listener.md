---
title: useEventListener
description: "Memasang pendengar peristiwa yang ikut hidup dan mati bersama scope-nya."
---

<ComponentPreview name="UseEventListenerDemo" code="none" />

Ini fondasi. Sembilan composable lain dibangun di atasnya, jadi kesalahan di
sini menyebar ke semuanya — dan kesalahan yang paling mahal bukan salah
pasang, melainkan lupa melepas.

Tiga hal yang membedakannya dari `addEventListener` biasa:

1. **Targetnya boleh reaktif.** `useTemplateRef()` masih `null` saat `setup()`
   berjalan dan baru terisi setelah komponennya terpasang. Karena itu
   pemasangannya dijalankan lewat `watch`, bukan sekali di `onMounted` —
   target yang berganti di tengah jalan ikut terlayani, pendengar lamanya
   dilepas lebih dulu.
2. **Dilepas lewat scope, bukan lewat komponen.** `onScopeDispose` bekerja di
   dalam komponen maupun di dalam `effectScope()` lepas; `onUnmounted` hanya
   yang pertama. Composable ini dipakai composable lain, yang belum tentu
   dipanggil dari komponen.
3. **Aman di server.** Tanpa `window`, `watch`-nya tetap jalan dan tidak
   menemukan apa pun untuk dipasangi. Tidak ada yang meledak.

Handler-nya dipanggil langsung, tanpa penampung apa pun. `setup()` berjalan
sekali, jadi fungsi yang diterima di sini memang sudah yang terbaru selamanya —
tidak ada nilai basi yang perlu disegarkan.

## Installation

<Tabs>

<TabItem value="cli" label="CLI">

<InstallCLI name="use-event-listener" />

Ikut terpasang sendiri: [`is-browser`](/hooks/is-browser), [`target`](/hooks/target).

</TabItem>

<TabItem value="manual" label="Manual">

Salin dulu [`is-browser`](/hooks/is-browser), [`target`](/hooks/target) — masing-masing memuat sumbernya di halamannya sendiri — lalu tempel berkas ini.

```ts [composables/use-event-listener.ts]
import { getCurrentScope, onScopeDispose, toValue, watch } from 'vue'
import type { MaybeRefOrGetter } from 'vue'
import { isBrowser } from '@/lib/is-browser'
import { getTargetElement } from '@/lib/target'
import type { BasicTarget } from '@/lib/target'

export interface UseEventListenerOptions {
  /** Element to attach to. Leave empty for `window`. */
  target?: BasicTarget
  /** Listen in the capture phase. */
  capture?: boolean
  /** Remove the listener after the first event. */
  once?: boolean
  /** Promise not to call `preventDefault()`, so scrolling stays smooth. */
  passive?: boolean
  /** Temporarily disable without removing the call. May be reactive. */
  enable?: MaybeRefOrGetter<boolean>
}

export function useEventListener(
  eventName: string | string[],
  handler: (event: any) => void,
  options: UseEventListenerOptions = {},
) {
  const { capture, once, passive } = options
  const eventNames = Array.isArray(eventName) ? eventName : [eventName]

  let detach: (() => void) | undefined

  const teardown = () => {
    detach?.()
    detach = undefined
  }

  const stopWatch = watch(
    () =>
      [
        options.target === undefined
          ? isBrowser
            ? window
            : undefined
          : getTargetElement(options.target),
        toValue(options.enable ?? true),
      ] as const,

    ([element, enabled]) => {
      teardown()

      if (!enabled || !element?.addEventListener) return

      const listener = (event: Event) => handler(event)

      for (const name of eventNames)
        element.addEventListener(name, listener, { capture, once, passive })

      detach = () => {
        for (const name of eventNames) element.removeEventListener(name, listener, { capture })
      }
    },

    { immediate: true, flush: 'post' },
  )

  const stop = () => {
    teardown()
    stopWatch()
  }

  if (getCurrentScope()) onScopeDispose(stop)

  return stop
}
```

</TabItem>

</Tabs>

## Requirements

| Requirement | Value |
|---|---|
| Project | Vue 3.5+, alias `@` — disiapkan `kliping init` |
| Kliping items | `is-browser`, `target` |
| Files | `composables/use-event-listener.ts` |

## API Reference

```ts
export interface UseEventListenerOptions {
  /** Element to attach to. Leave empty for `window`. */
  target?: BasicTarget
  /** Listen in the capture phase. */
  capture?: boolean
  /** Remove the listener after the first event. */
  once?: boolean
  /** Promise not to call `preventDefault()`, so scrolling stays smooth. */
  passive?: boolean
  /** Temporarily disable without removing the call. May be reactive. */
  enable?: MaybeRefOrGetter<boolean>
}

export function useEventListener(
  eventName: string | string[],
  handler: (event: any) => void,
  options: UseEventListenerOptions = {},
)
```

### Parameters

| Parameter | Type | Default | Description |
|---|---|---|---|
| `eventName` | `string \| string[]` | — | Event name, or several to share one handler. |
| `handler` | `(event: any) => void` | — | Called with each event. |
| `options?` | `UseEventListenerOptions` | `{}` | Target, listener flags, and an `enable` switch. |
| `options.target?` | `BasicTarget` | — | Element to attach to. Leave empty for `window`. |
| `options.capture?` | `boolean` | — | Listen in the capture phase. |
| `options.once?` | `boolean` | — | Remove the listener after the first event. |
| `options.passive?` | `boolean` | — | Promise not to call `preventDefault()`, so scrolling stays smooth. |
| `options.enable?` | `MaybeRefOrGetter<boolean>` | — | Temporarily disable without removing the call. May be reactive. |

### Returns

`() => void` — Removes the listener.

## Credits

Berasal dari [shadcn-hooks](https://github.com/Debbl/shadcn-hooks) (MIT, Copyright (c) 2025 Brendan Dash). Bentuk API-nya dari [ahooks](https://github.com/alibaba/hooks) lewat shadcn-hooks. Rantai lengkapnya di [Credits](/credits).
