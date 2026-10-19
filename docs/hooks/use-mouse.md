---
title: useMouse
description: "Posisi penunjuk, dengan dukungan sentuh."
---

<ComponentPreview name="UseMouseDemo" code="none" />

`type` menentukan sistem koordinat yang dipakai, dan pilihannya berpengaruh:

- `page` — relatif terhadap dokumen, ikut bergeser saat halaman digulung
- `client` — relatif terhadap jendela, tidak terpengaruh gulungan
- `screen` — relatif terhadap layar fisik
- `movement` — selisih dari peristiwa sebelumnya, untuk pointer lock

`sourceType` menyebut dari mana angkanya datang. Itu yang membedakan
"penunjuk di pojok kiri atas" dari "belum ada penunjuk sama sekali", yang
kalau tidak dibedakan akan membuat efek ikut-kursor melompat ke sudut saat
halaman baru dibuka.

## Installation

<Tabs>

<TabItem value="cli" label="CLI">

<InstallCLI name="use-mouse" />

Ikut terpasang sendiri: [`use-event-listener`](/hooks/use-event-listener).

</TabItem>

<TabItem value="manual" label="Manual">

Salin dulu [`is-browser`](/hooks/is-browser), [`target`](/hooks/target), [`use-event-listener`](/hooks/use-event-listener) — masing-masing memuat sumbernya di halamannya sendiri — lalu tempel berkas ini.

```ts [composables/use-mouse.ts]
import { ref, toValue } from 'vue'
import type { MaybeRefOrGetter } from 'vue'
import { useEventListener } from '@/composables/use-event-listener'

export type CoordinateType = 'page' | 'client' | 'screen' | 'movement'
export type PointerSource = 'mouse' | 'touch' | null

export interface UseMouseOptions {
  /** Coordinate system. Default: `page`. */
  type?: CoordinateType
  /** Track touch events. Default: true. */
  touch?: MaybeRefOrGetter<boolean>
  /** Reset to the initial value when the touch ends. Default: false. */
  resetOnTouchEnds?: boolean
  /** Position before the first event, and after a touch ends when `resetOnTouchEnds`. Default: `{ x: 0, y: 0 }`. */
  initialValue?: { x: number; y: number }
}

const X_KEYS = {
  page: 'pageX',
  client: 'clientX',
  screen: 'screenX',
  movement: 'movementX',
} as const
const Y_KEYS = {
  page: 'pageY',
  client: 'clientY',
  screen: 'screenY',
  movement: 'movementY',
} as const

export function useMouse(options: UseMouseOptions = {}) {
  const {
    type = 'page',
    touch = true,
    resetOnTouchEnds = false,
    initialValue = { x: 0, y: 0 },
  } = options

  const x = ref(initialValue.x)
  const y = ref(initialValue.y)
  const sourceType = ref<PointerSource>(null)

  const fromMouse = (event: MouseEvent) => {
    x.value = event[X_KEYS[type]]
    y.value = event[Y_KEYS[type]]
    sourceType.value = 'mouse'
  }

  const fromTouch = (event: TouchEvent) => {
    const point = event.touches[0] ?? event.changedTouches[0]
    if (!point) return

    if (type === 'movement') {
      x.value = point.clientX
      y.value = point.clientY
    } else {
      x.value = point[X_KEYS[type] as 'pageX' | 'clientX' | 'screenX']
      y.value = point[Y_KEYS[type] as 'pageY' | 'clientY' | 'screenY']
    }

    sourceType.value = 'touch'
  }

  const touchEnabled = () => toValue(touch)

  useEventListener('mousemove', fromMouse, { passive: true })
  useEventListener('dragover', fromMouse, { passive: true })

  useEventListener('touchstart', fromTouch, { passive: true, enable: touchEnabled })
  useEventListener('touchmove', fromTouch, { passive: true, enable: touchEnabled })
  useEventListener(
    'touchend',
    (event: TouchEvent) => {
      if (resetOnTouchEnds) {
        x.value = initialValue.x
        y.value = initialValue.y
        return
      }
      fromTouch(event)
    },
    { passive: true, enable: touchEnabled },
  )

  return {
    /** Horizontal position, in pixels, for the chosen `type`. Reactive. */
    x,
    /** Vertical position, in pixels, for the chosen `type`. Reactive. */
    y,
    /** Input that produced the last position: `mouse`, `touch`, or `null`. Reactive. */
    sourceType,
  }
}
```

</TabItem>

</Tabs>

## Requirements

| Requirement | Value |
|---|---|
| Project | Vue 3.5+, alias `@` — disiapkan `kliping init` |
| Kliping items | `use-event-listener` |
| Files | `composables/use-mouse.ts` |

## API Reference

```ts
export type CoordinateType = 'page' | 'client' | 'screen' | 'movement'
export type PointerSource = 'mouse' | 'touch' | null

export interface UseMouseOptions {
  /** Coordinate system. Default: `page`. */
  type?: CoordinateType
  /** Track touch events. Default: true. */
  touch?: MaybeRefOrGetter<boolean>
  /** Reset to the initial value when the touch ends. Default: false. */
  resetOnTouchEnds?: boolean
  /** Position before the first event, and after a touch ends when `resetOnTouchEnds`. Default: `{ x: 0, y: 0 }`. */
  initialValue?: { x: number, y: number }
}

export function useMouse(options: UseMouseOptions = {})
```

### Parameters

| Parameter | Type | Default | Description |
|---|---|---|---|
| `options?` | `UseMouseOptions` | `{}` | Tracking settings. |
| `options.type?` | `CoordinateType` | — | Coordinate system. Default: `page`. |
| `options.touch?` | `MaybeRefOrGetter<boolean>` | — | Track touch events. Default: true. |
| `options.resetOnTouchEnds?` | `boolean` | — | Reset to the initial value when the touch ends. Default: false. |
| `options.initialValue?` | `{ x: number; y: number; }` | — | Position before the first event, and after a touch ends when `resetOnTouchEnds`. Default: `{ x: 0, y: 0 }`. |

### Returns

| Property | Type | Description |
|---|---|---|
| `x` | `Ref<number, number>` | Horizontal position, in pixels, for the chosen `type`. Reactive. |
| `y` | `Ref<number, number>` | Vertical position, in pixels, for the chosen `type`. Reactive. |
| `sourceType` | `Ref<PointerSource, PointerSource>` | Input that produced the last position: `mouse`, `touch`, or `null`. Reactive. |

## Credits

Berasal dari [shadcn-hooks](https://github.com/Debbl/shadcn-hooks) (MIT, Copyright (c) 2025 Brendan Dash). Rantai lengkapnya di [Credits](/credits).
