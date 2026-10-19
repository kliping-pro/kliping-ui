export type { PhoneInputContext, PhoneInputState } from './context'
export { injectPhoneInputContext } from './context'
export type { Country } from './countries'
export { getCountries, getCountryName, getFlag, guessCountry, stripDialCode } from './countries'
export { COUNTRY_DATA } from './country-data'

export { default as PhoneInput } from './PhoneInput.vue'
export { default as PhoneInputCountrySelect } from './PhoneInputCountrySelect.vue'
export { default as PhoneInputField } from './PhoneInputField.vue'
