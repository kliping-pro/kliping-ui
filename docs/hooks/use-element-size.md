---
title: useElementSize
description: "Ukuran sebuah elemen, diikuti lewat ResizeObserver."
---

<ComponentPreview name="UseElementSizeDemo" code="none" />

Ukuran sebuah elemen, diikuti lewat `ResizeObserver`.

Dua hal yang dibawa dari sumbernya karena keduanya jawaban atas masalah
nyata, bukan kerumitan yang bisa dibuang:

1. **SVG diukur lewat `getBoundingClientRect`.** `contentBoxSize` untuk
   elemen SVG dilaporkan berbeda-beda antar peramban, dan sebagiannya nol.
2. **`observe` dengan opsi `box` dibungkus try/catch.** Peramban lama
   melempar untuk nilai `box` yang tidak dikenalnya; pengamatan tanpa opsi
   tetap lebih baik daripada tidak mengamati sama sekali.

## Installation

<Tabs>

<TabItem value="cli" label="CLI">

<InstallCLI name="use-element-size" />

Ikut terpasang sendiri: [`target`](/hooks/target).

</TabItem>

<TabItem value="manual" label="Manual">

Salin dulu [`target`](/hooks/target) — masing-masing memuat sumbernya di halamannya sendiri — lalu tempel berkas ini.

```ts [composables/use-element-size.ts]
import { getCurrentScope, onScopeDispose, ref, watch } from 'vue'
import { getTargetElement } from '@/lib/target'
import type { BasicTarget } from '@/lib/target'

export interface ElementSize {
  width: number
  height: number
}

export interface UseElementSizeOptions {
  /** Which box to measure. Default: `content-box`. */
  box?: ResizeObserverBoxOptions
}

function sizeFromEntry(entry: ResizeObserverEntry, box: ResizeObserverBoxOptions): ElementSize {
  const boxSize =
    box === 'border-box'
      ? entry.borderBoxSize
      : box === 'device-pixel-content-box'
        ? entry.devicePixelContentBoxSize
        : entry.contentBoxSize

  const sizes = boxSize
    ? ((Array.isArray(boxSize) ? boxSize : [boxSize]) as readonly ResizeObserverSize[])
    : []

  if (sizes.length) {
    return {
      width: sizes.reduce((n, u) => n + u.inlineSize, 0),
      height: sizes.reduce((n, u) => n + u.blockSize, 0),
    }
  }

  return { width: entry.contentRect.width, height: entry.contentRect.height }
}

export function useElementSize(
  target: BasicTarget,
  initialSize: ElementSize = { width: 0, height: 0 },
  options: UseElementSizeOptions = {},
) {
  const { box = 'content-box' } = options

  const width = ref(initialSize.width)
  const height = ref(initialSize.height)

  let observer: ResizeObserver | undefined

  const teardown = () => {
    observer?.disconnect()
    observer = undefined
  }

  const setSize = (size: ElementSize) => {
    width.value = size.width
    height.value = size.height
  }

  const stopWatch = watch(
    () => getTargetElement(target),
    (element) => {
      teardown()

      if (!element || !('getBoundingClientRect' in element)) {
        setSize({ width: 0, height: 0 })
        return
      }

      const el = element as Element

      if (typeof ResizeObserver === 'undefined') {
        const rect = el.getBoundingClientRect()
        setSize({ width: rect.width, height: rect.height })
        return
      }

      const svg = typeof SVGElement !== 'undefined' && el instanceof SVGElement

      observer = new ResizeObserver((entries) => {
        const entry = entries[0]
        if (!entry) return

        if (svg) {
          const rect = el.getBoundingClientRect()
          setSize({ width: rect.width, height: rect.height })
          return
        }

        setSize(sizeFromEntry(entry, box))
      })

      try {
        observer.observe(el, { box })
      } catch {
        observer.observe(el)
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
    /** Width in pixels. Reactive. */
    width,
    /** Height in pixels. Reactive. */
    height,
    /** Stops observing. */
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
| Kliping items | `target` |
| Files | `composables/use-element-size.ts` |

## API Reference

```ts
export interface ElementSize {
  width: number
  height: number
}

export interface UseElementSizeOptions {
  /** Which box to measure. Default: `content-box`. */
  box?: ResizeObserverBoxOptions
}

export function useElementSize(
  target: BasicTarget,
  initialSize: ElementSize = { width: 0, height: 0 },
  options: UseElementSizeOptions = {},
)
```

### Parameters

| Parameter | Type | Default | Description |
|---|---|---|---|
| `target` | `BasicTarget` | — | Element, ref, or getter to measure. |
| `initialSize?` | `ElementSize` | `{ width: 0, height: 0 }` | Size reported before the first measurement. Default: 0 × 0. |
| `options?` | `UseElementSizeOptions` | `{}` | Which box to measure. |
| `options.box?` | `ResizeObserverBoxOptions` | — | Which box to measure. Default: `content-box`. |

### Returns

| Property | Type | Description |
|---|---|---|
| `width` | `Ref<number, number>` | Width in pixels. Reactive. |
| `height` | `Ref<number, number>` | Height in pixels. Reactive. |
| `stop` | `() => void` | Stops observing. |

## Credits

Berasal dari [shadcn-hooks](https://github.com/Debbl/shadcn-hooks) (MIT, Copyright (c) 2025 Brendan Dash). Rantai lengkapnya di [Credits](/credits).
