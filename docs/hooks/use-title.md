---
title: useTitle
description: "Judul halaman, yang bisa dibaca dan ditulis."
---

<ComponentPreview name="UseTitleDemo" code="none" />

`observe` menyalakan pengamatan terhadap perubahan dari luar — kode lain,
ekstensi, atau router yang menyetelnya sendiri. Mati secara bawaan, sama
seperti sumbernya: satu `MutationObserver` di `<head>` bukan biaya yang
pantas dibayar setiap halaman kalau tidak ada yang benar-benar
membutuhkannya.

Judul yang ditulis sendiri diingat, supaya pengamatnya tidak menganggap
tulisan sendiri sebagai perubahan dari luar lalu memantulkannya kembali.

## Installation

<Tabs>

<TabItem value="cli" label="CLI">

<InstallCLI name="use-title" />

Ikut terpasang sendiri: [`is-browser`](/hooks/is-browser), [`try-on-mounted`](/hooks/try-on-mounted).

</TabItem>

<TabItem value="manual" label="Manual">

Salin dulu [`is-browser`](/hooks/is-browser), [`try-on-mounted`](/hooks/try-on-mounted) — masing-masing memuat sumbernya di halamannya sendiri — lalu tempel berkas ini.

```ts [composables/use-title.ts]
import { getCurrentScope, onScopeDispose, ref, toValue, watch } from 'vue'
import type { MaybeRefOrGetter, Ref } from 'vue'
import { isBrowser } from '@/lib/is-browser'
import { tryOnMounted } from '@/lib/try-on-mounted'

export interface UseTitleOptions {
  /** Track title changes made elsewhere. Default: false. */
  observe?: boolean
  /** Template for the final title; `%s` is replaced with the title, or pass a function. */
  titleTemplate?: string | ((title: string) => string)
}

function createFormatter(template?: string | ((title: string) => string)) {
  if (typeof template === 'function') return template
  if (typeof template === 'string' && template.includes('%s'))
    return (title: string) => template.replaceAll('%s', title)
  return (title: string) => title
}

export function useTitle(
  newTitle?: MaybeRefOrGetter<string | null | undefined>,
  options: UseTitleOptions = {},
) {
  const { observe = false, titleTemplate } = options
  const format = createFormatter(titleTemplate)

  const title = ref(toValue(newTitle) ?? (isBrowser ? document.title : '')) as Ref<string>

  let lastWritten: string | null = null

  watch(
    () => toValue(newTitle),
    (next) => {
      if (next != null && next !== title.value) title.value = next
    },
  )

  watch(
    title,
    (next) => {
      if (!isBrowser) return
      const formatted = format(next)
      lastWritten = formatted
      if (document.title !== formatted) document.title = formatted
    },
    { immediate: true },
  )

  let observer: MutationObserver | undefined

  tryOnMounted(() => {
    if (!observe || typeof MutationObserver === 'undefined') return

    const target = document.head ?? document.documentElement
    if (!target) return

    observer = new MutationObserver(() => {
      const current = document.title
      if (lastWritten === current || title.value === current) return
      title.value = current
    })

    observer.observe(target, { childList: true, subtree: true, characterData: true })
  })

  if (getCurrentScope()) onScopeDispose(() => observer?.disconnect())

  return title
}
```

</TabItem>

</Tabs>

## Requirements

| Requirement | Value |
|---|---|
| Project | Vue 3.5+, alias `@` — disiapkan `kliping init` |
| Kliping items | `is-browser`, `try-on-mounted` |
| Files | `composables/use-title.ts` |

## API Reference

```ts
export interface UseTitleOptions {
  /** Track title changes made elsewhere. Default: false. */
  observe?: boolean
  /** Template for the final title; `%s` is replaced with the title, or pass a function. */
  titleTemplate?: string | ((title: string) => string)
}

export function useTitle(
  newTitle?: MaybeRefOrGetter<string | null | undefined>,
  options: UseTitleOptions = {},
)
```

### Parameters

| Parameter | Type | Default | Description |
|---|---|---|---|
| `newTitle?` | `MaybeRefOrGetter<string \| null \| undefined>` | — | Title to set. May be a ref or getter. |
| `options?` | `UseTitleOptions` | `{}` | Observation and template settings. |
| `options.observe?` | `boolean` | — | Track title changes made elsewhere. Default: false. |
| `options.titleTemplate?` | `string \| ((title: string) => string)` | — | Template for the final title; `%s` is replaced with the title, or pass a function. |

### Returns

`Ref<string, string>` — Current document title; writing to it updates the page. Reactive.

## Credits

Berasal dari [shadcn-hooks](https://github.com/Debbl/shadcn-hooks) (MIT, Copyright (c) 2025 Brendan Dash). Rantai lengkapnya di [Credits](/credits).
