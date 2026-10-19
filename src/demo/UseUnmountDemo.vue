<script setup lang="ts">
import { PlugIcon, UnplugIcon } from '@lucide/vue'
import { defineComponent, onScopeDispose, ref } from 'vue'
import { Button } from '@/components/ui/button'

const isMounted = ref(true)
const unmountCount = ref(0)

// Komponen stateful (bukan fungsional) agar punya scope sendiri: komponen
// fungsional tidak punya scope, jadi `onScopeDispose` di dalamnya tidak terikat.
const Child = defineComponent({
  setup() {
    onScopeDispose(() => {
      unmountCount.value += 1
    })
    return () => null
  },
})
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-6">
    <div class="flex flex-col gap-1 text-center">
      <h3 class="font-semibold text-base tracking-tight">
        Cleanup on Unmount
      </h3>
      <p class="text-muted-foreground text-sm">
        The child runs its cleanup the moment it is removed.
      </p>
    </div>

    <div
      class="flex h-20 items-center justify-center rounded-lg border border-dashed text-sm transition-colors"
      :class="isMounted ? 'border-primary bg-primary/5' : 'text-muted-foreground'"
    >
      <component :is="Child" v-if="isMounted" />
      <span v-if="isMounted" class="inline-flex items-center gap-2 font-medium">
        <PlugIcon class="size-4 text-primary" />
        Child component
      </span>
      <span v-else>Empty slot</span>
    </div>

    <div class="divide-y rounded-lg border bg-muted/40">
      <div class="flex items-center justify-between gap-4 px-4 py-3">
        <span class="text-muted-foreground text-sm">Child mounted</span>
        <span
          class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-medium text-xs transition-colors"
          :class="isMounted ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'"
        >
          <span class="size-1.5 rounded-full" :class="isMounted ? 'bg-primary-foreground' : 'bg-muted-foreground'" />
          {{ isMounted ? 'True' : 'False' }}
        </span>
      </div>
      <div class="flex items-center justify-between gap-4 px-4 py-3">
        <span class="text-muted-foreground text-sm">Cleanups run</span>
        <span class="font-mono text-sm tabular-nums">{{ unmountCount }}</span>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-2">
      <Button class="col-span-2" :variant="isMounted ? 'outline' : 'default'" @click="isMounted = !isMounted">
        <component :is="isMounted ? UnplugIcon : PlugIcon" />
        {{ isMounted ? 'Unmount child' : 'Mount again' }}
      </Button>
    </div>

    <p class="text-center text-muted-foreground text-xs">
      Cleanup is registered with <code class="rounded-sm bg-muted px-1.5 py-0.5 font-mono text-foreground">onScopeDispose</code>.
    </p>
  </div>
</template>
