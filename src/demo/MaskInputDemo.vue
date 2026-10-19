<script setup lang="ts">
import { ref } from 'vue'
import { MaskInput } from '@/components/mask-input'
import { Label } from '@/components/ui/label'

const phone = ref('')
const nationalId = ref('')
const birthDate = ref('')
const cardNumber = ref('')

const isCardValid = ref(true)
</script>

<template>
  <div class="grid w-full max-w-sm gap-4">
    <div class="grid gap-1.5">
      <Label>Phone number</Label>
      <MaskInput v-model="phone" inputmode="tel" mask="phone" />
    </div>

    <div class="grid gap-1.5">
      <Label>National ID (NIK)</Label>
      <MaskInput v-model="nationalId" inputmode="numeric" mask="nik" />
    </div>

    <div class="grid gap-1.5">
      <Label>Date of birth</Label>
      <MaskInput v-model="birthDate" inputmode="numeric" mask="date" />
    </div>

    <div class="grid gap-1.5">
      <Label>Card number</Label>
      <MaskInput v-model="cardNumber" inputmode="numeric" mask="card" @validate="valid => isCardValid = valid" />
      <p class="text-muted-foreground text-xs">
        {{ cardNumber.length === 16 ? (isCardValid ? 'The card number passes the Luhn check.' : 'The card number fails the Luhn check.') : 'Stored value, without separators: ' + (cardNumber || '—') }}
      </p>
    </div>
  </div>
</template>
