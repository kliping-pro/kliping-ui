<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import { Button } from '@/components/ui/button'
import { useClickAway } from '@/composables/use-click-away'

const isOpen = ref(false)
const panel = useTemplateRef<HTMLDivElement>('panel')
const closeCount = ref(0)

useClickAway(() => {
  if (!isOpen.value)
    return
  isOpen.value = false
  closeCount.value += 1
}, panel)
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-6">
    <div class="flex flex-col gap-1 text-center">
      <h3 class="font-semibold text-base tracking-tight">
        Click Away
      </h3>
      <p class="text-muted-foreground text-sm">
        Closes the panel when you click anywhere outside it.
      </p>
    </div>

    <div class="flex min-h-36 items-center justify-center rounded-lg border border-dashed p-4">
      <Transition
        mode="out-in"
        enter-active-class="transition duration-150 ease-out"
        enter-from-class="scale-95 opacity-0"
        leave-active-class="transition duration-100 ease-in"
        leave-to-class="scale-95 opacity-0"
      >
        <div
          v-if="isOpen"
          ref="panel"
          class="flex w-full flex-col items-center gap-1 rounded-lg border border-primary bg-primary/5 px-4 py-5 text-center shadow-sm"
        >
          <p class="font-medium text-sm">
            Panel is open
          </p>
          <p class="text-muted-foreground text-xs">
            Clicks inside here keep it open.
          </p>
        </div>
        <p v-else class="text-muted-foreground text-sm">
          Panel is closed.
        </p>
      </Transition>
    </div>

    <div class="flex items-center justify-between rounded-lg border bg-muted/40 px-4 py-3">
      <span class="text-muted-foreground text-sm">Closed by click away</span>
      <span class="font-medium font-mono text-sm tabular-nums">{{ closeCount }}</span>
    </div>

    <Button class="w-full" :disabled="isOpen" @click="isOpen = true">
      Open panel
    </Button>
  </div>
</template>
