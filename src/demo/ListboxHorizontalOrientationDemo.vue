<!-- example: 1. Horizontal Orientation -->
<script setup lang="ts">
import { ref } from 'vue'
import { Listbox, ListboxItem, ListboxItemIndicator } from '@/components/listbox'

const tricks = [
  { label: 'Kickflip', description: 'Flip the board 360° along its long axis' },
  { label: 'Heelflip', description: 'Flip the board 360° along its long axis in the opposite direction of a kickflip' },
  { label: 'The 900', description: 'Legendary 900° aerial rotation pioneered by Tony Hawk' },
]

const selected = ref<string>()
</script>

<template>
  <Listbox v-model="selected" aria-label="Tricks" orientation="horizontal" class="flex w-full flex-row gap-4">
    <ListboxItem v-for="trick in tricks" :key="trick.label" :value="trick.label" class="flex-1">
      <div class="flex flex-col">
        <div class="flex items-center justify-between">
          <div class="font-medium">
            {{ trick.label }}
          </div>
          <ListboxItemIndicator />
        </div>
        <div class="line-clamp-2 text-sm text-muted-foreground">
          {{ trick.description }}
        </div>
      </div>
    </ListboxItem>
  </Listbox>
</template>
