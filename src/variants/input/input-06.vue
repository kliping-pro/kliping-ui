<script lang="ts">
export const description = "Isian dan tombol berlangganan sebaris."
</script>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
</script>

<template>
  <div class="flex w-full max-w-xs items-center gap-2">
    <Input placeholder="Email" type="email" />
    <Button class="shadow">Subscribe</Button>
  </div>
</template>
