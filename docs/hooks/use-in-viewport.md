---
title: useInViewport
description: "Apakah sebuah elemen sedang terlihat di layar."
---

<ComponentPreview name="UseInViewportDemo" code="none" />

`IntersectionObserver`, bukan menghitung posisi saat scroll. Bedanya bukan
gaya: menghitung posisi berarti bekerja di setiap peristiwa scroll, di utas
utama, untuk setiap elemen yang dipantau. `IntersectionObserver` dikerjakan
peramban di luar itu dan cuma memanggil balik saat keadaannya benar-benar
berubah.

Ini yang dipakai untuk memuat gambar saat mendekat, menandai bagian aktif di
daftar isi, dan memuat halaman berikutnya saat dasar daftar tersentuh.

## Installation

<Tabs>

<TabItem value="cli" label="CLI">

<InstallCLI name="use-in-viewport" />

Ikut terpasang sendiri: [`target`](/hooks/target).

</TabItem>

<TabItem value="manual" label="Manual">

Salin dulu [`target`](/hooks/target) — masing-masing memuat sumbernya di halamannya sendiri — lalu tempel berkas ini.

```ts [composables/use-in-viewport.ts]
import { getCurrentScope, onScopeDispose, ref, watch } from 'vue'
import { getTargetElement } from '@/lib/target'
import type { BasicTarget } from '@/lib/target'

export interface UseInViewportOptions {
  /** Margin around the root, as CSS (e.g. `"0px 0px -20% 0px"`); grows or shrinks the visible area. */
  rootMargin?: string
  /** Visible fraction (0–1), or list of fractions, at which `ratio` updates. */
  threshold?: number | number[]
  /** Element treated as the "screen". Leave empty for the viewport. */
  root?: BasicTarget
  /** Called with each IntersectionObserver entry. */
  callback?: (entry: IntersectionObserverEntry) => void
}

export function useInViewport(
  target: BasicTarget | BasicTarget[],
  options: UseInViewportOptions = {},
) {
  const { rootMargin, threshold, root, callback } = options

  const inViewport = ref<boolean | undefined>(undefined)
  const ratio = ref<number | undefined>(undefined)

  let observer: IntersectionObserver | undefined

  const teardown = () => {
    observer?.disconnect()
    observer = undefined
  }

  const stopWatch = watch(
    () => {
      const targets = Array.isArray(target) ? target : [target]
      return targets.map((t) => getTargetElement(t))
    },
    (elements) => {
      teardown()

      const present = elements.filter(Boolean) as Element[]
      if (!present.length || typeof IntersectionObserver === 'undefined') return

      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            ratio.value = entry.intersectionRatio
            inViewport.value = entry.isIntersecting
            callback?.(entry)
          }
        },
        {
          rootMargin,
          threshold,
          root: (getTargetElement(root) as Element | null) ?? null,
        },
      )

      for (const el of present) observer.observe(el)
    },
    { immediate: true, flush: 'post' },
  )

  const stop = () => {
    teardown()
    stopWatch()
  }

  if (getCurrentScope()) onScopeDispose(stop)

  return {
    /** Whether the target is in view; `undefined` until first observed. Reactive. */
    inViewport,
    /** Visible fraction of the target, 0–1. Reactive. */
    ratio,
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
| Files | `composables/use-in-viewport.ts` |

## API Reference

```ts
export interface UseInViewportOptions {
  /** Margin around the root, as CSS (e.g. `"0px 0px -20% 0px"`); grows or shrinks the visible area. */
  rootMargin?: string
  /** Visible fraction (0–1), or list of fractions, at which `ratio` updates. */
  threshold?: number | number[]
  /** Element treated as the "screen". Leave empty for the viewport. */
  root?: BasicTarget
  /** Called with each IntersectionObserver entry. */
  callback?: (entry: IntersectionObserverEntry) => void
}

export function useInViewport(
  target: BasicTarget | BasicTarget[],
  options: UseInViewportOptions = {},
)
```

### Parameters

| Parameter | Type | Default | Description |
|---|---|---|---|
| `target` | `BasicTarget \| BasicTarget[]` | — | Element, or list of elements, to observe. |
| `options?` | `UseInViewportOptions` | `{}` | Observer settings. |
| `options.rootMargin?` | `string` | — | Margin around the root, as CSS (e.g. `"0px 0px -20% 0px"`); grows or shrinks the visible area. |
| `options.threshold?` | `number \| number[]` | — | Visible fraction (0–1), or list of fractions, at which `ratio` updates. |
| `options.root?` | `BasicTarget` | — | Element treated as the "screen". Leave empty for the viewport. |
| `options.callback?` | `((entry: IntersectionObserverEntry) => void)` | — | Called with each IntersectionObserver entry. |

### Returns

| Property | Type | Description |
|---|---|---|
| `inViewport` | `Ref<boolean \| undefined, boolean \| undefined>` | Whether the target is in view; `undefined` until first observed. Reactive. |
| `ratio` | `Ref<number \| undefined, number \| undefined>` | Visible fraction of the target, 0–1. Reactive. |
| `stop` | `() => void` | Stops observing. |

## Credits

Berasal dari [shadcn-hooks](https://github.com/Debbl/shadcn-hooks) (MIT, Copyright (c) 2025 Brendan Dash). Bentuk API-nya dari [ahooks](https://github.com/alibaba/hooks) lewat shadcn-hooks. Rantai lengkapnya di [Credits](/credits).
