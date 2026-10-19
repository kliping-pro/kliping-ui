<!-- example: 1. With Groups -->
<script setup lang="ts">
import { ref } from 'vue'
import {
  Combobox,
  ComboboxAnchor,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxGroupLabel,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxSeparator,
  ComboboxTrigger,
} from '@/components/combobox-advanced'

const tricks = [
  { label: 'Kickflip', value: 'kickflip' },
  { label: 'Heelflip', value: 'heelflip' },
  { label: 'Tre Flip', value: 'tre-flip' },
  { label: 'FS 540', value: 'fs-540' },
  { label: 'Casper flip 360 flip', value: 'casper-flip-360-flip' },
  { label: 'Kickflip Backflip', value: 'kickflip-backflip' },
  { label: '360 Varial McTwist', value: '360-varial-mc-twist' },
  { label: 'The 900', value: 'the-900' },
]

const groups = [
  { label: 'Basic Tricks', items: tricks.slice(0, 3) },
  { label: 'Advanced Tricks', items: tricks.slice(3, 5) },
  { label: 'Pro Tricks', items: tricks.slice(5) },
]

const value = ref('')
</script>

<template>
  <div class="w-full max-w-xs">
    <Combobox v-model="value">
      <ComboboxLabel>Trick</ComboboxLabel>
      <ComboboxAnchor>
        <ComboboxInput placeholder="Select trick..." />
        <ComboboxTrigger />
      </ComboboxAnchor>
      <ComboboxContent>
        <ComboboxEmpty>No tricks found.</ComboboxEmpty>
        <template v-for="(group, index) in groups" :key="group.label">
          <ComboboxGroup>
            <ComboboxGroupLabel>{{ group.label }}</ComboboxGroupLabel>
            <ComboboxItem v-for="trick in group.items" :key="trick.value" :value="trick.value" outset>
              {{ trick.label }}
            </ComboboxItem>
          </ComboboxGroup>
          <ComboboxSeparator v-if="index < groups.length - 1" />
        </template>
      </ComboboxContent>
    </Combobox>
  </div>
</template>
