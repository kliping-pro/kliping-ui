<script setup lang="ts">
import { ref } from 'vue'
import {
  PhoneInput,
  PhoneInputCountrySelect,
  PhoneInputField,
} from '@/components/phone-input'
import { Label } from '@/components/ui/label'

const phone = ref('+14155552671')
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-2">
    <Label>Phone number</Label>
    <PhoneInput v-model="phone" name="phone">
      <PhoneInputCountrySelect />
      <PhoneInputField />
    </PhoneInput>
    <p class="text-muted-foreground text-sm">
      Stored value: <code>{{ phone || '—' }}</code>
    </p>
    <p class="text-muted-foreground text-sm">
      Paste a full number from another country — the flag switches on its own.
    </p>
  </div>
</template>
