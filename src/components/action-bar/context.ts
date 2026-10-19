import type { ComputedRef } from 'vue'
import { createContext } from '@/lib/create-context'

export type ActionBarDirection = 'ltr' | 'rtl'
export type ActionBarOrientation = 'horizontal' | 'vertical'

export interface ActionBarContext {
  dir: ActionBarDirection
  orientation: ActionBarOrientation
  loop: boolean
  /** Closes the bar. Called by `ActionBarClose` and by each item after selection. */
  close: () => void
}

export const [provideActionBarContext, injectActionBarContext, injectActionBarContextOptional]
  = createContext<ComputedRef<ActionBarContext>>('ActionBar')
