import type { Ref } from 'vue'
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

/**
 * Tanda bahwa sebuah baris bisa digeser ke samping.
 *
 * Blok perintah menyembunyikan bilah gulirnya (seperti di shadcn-vue), jadi di
 * layar sempit perintah yang panjang tampak terpotong begitu saja. Fungsi ini
 * melaporkan apakah masih ada isi di kanan atau di kiri yang tersembunyi;
 * elemennya memakai `.kliping-fade-slide` dan atribut `data-fade`, dan CSS-nya
 * memudarkan tepi yang masih menyimpan isi. Pudarnya hilang begitu pembaca
 * menggeser sampai ujung — dan tidak pernah muncul kalau semuanya sudah muat.
 *
 * `content` dipantau supaya pudarnya dihitung ulang saat perintahnya berganti
 * (pnpm → npm membuat perintahnya lebih pendek atau lebih panjang).
 */
export function useFadeSlide(el: Ref<HTMLElement | undefined>, content?: Ref<unknown>) {
  const fade = ref<'' | 'right' | 'left' | 'both'>('')

  function measure() {
    const e = el.value
    if (!e)
      return
    const left = e.scrollLeft > 1
    const right = e.scrollLeft + e.clientWidth < e.scrollWidth - 1
    fade.value = left && right ? 'both' : right ? 'right' : left ? 'left' : ''
  }

  let observer: ResizeObserver | undefined
  onMounted(() => {
    measure()
    el.value?.addEventListener('scroll', measure, { passive: true })
    observer = new ResizeObserver(measure)
    if (el.value)
      observer.observe(el.value)
  })
  onBeforeUnmount(() => {
    el.value?.removeEventListener('scroll', measure)
    observer?.disconnect()
  })
  if (content)
    watch(content, () => requestAnimationFrame(measure), { flush: 'post' })

  return fade
}
