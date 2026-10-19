<script setup lang="ts">
import { ref } from 'vue'
import { Portal } from '@/components/portal'
import { Button } from '@/components/ui/button'

const isOpen = ref(false)
</script>

<template>
  <div class="flex flex-col items-start gap-3">
    <Button variant="outline" @click="isOpen = !isOpen">
      {{ isOpen ? 'Hide' : 'Show' }} the bottom banner
    </Button>

    <Portal v-if="isOpen">
      <div class="fixed inset-x-0 bottom-0 z-50 bg-primary px-4 py-2 text-center text-primary-foreground text-sm">
        This banner is rendered as a child of <code>body</code>, not of the button above.
      </div>
    </Portal>

    <p class="text-muted-foreground text-sm">
      Rendered at the end of <code>body</code>, its content escapes the
      <code>overflow-hidden</code> and stacking context of its ancestors.
    </p>
  </div>
</template>
