<!-- example: 3. Multi Selection -->
<script setup lang="ts">
import { ref } from 'vue'
import {
  CheckboxGroup,
  CheckboxGroupDescription,
  CheckboxGroupItem,
  CheckboxGroupLabel,
  CheckboxGroupList,
} from '@/components/checkbox-group'

const tricks = [
  { label: 'Kickflip', value: 'kickflip' },
  { label: 'Heelflip', value: 'heelflip' },
  { label: 'Tre Flip', value: 'tre-flip' },
  { label: 'Pizza Guy', value: 'pizza-guy' },
  { label: 'FS 540', value: 'fs-540' },
  { label: 'The 900', value: 'the-900' },
]

const selected = ref<string[]>([])
const lastIndex = ref<number | null>(null)
let shiftPressed = false

function onShift(event: KeyboardEvent | MouseEvent) {
  shiftPressed = event.shiftKey
}

// Shift + klik memilih (atau melepas) seluruh rentang dari butir terakhir yang
// diklik sampai butir ini; tanpa Shift, perilaku kotak centang biasa.
function onUpdate(value: unknown[]) {
  const next = value as string[]
  const clicked = next.find(v => !selected.value.includes(v)) ?? selected.value.find(v => !next.includes(v))
  const index = tricks.findIndex(t => t.value === clicked)
  if (!shiftPressed || lastIndex.value === null || index === -1) {
    selected.value = next
    if (index !== -1)
      lastIndex.value = index
    return
  }
  const [start, end] = [Math.min(lastIndex.value, index), Math.max(lastIndex.value, index)]
  const range = tricks.slice(start, end + 1).map(t => t.value)
  const selecting = !selected.value.includes(clicked!)
  const result = new Set(selected.value)
  for (const value of range) {
    if (selecting)
      result.add(value)
    else
      result.delete(value)
  }
  selected.value = tricks.map(t => t.value).filter(v => result.has(v))
  lastIndex.value = index
}
</script>

<template>
  <CheckboxGroup :model-value="selected" @update:model-value="onUpdate">
    <CheckboxGroupLabel>Tricks</CheckboxGroupLabel>
    <CheckboxGroupDescription>Hold Shift and click to select multiple items</CheckboxGroupDescription>
    <CheckboxGroupList class="mt-1" @keydown="onShift" @keyup="onShift" @pointerdown.capture="onShift">
      <CheckboxGroupItem v-for="trick in tricks" :key="trick.value" :value="trick.value">
        {{ trick.label }}
      </CheckboxGroupItem>
    </CheckboxGroupList>
  </CheckboxGroup>
</template>
