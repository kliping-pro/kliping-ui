<!-- example: 1. Selection Info -->
<script setup lang="ts">
import { Bold, Copy, Italic } from '@lucide/vue'
import { computed, ref } from 'vue'
import {
  SelectionToolbar,
  SelectionToolbarItem,
  SelectionToolbarSeparator,
} from '@/components/selection-toolbar'

const container = ref<HTMLElement | null>(null)
const selectedText = ref('')

const wordCount = computed(() => selectedText.value.trim().split(/\s+/).filter(Boolean).length)
const charCount = computed(() => selectedText.value.length)

// Membungkus pilihan dengan tag (`strong`, `em`) di dalam area yang bisa disunting.
function wrapSelection(tagName: string) {
  const selection = window.getSelection()
  if (!selection || selection.rangeCount === 0) return
  const range = selection.getRangeAt(0)
  const text = range.toString()
  if (!text) return
  const wrapper = document.createElement(tagName)
  try {
    range.surroundContents(wrapper)
  }
  catch {
    wrapper.textContent = text
    range.deleteContents()
    range.insertNode(wrapper)
  }
  selection.removeAllRanges()
}

function onCopy(text: string) {
  navigator.clipboard?.writeText(text)
}
</script>

<template>
  <div class="flex w-full flex-col items-center gap-4">
    <div
      ref="container"
      contenteditable="true"
      class="w-full max-w-2xl space-y-4 rounded-lg border bg-card p-8 text-card-foreground outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
    >
      <h2 class="text-2xl font-semibold">
        Selection Info Tracking
      </h2>
      <p class="leading-relaxed text-muted-foreground">
        Select any text to see the toolbar and track selection information below. The component emits
        the selected text so you can implement custom behavior.
      </p>
      <p class="leading-relaxed text-muted-foreground">
        Try selecting different portions of text to see real-time updates of the word count and
        character count.
      </p>
    </div>

    <SelectionToolbar :container="container" @selection-change="text => selectedText = text">
      <SelectionToolbarItem aria-label="Bold" @select="() => wrapSelection('strong')">
        <Bold />
      </SelectionToolbarItem>
      <SelectionToolbarItem aria-label="Italic" @select="() => wrapSelection('em')">
        <Italic />
      </SelectionToolbarItem>
      <SelectionToolbarSeparator />
      <SelectionToolbarItem aria-label="Copy" @select="onCopy">
        <Copy />
      </SelectionToolbarItem>
    </SelectionToolbar>

    <div v-if="selectedText" class="flex w-full max-w-2xl flex-col gap-2 rounded-lg border bg-muted/50 p-4">
      <div class="text-sm font-medium">
        Selection Info
      </div>
      <div class="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span class="text-muted-foreground">Words: </span>
          <span class="font-medium">{{ wordCount }}</span>
        </div>
        <div>
          <span class="text-muted-foreground">Characters: </span>
          <span class="font-medium">{{ charCount }}</span>
        </div>
      </div>
      <div class="text-xs text-muted-foreground">
        <span class="font-medium">Selected text: </span>"{{ selectedText.length > 50 ? `${selectedText.slice(0, 50)}...` : selectedText }}"
      </div>
    </div>
  </div>
</template>
