<script setup lang="ts">
import { Loader2 } from '@lucide/vue'
import { ref } from 'vue'
import { Pending } from '@/composables/pending'
import { Button } from '@/components/ui/button'

const isPending = ref(false)

function send() {
  isPending.value = true
  setTimeout(() => {
    isPending.value = false
  }, 2000)
}
</script>

<template>
  <div class="flex flex-col items-start gap-3">
    <Pending :is-pending="isPending">
      <Button @click="send">
        <Loader2 v-if="isPending" class="animate-spin" />
        {{ isPending ? 'Sending…' : 'Send' }}
      </Button>
    </Pending>

    <p class="text-muted-foreground text-sm">
      While pending, the button stays keyboard-focusable and is still
      announced by screen readers — only the events that activate it are
      intercepted.
    </p>
  </div>
</template>
