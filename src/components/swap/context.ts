import type { ComputedRef } from 'vue'
import { createContext } from '@/lib/create-context'

export interface SwapContext {
  swapped: boolean
}

export const [provideSwapContext, injectSwapContext, injectSwapContextOptional] = createContext<ComputedRef<SwapContext>>('Swap')

/** The state as text, used by `data-[state=...]` selectors in Tailwind classes. */
export const getSwapState = (swapped: boolean) => (swapped ? 'on' : 'off')
