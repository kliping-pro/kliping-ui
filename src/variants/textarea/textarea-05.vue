<script lang="ts">
export const description = "Delapan baris, lebih tinggi dari bawaannya."
</script>

<script setup lang="ts">
import { Textarea } from '@/components/ui/textarea'
</script>

<template>
  <Textarea placeholder="Type your message here." :rows="8" />
</template>
