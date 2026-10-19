import type { ComputedRef, Ref } from 'vue'
import { createContext } from '@/lib/create-context'

export type SpeedDialSide = 'top' | 'bottom' | 'left' | 'right'
export type SpeedDialActivationMode = 'click' | 'hover'

export interface SpeedDialState {
  side: SpeedDialSide
  open: boolean
  disabled: boolean
  activationMode: SpeedDialActivationMode
  /** The delay between actions while expanding, in milliseconds. */
  delay: number
}

export interface SpeedDialContext {
  state: ComputedRef<SpeedDialState>
  open: () => void
  close: () => void
  toggle: () => void
  /** The registered actions, in source order. */
  actions: Ref<string[]>
  register: (id: string) => void
  unregister: (id: string) => void
}

export const [provideSpeedDialContext, injectSpeedDialContext, injectSpeedDialContextOptional]
  = createContext<SpeedDialContext>('SpeedDial')

export interface SpeedDialItemContext {
  /** The delay before this action appears, already adjusted for the expand direction. */
  delay: number
  labelId: string
}

export const [provideSpeedDialItemContext, injectSpeedDialItemContext, injectSpeedDialItemContextOptional] = createContext<ComputedRef<SpeedDialItemContext>>('SpeedDialItem')
