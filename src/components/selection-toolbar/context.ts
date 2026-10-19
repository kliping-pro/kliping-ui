import type { ComputedRef } from 'vue'
import { createContext } from '@/lib/create-context'

export interface SelectionToolbarContext {
  /** The currently selected text. */
  text: string
  open: boolean
  close: () => void
}

export const [provideSelectionToolbarContext, injectSelectionToolbarContext, injectSelectionToolbarContextOptional]
  = createContext<ComputedRef<SelectionToolbarContext>>('SelectionToolbar')
