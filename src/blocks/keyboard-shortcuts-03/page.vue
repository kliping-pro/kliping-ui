<script lang="ts">
export const description = "Pintasan dalam kolom masonry."
</script>

<script setup lang="ts">
import { Kbd } from '@/components/ui/kbd'

const shortcuts = [
  {
    category: "File Operations",
    shortcuts: [
      {
        shortcut: "Ctrl + N",
        description: "Open a new window",
      },
      {
        shortcut: "Ctrl + O",
        description: "Open a file",
      },
      {
        shortcut: "Ctrl + S",
        description: "Save the file",
      },
      {
        shortcut: "Ctrl + Q",
        description: "Quit the application",
      },
    ],
  },
  {
    category: "Navigation",
    shortcuts: [
      {
        shortcut: "Ctrl + K",
        description: "Open the search bar",
      },
      {
        shortcut: "Ctrl + T",
        description: "Open a new tab",
      },
      {
        shortcut: "Ctrl + W",
        description: "Close the tab",
      },
      {
        shortcut: "Ctrl + R",
        description: "Refresh the page",
      },
      {
        shortcut: "Ctrl + [",
        description: "Go back",
      },
      {
        shortcut: "Ctrl + ]",
        description: "Go forward",
      },
    ],
  },
  {
    category: "Editing",
    shortcuts: [
      {
        shortcut: "Ctrl + X",
        description: "Cut the selection",
      },
      {
        shortcut: "Ctrl + Z",
        description: "Undo the last action",
      },
      {
        shortcut: "Ctrl + Y",
        description: "Redo the last action",
      },
    ],
  },
  {
    category: "Settings",
    shortcuts: [
      {
        shortcut: "Ctrl + P",
        description: "Open the settings",
      },
    ],
  },
  {
    category: "View",
    shortcuts: [
      {
        shortcut: "Ctrl + +",
        description: "Zoom in",
      },
      {
        shortcut: "Ctrl + -",
        description: "Zoom out",
      },
      {
        shortcut: "Ctrl + 0",
        description: "Reset zoom",
      },
      {
        shortcut: "F11",
        description: "Toggle fullscreen",
      },
    ],
  },
  {
    category: "Selection",
    shortcuts: [
      {
        shortcut: "Ctrl + A",
        description: "Select all",
      },
      {
        shortcut: "Ctrl + D",
        description: "Select word",
      },
      {
        shortcut: "Ctrl + L",
        description: "Select line",
      },
      {
        shortcut: "Shift + Alt + ↑",
        description: "Expand selection up",
      },
      {
        shortcut: "Shift + Alt + ↓",
        description: "Expand selection down",
      },
    ],
  },
  {
    category: "Workspace",
    shortcuts: [
      {
        shortcut: "Ctrl + \\",
        description: "Split editor",
      },
      {
        shortcut: "Ctrl + B",
        description: "Toggle sidebar",
      },
      {
        shortcut: "Ctrl + J",
        description: "Toggle panel",
      },
      {
        shortcut: "Ctrl + Shift + E",
        description: "Focus explorer",
      },
      {
        shortcut: "Ctrl + Shift + N",
        description: "New window",
      },
    ],
  },
]
</script>

<template>
  <div class="px-6 py-8 sm:py-12">
    <div class="mx-auto max-w-184">
      <h2 class="px-2.5 font-medium text-2xl tracking-tight">
        Keyboard Shortcuts
      </h2>
      <p class="mt-1 px-2.5 text-muted-foreground">
        A list of keyboard shortcuts for the application
      </p>

      <ul class="mt-6 columns-1 gap-4 sm:columns-2">
        <li v-for="shortcut in shortcuts"
          class="mb-4 flex break-inside-avoid flex-col rounded-xl bg-muted p-5"
          :key="shortcut.category"
        >
          <span class="font-medium text-muted-foreground text-sm">
            {{ shortcut.category }}
          </span>
          <ul class="mt-3 space-y-2">
            <li v-for="subShortcut in shortcut.shortcuts"
              class="flex items-center justify-between"
              :key="subShortcut.shortcut"
            >
              <span>{{ subShortcut.description }}</span>
              <Kbd class="shrink-0 whitespace-nowrap border border-border/70 bg-foreground/5 px-1.5 font-mono">
                {{ subShortcut.shortcut }}
              </Kbd>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
