<script lang="ts">
export const description = "Pohon berkas yang tiap foldernya bisa dilipat."
</script>

<script setup lang="ts">
import FileTreeItem from '@/variants/collapsible/components/FileTreeItem.vue'

interface FileTreeItem {
  name: string;
  type: "folder" | "file";
  children?: FileTreeItem[];
}

const fileTree: FileTreeItem[] = [
  {
    name: "src",
    type: "folder",
    children: [
      {
        name: "components",
        type: "folder",
        children: [
          { name: "button.tsx", type: "file" },
          { name: "input.tsx", type: "file" },
        ],
      },
    ],
  },
  {
    name: "public",
    type: "folder",
    children: [
      { name: "favicon.ico", type: "file" },
      { name: "index.html", type: "file" },
    ],
  },
  {
    name: "package.json",
    type: "file",
  },
]
</script>

<template>
  <div class="w-[350px] rounded-lg bg-accent p-4">
    <div class="-ml-4 w-full">
      <FileTreeItem v-for="treeItem in fileTree" :key="treeItem.name" v-bind="treeItem" />
    </div>
  </div>
</template>
