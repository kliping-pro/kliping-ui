<script lang="ts">
export interface TreeNode {
  name: string
  type: 'file' | 'folder'
  children?: TreeNode[]
}
</script>

<script setup lang="ts">
import { ChevronRight, FileIcon, FolderIcon } from '@lucide/vue'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

/**
 * Satu simpul pohon berkas — memanggil dirinya sendiri untuk isinya.
 *
 * Rekursi di Vue butuh komponennya punya nama, dan SFC mendapat namanya dari
 * nama berkasnya sendiri; jadi `<FileTreeItem>` di dalam template ini menunjuk
 * berkas ini juga, tanpa perlu diimpor.
 */
defineProps<TreeNode>()
</script>

<template>
  <div v-if="type === 'file'" class="flex items-center gap-2 py-1 pl-10">
    <FileIcon class="h-4 w-4" /> {{ name }}
  </div>

  <Collapsible v-else class="pl-4">
    <CollapsibleTrigger class="group flex w-full items-center gap-2 py-1">
      <ChevronRight class="h-4 w-4 transition-transform group-data-[state=open]:rotate-90" />
      <span class="flex items-center gap-2">
        <FolderIcon class="h-4 w-4 fill-current" /> {{ name }}
      </span>
    </CollapsibleTrigger>
    <CollapsibleContent>
      <FileTreeItem v-for="child in children" :key="child.name" v-bind="child" />
    </CollapsibleContent>
  </Collapsible>
</template>
