/**
 * Judul halaman, yang bisa dibaca dan ditulis.
 *
 * `observe` menyalakan pengamatan terhadap perubahan dari luar — kode lain,
 * ekstensi, atau router yang menyetelnya sendiri. Mati secara bawaan, sama
 * seperti sumbernya: satu `MutationObserver` di `<head>` bukan biaya yang
 * pantas dibayar setiap halaman kalau tidak ada yang benar-benar
 * membutuhkannya.
 *
 * Judul yang ditulis sendiri diingat, supaya pengamatnya tidak menganggap
 * tulisan sendiri sebagai perubahan dari luar lalu memantulkannya kembali.
 */
import { getCurrentScope, onScopeDispose, ref, toValue, watch } from 'vue'
import type { MaybeRefOrGetter, Ref } from 'vue'
import { isBrowser } from '@/lib/is-browser'
import { tryOnMounted } from '@/lib/try-on-mounted'

export interface UseTitleOptions {
  /** Track title changes made elsewhere. Default: false. */
  observe?: boolean
  /** Template for the final title; `%s` is replaced with the title, or pass a function. */
  titleTemplate?: string | ((title: string) => string)
}

function createFormatter(template?: string | ((title: string) => string)) {
  if (typeof template === 'function')
    return template
  if (typeof template === 'string' && template.includes('%s'))
    return (title: string) => template.replaceAll('%s', title)
  return (title: string) => title
}

/**
 * @param newTitle Title to set. May be a ref or getter.
 * @param options Observation and template settings.
 * @returns Current document title; writing to it updates the page. Reactive.
 */
export function useTitle(
  newTitle?: MaybeRefOrGetter<string | null | undefined>,
  options: UseTitleOptions = {},
) {
  const { observe = false, titleTemplate } = options
  const format = createFormatter(titleTemplate)

  const title = ref(
    toValue(newTitle) ?? (isBrowser ? document.title : ''),
  ) as Ref<string>

  // Judul terakhir yang ditulis dari sini. Pengamat memakainya untuk
  // membedakan tulisan sendiri dari perubahan yang datang dari luar.
  let lastWritten: string | null = null

  watch(
    () => toValue(newTitle),
    (next) => {
      if (next != null && next !== title.value)
        title.value = next
    },
  )

  watch(
    title,
    (next) => {
      if (!isBrowser)
        return
      const formatted = format(next)
      lastWritten = formatted
      if (document.title !== formatted)
        document.title = formatted
    },
    { immediate: true },
  )

  let observer: MutationObserver | undefined

  tryOnMounted(() => {
    if (!observe || typeof MutationObserver === 'undefined')
      return

    const target = document.head ?? document.documentElement
    if (!target)
      return

    observer = new MutationObserver(() => {
      const current = document.title
      if (lastWritten === current || title.value === current)
        return
      title.value = current
    })

    observer.observe(target, { childList: true, subtree: true, characterData: true })
  })

  if (getCurrentScope())
    onScopeDispose(() => observer?.disconnect())

  return title
}
