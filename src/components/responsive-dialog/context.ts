import type { ComputedRef } from 'vue'
import { createContext } from '@/lib/create-context'

export interface ResponsiveDialogContext {
  /** True on narrow screens, where a drawer is used instead of a dialog. */
  isMobile: boolean
}

export const [provideResponsiveDialogContext, injectResponsiveDialogContext, injectResponsiveDialogContextOptional]
  = createContext<ComputedRef<ResponsiveDialogContext>>('ResponsiveDialog')
