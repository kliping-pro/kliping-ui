<script lang="ts">
export const description = "Kotak terpisah, dibelah dua kelompok."
</script>

<script setup lang="ts">
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp'
</script>

<template>
  <InputOTP container-class="gap-3" :maxlength="6">
    <InputOTPGroup class="space-x-1">
      <InputOTPSlot class="rounded-md border-l" :index="0" />
      <InputOTPSlot class="rounded-md border-l" :index="1" />
      <InputOTPSlot class="rounded-md border-l" :index="2" />
    </InputOTPGroup>
    <InputOTPSeparator />
    <InputOTPGroup class="space-x-1">
      <InputOTPSlot class="rounded-md border-l" :index="3" />
      <InputOTPSlot class="rounded-md border-l" :index="4" />
      <InputOTPSlot class="rounded-md border-l" :index="5" />
    </InputOTPGroup>
  </InputOTP>
</template>
