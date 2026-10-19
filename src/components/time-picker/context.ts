import type { TimeValue } from 'reka-ui'
import type { ComputedRef } from 'vue'
import { createContext } from '@/lib/create-context'

export type TimeUnit = 'hour' | 'minute' | 'second' | 'period'

export interface TimePickerState {
  value: TimeValue | null
  /** 12 or 24, following the locale when not set. */
  hourCycle: 12 | 24 | undefined
  granularity: 'hour' | 'minute' | 'second'
  /** The step of each unit in its option list. */
  step: { hour: number, minute: number, second: number }
  disabled: boolean
  readonly: boolean
}

export interface TimePickerContext {
  state: ComputedRef<TimePickerState>
  setUnit: (unit: TimeUnit, value: number) => void
  clear: () => void
}

export const [provideTimePickerContext, injectTimePickerContext, injectTimePickerContextOptional] = createContext<TimePickerContext>('TimePicker')

export interface TimePickerColumnContext {
  unit: TimeUnit
}

export const [provideTimePickerColumnContext, injectTimePickerColumnContext, injectTimePickerColumnContextOptional]
  = createContext<ComputedRef<TimePickerColumnContext>>('TimePickerColumn')
