/**
 * Menjalankan sesuatu ketika kliknya jatuh di luar sekumpulan elemen.
 *
 * Ini yang menutup dropdown, popover, dan menu ketika orang menekan tempat
 * lain. Terdengar sepele, tapi ada dua hal yang selalu salah kalau ditulis
 * dadakan dengan `document.addEventListener('click', …)`:
 *
 * 1. **Target yang belum ada.** Elemen yang dipantau baru muncul setelah
 *    komponennya terpasang. Pendengar yang dipasang lebih dulu akan menganggap
 *    setiap klik jatuh "di luar" — termasuk klik yang membuka menunya sendiri.
 *    Di sini targetnya boleh berupa `ref` yang masih kosong, dan elemen yang
 *    belum ada dianggap belum siap, bukan dianggap di luar.
 * 2. **Shadow DOM.** `event.target` di dalam shadow root sudah diretarget saat
 *    peristiwanya sampai ke `document`, jadi `contains()` selalu bilang tidak.
 *    Kalau semua targetnya tinggal di dalam shadow root yang sama, pendengarnya
 *    dipasang di root itu, bukan di `document` — sama seperti sumbernya.
 */
import { getCurrentScope, onScopeDispose, watch } from 'vue'
import { getTargetElement } from '@/lib/target'
import { isBrowser } from '@/lib/is-browser'
import type { BasicTarget } from '@/lib/target'

/**
 * @param onClickAway Called when the event happens outside every target.
 * @param target Element, ref, or getter — or a list of them — that count as inside.
 * @param eventName Event or events to listen for. Default: `click`.
 * @returns Stops listening.
 */
export function useClickAway<T extends Event = Event>(
  onClickAway: (event: T) => void,
  target: BasicTarget | BasicTarget[],
  eventName: string | string[] = 'click',
) {
  const eventNames = Array.isArray(eventName) ? eventName : [eventName]

  const allTargets = () => {
    const targets = Array.isArray(target) ? target : [target]
    return targets.map(t => getTargetElement(t))
  }

  // Tempat pendengarnya dipasang: shadow root kalau seluruh targetnya tinggal
  // di sana, `document` kalau tidak.
  const listenerRoot = (elements: (Element | Node | undefined)[]): Document | Node => {
    const present = elements.filter(Boolean) as Element[]
    if (!present.length)
      return document

    const allInShadow = present.every(el =>
      typeof el.getRootNode === 'function' && el.getRootNode() instanceof ShadowRoot,
    )
    return allInShadow ? present[0].getRootNode() : document
  }

  let detach: (() => void) | undefined

  const teardown = () => {
    detach?.()
    detach = undefined
  }

  const stopWatch = watch(
    () => allTargets(),
    (elements) => {
      teardown()
      if (!isBrowser)
        return

      const root = listenerRoot(elements as Element[])

      const handler = (event: Event) => {
        const current = allTargets()

        // Elemen yang belum ada berarti belum siap dinilai. Menganggapnya "di
        // luar" akan menutup menu tepat pada klik yang membukanya.
        const inside = current.some((el) => {
          if (!el)
            return true
          return 'contains' in el && el.contains(event.target as Node)
        })

        if (!inside)
          onClickAway(event as T)
      }

      for (const name of eventNames)
        root.addEventListener(name, handler)

      detach = () => {
        for (const name of eventNames)
          root.removeEventListener(name, handler)
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

  return stop
}
