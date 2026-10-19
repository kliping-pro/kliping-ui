<script setup lang="ts">
import { Kbd, KbdGroup } from '@/components/kbd-advanced'
</script>

<template>
  <div class="flex flex-col items-start gap-3">
    <KbdGroup>
      <Kbd>⌘</Kbd>
      <Kbd>K</Kbd>
    </KbdGroup>

    <p class="text-muted-foreground text-sm">
      Press <Kbd>Esc</Kbd> to close, or <KbdGroup><Kbd>⇧</Kbd><Kbd>Enter</Kbd></KbdGroup> to send.
    </p>
  </div>
</template>
