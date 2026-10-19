import { computed, useId } from 'vue'

/**
 * Menyusun atribut untuk elemen yang sedang menunggu.
 *
 * Cara paling mudah menonaktifkan tombol selama permintaan berjalan adalah
 * `disabled`, dan itu justru merugikan: elemen yang `disabled` kehilangan
 * fokus papan ketik, dan pembaca layar berhenti mengumumkannya. Pemakai yang
 * menekan tombol lalu menekannya lagi tidak mendapat kabar apa pun tentang
 * apa yang sedang terjadi.
 *
 * Yang dilakukan di sini menirukan Button milik React Aria: elemennya tetap
 * bisa difokus dan tetap terbaca, tapi seluruh peristiwa yang mengaktifkannya
 * dicegat, dan keadaannya diumumkan lewat `aria-busy` dan `aria-disabled`.
 *
 * @see https://github.com/adobe/react-spectrum/blob/main/packages/react-aria-components/src/Button.tsx
 */
export interface PendingOptions {
  id?: string
  isPending?: boolean
  disabled?: boolean
}

export function usePending(options: () => PendingOptions = () => ({})) {
  const defaultId = useId()

  const pendingProps = computed(() => {
    const { id, isPending = false, disabled = false } = options()

    const attrs: Record<string, unknown> = { id: id || defaultId }

    if (isPending) {
      attrs['aria-busy'] = 'true'
      attrs['aria-disabled'] = 'true'
      attrs['data-pending'] = ''

      const prevent = (event: Event) => event.preventDefault()
      const preventKey = (event: KeyboardEvent) => {
        if (event.key === 'Enter' || event.key === ' ') event.preventDefault()
      }

      attrs.onClick = prevent
      attrs.onPointerdown = prevent
      attrs.onPointerup = prevent
      attrs.onMousedown = prevent
      attrs.onMouseup = prevent
      attrs.onKeydown = preventKey
      attrs.onKeyup = preventKey
    }

    if (disabled) attrs['data-disabled'] = ''

    return attrs
  })

  return {
    pendingProps,
    isPending: computed(() => options().isPending ?? false),
  }
}
