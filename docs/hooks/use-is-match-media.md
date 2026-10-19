---
title: useIsMatchMedia
description: "Apakah sebuah kueri media sedang cocok."
---

<ComponentPreview name="UseIsMatchMediaDemo" code="none" />

Kuerinya boleh reaktif — pendengarnya dipasang ulang kalau kuerinya berganti,
dan yang lama dilepas lebih dulu.

`false` saat dirender di server. Itu berarti tata letak yang bergantung pada
composable ini akan sempat menggambar keadaan "tidak cocok" sebelum
diperbaiki di peramban. Untuk hal yang tidak boleh berkedip seperti itu,
kueri media di CSS tetap jawaban yang lebih baik — composable ini untuk
keputusan yang tidak bisa diambil CSS, misalnya memilih komponen mana yang
dipasang.

## Installation

<Tabs>

<TabItem value="cli" label="CLI">

<InstallCLI name="use-is-match-media" />

Ikut terpasang sendiri: [`is-browser`](/hooks/is-browser).

</TabItem>

<TabItem value="manual" label="Manual">

Salin dulu [`is-browser`](/hooks/is-browser) — masing-masing memuat sumbernya di halamannya sendiri — lalu tempel berkas ini.

```ts [composables/use-is-match-media.ts]
import { getCurrentScope, onScopeDispose, readonly, ref, toValue, watch } from 'vue'
import type { MaybeRefOrGetter } from 'vue'
import { isBrowser } from '@/lib/is-browser'

export function useIsMatchMedia(query: MaybeRefOrGetter<string>) {
  const matches = ref(false)
  let detach: (() => void) | undefined

  const teardown = () => {
    detach?.()
    detach = undefined
  }

  const stopWatch = watch(
    () => toValue(query),
    (mediaQuery) => {
      teardown()
      if (!isBrowser || typeof window.matchMedia !== 'function') return

      const mediaQueryList = window.matchMedia(mediaQuery)
      matches.value = mediaQueryList.matches

      const handler = (event: MediaQueryListEvent) => {
        matches.value = event.matches
      }

      mediaQueryList.addEventListener('change', handler)
      detach = () => mediaQueryList.removeEventListener('change', handler)
    },
    { immediate: true },
  )

  const stop = () => {
    teardown()
    stopWatch()
  }

  if (getCurrentScope()) onScopeDispose(stop)

  return readonly(matches)
}
```

</TabItem>

</Tabs>

## Requirements

| Requirement | Value |
|---|---|
| Project | Vue 3.5+, alias `@` — disiapkan `kliping init` |
| Kliping items | `is-browser` |
| Files | `composables/use-is-match-media.ts` |

## API Reference

```ts
export function useIsMatchMedia(query: MaybeRefOrGetter<string>)
```

### Parameters

| Parameter | Type | Default | Description |
|---|---|---|---|
| `query` | `MaybeRefOrGetter<string>` | — | CSS media query, e.g. `(min-width: 768px)`. May be reactive. |

### Returns

`Readonly<Ref<boolean, boolean>>` — Whether the query currently matches. Reactive, read-only.

## Credits

Berasal dari [shadcn-hooks](https://github.com/Debbl/shadcn-hooks) (MIT, Copyright (c) 2025 Brendan Dash). Rantai lengkapnya di [Credits](/credits).
