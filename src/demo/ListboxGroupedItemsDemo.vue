<!-- example: 3. Grouped Items -->
<script setup lang="ts">
import { ref } from 'vue'
import { Listbox, ListboxGroup, ListboxGroupLabel, ListboxItem, ListboxItemIndicator } from '@/components/listbox'

const tricks = {
  'Basic Tricks': [
    { label: 'Kickflip', description: 'Flip the board 360° along its long axis' },
    { label: 'Heelflip', description: 'Flip the board 360° along its long axis in the opposite direction' },
  ],
  'Advanced Tricks': [
    { label: 'Varial McTwist', description: 'A 540° inverted aerial with a board rotation' },
    { label: 'The 900', description: 'Legendary 900° aerial rotation pioneered by Tony Hawk' },
  ],
}

const selected = ref<string[]>([])
</script>

<template>
  <Listbox v-model="selected" aria-label="Tricks" multiple class="w-full max-w-sm">
    <ListboxGroup v-for="(items, group) in tricks" :key="group">
      <ListboxGroupLabel>{{ group }}</ListboxGroupLabel>
      <ListboxItem v-for="trick in items" :key="trick.label" :value="trick.label">
        <div class="flex flex-col items-start">
          <span>{{ trick.label }}</span>
          <span class="text-xs text-muted-foreground">{{ trick.description }}</span>
        </div>
        <ListboxItemIndicator />
      </ListboxItem>
    </ListboxGroup>
  </Listbox>
</template>
