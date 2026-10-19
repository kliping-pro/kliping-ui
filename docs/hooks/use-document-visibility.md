---
title: useDocumentVisibility
description: "Apakah tab-nya sedang dilihat."
---

<ComponentPreview name="UseDocumentVisibilityDemo" code="none" />

Dipakai untuk berhenti bekerja saat tidak ada yang melihat: hentikan polling,
jeda animasi, tunda muat ulang. Berpasangan rapi dengan `useInterval`, yang
berhenti kalau jedanya `null`:

```ts
const terlihat = useDocumentVisibility()
useInterval(muatUlang, () => (terlihat.value === 'visible' ? 5000 : null))
```

Nilainya `visible` saat dirender di server — bukan tebakan, melainkan satu-
satunya jawaban yang membuat HTML server dan gambaran pertama di peramban
cocok untuk tab yang memang sedang dibuka.

## Installation

<Tabs>

<TabItem value="cli" label="CLI">

<InstallCLI name="use-document-visibility" />

Ikut terpasang sendiri: [`is-browser`](/hooks/is-browser), [`try-on-mounted`](/hooks/try-on-mounted), [`use-event-listener`](/hooks/use-event-listener).

</TabItem>

<TabItem value="manual" label="Manual">

Salin dulu [`is-browser`](/hooks/is-browser), [`try-on-mounted`](/hooks/try-on-mounted), [`target`](/hooks/target), [`use-event-listener`](/hooks/use-event-listener) — masing-masing memuat sumbernya di halamannya sendiri — lalu tempel berkas ini.

```ts [composables/use-document-visibility.ts]
import { readonly, ref } from 'vue'
import { isBrowser } from '@/lib/is-browser'
import { tryOnMounted } from '@/lib/try-on-mounted'
import { useEventListener } from '@/composables/use-event-listener'

export function useDocumentVisibility() {
  const visibility = ref<DocumentVisibilityState>('visible')

  const update = () => {
    if (isBrowser) visibility.value = document.visibilityState
  }

  tryOnMounted(update)
  useEventListener('visibilitychange', update, {
    target: isBrowser ? document : undefined,
    passive: true,
  })

  return readonly(visibility)
}
```

</TabItem>

</Tabs>

## Requirements

| Requirement | Value |
|---|---|
| Project | Vue 3.5+, alias `@` — disiapkan `kliping init` |
| Kliping items | `is-browser`, `try-on-mounted`, `use-event-listener` |
| Files | `composables/use-document-visibility.ts` |

## API Reference

```ts
export function useDocumentVisibility()
```

### Parameters

Tanpa parameter.

### Returns

`Readonly<Ref<DocumentVisibilityState, DocumentVisibilityState>>` — Reactive, read-only `document.visibilityState`: `visible` or `hidden`.

## Credits

Berasal dari [shadcn-hooks](https://github.com/Debbl/shadcn-hooks) (MIT, Copyright (c) 2025 Brendan Dash). Rantai lengkapnya di [Credits](/credits).
