---
title: useStickToBottom
description: "Menahan sebuah wadah gulung tetap menempel di dasarnya saat isinya bertambah."
---

<ComponentPreview name="UseStickToBottomDemo" code="none" />

Ini yang membuat jendela obrolan terasa benar: pesan baru muncul dan
pandangannya ikut turun — **kecuali** kalau orangnya sedang menggulung ke
atas membaca yang lama. Menariknya kembali ke bawah saat itu adalah salah
satu hal paling menjengkelkan yang bisa dilakukan sebuah antarmuka.

Tidak ada padanan Vue untuk paket `use-stick-to-bottom` yang dipakai
sumbernya, jadi ini ditulis sendiri. Bahannya sudah ada di repo ini —
`src/components/ui/message-scroller/` melakukan hal yang sama di dalam
komponen; yang dikerjakan di sini adalah mengangkat logikanya keluar supaya
bisa dipakai wadah gulung apa pun.

Ambang toleransinya ada karena `scrollTop` pecahan. Peramban melaporkan
angka seperti `1247.3999` untuk posisi yang secara visual sudah mentok, dan
perbandingan persis tidak akan pernah benar.

## Installation

<Tabs>

<TabItem value="cli" label="CLI">

<InstallCLI name="use-stick-to-bottom" />

Ikut terpasang sendiri: [`target`](/hooks/target), [`use-event-listener`](/hooks/use-event-listener).

</TabItem>

<TabItem value="manual" label="Manual">

Salin dulu [`target`](/hooks/target), [`is-browser`](/hooks/is-browser), [`use-event-listener`](/hooks/use-event-listener) — masing-masing memuat sumbernya di halamannya sendiri — lalu tempel berkas ini.

```ts [composables/use-stick-to-bottom.ts]
import { getCurrentScope, onScopeDispose, readonly, ref, watch } from 'vue'
import { getTargetElement } from '@/lib/target'
import { useEventListener } from '@/composables/use-event-listener'
import type { BasicTarget } from '@/lib/target'

export interface UseStickToBottomOptions {
  /** Distance in pixels from the bottom that still counts as "at the bottom". Default: 24. */
  threshold?: number
  /** Scroll behavior used when auto-sticking. Default: `'smooth'`. */
  behavior?: ScrollBehavior
}

export function useStickToBottom(target: BasicTarget, options: UseStickToBottomOptions = {}) {
  const { threshold = 24, behavior = 'smooth' } = options

  const isAtBottom = ref(true)
  /** Whether the view is pinned to the bottom; turns off when the user scrolls up. */
  const sticky = ref(true)

  let resizeObserver: ResizeObserver | undefined
  let mutationObserver: MutationObserver | undefined

  const container = () => getTargetElement(target) as HTMLElement | undefined

  const updatePosition = () => {
    const el = container()
    if (!el) return
    const distance = el.scrollHeight - el.scrollTop - el.clientHeight
    isAtBottom.value = distance <= threshold
  }

  const scrollToBottom = (scrollBehavior: ScrollBehavior = behavior) => {
    const el = container()
    if (!el) return
    el.scrollTo({ top: el.scrollHeight, behavior: scrollBehavior })
    sticky.value = true
    isAtBottom.value = true
  }

  let isAutoScrolling = false

  useEventListener(
    'scroll',
    () => {
      updatePosition()
      if (!isAutoScrolling) sticky.value = isAtBottom.value
    },
    { target, passive: true },
  )

  const followBottom = () => {
    if (!sticky.value) return
    isAutoScrolling = true
    scrollToBottom()
    setTimeout(() => {
      isAutoScrolling = false
    }, 0)
  }

  const teardown = () => {
    resizeObserver?.disconnect()
    mutationObserver?.disconnect()
    resizeObserver = undefined
    mutationObserver = undefined
  }

  const stopWatch = watch(
    () => container(),
    (el) => {
      teardown()
      if (!el) return

      updatePosition()

      if (typeof ResizeObserver !== 'undefined') {
        resizeObserver = new ResizeObserver(followBottom)
        resizeObserver.observe(el)
        for (const child of Array.from(el.children)) resizeObserver.observe(child)
      }

      if (typeof MutationObserver !== 'undefined') {
        mutationObserver = new MutationObserver(() => {
          if (resizeObserver) {
            for (const child of Array.from(el.children)) resizeObserver.observe(child)
          }
          followBottom()
        })
        mutationObserver.observe(el, { childList: true, subtree: true, characterData: true })
      }
    },
    { immediate: true, flush: 'post' },
  )

  const stop = () => {
    teardown()
    stopWatch()
  }

  if (getCurrentScope()) onScopeDispose(stop)

  return {
    /** Whether the scroll position is at the bottom. Reactive. */
    isAtBottom: readonly(isAtBottom),
    /** Whether new content will keep it pinned to the bottom; turns off when the user scrolls up. Reactive. */
    isSticky: readonly(sticky),
    /** Scrolls to the bottom and re-enables sticking. */
    scrollToBottom,
    /** Stops observing the element. */
    stop: stop,
  }
}
```

</TabItem>

</Tabs>

## Requirements

| Requirement | Value |
|---|---|
| Project | Vue 3.5+, alias `@` — disiapkan `kliping init` |
| Kliping items | `target`, `use-event-listener` |
| Files | `composables/use-stick-to-bottom.ts` |

## API Reference

```ts
export interface UseStickToBottomOptions {
  /** Distance in pixels from the bottom that still counts as "at the bottom". Default: 24. */
  threshold?: number
  /** Scroll behavior used when auto-sticking. Default: `'smooth'`. */
  behavior?: ScrollBehavior
}

export function useStickToBottom(
  target: BasicTarget,
  options: UseStickToBottomOptions = {},
)
```

### Parameters

| Parameter | Type | Default | Description |
|---|---|---|---|
| `target` | `BasicTarget` | — | Scrollable element to keep at the bottom. |
| `options?` | `UseStickToBottomOptions` | `{}` | Follow settings. |
| `options.threshold?` | `number` | — | Distance in pixels from the bottom that still counts as "at the bottom". Default: 24. |
| `options.behavior?` | `ScrollBehavior` | — | Scroll behavior used when auto-sticking. Default: `'smooth'`. |

### Returns

| Property | Type | Description |
|---|---|---|
| `isAtBottom` | `Readonly<Ref<boolean, boolean>>` | Whether the scroll position is at the bottom. Reactive. |
| `isSticky` | `Readonly<Ref<boolean, boolean>>` | Whether new content will keep it pinned to the bottom; turns off when the user scrolls up. Reactive. |
| `scrollToBottom` | `(scrollBehavior?: ScrollBehavior) => void` | Scrolls to the bottom and re-enables sticking. |
| `stop` | `() => void` | Stops observing the element. |

## Credits

Berasal dari [shadcn-hooks](https://github.com/Debbl/shadcn-hooks) (MIT, Copyright (c) 2025 Brendan Dash). Rantai lengkapnya di [Credits](/credits).
