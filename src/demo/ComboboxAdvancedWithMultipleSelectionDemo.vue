<!-- example: 2. With Multiple Selection -->
<script setup lang="ts">
import { ref } from 'vue'
import {
  Combobox,
  ComboboxAnchor,
  ComboboxBadgeItem,
  ComboboxBadgeList,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
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

const value = ref<string[]>([])

const labelOf = (item: string) => tricks.find(trick => trick.value === item)?.label ?? item

function remove(item: string) {
  value.value = value.value.filter(v => v !== item)
}
</script>

<template>
  <div class="w-full max-w-md">
    <Combobox v-model="value" multiple>
      <ComboboxLabel>Tricks</ComboboxLabel>
      <ComboboxAnchor class="h-full min-h-10 flex-wrap px-3 py-2 pr-8">
        <ComboboxBadgeList v-if="value.length">
          <ComboboxBadgeItem v-for="item in value" :key="item" @remove="remove(item)">
            {{ labelOf(item) }}
          </ComboboxBadgeItem>
        </ComboboxBadgeList>
        <ComboboxInput placeholder="Select tricks..." class="h-auto min-w-20 flex-1" />
        <ComboboxTrigger class="absolute top-3 right-2" />
      </ComboboxAnchor>
      <ComboboxContent>
        <ComboboxEmpty>No tricks found.</ComboboxEmpty>
        <ComboboxItem v-for="trick in tricks" :key="trick.value" :value="trick.value">
          {{ trick.label }}
        </ComboboxItem>
      </ComboboxContent>
    </Combobox>
  </div>
</template>
