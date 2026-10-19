<script lang="ts">
export const description = "Daftar pintasan dalam kartu bergaris pemisah."
</script>

<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Kbd } from '@/components/ui/kbd'

const shortcuts = [
  {
    shortcut: "Ctrl + K",
    description: "Open the search bar",
  },
  {
    shortcut: "Ctrl + N",
    description: "Open a new window",
  },
  {
    shortcut: "Ctrl + O",
    description: "Open a file",
  },
  {
    shortcut: "Ctrl + P",
    description: "Open the settings",
  },
  {
    shortcut: "Ctrl + Q",
    description: "Quit the application",
  },
  {
    shortcut: "Ctrl + R",
    description: "Refresh the page",
  },
  {
    shortcut: "Ctrl + S",
    description: "Save the file",
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
    shortcut: "Ctrl + X",
    description: "Cut the selection",
  },
  {
    shortcut: "Ctrl + Y",
    description: "Redo the last action",
  },
  {
    shortcut: "Ctrl + Z",
    description: "Undo the last action",
  },
  {
    shortcut: "Ctrl + [",
    description: "Go back",
  },
  {
    shortcut: "Ctrl + ]",
    description: "Go forward",
  },
]
</script>

<template>
  <div class="px-6 py-12">
    <Card class="mx-auto max-w-sm bg-muted/20">
      <CardHeader>
        <CardTitle class="font-medium">Keyboard Shortcuts</CardTitle>
        <CardDescription>
          A list of keyboard shortcuts for the application
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul class="-mx-1 divide-y divide-border/50">
          <li v-for="shortcut in shortcuts"
            class="flex items-center justify-between px-1 py-2.25"
            :key="shortcut.shortcut"
          >
            <span class="text-sm">{{ shortcut.description }}</span>
            <Kbd class="border border-border/50 px-1.5 font-mono">
              {{ shortcut.shortcut }}
            </Kbd>
          </li>
        </ul>
      </CardContent>
    </Card>
  </div>
</template>
