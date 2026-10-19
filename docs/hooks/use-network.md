---
title: useNetwork
description: "Keadaan jaringan, selengkap yang mau diberitahu peramban."
---

<ComponentPreview name="UseNetworkDemo" code="none" />

Lebih rinci dari `useIsOnline`: selain tersambung atau tidak, di peramban
berbasis Chromium ada juga perkiraan jenis sambungan, kecepatan turun, dan
waktu tempuh. Semuanya opsional — Safari dan Firefox tidak menyediakan
`navigator.connection` sama sekali, dan di sana isian itu tetap `undefined`.

Yang paling berguna dari semuanya justru `saveData`: kalau bernilai `true`,
orangnya secara sadar meminta hemat data, dan gambar besar atau pemuatan awal
yang boros sebaiknya ditahan.

## Installation

<Tabs>

<TabItem value="cli" label="CLI">

<InstallCLI name="use-network" />

Ikut terpasang sendiri: [`try-on-mounted`](/hooks/try-on-mounted), [`use-event-listener`](/hooks/use-event-listener).

</TabItem>

<TabItem value="manual" label="Manual">

Salin dulu [`is-browser`](/hooks/is-browser), [`try-on-mounted`](/hooks/try-on-mounted), [`target`](/hooks/target), [`use-event-listener`](/hooks/use-event-listener) — masing-masing memuat sumbernya di halamannya sendiri — lalu tempel berkas ini.

```ts [composables/use-network.ts]
import { readonly, ref } from 'vue'
import { tryOnMounted } from '@/lib/try-on-mounted'
import { useEventListener } from '@/composables/use-event-listener'

export interface NetworkState {
  online: boolean
  since?: Date
  rtt?: number
  type?: string
  downlink?: number
  downlinkMax?: number
  saveData?: boolean
  effectiveType?: string
}

function getConnection(): any {
  if (typeof navigator !== 'object') return null
  const nav = navigator as any
  return nav.connection ?? nav.mozConnection ?? nav.webkitConnection ?? null
}

function readConnection(): Partial<NetworkState> {
  const c = getConnection()
  if (!c) return {}
  return {
    rtt: c.rtt,
    type: c.type,
    saveData: c.saveData,
    downlink: c.downlink,
    downlinkMax: c.downlinkMax,
    effectiveType: c.effectiveType,
  }
}

export function useNetwork() {
  const state = ref<NetworkState>({ online: true })

  const update = (online?: boolean) => {
    state.value = {
      ...state.value,
      ...(online === undefined ? {} : { online, since: new Date() }),
      ...readConnection(),
    }
  }

  tryOnMounted(() => {
    state.value = { online: navigator.onLine, ...readConnection() }
  })

  useEventListener('online', () => update(true))
  useEventListener('offline', () => update(false))

  useEventListener('change', () => update(), {
    target: () => getConnection(),
  })

  return readonly(state)
}
```

</TabItem>

</Tabs>

## Requirements

| Requirement | Value |
|---|---|
| Project | Vue 3.5+, alias `@` — disiapkan `kliping init` |
| Kliping items | `try-on-mounted`, `use-event-listener` |
| Files | `composables/use-network.ts` |

## API Reference

```ts
export interface NetworkState {
  online: boolean
  since?: Date
  rtt?: number
  type?: string
  downlink?: number
  downlinkMax?: number
  saveData?: boolean
  effectiveType?: string
}

export function useNetwork()
```

### Parameters

Tanpa parameter.

### Returns

`Readonly<Ref<{ online: boolean; since?: Date \| undefined; rtt?: number \| undefined; type?: string \| undefined; downlink?: number \| undefined; downlinkMax?: number \| undefined; saveData?: boolean \| undefined; effectiveType?: string \| undefined; }, NetworkState \| { online: boolean; since?: Date \| undefined; rtt?: number \| unde...>` — Network state: `online`, `since`, and Network Information API fields (`rtt`, `downlink`, `effectiveType`, …) when supported. Reactive, read-only.

## Credits

Berasal dari [shadcn-hooks](https://github.com/Debbl/shadcn-hooks) (MIT, Copyright (c) 2025 Brendan Dash). Bentuk API-nya dari [ahooks](https://github.com/alibaba/hooks) lewat shadcn-hooks. Rantai lengkapnya di [Credits](/credits).
