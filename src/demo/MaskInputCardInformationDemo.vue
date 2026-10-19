<!-- example: 3. Card information -->
<script setup lang="ts">
import { ref } from 'vue'
import type { MaskPattern } from '@/components/mask-input'
import { MaskInput } from '@/components/mask-input'
import { Label } from '@/components/ui/label'

const expiryPattern: MaskPattern = {
  pattern: '##/##',
  validate: (value) => {
    const month = Number(value.slice(0, 2))
    return value.length === 4 && month >= 1 && month <= 12
  },
}

const cvcPattern: MaskPattern = {
  pattern: '###',
  validate: value => value.length === 3,
}

const cardNumber = ref('')
const expiry = ref('')
const cvc = ref('')
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-4">
    <div class="flex flex-col gap-2">
      <Label for="card-number">Card number</Label>
      <MaskInput id="card-number" v-model="cardNumber" mask="card" inputmode="numeric" placeholder="1234 1234 1234 1234" />
    </div>
    <div class="grid grid-cols-2 gap-4">
      <div class="flex flex-col gap-2">
        <Label for="card-expiry">Expiry date</Label>
        <MaskInput id="card-expiry" v-model="expiry" :mask="expiryPattern" inputmode="numeric" placeholder="MM/YY" />
      </div>
      <div class="flex flex-col gap-2">
        <Label for="card-cvc">CVC</Label>
        <MaskInput id="card-cvc" v-model="cvc" :mask="cvcPattern" inputmode="numeric" placeholder="123" />
      </div>
    </div>
  </div>
</template>
