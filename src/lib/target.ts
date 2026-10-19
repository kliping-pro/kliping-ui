/**
 * Membaca sebuah elemen DOM dari bentuk apa pun yang wajar dikirim orang.
 *
 * Targetnya boleh datang dalam empat bentuk: elemennya langsung, `ref` ke
 * elemen, `ref` ke instance komponen, atau getter yang mengembalikan salah
 * satunya.
 *
 * `toValue()` sudah menyelesaikan ref dan getter sekaligus, jadi yang tersisa
 * untuk ditangani di sini cuma satu: instance komponen, yang menyimpan elemen
 * akarnya di `$el`. Menyerahkan `useTemplateRef()` yang menunjuk komponen — bukan
 * elemen — adalah kesalahan paling sering terjadi, dan tanpa penanganan ini
 * pendengarnya diam-diam terpasang di objek yang tidak punya `addEventListener`.
 */
import { toValue } from 'vue'
import type { ComponentPublicInstance, MaybeRefOrGetter } from 'vue'

export type TargetType = HTMLElement | SVGElement | Element | Window | Document

export type TargetValue =
  | TargetType
  | ComponentPublicInstance
  | null
  | undefined

/** An element, a component instance, a `ref` to either, or a getter returning one. */
export type BasicTarget = MaybeRefOrGetter<TargetValue>

/**
 * @param target Element, component instance, ref, or getter.
 * @returns The DOM element (a component's root element), or `undefined`.
 */
export function getTargetElement(target?: BasicTarget): TargetType | undefined {
  const value = toValue(target)
  if (value == null)
    return undefined

  // Instance komponen menyimpan elemen akarnya di `$el`. Elemen biasa, `window`,
  // dan `document` tidak punya properti itu, jadi keduanya lewat apa adanya.
  const element = (value as ComponentPublicInstance).$el ?? value
  return (element as TargetType | null) ?? undefined
}
