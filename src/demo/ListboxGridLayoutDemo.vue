<!-- example: 2. Grid Layout -->
<script setup lang="ts">
import { ref } from 'vue'
import { Listbox, ListboxItem, ListboxItemIndicator } from '@/components/listbox'

const tricks = [
  { label: 'Kickflip', description: 'Flip the board 360° along its long axis' },
  { label: 'Heelflip', description: 'Flip the board 360° along its long axis in the opposite direction of a kickflip' },
  { label: 'Tre Flip', description: 'A 360° shove-it combined with a kickflip' },
  { label: 'FS 540', description: 'A frontside aerial with a 540° rotation' },
  { label: '360 Varial McTwist', description: 'A 540° inverted aerial with a 360° board rotation' },
  { label: 'The 900', description: 'Legendary 900° aerial rotation pioneered by Tony Hawk' },
]

// Listbox (Reka) hanya vertikal atau horizontal, jadi di grid panah bergerak
// urut sesuai susunan item.
const selected = ref<string>()
</script>

<template>
  <Listbox v-model="selected" aria-label="Tricks" class="grid w-full gap-2 sm:grid-cols-3">
    <ListboxItem v-for="trick in tricks" :key="trick.label" :value="trick.label" class="items-start">
      <div class="flex flex-col gap-px">
        <div class="font-medium">
          {{ trick.label }}
        </div>
        <div class="line-clamp-2 text-sm text-muted-foreground">
          {{ trick.description }}
        </div>
      </div>
      <ListboxItemIndicator />
    </ListboxItem>
  </Listbox>
</template>
