<script setup lang="ts">
import { computed } from 'vue'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useActiveElement } from '@/composables/use-active-element'

const activeElement = useActiveElement()

const fields = [
  { id: 'active-name', label: 'Name', placeholder: 'Ada Lovelace' },
  { id: 'active-email', label: 'Email', placeholder: 'ada@example.com' },
]

const label = computed(() => {
  const el = activeElement.value
  if (!el)
    return 'none'
  return el.id ? `#${el.id}` : `<${el.tagName.toLowerCase()}>`
})
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-6">
    <div class="flex flex-col gap-1 text-center">
      <h3 class="font-semibold text-base tracking-tight">
        Active Element
      </h3>
      <p class="text-muted-foreground text-sm">
        Tracks whichever element currently holds focus.
      </p>
    </div>

    <div class="flex flex-col gap-4">
      <div v-for="f in fields" :key="f.id" class="flex flex-col gap-2">
        <div class="flex items-center justify-between">
          <Label :for="f.id">{{ f.label }}</Label>
          <span
            class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-medium text-xs transition-colors"
            :class="activeElement?.id === f.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'"
          >
            <span class="size-1.5 rounded-full" :class="activeElement?.id === f.id ? 'bg-primary-foreground' : 'bg-muted-foreground'" />
            {{ activeElement?.id === f.id ? 'Focused' : 'Idle' }}
          </span>
        </div>
        <Input :id="f.id" :placeholder="f.placeholder" />
      </div>
    </div>

    <div class="flex items-center justify-between gap-4 rounded-lg border bg-muted/40 px-4 py-3">
      <span class="shrink-0 text-muted-foreground text-sm">Active element</span>
      <code class="truncate rounded-sm bg-muted px-1.5 py-0.5 font-mono text-foreground text-xs">{{ label }}</code>
    </div>

    <p class="text-center text-muted-foreground text-xs">
      Click an input, or press <code class="rounded-sm bg-muted px-1.5 py-0.5 font-mono text-foreground">Tab</code> to move focus.
    </p>
  </div>
</template>
