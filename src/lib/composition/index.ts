/**
 * Pembantu untuk menggabungkan penangan peristiwa dan ref.
 *
 * Setengah dari utilitas ini tidak terbawa dari React, dan itu bukan
 * kelalaian. `useComposedRefs` ada di sana untuk menyatukan ref yang
 * diteruskan `forwardRef` dengan ref lokal sebuah komponen — dan Vue 3.5
 * tidak punya `forwardRef` sama sekali: ref diteruskan sebagai prop biasa.
 *
 * Yang tetap punya guna dua hal. `composeEventHandlers` masih diperlukan
 * karena Vue pun tidak menggabungkan penangan bawaan komponen dengan
 * penangan pemakainya. Dan `composeRefs` masih diperlukan saat satu elemen
 * harus tercatat di beberapa tempat sekaligus — misalnya ref templat lokal
 * sekaligus ref yang dibagikan lewat `provide`.
 */
import type { ComponentPublicInstance, Ref } from 'vue'

/**
 * Apa saja yang bisa menampung sebuah elemen.
 *
 * Sengaja selebar tipe yang diterima `:ref` milik Vue, bukan `HTMLElement`.
 * `:ref` boleh menerima elemen DOM maupun instance komponen, dan fungsi yang
 * cuma menerima `HTMLElement` tidak sah dipasang di sana — TypeScript menolak
 * fungsi yang parameternya lebih sempit dari yang dijanjikan pemanggilnya.
 */
type RefTarget = Element | ComponentPublicInstance | null

type PossibleRef<T extends RefTarget = RefTarget> =
  | Ref<T | null>
  | ((value: T | null) => void)
  | null
  | undefined

/**
 * Menyetel satu nilai ke ref, apa pun bentuknya.
 *
 * Vue mengenal dua bentuk ref templat: `ref()` biasa dan fungsi. Keduanya
 * diterima `:ref`, jadi keduanya harus ditangani.
 */
function setRef<T extends RefTarget>(ref: PossibleRef<T>, value: T | null) {
  if (typeof ref === 'function') {
    ref(value)
    return
  }
  if (ref) ref.value = value
}

/**
 * Menggabungkan beberapa ref jadi satu penangan yang bisa dipasang ke `:ref`.
 *
 * Harus disusun di dalam `<script setup>`, bukan langsung di templat:
 *
 * ```vue
 * <script setup>
 * const attach = composeRefs(localRef, sharedRef)
 * <\/script>
 *
 * <template>
 *   <div :ref="attach" />
 * </template>
 * ```
 *
 * Ungkapan di dalam templat sudah membuka bungkus ref-nya. Ditulis di sana,
 * yang diterima fungsi ini nilai elemennya — bukan wadahnya — dan tidak ada
 * satu pun ref yang benar-benar terisi. Tidak ada galat yang muncul dari itu.
 */
export function composeRefs<T extends RefTarget = RefTarget>(...refs: PossibleRef<T>[]) {
  return (value: RefTarget) => {
    for (const ref of refs) setRef(ref, value as T | null)
  }
}

/**
 * Menggabungkan penangan peristiwa pemakai dengan penangan bawaan komponen.
 *
 * Penangan pemakainya jalan lebih dulu, dan yang bawaan dilewati kalau
 * peristiwanya sudah dicegah — itu yang membuat `@click.prevent` dari luar
 * benar-benar membatalkan perilaku bawaan, bukan cuma menambah satu panggilan
 * di depannya.
 *
 * `checkForDefaultPrevented: false` memaksa yang bawaan tetap jalan, untuk perilaku
 * yang memang tidak boleh dibatalkan.
 */
export function composeEventHandlers<E extends Event>(
  originalHandler: ((event: E) => void) | undefined,
  ourHandler: (event: E) => void,
  { checkForDefaultPrevented = true }: { checkForDefaultPrevented?: boolean } = {},
) {
  return (event: E) => {
    originalHandler?.(event)
    if (checkForDefaultPrevented && event.defaultPrevented) return
    ourHandler(event)
  }
}
