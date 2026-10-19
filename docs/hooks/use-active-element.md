---
title: useActiveElement
description: "Elemen yang sedang menerima fokus."
---

<ComponentPreview name="UseActiveElementDemo" code="none" />

Dipantau lewat `focus` dan `blur` pada fase **capture**. Itu bukan detail
gaya: keduanya tidak menggelembung, jadi pendengar biasa di `window` tidak
akan pernah mendengarnya sama sekali.

`blur` diabaikan kalau `relatedTarget` terisi — artinya fokusnya cuma pindah
ke elemen lain, dan `focus` berikutnya sudah akan melaporkannya. Yang
ditangani di sini adalah fokus yang benar-benar keluar dari halaman.

## Installation

<Tabs>

<TabItem value="cli" label="CLI">

<InstallCLI name="use-active-element" />

Ikut terpasang sendiri: [`is-browser`](/hooks/is-browser), [`try-on-mounted`](/hooks/try-on-mounted), [`use-event-listener`](/hooks/use-event-listener).

</TabItem>

<TabItem value="manual" label="Manual">

Salin dulu [`is-browser`](/hooks/is-browser), [`try-on-mounted`](/hooks/try-on-mounted), [`target`](/hooks/target), [`use-event-listener`](/hooks/use-event-listener) — masing-masing memuat sumbernya di halamannya sendiri — lalu tempel berkas ini.

```ts [composables/use-active-element.ts]
import { getCurrentScope, onScopeDispose, readonly, shallowRef } from 'vue'
import { isBrowser } from '@/lib/is-browser'
import { tryOnMounted } from '@/lib/try-on-mounted'
import { useEventListener } from '@/composables/use-event-listener'

export interface UseActiveElementOptions {
  /** Descend into open shadow roots. Default: true. */
  deep?: boolean
  /** Re-check when DOM nodes are removed. Default: false. */
  triggerOnRemoval?: boolean
}

function findActiveElement(deep: boolean): Element | null {
  if (!isBrowser) return null

  let active: Element | null = document.activeElement
  if (!deep) return active

  while (active?.shadowRoot?.activeElement) active = active.shadowRoot.activeElement

  return active
}

export function useActiveElement(options: UseActiveElementOptions = {}) {
  const { deep = true, triggerOnRemoval = false } = options

  const active = shallowRef<Element | null>(null)

  const update = () => {
    active.value = findActiveElement(deep)
  }

  useEventListener('focus', update, { capture: true })
  useEventListener(
    'blur',
    (event: FocusEvent) => {
      if (event.relatedTarget !== null) return
      update()
    },
    { capture: true },
  )

  let observer: MutationObserver | undefined

  tryOnMounted(() => {
    update()

    if (!triggerOnRemoval || typeof MutationObserver === 'undefined') return

    observer = new MutationObserver(update)
    observer.observe(document, { childList: true, subtree: true })
  })

  if (getCurrentScope()) onScopeDispose(() => observer?.disconnect())

  return readonly(active)
}
```

</TabItem>

</Tabs>

## Requirements

| Requirement | Value |
|---|---|
| Project | Vue 3.5+, alias `@` — disiapkan `kliping init` |
| Kliping items | `is-browser`, `try-on-mounted`, `use-event-listener` |
| Files | `composables/use-active-element.ts` |

## API Reference

```ts
export interface UseActiveElementOptions {
  /** Descend into open shadow roots. Default: true. */
  deep?: boolean
  /** Re-check when DOM nodes are removed. Default: false. */
  triggerOnRemoval?: boolean
}

export function useActiveElement(options: UseActiveElementOptions = {})
```

### Parameters

| Parameter | Type | Default | Description |
|---|---|---|---|
| `options?` | `UseActiveElementOptions` | `{}` | Whether to look inside shadow roots and react to the focused element being removed. |
| `options.deep?` | `boolean` | — | Descend into open shadow roots. Default: true. |
| `options.triggerOnRemoval?` | `boolean` | — | Re-check when DOM nodes are removed. Default: false. |

### Returns

`Readonly<ShallowRef<Element \| null, Element \| null>>` — Reactive, read-only focused element; `null` when nothing is focused.

## Credits

Berasal dari [shadcn-hooks](https://github.com/Debbl/shadcn-hooks) (MIT, Copyright (c) 2025 Brendan Dash). Rantai lengkapnya di [Credits](/credits).
