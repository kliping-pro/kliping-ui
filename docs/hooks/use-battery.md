---
title: useBattery
description: "Keadaan baterai perangkat."
---

<ComponentPreview name="UseBatteryDemo" code="none" />

Dukungan peramban untuk API ini menyusut, bukan bertambah — Firefox dan
Safari sudah mencabutnya karena bisa dipakai menyidik perangkat. Karena itu
`isSupported` harus benar-benar diperiksa di tempat pemakaian, dan
tampilannya harus tetap masuk akal saat nilainya tidak pernah datang.

Nilai bawaannya sengaja optimistis — terisi penuh, tidak sedang mengisi —
supaya tampilan yang memakainya tidak mengedipkan peringatan "baterai lemah"
di peramban yang memang tidak akan pernah menjawab.

## Installation

<Tabs>

<TabItem value="cli" label="CLI">

<InstallCLI name="use-battery" />

Ikut terpasang sendiri: [`try-on-mounted`](/hooks/try-on-mounted).

</TabItem>

<TabItem value="manual" label="Manual">

Salin dulu [`is-browser`](/hooks/is-browser), [`try-on-mounted`](/hooks/try-on-mounted) — masing-masing memuat sumbernya di halamannya sendiri — lalu tempel berkas ini.

```ts [composables/use-battery.ts]
import { getCurrentScope, onScopeDispose, ref } from 'vue'
import { tryOnMounted } from '@/lib/try-on-mounted'

const EVENTS = [
  'chargingchange',
  'chargingtimechange',
  'dischargingtimechange',
  'levelchange',
] as const

interface BatteryManager extends EventTarget {
  charging: boolean
  chargingTime: number
  dischargingTime: number
  level: number
}

interface NavigatorWithBattery extends Navigator {
  getBattery?: () => Promise<BatteryManager>
}

export function useBattery() {
  const isSupported = ref(false)
  const charging = ref(false)
  const chargingTime = ref(0)
  const dischargingTime = ref(0)
  const level = ref(1)

  let battery: BatteryManager | null = null
  let disposed = false

  const update = () => {
    if (!battery || disposed) return
    charging.value = battery.charging
    chargingTime.value = battery.chargingTime
    dischargingTime.value = battery.dischargingTime
    level.value = battery.level
  }

  tryOnMounted(() => {
    const nav = navigator as NavigatorWithBattery
    if (typeof nav.getBattery !== 'function') return

    isSupported.value = true

    nav
      .getBattery()
      .then((manager) => {
        if (disposed) return

        battery = manager
        update()
        for (const name of EVENTS) manager.addEventListener(name, update)
      })
      .catch(() => {})
  })

  if (getCurrentScope()) {
    onScopeDispose(() => {
      disposed = true
      if (!battery) return
      for (const name of EVENTS) battery.removeEventListener(name, update)
    })
  }

  return {
    /** Whether the Battery Status API is available. Reactive. */
    isSupported,
    /** Whether the device is charging. Reactive. */
    charging,
    /** Seconds until fully charged; 0 when full or unknown. Reactive. */
    chargingTime,
    /** Seconds until empty; `Infinity` while charging. Reactive. */
    dischargingTime,
    /** Charge level from 0 to 1. Reactive. */
    level,
  }
}
```

</TabItem>

</Tabs>

## Requirements

| Requirement | Value |
|---|---|
| Project | Vue 3.5+, alias `@` — disiapkan `kliping init` |
| Kliping items | `try-on-mounted` |
| Files | `composables/use-battery.ts` |

## API Reference

```ts
export function useBattery()
```

### Parameters

Tanpa parameter.

### Returns

Reactive battery state; stays at the defaults when the API is missing.

| Property | Type | Description |
|---|---|---|
| `isSupported` | `Ref<boolean, boolean>` | Whether the Battery Status API is available. Reactive. |
| `charging` | `Ref<boolean, boolean>` | Whether the device is charging. Reactive. |
| `chargingTime` | `Ref<number, number>` | Seconds until fully charged; 0 when full or unknown. Reactive. |
| `dischargingTime` | `Ref<number, number>` | Seconds until empty; `Infinity` while charging. Reactive. |
| `level` | `Ref<number, number>` | Charge level from 0 to 1. Reactive. |

## Credits

Berasal dari [shadcn-hooks](https://github.com/Debbl/shadcn-hooks) (MIT, Copyright (c) 2025 Brendan Dash). Rantai lengkapnya di [Credits](/credits).
