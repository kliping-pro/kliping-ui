import type { ComputedRef } from 'vue'
import type { Country } from './countries'
import { createContext } from '@/lib/create-context'

export interface PhoneInputState {
  countries: Country[]
  selected: Country | undefined
  disabled: boolean
  readonly: boolean
  required: boolean
  invalid: boolean
  showFlag: boolean
  placeholder: string
}

export interface PhoneInputContext {
  state: ComputedRef<PhoneInputState>
  selectCountry: (code: string) => void
  setNumber: (digits: string) => void
  /** The number without its dialing code, as shown in the input. */
  localNumber: ComputedRef<string>
}

export const [providePhoneInputContext, injectPhoneInputContext, injectPhoneInputContextOptional] = createContext<PhoneInputContext>('PhoneInput')
