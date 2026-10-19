<script setup lang="ts">
import { EyeIcon, EyeOffIcon } from '@lucide/vue'
import { reactive, ref } from 'vue'
import { Button } from '@/components/ui/button'
import { useControllableValue } from '@/composables/use-controllable-value'

const lastChange = ref<string>()

// Tanpa prop `value`, composable-nya mengurus nilainya sendiri dan tetap
// memberi kabar lewat `onChange`. Dengan `value`, induknya yang berkuasa.
const props = reactive<Record<string, any>>({
  defaultValue: 'hidden',
  onChange: (v: string) => (lastChange.value = v),
})

const { state, setState } = useControllableValue<string>(props)
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-6">
    <div class="flex flex-col gap-1 text-center">
      <h3 class="font-semibold text-base tracking-tight">
        Controllable Value
      </h3>
      <p class="text-muted-foreground text-sm">
        Owns its state when uncontrolled, and still reports changes.
      </p>
    </div>

    <div class="divide-y rounded-lg border bg-muted/40">
      <div class="flex items-center justify-between px-4 py-3">
        <span class="text-muted-foreground text-sm">State</span>
        <span
          class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-medium text-xs transition-colors"
          :class="state === 'visible' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'"
        >
          <span class="size-1.5 rounded-full" :class="state === 'visible' ? 'bg-primary-foreground' : 'bg-muted-foreground'" />
          {{ state === 'visible' ? 'Visible' : 'Hidden' }}
        </span>
      </div>
      <div class="flex items-center justify-between px-4 py-3">
        <span class="text-muted-foreground text-sm">Last onChange</span>
        <span class="font-mono text-sm">{{ lastChange ? `"${lastChange}"` : '—' }}</span>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-2">
      <Button :disabled="state === 'visible'" @click="setState('visible')">
        <EyeIcon />
        Show
      </Button>
      <Button variant="outline" :disabled="state === 'hidden'" @click="setState('hidden')">
        <EyeOffIcon />
        Hide
      </Button>
    </div>

    <p class="text-center text-muted-foreground text-xs">
      Pass a <code class="rounded-sm bg-muted px-1.5 py-0.5 font-mono text-foreground">value</code> prop and the parent takes control.
    </p>
  </div>
</template>
