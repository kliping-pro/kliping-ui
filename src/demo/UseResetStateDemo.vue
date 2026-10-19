<script setup lang="ts">
import { RotateCcwIcon } from '@lucide/vue'
import { computed } from 'vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useResetState } from '@/composables/use-reset-state'

const { state, reset } = useResetState(() => ({ name: '', note: '' }))
const isDirty = computed(() => state.value.name !== '' || state.value.note !== '')
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-6">
    <div class="flex flex-col gap-1 text-center">
      <h3 class="font-semibold text-base tracking-tight">
        Resettable Form
      </h3>
      <p class="text-muted-foreground text-sm">
        Edit freely, then reset back to a fresh initial state.
      </p>
    </div>

    <div class="flex flex-col gap-4">
      <div class="flex flex-col gap-2">
        <Label for="reset-state-name">Name</Label>
        <Input id="reset-state-name" v-model="state.name" placeholder="Jane Doe" />
      </div>
      <div class="flex flex-col gap-2">
        <Label for="reset-state-note">Note</Label>
        <Input id="reset-state-note" v-model="state.note" placeholder="Anything worth remembering" />
      </div>
    </div>

    <div class="flex items-center justify-between rounded-lg border bg-muted/40 px-4 py-3">
      <span class="text-muted-foreground text-sm">Form</span>
      <span
        class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-medium text-xs transition-colors"
        :class="isDirty ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'"
      >
        <span class="size-1.5 rounded-full" :class="isDirty ? 'bg-primary-foreground' : 'bg-muted-foreground'" />
        {{ isDirty ? 'Edited' : 'Pristine' }}
      </span>
    </div>

    <div class="grid grid-cols-2 gap-2">
      <Button variant="outline" class="col-span-2" :disabled="!isDirty" @click="reset">
        <RotateCcwIcon />
        Reset
      </Button>
    </div>
  </div>
</template>
