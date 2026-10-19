<!-- example: 3. With Custom Filter -->
<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  Combobox,
  ComboboxAnchor,
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

const value = ref('')
const search = ref('')

// Peringkat sederhana: awal label > awal kata > memuat > urutan huruf (fuzzy).
// Penyaringan bawaan dimatikan (`ignore-filter`); daftar ini yang dirender.
function rank(text: string, query: string) {
  const t = text.toLowerCase()
  if (t.startsWith(query)) return 4
  if (t.split(/[\s-]+/).some(word => word.startsWith(query))) return 3
  if (t.includes(query)) return 2
  let i = 0
  for (const char of t) {
    if (char === query[i]) i++
  }
  return i === query.length ? 1 : 0
}

const filtered = computed(() => {
  const query = search.value.trim().toLowerCase()
  if (!query) return tricks
  return tricks
    .map(trick => ({ trick, score: Math.max(rank(trick.label, query), rank(trick.value, query)) }))
    .filter(entry => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(entry => entry.trick)
})
</script>

<template>
  <div class="w-full max-w-xs">
    <Combobox v-model="value" ignore-filter>
      <ComboboxLabel>Trick</ComboboxLabel>
      <ComboboxAnchor>
        <ComboboxInput v-model="search" placeholder="Select trick..." />
        <ComboboxTrigger />
      </ComboboxAnchor>
      <ComboboxContent>
        <ComboboxEmpty>No tricks found.</ComboboxEmpty>
        <ComboboxItem v-for="trick in filtered" :key="trick.value" :value="trick.value">
          {{ trick.label }}
        </ComboboxItem>
      </ComboboxContent>
    </Combobox>
  </div>
</template>
