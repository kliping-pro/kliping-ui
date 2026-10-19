/**
 * Mengunci gulungan halaman — untuk dialog, drawer, dan menu layar penuh.
 *
 * Bagian yang paling sering dilupakan bukan penguncian, melainkan **lebar yang
 * melompat**. Menyembunyikan bilah gulung membuat halaman melebar beberapa
 * belas piksel, dan seluruh isinya bergeser tepat saat dialognya muncul.
 * Karena itu lebar bilah gulungnya dihitung lalu dititipkan sebagai
 * `padding-right`, dan halamannya diam.
 *
 * Gaya aslinya disimpan sebelum diubah, bukan disetel ke nilai bawaan saat
 * dilepas. Elemen yang sudah punya `overflow` atau `padding-right` sendiri
 * mendapatkannya kembali utuh.
 */
import { getCurrentScope, onScopeDispose, readonly, ref } from 'vue'
import { isBrowser } from '@/lib/is-browser'
import { tryOnMounted } from '@/lib/try-on-mounted'

export interface UseScrollLockOptions {
  /** Lock as soon as the composable is called. Default: true. */
  autoLock?: boolean
  /** Element to lock, or its CSS selector. Default: `document.body`. */
  lockTarget?: HTMLElement | string
  /** Add the scrollbar width as padding so the content does not shift. Default: true. */
  widthReflow?: boolean
}

/**
 * @param options Lock settings.
 */
export function useScrollLock(options: UseScrollLockOptions = {}) {
  const { autoLock = true, lockTarget, widthReflow = true } = options

  const isLocked = ref(false)
  let target: HTMLElement | null = null
  let originalStyle: { overflow: string, paddingRight: string } | null = null

  const findTarget = (): HTMLElement | null => {
    if (!isBrowser)
      return null
    if (typeof lockTarget === 'string')
      return document.querySelector<HTMLElement>(lockTarget)
    return lockTarget ?? document.body
  }

  const lock = () => {
    target ??= findTarget()
    if (!target || isLocked.value)
      return

    originalStyle = {
      overflow: target.style.overflow,
      paddingRight: target.style.paddingRight,
    }

    if (widthReflow) {
      // `document.body` diukur dengan lebar jendela, bukan lebar dirinya:
      // bilah gulung global tidak dihitung sebagai bagian dari dokumen.
      const fullWidth = target === document.body
        ? window.innerWidth
        : target.offsetWidth

      const currentPadding = Number.parseInt(
        window.getComputedStyle(target).paddingRight,
        10,
      ) || 0

      const scrollbarWidth = fullWidth - target.scrollWidth
      target.style.paddingRight = `${scrollbarWidth + currentPadding}px`
    }

    target.style.overflow = 'hidden'
    isLocked.value = true
  }

  const unlock = () => {
    if (target && originalStyle) {
      target.style.overflow = originalStyle.overflow
      if (widthReflow)
        target.style.paddingRight = originalStyle.paddingRight
    }
    originalStyle = null
    isLocked.value = false
  }

  tryOnMounted(() => {
    target = findTarget()
    if (autoLock)
      lock()
  })

  if (getCurrentScope())
    onScopeDispose(unlock)

  return {
    /** Whether scrolling is locked. Reactive. */
    isLocked: readonly(isLocked),
    /** Locks scrolling on the target. */
    lock,
    /** Restores the target's original overflow and padding. */
    unlock,
  }
}
