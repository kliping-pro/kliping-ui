---
title: useScrollLock
description: "Mengunci gulungan halaman untuk dialog, drawer, dan menu layar penuh."
---

<ComponentPreview name="UseScrollLockDemo" code="none" />

Mengunci gulungan halaman — untuk dialog, drawer, dan menu layar penuh.

Bagian yang paling sering dilupakan bukan penguncian, melainkan **lebar yang
melompat**. Menyembunyikan bilah gulung membuat halaman melebar beberapa
belas piksel, dan seluruh isinya bergeser tepat saat dialognya muncul.
Karena itu lebar bilah gulungnya dihitung lalu dititipkan sebagai
`padding-right`, dan halamannya diam.

Gaya aslinya disimpan sebelum diubah, bukan disetel ke nilai bawaan saat
dilepas. Elemen yang sudah punya `overflow` atau `padding-right` sendiri
mendapatkannya kembali utuh.

## Installation

<Tabs>

<TabItem value="cli" label="CLI">

<InstallCLI name="use-scroll-lock" />

Ikut terpasang sendiri: [`is-browser`](/hooks/is-browser), [`try-on-mounted`](/hooks/try-on-mounted).

</TabItem>

<TabItem value="manual" label="Manual">

Salin dulu [`is-browser`](/hooks/is-browser), [`try-on-mounted`](/hooks/try-on-mounted) — masing-masing memuat sumbernya di halamannya sendiri — lalu tempel berkas ini.

```ts [composables/use-scroll-lock.ts]
import { getCurrentScope, onScopeDispose, readonly, ref } from 'vue'
import { isBrowser } from '@/lib/is-browser'
import { tryOnMounted } from '@/lib/try-on-mounted'

export interface UseScrollLockOptions {
  /** Lock as soon as the composable is called. Default: true. */
  autoLock?: boolean
  /** Element to lock, or its CSS selector. Default: `document.body`. */
  lockTarget?: HTMLElement | string
  /** Add the scrollbar width as padding so the content does not shift. Default: true. */
  widthReflow?: boolean
}

export function useScrollLock(options: UseScrollLockOptions = {}) {
  const { autoLock = true, lockTarget, widthReflow = true } = options

  const isLocked = ref(false)
  let target: HTMLElement | null = null
  let originalStyle: { overflow: string; paddingRight: string } | null = null

  const findTarget = (): HTMLElement | null => {
    if (!isBrowser) return null
    if (typeof lockTarget === 'string') return document.querySelector<HTMLElement>(lockTarget)
    return lockTarget ?? document.body
  }

  const lock = () => {
    target ??= findTarget()
    if (!target || isLocked.value) return

    originalStyle = {
      overflow: target.style.overflow,
      paddingRight: target.style.paddingRight,
    }

    if (widthReflow) {
      const fullWidth = target === document.body ? window.innerWidth : target.offsetWidth

      const currentPadding = Number.parseInt(window.getComputedStyle(target).paddingRight, 10) || 0

      const scrollbarWidth = fullWidth - target.scrollWidth
      target.style.paddingRight = `${scrollbarWidth + currentPadding}px`
    }

    target.style.overflow = 'hidden'
    isLocked.value = true
  }

  const unlock = () => {
    if (target && originalStyle) {
      target.style.overflow = originalStyle.overflow
      if (widthReflow) target.style.paddingRight = originalStyle.paddingRight
    }
    originalStyle = null
    isLocked.value = false
  }

  tryOnMounted(() => {
    target = findTarget()
    if (autoLock) lock()
  })

  if (getCurrentScope()) onScopeDispose(unlock)

  return {
    /** Whether scrolling is locked. Reactive. */
    isLocked: readonly(isLocked),
    /** Locks scrolling on the target. */
    lock,
    /** Restores the target's original overflow and padding. */
    unlock,
  }
}
```

</TabItem>

</Tabs>

## Requirements

| Requirement | Value |
|---|---|
| Project | Vue 3.5+, alias `@` — disiapkan `kliping init` |
| Kliping items | `is-browser`, `try-on-mounted` |
| Files | `composables/use-scroll-lock.ts` |

## API Reference

```ts
export interface UseScrollLockOptions {
  /** Lock as soon as the composable is called. Default: true. */
  autoLock?: boolean
  /** Element to lock, or its CSS selector. Default: `document.body`. */
  lockTarget?: HTMLElement | string
  /** Add the scrollbar width as padding so the content does not shift. Default: true. */
  widthReflow?: boolean
}

export function useScrollLock(options: UseScrollLockOptions = {})
```

### Parameters

| Parameter | Type | Default | Description |
|---|---|---|---|
| `options?` | `UseScrollLockOptions` | `{}` | Lock settings. |
| `options.autoLock?` | `boolean` | — | Lock as soon as the composable is called. Default: true. |
| `options.lockTarget?` | `string \| HTMLElement` | — | Element to lock, or its CSS selector. Default: `document.body`. |
| `options.widthReflow?` | `boolean` | — | Add the scrollbar width as padding so the content does not shift. Default: true. |

### Returns

| Property | Type | Description |
|---|---|---|
| `isLocked` | `Readonly<Ref<boolean, boolean>>` | Whether scrolling is locked. Reactive. |
| `lock` | `() => void` | Locks scrolling on the target. |
| `unlock` | `() => void` | Restores the target's original overflow and padding. |

## Credits

Berasal dari [shadcn-hooks](https://github.com/Debbl/shadcn-hooks) (MIT, Copyright (c) 2025 Brendan Dash). Bentuk API-nya dari [usehooks-ts](https://github.com/juliencrn/usehooks-ts) lewat shadcn-hooks. Rantai lengkapnya di [Credits](/credits).
