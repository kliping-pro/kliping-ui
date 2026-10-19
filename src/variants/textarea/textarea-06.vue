<script lang="ts">
export const description = "Ada keterangan bantu di bawahnya."
</script>

<script setup lang="ts">
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
</script>

<template>
  <div class="flex w-full flex-col gap-2">
    <Label for="message">Message</Label>
    <Textarea id="message" placeholder="Type your message here." />
    <p class="text-muted-foreground text-sm">
      Your message will be copied to the support team.
    </p>
  </div>
</template>
