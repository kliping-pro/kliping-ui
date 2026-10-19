<script lang="ts">
export const description = "Ada keterangan bantu di bawah isiannya."
</script>

<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
</script>

<template>
  <div class="w-full max-w-xs space-y-2">
    <Label for="email-address">Email Address</Label>
    <Input id="email-address" placeholder="Email" type="email" />
    <p class="text-[0.8rem] text-muted-foreground">
      We'll never share your email with anyone else.
    </p>
  </div>
</template>
