import type { ComputedRef, Ref } from 'vue'
import { createContext } from '@/lib/create-context'

export type StackSide = 'top' | 'bottom'

export interface StackState {
  side: StackSide
  /** How many cards are actually inside. */
  childrenCount: number
  /** How many are visible while collapsed. */
  itemCount: number
  /** How many are visible while expanded. */
  expandedItemCount: number
  gap: number
  scale: number
  offset: number
  isExpanded: boolean
}

export interface StackItemSize {
  itemId: number
  size: number
}

export interface StackContext {
  state: ComputedRef<StackState>
  // Tinggi asli tiap kartu, dikumpulkan anak-anaknya sendiri.
  //
  // Diperlukan karena saat merenggang tiap kartu harus digeser sejauh jumlah
  // tinggi kartu-kartu di atasnya — dan tinggi itu tidak diketahui sebelum
  // kartunya benar-benar tergambar.
  /** The natural height of each card, collected by the cards themselves. */
  sizes: Ref<StackItemSize[]>
}

export const [provideStackContext, injectStackContext, injectStackContextOptional]
  = createContext<StackContext>('Stack')

/** The state as text, used by `data-[state=...]` selectors. */
export const getStackState = (expanded: boolean) => (expanded ? 'expanded' : 'collapsed')
