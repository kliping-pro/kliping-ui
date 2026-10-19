<script setup lang="ts">
import { ref } from 'vue'
import {
  Listbox,
  ListboxGroup,
  ListboxGroupLabel,
  ListboxItem,
  ListboxItemIndicator,
} from '@/components/listbox'

const selected = ref<string[]>(['san-francisco'])

const cities = {
  'West Coast': [
    { value: 'san-francisco', label: 'San Francisco' },
    { value: 'los-angeles', label: 'Los Angeles' },
    { value: 'seattle', label: 'Seattle' },
  ],
  'East Coast': [
    { value: 'new-york', label: 'New York' },
    { value: 'boston', label: 'Boston' },
  ],
}
</script>

<template>
  <Listbox v-model="selected" aria-label="Cities" class="w-full max-w-sm" highlight-on-hover multiple>
    <ListboxGroup v-for="(group, region) in cities" :key="region">
      <ListboxGroupLabel>{{ region }}</ListboxGroupLabel>
      <ListboxItem v-for="city in group" :key="city.value" class="py-2.5" :value="city.value">
        {{ city.label }}
        <ListboxItemIndicator />
      </ListboxItem>
    </ListboxGroup>
  </Listbox>
</template>
