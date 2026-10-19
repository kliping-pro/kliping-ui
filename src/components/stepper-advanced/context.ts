import type { ComputedRef } from 'vue'
import { createContext } from '@/lib/create-context'

export type StepperOrientation = 'horizontal' | 'vertical'

export interface StepperContext {
  orientation: StepperOrientation
}

export const [provideStepperContext, injectStepperContext, injectStepperContextOptional] = createContext<ComputedRef<StepperContext>>('Stepper')
