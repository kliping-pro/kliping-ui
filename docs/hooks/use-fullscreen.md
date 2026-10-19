---
title: useFullscreen
description: "Layar penuh, dengan seluruh awalan vendor yang masih dibutuhkan."
---

<ComponentPreview name="UseFullscreenDemo" code="none" />

Ini composable terpanjang di registry, dan panjangnya bukan hiasan. Fullscreen
API punya empat nama berbeda untuk hal yang sama, dan Safari di iOS memakai
jalur yang sama sekali lain: metodenya ada di elemen `<video>`, bukan di
`document`. Setiap nama yang didaftar di bawah pernah jadi satu-satunya yang
bekerja di suatu peramban.

Keadaannya **dibaca dari peramban lewat peristiwa**, bukan disimpan sendiri
saat `enter()` dipanggil. Itu wajib: orang bisa keluar dari layar penuh
dengan menekan Escape, dan tidak ada satu pun kode kita yang tahu itu terjadi
kecuali melalui `fullscreenchange`.

## Installation

<Tabs>

<TabItem value="cli" label="CLI">

<InstallCLI name="use-fullscreen" />

Ikut terpasang sendiri: [`is-browser`](/hooks/is-browser), [`target`](/hooks/target), [`try-on-mounted`](/hooks/try-on-mounted), [`use-event-listener`](/hooks/use-event-listener).

</TabItem>

<TabItem value="manual" label="Manual">

Salin dulu [`is-browser`](/hooks/is-browser), [`target`](/hooks/target), [`try-on-mounted`](/hooks/try-on-mounted), [`use-event-listener`](/hooks/use-event-listener) — masing-masing memuat sumbernya di halamannya sendiri — lalu tempel berkas ini.

```ts [composables/use-fullscreen.ts]
import { getCurrentScope, onScopeDispose, readonly, ref } from 'vue'
import { isBrowser } from '@/lib/is-browser'
import { tryOnMounted } from '@/lib/try-on-mounted'
import { getTargetElement } from '@/lib/target'
import { useEventListener } from '@/composables/use-event-listener'
import type { BasicTarget } from '@/lib/target'

const EVENTS = [
  'fullscreenchange',
  'webkitfullscreenchange',
  'webkitendfullscreen',
  'mozfullscreenchange',
  'MSFullscreenChange',
]

const ENTER_METHODS = [
  'requestFullscreen',
  'webkitRequestFullscreen',
  'webkitEnterFullscreen',
  'webkitEnterFullScreen',
  'webkitRequestFullScreen',
  'mozRequestFullScreen',
  'msRequestFullscreen',
]

const EXIT_METHODS = [
  'exitFullscreen',
  'webkitExitFullscreen',
  'webkitExitFullScreen',
  'webkitCancelFullScreen',
  'mozCancelFullScreen',
  'msExitFullscreen',
]

const ACTIVE_PROPS = [
  'fullScreen',
  'webkitIsFullScreen',
  'webkitDisplayingFullscreen',
  'mozFullScreen',
  'msFullscreenElement',
]

const ELEMENT_PROPS = [
  'fullscreenElement',
  'webkitFullscreenElement',
  'mozFullScreenElement',
  'msFullscreenElement',
]

export interface UseFullscreenOptions {
  /** Exit fullscreen when the scope is disposed. Default: false. */
  autoExit?: boolean
}

export function useFullscreen(target?: BasicTarget, options: UseFullscreenOptions = {}) {
  const { autoExit = false } = options

  const isSupported = ref(false)
  const isFullscreen = ref(false)

  let enterMethod: string | undefined
  let exitMethod: string | undefined
  let activeProp: string | undefined
  let elementProp: string | undefined

  const element = (): any =>
    getTargetElement(target) ?? (isBrowser ? document.documentElement : undefined)

  const find = (candidates: string[]) => {
    const el = element()
    return candidates.find((name) => (el && name in el) || (isBrowser && name in document))
  }

  const detectSupport = () => {
    if (!isBrowser) return
    enterMethod = find(ENTER_METHODS)
    exitMethod = find(EXIT_METHODS)
    activeProp = find(ACTIVE_PROPS)
    elementProp = find(ELEMENT_PROPS)
    isSupported.value = Boolean(element() && enterMethod && exitMethod && activeProp)
  }

  const anyFullscreen = (): boolean => {
    if (!activeProp || !isBrowser) return false

    const doc = document as any
    if (doc[activeProp] != null) return Boolean(doc[activeProp])

    const el = element()
    if (el && el[activeProp] != null) return Boolean(el[activeProp])

    return false
  }

  const ownElementFullscreen = (): boolean => {
    if (!elementProp || !isBrowser) return false
    return (document as any)[elementProp] === element()
  }

  const exit = async () => {
    if (!isSupported.value || !isFullscreen.value || !exitMethod) return

    const doc = document as any
    const el = element()

    if (doc[exitMethod] != null) await doc[exitMethod]()
    else if (el?.[exitMethod] != null) await el[exitMethod]()

    isFullscreen.value = false
  }

  const enter = async () => {
    if (!isSupported.value || isFullscreen.value) return

    if (anyFullscreen()) await exit()

    const el = element()
    if (enterMethod && el?.[enterMethod] != null) {
      await el[enterMethod]()
      isFullscreen.value = true
    }
  }

  const toggle = async () => {
    await (isFullscreen.value ? exit() : enter())
  }

  const onChange = () => {
    const full = anyFullscreen()
    if (!full || ownElementFullscreen()) isFullscreen.value = full
  }

  useEventListener(EVENTS, onChange, {
    target: () => (isBrowser ? document : undefined),
    passive: true,
  })
  useEventListener(EVENTS, onChange, {
    target: () => element(),
    passive: true,
  })

  tryOnMounted(() => {
    detectSupport()
    onChange()
  })

  if (getCurrentScope()) {
    onScopeDispose(() => {
      if (autoExit) void exit()
    })
  }

  return {
    /** Whether the Fullscreen API is available. Reactive. */
    isSupported: readonly(isSupported),
    /** Whether the target is fullscreen. Reactive. */
    isFullscreen: readonly(isFullscreen),
    /** Enters fullscreen. */
    enter,
    /** Exits fullscreen. */
    exit,
    /** Enters or exits fullscreen. */
    toggle,
  }
}
```

</TabItem>

</Tabs>

## Requirements

| Requirement | Value |
|---|---|
| Project | Vue 3.5+, alias `@` — disiapkan `kliping init` |
| Kliping items | `is-browser`, `target`, `try-on-mounted`, `use-event-listener` |
| Files | `composables/use-fullscreen.ts` |

## API Reference

```ts
export interface UseFullscreenOptions {
  /** Exit fullscreen when the scope is disposed. Default: false. */
  autoExit?: boolean
}

export function useFullscreen(
  target?: BasicTarget,
  options: UseFullscreenOptions = {},
)
```

### Parameters

| Parameter | Type | Default | Description |
|---|---|---|---|
| `target?` | `BasicTarget` | — | Element, ref, or getter to show fullscreen. Default: the whole page. |
| `options?` | `UseFullscreenOptions` | `{}` | Exit when the scope is disposed. |
| `options.autoExit?` | `boolean` | — | Exit fullscreen when the scope is disposed. Default: false. |

### Returns

| Property | Type | Description |
|---|---|---|
| `isSupported` | `Readonly<Ref<boolean, boolean>>` | Whether the Fullscreen API is available. Reactive. |
| `isFullscreen` | `Readonly<Ref<boolean, boolean>>` | Whether the target is fullscreen. Reactive. |
| `enter` | `() => Promise<void>` | Enters fullscreen. |
| `exit` | `() => Promise<void>` | Exits fullscreen. |
| `toggle` | `() => Promise<void>` | Enters or exits fullscreen. |

## Credits

Berasal dari [shadcn-hooks](https://github.com/Debbl/shadcn-hooks) (MIT, Copyright (c) 2025 Brendan Dash). Rantai lengkapnya di [Credits](/credits).
