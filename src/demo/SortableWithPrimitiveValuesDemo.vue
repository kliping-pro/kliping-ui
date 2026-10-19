<!-- example: 3. With Primitive Values -->
<script setup lang="ts">
import { ref } from 'vue'
import { Sortable, SortableContent, SortableItem } from '@/components/sortable'

// Array teks: tiap teks sekaligus jadi id-nya.
const tricks = ref([
  'The 900',
  'Indy Backflip',
  'Pizza Guy',
  'Rocket Air',
  'Kickflip Backflip',
  'FS 540',
])
</script>

<template>
  <Sortable v-model="tricks" orientation="mixed" class="w-full max-w-md">
    <SortableContent class="grid grid-cols-3 gap-2.5">
      <SortableItem
        v-for="trick in tricks"
        :key="trick"
        :value="trick"
        class="flex size-full cursor-grab flex-col items-center justify-center rounded-md border bg-muted p-6 text-center shadow-xs active:cursor-grabbing"
      >
        <div class="font-medium text-sm leading-tight sm:text-base">
          {{ trick }}
        </div>
      </SortableItem>
    </SortableContent>
  </Sortable>
</template>
