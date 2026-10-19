---
title: useClipboard
description: "Menyalin ke papan klip, dengan penanda tersalin yang padam sendiri."
---

<ComponentPreview name="UseClipboardDemo" code="none" />

Menyalin ke papan klip, dengan penanda "tersalin" yang padam sendiri.

Jalur lamanya — `document.execCommand('copy')` lewat `<textarea>`
tersembunyi — sengaja dipertahankan di balik opsi `legacy`, dan bukan karena
peramban tua. `navigator.clipboard` **hanya ada di konteks aman**: HTTPS atau
`localhost`. Tombol salin yang bekerja sempurna di mesin sendiri dan diam
saja di jaringan kantor lewat HTTP adalah cacat yang membingungkan justru
karena tidak melempar apa-apa.

`copied` padam sendiri setelah `copiedDuring`, dan timernya dibatalkan
bersama scope.

## Installation

<Tabs>

<TabItem value="cli" label="CLI">

<InstallCLI name="use-clipboard" />

Ikut terpasang sendiri: [`is-browser`](/hooks/is-browser), [`use-event-listener`](/hooks/use-event-listener).

</TabItem>

<TabItem value="manual" label="Manual">

Salin dulu [`is-browser`](/hooks/is-browser), [`target`](/hooks/target), [`use-event-listener`](/hooks/use-event-listener) — masing-masing memuat sumbernya di halamannya sendiri — lalu tempel berkas ini.

```ts [composables/use-clipboard.ts]
import { getCurrentScope, onScopeDispose, readonly, ref, toValue } from 'vue'
import type { MaybeRefOrGetter } from 'vue'
import { isBrowser } from '@/lib/is-browser'
import { useEventListener } from '@/composables/use-event-listener'

export interface UseClipboardOptions {
  /** Track clipboard contents when the user copies elsewhere. Default: false. */
  read?: boolean
  /** Default text to copy when `copy()` is called without an argument. */
  source?: MaybeRefOrGetter<string | undefined>
  /** How long `copied` stays true, in milliseconds. Default: 1500. */
  copiedDuring?: number
  /** Fall back to `execCommand` when the Clipboard API is unavailable. Default: false. */
  legacy?: boolean
}

function copyLegacy(value: string) {
  const textarea = document.createElement('textarea')
  textarea.value = value
  textarea.style.position = 'absolute'
  textarea.style.opacity = '0'
  textarea.setAttribute('readonly', '')
  document.body.appendChild(textarea)
  textarea.select()
  document.execCommand('copy')
  textarea.remove()
}

export function useClipboard(options: UseClipboardOptions = {}) {
  const { read = false, source, copiedDuring = 1500, legacy = false } = options

  const hasApi = isBrowser && 'clipboard' in navigator
  const isSupported = ref(hasApi || legacy)

  const text = ref('')
  const copied = ref(false)

  let timer: ReturnType<typeof setTimeout> | undefined

  const readClipboard = async () => {
    if (hasApi) {
      try {
        text.value = await navigator.clipboard.readText()
        return
      } catch {}
    }
    text.value = document?.getSelection?.()?.toString() ?? ''
  }

  useEventListener(['copy', 'cut'], readClipboard, {
    target: isBrowser ? document : undefined,
    passive: true,
    enable: () => isSupported.value && read,
  })

  const copy = async (value?: string) => {
    const content = value ?? toValue(source)
    if (!isSupported.value || content == null) return

    let fallBack = !hasApi
    if (!fallBack) {
      try {
        await navigator.clipboard.writeText(content)
      } catch {
        fallBack = true
      }
    }
    if (fallBack && legacy) copyLegacy(content)

    text.value = content
    copied.value = true

    if (timer !== undefined) clearTimeout(timer)

    timer = setTimeout(() => {
      copied.value = false
      timer = undefined
    }, copiedDuring)
  }

  if (getCurrentScope()) {
    onScopeDispose(() => {
      if (timer !== undefined) clearTimeout(timer)
    })
  }

  return {
    /** Whether copying can work here (Clipboard API, or `legacy`). Reactive. */
    isSupported: readonly(isSupported),
    /** The last copied text, or the clipboard contents when `read` is on. Reactive. */
    text,
    /** `true` for `copiedDuring` ms after a copy. Reactive. */
    copied: readonly(copied),
    /** Copies `value`, or `source` when omitted. */
    copy,
  }
}
```

</TabItem>

</Tabs>

## Requirements

| Requirement | Value |
|---|---|
| Project | Vue 3.5+, alias `@` — disiapkan `kliping init` |
| Kliping items | `is-browser`, `use-event-listener` |
| Files | `composables/use-clipboard.ts` |

## API Reference

```ts
export interface UseClipboardOptions {
  /** Track clipboard contents when the user copies elsewhere. Default: false. */
  read?: boolean
  /** Default text to copy when `copy()` is called without an argument. */
  source?: MaybeRefOrGetter<string | undefined>
  /** How long `copied` stays true, in milliseconds. Default: 1500. */
  copiedDuring?: number
  /** Fall back to `execCommand` when the Clipboard API is unavailable. Default: false. */
  legacy?: boolean
}

export function useClipboard(options: UseClipboardOptions = {})
```

### Parameters

| Parameter | Type | Default | Description |
|---|---|---|---|
| `options?` | `UseClipboardOptions` | `{}` | Read tracking, default source, copied-flag duration, and legacy fallback. |
| `options.read?` | `boolean` | — | Track clipboard contents when the user copies elsewhere. Default: false. |
| `options.source?` | `MaybeRefOrGetter<string \| undefined>` | — | Default text to copy when `copy()` is called without an argument. |
| `options.copiedDuring?` | `number` | — | How long `copied` stays true, in milliseconds. Default: 1500. |
| `options.legacy?` | `boolean` | — | Fall back to `execCommand` when the Clipboard API is unavailable. Default: false. |

### Returns

| Property | Type | Description |
|---|---|---|
| `isSupported` | `Readonly<Ref<boolean, boolean>>` | Whether copying can work here (Clipboard API, or `legacy`). Reactive. |
| `text` | `Ref<string, string>` | The last copied text, or the clipboard contents when `read` is on. Reactive. |
| `copied` | `Readonly<Ref<boolean, boolean>>` | `true` for `copiedDuring` ms after a copy. Reactive. |
| `copy` | `(value?: string) => Promise<void>` | Copies `value`, or `source` when omitted. |

## Credits

Berasal dari [shadcn-hooks](https://github.com/Debbl/shadcn-hooks) (MIT, Copyright (c) 2025 Brendan Dash). Rantai lengkapnya di [Credits](/credits).
