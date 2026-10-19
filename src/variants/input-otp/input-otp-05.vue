<script lang="ts">
export const description = "Kotak berlatar abu dengan angka tebal."
</script>

<script setup lang="ts">
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp'
</script>

<template>
  <InputOTP :maxlength="6">
    <InputOTPGroup class="space-x-2">
      <InputOTPSlot
        class="rounded-md border-accent border-l bg-secondary font-semibold shadow-none"
        :index="0"
      />
      <InputOTPSlot
        class="rounded-md border-accent border-l bg-secondary font-semibold shadow-none"
        :index="1"
      />
      <InputOTPSlot
        class="rounded-md border-accent border-l bg-secondary font-semibold shadow-none"
        :index="2"
      />
      <InputOTPSlot
        class="rounded-md border-accent border-l bg-secondary font-semibold shadow-none"
        :index="3"
      />
    </InputOTPGroup>
  </InputOTP>
</template>
