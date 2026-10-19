<script lang="ts">
export const description = "Pintasan dikelompokkan per bagian dalam kartu berbingkai."
</script>

<script setup lang="ts">
import { KeyboardIcon } from '@lucide/vue'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Kbd } from '@/components/ui/kbd'
import CircuitBoardPattern from '@/blocks/keyboard-shortcuts-02/components/CircuitBoardPattern.vue'

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
]
</script>

<template>
  <div class="px-6 py-12">
    <div class="mx-auto max-w-sm space-y-1 rounded-xl border bg-muted/40 p-1">
      <Card class="shadow/5 dark:shadow/40 relative overflow-hidden rounded-lg bg-background py-5">
        <!-- Circuit Board - Light Pattern -->
        <CircuitBoardPattern />
        <KeyboardIcon class="mask-r-from-55% mask-r-to-75% dark:mask-r-from-50% absolute -top-1 -right-1 size-11 -rotate-45 stroke-[1.5px] text-muted-foreground opacity-60 dark:opacity-40" />

        <CardHeader class="relative isolate">
          <CardTitle class="font-medium">Keyboard Shortcuts</CardTitle>
          <CardDescription>
            A list of keyboard shortcuts for the application
          </CardDescription>
        </CardHeader>
      </Card>
      <Card class="shadow/5 dark:shadow/40 relative overflow-hidden rounded-lg bg-background">
        <CircuitBoardPattern />

        <CardContent class="relative isolate">
          <ul class="space-y-5">
            <li v-for="shortcut in shortcuts" :key="shortcut.category">
              <span class="font-medium text-muted-foreground text-sm">
                {{ shortcut.category }}
              </span>
              <ul class="mt-2 space-y-2">
                <li v-for="subShortcut in shortcut.shortcuts"
                  class="flex items-center justify-between"
                  :key="subShortcut.shortcut"
                >
                  <span>{{ subShortcut.description }}</span>
                  <Kbd class="border border-border/50 px-1.5 font-mono">
                    {{ subShortcut.shortcut }}
                  </Kbd>
                </li>
              </ul>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
