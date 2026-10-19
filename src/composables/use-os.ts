/**
 * Sistem operasi yang sedang dipakai, ditebak dari `navigator`.
 *
 * Dipakai untuk hal-hal kecil yang memang berbeda per sistem: menampilkan ⌘K
 * atau Ctrl+K, memilih kata "Bagikan" atau "Kirim". **Jangan** dipakai untuk
 * memutuskan kemampuan — untuk itu periksa kemampuannya langsung, karena
 * `userAgent` bisa dipalsukan dan sering memang dipalsukan.
 *
 * Bernilai `undetermined` saat dirender di server dan pada gambaran pertama di
 * peramban, lalu terisi setelah terpasang. Mengisinya lebih awal akan membuat
 * HTML server berbeda dari gambaran pertama, dan Vue menggambar ulang bagian
 * itu — persis masalah yang membuat sumbernya menunda pembacaan ini juga.
 */
import { readonly, ref } from 'vue'
import { tryOnMounted } from '@/lib/try-on-mounted'

export type OperatingSystem =
  | 'undetermined'
  | 'macos'
  | 'ios'
  | 'windows'
  | 'android'
  | 'linux'
  | 'chromeos'

interface NavigatorWithUserAgentData extends Navigator {
  userAgentData?: { platform?: string }
}

/**
 * Reads the OS once, without reactivity. Useful outside components.
 * @returns Operating system detected from the user agent, read once; `undetermined` outside the browser.
 */
export function getOs(): OperatingSystem {
  if (typeof navigator === 'undefined')
    return 'undetermined'

  const nav = navigator as NavigatorWithUserAgentData
  const platform = (nav.userAgentData?.platform ?? navigator.platform ?? '').toLowerCase()
  const userAgent = navigator.userAgent.toLowerCase()
  const touchPoints = navigator.maxTouchPoints ?? 0

  if (userAgent.includes('android'))
    return 'android'

  // iPad modern menyamar sebagai macOS. Yang membedakannya cuma layar sentuh:
  // Mac tidak punya, jadi `maxTouchPoints > 1` di platform Mac berarti iPad.
  if (/iphone|ipad|ipod/.test(userAgent) || (platform === 'macintel' && touchPoints > 1))
    return 'ios'

  if (userAgent.includes('cros'))
    return 'chromeos'
  if (platform.includes('win') || userAgent.includes('win'))
    return 'windows'
  if (platform.includes('mac') || userAgent.includes('mac'))
    return 'macos'
  if (platform.includes('linux') || userAgent.includes('linux'))
    return 'linux'

  return 'undetermined'
}

/**
 * @returns Detected operating system, `undetermined` until mounted. Reactive, read-only.
 */
export function useOs() {
  const os = ref<OperatingSystem>('undetermined')

  tryOnMounted(() => {
    os.value = getOs()
  })

  return readonly(os)
}
