<script setup lang="ts">
import { MoonIcon, RepeatIcon, SunIcon } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { useToggle } from '@/composables/use-toggle'

const { value, toggle, setLeft, setRight } = useToggle('light', 'dark')
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-6">
    <div class="flex flex-col gap-1 text-center">
      <h3 class="font-semibold text-base tracking-tight">
        Two-Value Toggle
      </h3>
      <p class="text-muted-foreground text-sm">
        Flip between any two values, not just true and false.
      </p>
    </div>

    <div class="flex flex-col items-center gap-3 rounded-lg border bg-muted/40 px-4 py-5">
      <div class="flex size-10 items-center justify-center rounded-full border bg-background shadow-xs">
        <SunIcon v-if="value === 'light'" class="size-5" />
        <MoonIcon v-else class="size-5" />
      </div>
      <span class="font-mono font-semibold text-2xl tracking-tight">"{{ value }}"</span>
    </div>

    <div class="grid grid-cols-2 gap-2">
      <Button variant="outline" :disabled="value === 'light'" @click="setLeft">
        <SunIcon />
        Set left
      </Button>
      <Button variant="outline" :disabled="value === 'dark'" @click="setRight">
        <MoonIcon />
        Set right
      </Button>
      <Button class="col-span-2" @click="toggle">
        <RepeatIcon />
        Toggle
      </Button>
    </div>

    <p class="text-center text-muted-foreground text-xs">
      <code class="rounded-sm bg-muted px-1.5 py-0.5 font-mono text-foreground">useToggle('light', 'dark')</code>
    </p>
  </div>
</template>
