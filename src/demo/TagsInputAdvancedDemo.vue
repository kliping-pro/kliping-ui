<script setup lang="ts">
import { ref } from 'vue'
import {
  TagsInput,
  TagsInputInput,
  TagsInputItem,
  TagsInputLabel,
  TagsInputList,
} from '@/components/tags-input-advanced'

const tags = ref<string[]>(['vue', 'tailwind'])
</script>

<template>
  <div class="w-full max-w-sm">
    <TagsInput v-model="tags" add-on-paste delimiter=",">
      <TagsInputLabel>Technologies</TagsInputLabel>
      <TagsInputList>
        <TagsInputItem v-for="tag in tags" :key="String(tag)" :value="tag">
          {{ tag }}
        </TagsInputItem>
        <TagsInputInput placeholder="Type and press Enter…" />
      </TagsInputList>
    </TagsInput>
  </div>
</template>
