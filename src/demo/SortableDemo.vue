<script setup lang="ts">
import { ref } from 'vue'
import {
  Sortable,
  SortableContent,
  SortableItem,
  SortableItemHandle,
} from '@/components/sortable'

const tasks = ref([
  { id: 'a', title: 'Draft the release notes' },
  { id: 'b', title: 'Review the code' },
  { id: 'c', title: 'Update the docs' },
  { id: 'd', title: 'Announce to the team' },
])
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-3">
    <Sortable v-model="tasks">
      <SortableContent>
        <SortableItem
          v-for="task in tasks"
          :key="task.id"
          class="flex items-center gap-2 rounded-md border bg-card p-2 text-sm"
          :value="task.id"
        >
          <SortableItemHandle />
          {{ task.title }}
        </SortableItem>
      </SortableContent>
    </Sortable>

    <p class="text-muted-foreground text-sm">
      Current order: {{ tasks.map(task => task.title).join(' → ') }}
    </p>
  </div>
</template>
