<script lang="ts">
export const description = "Kotak bercekung, bayangannya di dalam."
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
        class="rounded-md border-accent/90 border-l shadow-inner dark:shadow-primary/10"
        :index="0"
      />
      <InputOTPSlot
        class="rounded-md border-accent/90 border-l shadow-inner dark:shadow-primary/10"
        :index="1"
      />
      <InputOTPSlot
        class="rounded-md border-accent/90 border-l shadow-inner dark:shadow-primary/10"
        :index="2"
      />
      <InputOTPSlot
        class="rounded-md border-accent/90 border-l shadow-inner dark:shadow-primary/10"
        :index="3"
      />
    </InputOTPGroup>
  </InputOTP>
</template>
