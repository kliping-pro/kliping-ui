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

const languages = ['TypeScript', 'JavaScript', 'Go', 'Rust', 'Python', 'Elixir', 'Zig']
const selected = ref<string[]>(['TypeScript'])

function remove(value: string) {
  selected.value = selected.value.filter(n => n !== value)
}
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-2">
    <Combobox v-model="selected" multiple open-on-focus>
      <ComboboxLabel>Languages you know</ComboboxLabel>
      <ComboboxBadgeList v-if="selected.length" class="pb-1">
        <ComboboxBadgeItem v-for="t in selected" :key="t" @remove="remove(t)">
          {{ t }}
        </ComboboxBadgeItem>
      </ComboboxBadgeList>
      <ComboboxAnchor>
        <ComboboxInput placeholder="Search languages…" />
        <ComboboxTrigger />
      </ComboboxAnchor>
      <ComboboxContent>
        <ComboboxEmpty />
        <ComboboxItem v-for="language in languages" :key="language" :value="language">
          {{ language }}
        </ComboboxItem>
      </ComboboxContent>
    </Combobox>
  </div>
</template>
