---
title: useClickAnyWhere
description: "Menjalankan sesuatu setiap kali ada klik di mana pun di halaman."
---

<ComponentPreview name="UseClickAnyWhereDemo" code="none" />

Setipis di sumbernya: satu pemanggilan `useEventListener` ke `window`. Tetap
dikirim sebagai item tersendiri karena namanya menyebut maksudnya, dan yang
membacanya di tempat pemakaian langsung tahu cakupannya seluruh halaman —
bukan sebuah elemen yang kebetulan tidak disebutkan.

## Installation

<Tabs>

<TabItem value="cli" label="CLI">

<InstallCLI name="use-click-any-where" />

Ikut terpasang sendiri: [`use-event-listener`](/hooks/use-event-listener).

</TabItem>

<TabItem value="manual" label="Manual">

Salin dulu [`is-browser`](/hooks/is-browser), [`target`](/hooks/target), [`use-event-listener`](/hooks/use-event-listener) — masing-masing memuat sumbernya di halamannya sendiri — lalu tempel berkas ini.

```ts [composables/use-click-any-where.ts]
import { useEventListener } from '@/composables/use-event-listener'

export function useClickAnyWhere(handler: (event: MouseEvent) => void) {
  return useEventListener('click', handler)
}
```

</TabItem>

</Tabs>

## Requirements

| Requirement | Value |
|---|---|
| Project | Vue 3.5+, alias `@` — disiapkan `kliping init` |
| Kliping items | `use-event-listener` |
| Files | `composables/use-click-any-where.ts` |

## API Reference

```ts
export function useClickAnyWhere(handler: (event: MouseEvent) => void)
```

### Parameters

| Parameter | Type | Default | Description |
|---|---|---|---|
| `handler` | `(event: MouseEvent) => void` | — | Called with every click anywhere on the page. |

### Returns

`() => void` — Removes the listener.

## Credits

Berasal dari [shadcn-hooks](https://github.com/Debbl/shadcn-hooks) (MIT, Copyright (c) 2025 Brendan Dash). Bentuk API-nya dari [usehooks-ts](https://github.com/juliencrn/usehooks-ts) lewat shadcn-hooks. Rantai lengkapnya di [Credits](/credits).
