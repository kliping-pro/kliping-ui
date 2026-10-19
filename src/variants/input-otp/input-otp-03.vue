<script lang="ts">
export const description = "Tiap kotak berdiri sendiri, dipisahkan jarak."
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
      <InputOTPSlot class="rounded-md border-l" :index="0" />
      <InputOTPSlot class="rounded-md border-l" :index="1" />
      <InputOTPSlot class="rounded-md border-l" :index="2" />
      <InputOTPSlot class="rounded-md border-l" :index="3" />
    </InputOTPGroup>
  </InputOTP>
</template>
