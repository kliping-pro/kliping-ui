/**
 * Keadaan jaringan, selengkap yang mau diberitahu peramban.
 *
 * Lebih rinci dari `useIsOnline`: selain tersambung atau tidak, di peramban
 * berbasis Chromium ada juga perkiraan jenis sambungan, kecepatan turun, dan
 * waktu tempuh. Semuanya opsional — Safari dan Firefox tidak menyediakan
 * `navigator.connection` sama sekali, dan di sana isian itu tetap `undefined`.
 *
 * Yang paling berguna dari semuanya justru `saveData`: kalau bernilai `true`,
 * orangnya secara sadar meminta hemat data, dan gambar besar atau pemuatan awal
 * yang boros sebaiknya ditahan.
 */
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
  if (typeof navigator !== 'object')
    return null
  const nav = navigator as any
  return nav.connection ?? nav.mozConnection ?? nav.webkitConnection ?? null
}

function readConnection(): Partial<NetworkState> {
  const c = getConnection()
  if (!c)
    return {}
  return {
    rtt: c.rtt,
    type: c.type,
    saveData: c.saveData,
    downlink: c.downlink,
    downlinkMax: c.downlinkMax,
    effectiveType: c.effectiveType,
  }
}

/**
 * @returns Network state: `online`, `since`, and Network Information API fields (`rtt`, `downlink`, `effectiveType`, …) when supported. Reactive, read-only.
 */
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

  // `navigator.connection` adalah EventTarget tersendiri, bukan bagian dari
  // window — jadi pendengarnya dipasang ke sana, dan dilepas bersama scope
  // lewat useEventListener yang sama.
  useEventListener('change', () => update(), {
    target: () => getConnection(),
  })

  return readonly(state)
}
