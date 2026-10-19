/**
 * Menahan sebuah wadah gulung tetap menempel di dasarnya saat isinya bertambah.
 *
 * Ini yang membuat jendela obrolan terasa benar: pesan baru muncul dan
 * pandangannya ikut turun — **kecuali** kalau orangnya sedang menggulung ke
 * atas membaca yang lama. Menariknya kembali ke bawah saat itu adalah salah
 * satu hal paling menjengkelkan yang bisa dilakukan sebuah antarmuka.
 *
 * Tidak ada padanan Vue untuk paket `use-stick-to-bottom` yang dipakai
 * sumbernya, jadi ini ditulis sendiri. Bahannya sudah ada di repo ini —
 * `src/components/ui/message-scroller/` melakukan hal yang sama di dalam
 * komponen; yang dikerjakan di sini adalah mengangkat logikanya keluar supaya
 * bisa dipakai wadah gulung apa pun.
 *
 * Ambang toleransinya ada karena `scrollTop` pecahan. Peramban melaporkan
 * angka seperti `1247.3999` untuk posisi yang secara visual sudah mentok, dan
 * perbandingan persis tidak akan pernah benar.
 */
import { getCurrentScope, onScopeDispose, readonly, ref, watch } from 'vue'
import { getTargetElement } from '@/lib/target'
import { useEventListener } from '@/composables/use-event-listener'
import type { BasicTarget } from '@/lib/target'

export interface UseStickToBottomOptions {
  /** Distance in pixels from the bottom that still counts as "at the bottom". Default: 24. */
  threshold?: number
  /** Scroll behavior used when auto-sticking. Default: `'smooth'`. */
  behavior?: ScrollBehavior
}

/**
 * @param target Scrollable element to keep at the bottom.
 * @param options Follow settings.
 */
export function useStickToBottom(
  target: BasicTarget,
  options: UseStickToBottomOptions = {},
) {
  const { threshold = 24, behavior = 'smooth' } = options

  const isAtBottom = ref(true)
  /** Whether the view is pinned to the bottom; turns off when the user scrolls up. */
  const sticky = ref(true)

  let resizeObserver: ResizeObserver | undefined
  let mutationObserver: MutationObserver | undefined

  const container = () => getTargetElement(target) as HTMLElement | undefined

  const updatePosition = () => {
    const el = container()
    if (!el)
      return
    const distance = el.scrollHeight - el.scrollTop - el.clientHeight
    isAtBottom.value = distance <= threshold
  }

  const scrollToBottom = (scrollBehavior: ScrollBehavior = behavior) => {
    const el = container()
    if (!el)
      return
    el.scrollTo({ top: el.scrollHeight, behavior: scrollBehavior })
    sticky.value = true
    isAtBottom.value = true
  }

  // Gulungan yang dipicu `scrollTo` sendiri juga membangkitkan peristiwa
  // `scroll`. Tanpa penanda ini, gulungan otomatis akan terbaca sebagai
  // gulungan manual dan langsung melepas penempelannya sendiri.
  let isAutoScrolling = false

  useEventListener('scroll', () => {
    updatePosition()
    if (!isAutoScrolling)
      sticky.value = isAtBottom.value
  }, { target, passive: true })

  const followBottom = () => {
    if (!sticky.value)
      return
    isAutoScrolling = true
    scrollToBottom()
    // Dilepas di tugas berikutnya, setelah peristiwa scroll-nya lewat.
    setTimeout(() => {
      isAutoScrolling = false
    }, 0)
  }

  const teardown = () => {
    resizeObserver?.disconnect()
    mutationObserver?.disconnect()
    resizeObserver = undefined
    mutationObserver = undefined
  }

  const stopWatch = watch(
    () => container(),
    (el) => {
      teardown()
      if (!el)
        return

      updatePosition()

      // Dua pengamat, karena isinya bisa bertambah dengan dua cara: elemen baru
      // disisipkan, atau elemen yang sudah ada berubah tinggi — gambar yang
      // selesai dimuat, teks yang membungkus ulang.
      if (typeof ResizeObserver !== 'undefined') {
        resizeObserver = new ResizeObserver(followBottom)
        resizeObserver.observe(el)
        for (const child of Array.from(el.children))
          resizeObserver.observe(child)
      }

      if (typeof MutationObserver !== 'undefined') {
        mutationObserver = new MutationObserver(() => {
          if (resizeObserver) {
            for (const child of Array.from(el.children))
              resizeObserver.observe(child)
          }
          followBottom()
        })
        mutationObserver.observe(el, { childList: true, subtree: true, characterData: true })
      }
    },
    { immediate: true, flush: 'post' },
  )

  const stop = () => {
    teardown()
    stopWatch()
  }

  if (getCurrentScope())
    onScopeDispose(stop)

  return {
    /** Whether the scroll position is at the bottom. Reactive. */
    isAtBottom: readonly(isAtBottom),
    /** Whether new content will keep it pinned to the bottom; turns off when the user scrolls up. Reactive. */
    isSticky: readonly(sticky),
    /** Scrolls to the bottom and re-enables sticking. */
    scrollToBottom,
    /** Stops observing the element. */
    stop: stop,
  }
}
