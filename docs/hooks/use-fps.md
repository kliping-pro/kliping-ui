---
title: useFps
description: "Berapa bingkai per detik yang sedang digambar peramban."
---

<ComponentPreview name="UseFpsDemo" code="none" />

Diukur tiap `every` bingkai, bukan tiap bingkai: menghitung dari satu bingkai
ke bingkai berikutnya menghasilkan angka yang melompat-lompat dan tidak
terbaca. Bawaannya 10, sama seperti sumbernya.

`cancelAnimationFrame` di pembersihan bukan kelengkapan. Tanpa itu, satu
komponen yang dibuka dan ditutup berulang kali meninggalkan gelung
`requestAnimationFrame` untuk tiap kemunculannya, dan semuanya terus berjalan
selamanya di latar — jenis kebocoran yang tidak pernah terlihat sampai
halamannya melambat tanpa sebab yang jelas.

## Installation

<Tabs>

<TabItem value="cli" label="CLI">

<InstallCLI name="use-fps" />

Ikut terpasang sendiri: [`is-browser`](/hooks/is-browser), [`try-on-mounted`](/hooks/try-on-mounted).

</TabItem>

<TabItem value="manual" label="Manual">

Salin dulu [`is-browser`](/hooks/is-browser), [`try-on-mounted`](/hooks/try-on-mounted) — masing-masing memuat sumbernya di halamannya sendiri — lalu tempel berkas ini.

```ts [composables/use-fps.ts]
import { getCurrentScope, onScopeDispose, readonly, ref } from 'vue'
import { isBrowser } from '@/lib/is-browser'
import { tryOnMounted } from '@/lib/try-on-mounted'

export interface UseFpsOptions {
  /** Recalculate every this many frames. Default: 10. */
  every?: number
}

export function useFps(options: UseFpsOptions = {}) {
  const { every = 10 } = options
  const fps = ref(0)

  let frame: number | undefined

  const stop = () => {
    if (frame !== undefined) {
      cancelAnimationFrame(frame)
      frame = undefined
    }
  }

  tryOnMounted(() => {
    if (
      !isBrowser ||
      typeof performance === 'undefined' ||
      typeof requestAnimationFrame === 'undefined'
    ) {
      return
    }

    let count = 0
    let since = performance.now()

    const measure = () => {
      const now = performance.now()
      count += 1

      if (count >= every) {
        const elapsed = now - since
        fps.value = elapsed > 0 ? Math.round((count * 1000) / elapsed) : 0
        count = 0
        since = now
      }

      frame = requestAnimationFrame(measure)
    }

    frame = requestAnimationFrame(measure)
  })

  if (getCurrentScope()) onScopeDispose(stop)

  return readonly(fps)
}
```

</TabItem>

</Tabs>

## Requirements

| Requirement | Value |
|---|---|
| Project | Vue 3.5+, alias `@` — disiapkan `kliping init` |
| Kliping items | `is-browser`, `try-on-mounted` |
| Files | `composables/use-fps.ts` |

## API Reference

```ts
export interface UseFpsOptions {
  /** Recalculate every this many frames. Default: 10. */
  every?: number
}

export function useFps(options: UseFpsOptions = {})
```

### Parameters

| Parameter | Type | Default | Description |
|---|---|---|---|
| `options?` | `UseFpsOptions` | `{}` | How often to recalculate. |
| `options.every?` | `number` | — | Recalculate every this many frames. Default: 10. |

### Returns

`Readonly<Ref<number, number>>` — Reactive, read-only frames per second.

## Credits

Berasal dari [shadcn-hooks](https://github.com/Debbl/shadcn-hooks) (MIT, Copyright (c) 2025 Brendan Dash). Rantai lengkapnya di [Credits](/credits).
