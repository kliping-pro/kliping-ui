/**
 * Layar penuh, dengan seluruh awalan vendor yang masih dibutuhkan.
 *
 * Ini composable terpanjang di registry, dan panjangnya bukan hiasan. Fullscreen
 * API punya empat nama berbeda untuk hal yang sama, dan Safari di iOS memakai
 * jalur yang sama sekali lain: metodenya ada di elemen `<video>`, bukan di
 * `document`. Setiap nama yang didaftar di bawah pernah jadi satu-satunya yang
 * bekerja di suatu peramban.
 *
 * Keadaannya **dibaca dari peramban lewat peristiwa**, bukan disimpan sendiri
 * saat `enter()` dipanggil. Itu wajib: orang bisa keluar dari layar penuh
 * dengan menekan Escape, dan tidak ada satu pun kode kita yang tahu itu terjadi
 * kecuali melalui `fullscreenchange`.
 */
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

/**
 * @param target Element, ref, or getter to show fullscreen. Default: the whole page.
 * @param options Exit when the scope is disposed.
 */
export function useFullscreen(
  target?: BasicTarget,
  options: UseFullscreenOptions = {},
) {
  const { autoExit = false } = options

  const isSupported = ref(false)
  const isFullscreen = ref(false)

  let enterMethod: string | undefined
  let exitMethod: string | undefined
  let activeProp: string | undefined
  let elementProp: string | undefined

  const element = (): any =>
    (getTargetElement(target) ?? (isBrowser ? document.documentElement : undefined))

  const find = (candidates: string[]) => {
    const el = element()
    return candidates.find(name =>
      (el && name in el) || (isBrowser && name in document),
    )
  }

  const detectSupport = () => {
    if (!isBrowser)
      return
    enterMethod = find(ENTER_METHODS)
    exitMethod = find(EXIT_METHODS)
    activeProp = find(ACTIVE_PROPS)
    elementProp = find(ELEMENT_PROPS)
    isSupported.value = Boolean(element() && enterMethod && exitMethod && activeProp)
  }

  // Apakah ada sesuatu — apa pun — yang sedang layar penuh.
  const anyFullscreen = (): boolean => {
    if (!activeProp || !isBrowser)
      return false

    const doc = document as any
    if (doc[activeProp] != null)
      return Boolean(doc[activeProp])

    // Safari di iOS menaruhnya di elemennya, bukan di document.
    const el = element()
    if (el && el[activeProp] != null)
      return Boolean(el[activeProp])

    return false
  }

  // Apakah yang sedang layar penuh adalah elemen kita.
  const ownElementFullscreen = (): boolean => {
    if (!elementProp || !isBrowser)
      return false
    return (document as any)[elementProp] === element()
  }

  const exit = async () => {
    if (!isSupported.value || !isFullscreen.value || !exitMethod)
      return

    const doc = document as any
    const el = element()

    if (doc[exitMethod] != null)
      await doc[exitMethod]()
    else if (el?.[exitMethod] != null)
      await el[exitMethod]()

    isFullscreen.value = false
  }

  const enter = async () => {
    if (!isSupported.value || isFullscreen.value)
      return

    // Peramban menolak permintaan kedua selagi yang pertama masih aktif, jadi
    // yang sedang berjalan dilepas dulu — termasuk kalau itu milik orang lain.
    if (anyFullscreen())
      await exit()

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
    // Hanya diikuti kalau tidak ada yang penuh sama sekali, atau yang penuh
    // memang elemen kita. Tanpa syarat itu, elemen lain yang masuk layar penuh
    // akan membuat composable ini ikut mengaku penuh.
    if (!full || ownElementFullscreen())
      isFullscreen.value = full
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
      if (autoExit)
        void exit()
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
