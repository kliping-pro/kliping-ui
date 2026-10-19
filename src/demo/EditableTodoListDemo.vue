<!-- example: 3. Todo List -->
<script setup lang="ts">
import { Pencil, Trash2 } from '@lucide/vue'
import { ref } from 'vue'
import { Editable, EditableArea, EditableInput, EditablePreview, EditableTrigger } from '@/components/editable'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'

interface Todo {
  id: string
  text: string
  completed: boolean
}

const todos = ref<Todo[]>([
  { id: '1', text: 'Ollie', completed: false },
  { id: '2', text: 'Kickflip', completed: false },
  { id: '3', text: '360 flip', completed: false },
  { id: '4', text: '540 flip', completed: false },
])

function remove(id: string) {
  todos.value = todos.value.filter(todo => todo.id !== id)
}
</script>

<template>
  <div class="flex w-full max-w-md min-w-0 flex-col gap-2">
    <span class="text-lg font-semibold">Tricks to learn</span>
    <div v-for="todo in todos" :key="todo.id" class="flex items-center gap-2 rounded-lg border bg-card px-4 py-2">
      <Checkbox v-model="todo.completed" :aria-label="`Mark ${todo.text} as done`" />
      <Editable v-model="todo.text" class="flex flex-1 flex-row items-center gap-1.5" submit-mode="both">
        <EditableArea class="flex-1">
          <EditablePreview :class="cn('w-full px-1.5 py-1', todo.completed && 'text-muted-foreground line-through')" />
          <EditableInput class="px-1.5 py-1" />
        </EditableArea>
        <EditableTrigger :aria-label="`Edit ${todo.text}`" class="size-7 px-0">
          <Pencil />
        </EditableTrigger>
      </Editable>
      <Button :aria-label="`Delete ${todo.text}`" class="size-7 text-destructive" size="icon" variant="ghost" @click="remove(todo.id)">
        <Trash2 />
      </Button>
    </div>
  </div>
</template>
