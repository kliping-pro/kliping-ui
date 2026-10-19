<script setup lang="ts">
import { Archive, Tag, Trash2 } from '@lucide/vue'
import { ref } from 'vue'
import {
  ActionBar,
  ActionBarClose,
  ActionBarGroup,
  ActionBarItem,
  ActionBarSelection,
  ActionBarSeparator,
} from '@/components/action-bar'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'

const files = ['report.pdf', 'budget.xlsx', 'meeting.docx', 'photo.png']
const selected = ref<string[]>([])

function toggle(name: string, checked: boolean) {
  selected.value = checked
    ? [...selected.value, name]
    : selected.value.filter(n => n !== name)
}
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-3">
    <label v-for="file in files" :key="file" class="flex items-center gap-2 text-sm">
      <Checkbox :model-value="selected.includes(file)" @update:model-value="v => toggle(file, v === true)" />
      {{ file }}
    </label>

    <Button class="w-fit" size="sm" variant="ghost" @click="selected = []">
      Clear selection
    </Button>

    <ActionBar :open="selected.length > 0" @update:open="v => !v && (selected = [])">
      <ActionBarSelection>
        {{ selected.length }} selected
      </ActionBarSelection>
      <ActionBarSeparator />
      <ActionBarGroup>
        <ActionBarItem keep-open>
          <Tag /> Add label
        </ActionBarItem>
        <ActionBarItem>
          <Archive /> Archive
        </ActionBarItem>
        <ActionBarItem @select="selected = []">
          <Trash2 /> Delete
        </ActionBarItem>
      </ActionBarGroup>
      <ActionBarSeparator />
      <ActionBarClose />
    </ActionBar>
  </div>
</template>
