<script setup lang="ts">
import { Bold, Copy, Italic, Link } from '@lucide/vue'
import { ref } from 'vue'
import {
  SelectionToolbar,
  SelectionToolbarItem,
  SelectionToolbarSeparator,
} from '@/components/selection-toolbar'

const container = ref<HTMLElement | null>(null)
const lastCopied = ref<string | null>(null)
</script>

<template>
  <div class="flex w-full max-w-lg flex-col gap-3">
    <p ref="container" class="rounded-md border p-4 text-sm leading-relaxed">
      Select part of this sentence with the mouse, and a toolbar will appear
      right above it. Its position is computed from the selection's bounding
      box, so it stays attached even when the selection spans several lines.
    </p>

    <SelectionToolbar :container="container">
      <SelectionToolbarItem @select="() => {}">
        <Bold />
      </SelectionToolbarItem>
      <SelectionToolbarItem @select="() => {}">
        <Italic />
      </SelectionToolbarItem>
      <SelectionToolbarSeparator />
      <SelectionToolbarItem @select="text => lastCopied = text">
        <Copy />
      </SelectionToolbarItem>
      <SelectionToolbarItem @select="() => {}">
        <Link />
      </SelectionToolbarItem>
    </SelectionToolbar>

    <p v-if="lastCopied" class="text-muted-foreground text-sm">
      Last copied: “{{ lastCopied }}”
    </p>
  </div>
</template>
