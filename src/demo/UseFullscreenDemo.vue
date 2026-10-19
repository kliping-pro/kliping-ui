<script setup lang="ts">
import { Maximize2Icon, Minimize2Icon } from '@lucide/vue'
import { useTemplateRef } from 'vue'
import { Button } from '@/components/ui/button'
import { Kbd } from '@/components/ui/kbd'
import { useFullscreen } from '@/composables/use-fullscreen'

const box = useTemplateRef<HTMLDivElement>('box')
const { isFullscreen, isSupported, toggle } = useFullscreen(box)
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-6">
    <div class="flex flex-col gap-1 text-center">
      <h3 class="font-semibold text-base tracking-tight">
        Fullscreen
      </h3>
      <p class="text-muted-foreground text-sm">
        Takes a single element fullscreen and tracks its state.
      </p>
    </div>

    <div
      ref="box"
      class="flex min-h-40 flex-col items-center justify-center gap-4 rounded-lg border bg-background p-6 text-center"
    >
      <span
        class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-medium text-xs transition-colors"
        :class="isFullscreen ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'"
      >
        <span class="size-1.5 rounded-full" :class="isFullscreen ? 'bg-primary-foreground' : 'bg-muted-foreground'" />
        {{ isFullscreen ? 'Fullscreen' : 'Windowed' }}
      </span>
      <p class="max-w-64 text-muted-foreground text-sm">
        <template v-if="isFullscreen">
          You can also press <Kbd>Esc</Kbd> to exit.
        </template>
        <template v-else>
          Only this box goes fullscreen, not the whole page.
        </template>
      </p>
      <Button :variant="isFullscreen ? 'outline' : 'default'" :disabled="!isSupported" @click="toggle">
        <Minimize2Icon v-if="isFullscreen" />
        <Maximize2Icon v-else />
        {{ isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen' }}
      </Button>
    </div>

    <p class="text-center text-muted-foreground text-xs">
      <template v-if="isSupported">
        Uses the <code class="rounded-sm bg-muted px-1.5 py-0.5 font-mono text-foreground">Fullscreen API</code> on a template ref.
      </template>
      <template v-else>
        This browser does not support the Fullscreen API.
      </template>
    </p>
  </div>
</template>
