/**
 * Keadaan baterai perangkat.
 *
 * Dukungan peramban untuk API ini menyusut, bukan bertambah — Firefox dan
 * Safari sudah mencabutnya karena bisa dipakai menyidik perangkat. Karena itu
 * `isSupported` harus benar-benar diperiksa di tempat pemakaian, dan
 * tampilannya harus tetap masuk akal saat nilainya tidak pernah datang.
 *
 * Nilai bawaannya sengaja optimistis — terisi penuh, tidak sedang mengisi —
 * supaya tampilan yang memakainya tidak mengedipkan peringatan "baterai lemah"
 * di peramban yang memang tidak akan pernah menjawab.
 */
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

/**
 * @returns Reactive battery state; stays at the defaults when the API is missing.
 */
export function useBattery() {
  const isSupported = ref(false)
  const charging = ref(false)
  const chargingTime = ref(0)
  const dischargingTime = ref(0)
  const level = ref(1)

  let battery: BatteryManager | null = null
  let disposed = false

  const update = () => {
    if (!battery || disposed)
      return
    charging.value = battery.charging
    chargingTime.value = battery.chargingTime
    dischargingTime.value = battery.dischargingTime
    level.value = battery.level
  }

  tryOnMounted(() => {
    const nav = navigator as NavigatorWithBattery
    if (typeof nav.getBattery !== 'function')
      return

    isSupported.value = true

    nav.getBattery()
      .then((manager) => {
        // Scope-nya bisa saja sudah mati saat promise ini sampai. Tanpa
        // penjagaan ini, pendengarnya terpasang ke objek yang tidak akan pernah
        // dilepas lagi oleh siapa pun.
        if (disposed)
          return

        battery = manager
        update()
        for (const name of EVENTS)
          manager.addEventListener(name, update)
      })
      .catch(() => {
        // Sebagian peramban punya metodenya tapi menolak menjalankannya.
        // Nilai bawaannya dipertahankan.
      })
  })

  if (getCurrentScope()) {
    onScopeDispose(() => {
      disposed = true
      if (!battery)
        return
      for (const name of EVENTS)
        battery.removeEventListener(name, update)
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
