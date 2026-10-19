<script lang="ts">
export const description = "Keadaan galat: label, garis tepi, dan pesannya merah."
</script>

<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
</script>

<template>
  <div class="w-full max-w-xs space-y-2">
    <Label class="text-destructive" for="email-address">
      Email Address
    </Label>
    <Input
      class="border-destructive focus-visible:border-destructive/70 focus-visible:ring-destructive/25"
      id="email-address"
      placeholder="Email"
      type="email"
    />
    <p class="text-[0.8rem] text-destructive">This email is invalid.</p>
  </div>
</template>
