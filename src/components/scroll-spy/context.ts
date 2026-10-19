import type { ComputedRef } from 'vue'
import { createContext } from '@/lib/create-context'

export type ScrollSpyOrientation = 'horizontal' | 'vertical'

export interface ScrollSpyState {
  dir: 'ltr' | 'rtl'
  orientation: ScrollSpyOrientation
  /** The value of the section currently in view. */
  activeValue: string
}

export interface ScrollSpyContext {
  state: ComputedRef<ScrollSpyState>
  register: (value: string, el: HTMLElement) => void
  unregister: (value: string) => void
  /** Scrolls to a section and marks it active for the duration of the scroll. */
  scrollToSection: (value: string) => void
}

export const [provideScrollSpyContext, injectScrollSpyContext, injectScrollSpyContextOptional]
  = createContext<ScrollSpyContext>('ScrollSpy')
