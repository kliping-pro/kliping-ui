<script setup lang="ts">
import { ref } from 'vue'
import { Presence } from '@/components/presence'
import { Button } from '@/components/ui/button'

const isVisible = ref(true)
</script>

<template>
  <div class="flex flex-col items-start gap-3">
    <Button variant="outline" @click="isVisible = !isVisible">
      {{ isVisible ? 'Hide' : 'Show' }}
    </Button>

    <Presence :present="isVisible">
      <div class="rounded-md border bg-card p-4 text-sm data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
        This box waits for its exit animation to finish before it leaves the DOM.
      </div>
    </Presence>
  </div>
</template>
