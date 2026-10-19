<script setup lang="ts">
import { ref } from 'vue'
import {
  Kanban,
  KanbanBoard,
  KanbanColumn,
  KanbanColumnHandle,
  KanbanItem,
  KanbanItemHandle,
} from '@/components/kanban'
import { Badge } from '@/components/ui/badge'

const board = ref<Record<string, { id: string, title: string }[]>>({
  'Backlog': [
    { id: '1', title: 'Design the pricing page' },
    { id: '2', title: 'Research competitors' },
  ],
  'In progress': [
    { id: '3', title: 'Refactor the table component' },
  ],
  'Done': [
    { id: '4', title: 'Fix the upload error' },
    { id: '5', title: 'Release version 1.3' },
  ],
})
</script>

<template>
  <Kanban v-model="board" class="w-full">
    <KanbanBoard>
      <KanbanColumn v-for="(cards, column) in board" :key="column" :value="String(column)">
        <div class="flex items-center gap-1">
          <KanbanColumnHandle class="-ml-1" />
          <h3 class="flex-1 font-medium text-sm">
            {{ column }}
          </h3>
          <Badge variant="secondary">
            {{ cards.length }}
          </Badge>
        </div>

        <KanbanItem v-for="card in cards" :key="card.id" :value="card.id">
          <div class="flex items-start gap-1">
            <KanbanItemHandle class="-ml-1 mt-px" />
            <span class="flex-1">{{ card.title }}</span>
          </div>
        </KanbanItem>
      </KanbanColumn>
    </KanbanBoard>
  </Kanban>
</template>
