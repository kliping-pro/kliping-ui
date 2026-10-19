<!-- example: 1. Custom Countries -->
<script setup lang="ts">
import type { Country } from '@/components/phone-input'
import { ref } from 'vue'
import { PhoneInput, PhoneInputCountrySelect, PhoneInputField } from '@/components/phone-input'

// Hanya negara yang dibutuhkan; daftarnya menggantikan daftar lengkap.
const northAmericanCountries: Country[] = [
  { code: 'US', name: 'United States', dialCode: '+1', flag: '🇺🇸' },
  { code: 'CA', name: 'Canada', dialCode: '+1', flag: '🇨🇦' },
  { code: 'MX', name: 'Mexico', dialCode: '+52', flag: '🇲🇽' },
  { code: 'BR', name: 'Brazil', dialCode: '+55', flag: '🇧🇷' },
]

const phone = ref('+14085551234')
</script>

<template>
  <PhoneInput
    v-model="phone"
    default-country="US"
    :countries="northAmericanCountries"
    placeholder="Type phone number"
    class="w-full max-w-sm"
  >
    <PhoneInputCountrySelect />
    <PhoneInputField />
  </PhoneInput>
</template>
