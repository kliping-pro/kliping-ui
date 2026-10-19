/**
 * Mencetak prop mana yang berubah setiap kali komponennya digambar ulang.
 *
 * Alat bantu saat mencari sebab komponen menggambar ulang lebih sering dari
 * yang masuk akal. Di Vue penyebabnya hampir selalu satu dari dua: sebuah prop
 * berupa objek atau larik yang dibuat baru di induknya pada tiap render, atau
 * sebuah fungsi inline yang identitasnya berganti terus.
 *
 * Hanya berbunyi saat `import.meta.env.DEV`. Itu bukan kehati-hatian berlebih —
 * composable ini akan ikut tersalin ke project orang, dan `console.log` yang
 * lolos ke produksi adalah kebocoran kecil yang menetap lama.
 *
 * Yang dikirim **harus reaktif**: objek `props` sebuah komponen, `reactive()`,
 * atau getter yang membaca keduanya. Objek biasa tidak punya apa pun untuk
 * dipantau, jadi composable ini akan diam selamanya — bukan karena tidak ada
 * yang berubah, melainkan karena perubahannya tidak bisa terlihat. Di dalam
 * komponen hal ini tidak pernah jadi soal, karena `props` memang selalu reaktif.
 */
import { watch } from 'vue'
import type { MaybeRefOrGetter } from 'vue'
import { toValue } from 'vue'

export type WatchedProps = Record<string, any>

/**
 * @param componentName Name shown in the console log.
 * @param props Props, or any object, to watch. May be a ref or getter.
 * @returns Nothing; logs changed keys to the console in development only.
 */
export function useWhyDidYouUpdate(
  componentName: string,
  props: MaybeRefOrGetter<WatchedProps>,
) {
  if (!import.meta.env.DEV)
    return

  let previous: WatchedProps = { ...toValue(props) }

  watch(
    () => ({ ...toValue(props) }),
    (current) => {
      const allKeys = new Set([
        ...Object.keys(previous),
        ...Object.keys(current),
      ])

      const changed: WatchedProps = {}
      for (const key of allKeys) {
        if (!Object.is(previous[key], current[key]))
          changed[key] = { from: previous[key], to: current[key] }
      }

      if (Object.keys(changed).length)
        console.log('[why-did-you-update]', componentName, changed)

      previous = current
    },
  )
}
