<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { Country } from './countries'
import { Primitive } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { providePhoneInputContext } from './context'
import { getCountries, guessCountry, stripDialCode } from './countries'

/**
 * Masukan nomor telepon internasional.
 *
 * `v-model` menyimpan nomor lengkap berawalan `+` — satu nilai, bukan
 * sepasang negara-dan-nomor. Itu bentuk yang benar untuk disimpan: nomor
 * telepon internasional memang satu string, dan memisahkannya berarti
 * pemakainya harus menyatukannya kembali di setiap tempat.
 *
 * Negaranya dibaca dari nomornya, bukan disimpan terpisah. Menempel nomor
 * lengkap dari mana pun langsung memilih benderanya sendiri.
 */
const props = withDefaults(defineProps<PrimitiveProps & {
  /** The initial country while the number is still empty. */
  defaultCountry?: string
  /** A custom country list, when not all of them are needed. */
  countries?: Country[]
  /** The locale for country names; defaults to Indonesian (`id`). */
  locale?: string
  /** Placeholder for the local number field. */
  placeholder?: string
  name?: string
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  /** Marks the input invalid: destructive border and aria-invalid on the number field. */
  invalid?: boolean
  /** Shows the selected country's flag in the country select. */
  showFlag?: boolean
  class?: HTMLAttributes['class']
}>(), {
  defaultCountry: 'ID',
  placeholder: '812 3456 7890',
  showFlag: true,
})

const model = defineModel<string>({ default: '' })

const emit = defineEmits<{
  /** The country changed, with its ISO code. */
  countryChange: [code: string]
}>()

const countries = computed(() => props.countries ?? getCountries(props.locale))

const selected = computed(() =>
  guessCountry(model.value, countries.value)
  ?? countries.value.find(n => n.code === props.defaultCountry.toUpperCase()))

const localNumber = computed(() => stripDialCode(model.value, selected.value))

function selectCountry(code: string) {
  const next = countries.value.find(n => n.code === code)
  if (!next) return

  // Nomor lokalnya dipertahankan, cuma kode negaranya yang berganti — orang
  // yang salah memilih negara tidak seharusnya kehilangan nomor yang sudah
  // diketiknya.
  model.value = `${next.dialCode}${localNumber.value}`
  emit('countryChange', code)
}

function setNumber(digits: string) {
  const cleaned = digits.replace(/\D/g, '')
  model.value = selected.value ? `${selected.value.dialCode}${cleaned}` : `+${cleaned}`
}

providePhoneInputContext({
  state: computed(() => ({
    countries: countries.value,
    selected: selected.value,
    disabled: props.disabled ?? false,
    readonly: props.readonly ?? false,
    required: props.required ?? false,
    invalid: props.invalid ?? false,
    showFlag: props.showFlag,
    placeholder: props.placeholder,
  })),
  selectCountry,
  setNumber,
  localNumber,
})
</script>

<template>
  <Primitive
    :as="props.as"
    :as-child="props.asChild"
    :class="cn(
      'flex h-9 w-full items-center rounded-md border border-input bg-transparent shadow-xs transition-[color,box-shadow] focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50',
      props.invalid && 'border-destructive ring-destructive/20 dark:ring-destructive/40',
      props.disabled && 'pointer-events-none opacity-50',
      props.class,
    )"
    :data-disabled="props.disabled ? '' : undefined"
    :data-invalid="props.invalid ? '' : undefined"
    data-slot="phone-input"
  >
    <slot />
    <input :name="props.name" type="hidden" :value="model">
  </Primitive>
</template>
