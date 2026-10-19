<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { useBoolean } from '@/composables/use-boolean'

const { value, setTrue, setFalse, toggle } = useBoolean(false)
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-6">
    <div class="flex flex-col gap-1 text-center">
      <h3 class="font-semibold text-base tracking-tight">
        Boolean State
      </h3>
      <p class="text-muted-foreground text-sm">
        A boolean with actions that say what they do.
      </p>
    </div>

    <div class="flex items-center justify-between rounded-lg border bg-muted/40 px-4 py-3">
      <span class="text-muted-foreground text-sm">Current state</span>
      <span
        class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-medium text-xs transition-colors"
        :class="value ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'"
      >
        <span class="size-1.5 rounded-full" :class="value ? 'bg-primary-foreground' : 'bg-muted-foreground'" />
        {{ value ? 'True' : 'False' }}
      </span>
    </div>

    <div class="grid grid-cols-2 gap-2">
      <Button :disabled="value" @click="setTrue">
        Set true
      </Button>
      <Button variant="outline" :disabled="!value" @click="setFalse">
        Set false
      </Button>
      <Button variant="secondary" class="col-span-2" @click="toggle">
        Toggle
      </Button>
    </div>

    <p class="text-center text-muted-foreground text-xs">
      Raw value: <code class="rounded-sm bg-muted px-1.5 py-0.5 font-mono text-foreground">{{ value }}</code>
    </p>
  </div>
</template>
