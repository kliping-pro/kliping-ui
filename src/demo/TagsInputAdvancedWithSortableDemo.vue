<!-- example: 3. With Sortable -->
<script setup lang="ts">
import { ref } from 'vue'
import { Sortable, SortableContent, SortableItem, SortableItemHandle } from '@/components/sortable'
import {
  TagsInput,
  TagsInputInput,
  TagsInputItem,
  TagsInputLabel,
  TagsInputList,
} from '@/components/tags-input-advanced'

// Satu array dipakai bersama: TagsInput menambah & menghapus, Sortable
// mengurutkan ulang.
const tricks = ref(['The 900', 'FS 540'])
</script>

<template>
  <div class="w-full max-w-sm">
    <Sortable v-model="tricks" orientation="mixed">
      <TagsInput v-model="tricks">
        <TagsInputLabel>Sortable</TagsInputLabel>
        <TagsInputList>
          <SortableContent class="contents">
            <!-- Pegangan terpisah: tombol hapus tag tidak bersarang di dalam unsur yang diseret. -->
            <SortableItem v-for="trick in tricks" :key="trick" :value="trick" class="flex items-center">
              <SortableItemHandle class="size-6" />
              <TagsInputItem :value="trick">
                {{ trick }}
              </TagsInputItem>
            </SortableItem>
          </SortableContent>
          <TagsInputInput placeholder="Add trick..." />
        </TagsInputList>
      </TagsInput>
    </Sortable>
  </div>
</template>
