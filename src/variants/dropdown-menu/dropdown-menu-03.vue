<script lang="ts">
export const description = "Berisi kotak centang; memilih tidak menutup menunya."
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const tags = ['Sport', 'Music', 'Food', 'Travel', 'Tech', 'Science', 'Art']

const selectedTags = ref([tags[0], tags[4]])

function setTagChecked(tag: string, checked: boolean) {
  selectedTags.value = checked
    ? [...selectedTags.value, tag]
    : selectedTags.value.filter(t => t !== tag)
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="outline">Select Tags</Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-44">
      <DropdownMenuLabel>Select Tags</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuCheckboxItem
        v-for="tag in tags"
        :key="tag"
        :model-value="selectedTags.includes(tag)"
        @select="$event.preventDefault()"
        @update:model-value="setTagChecked(tag, $event)"
      >
        {{ tag }}
      </DropdownMenuCheckboxItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
