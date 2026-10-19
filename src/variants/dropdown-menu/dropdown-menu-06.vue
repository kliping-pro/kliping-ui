<script lang="ts">
export const description = "Pintasan papan tik ditulis di kanan tiap barisnya."
</script>

<script setup lang="ts">
import { EllipsisVertical } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button size="icon" variant="outline">
        <EllipsisVertical />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-60">
      <DropdownMenuItem>
        New Tab <DropdownMenuShortcut>⌘T</DropdownMenuShortcut>
      </DropdownMenuItem>
      <DropdownMenuItem>
        New Window <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
      </DropdownMenuItem>
      <DropdownMenuItem>
        New Incognito Window <DropdownMenuShortcut>⌘⇧N</DropdownMenuShortcut>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuSub>
        <DropdownMenuSubTrigger>History</DropdownMenuSubTrigger>
        <DropdownMenuSubContent class="w-40">
          <DropdownMenuItem>
            History <DropdownMenuShortcut>⌘Y</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>Grouped History</DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuSub>
      <DropdownMenuItem>
        Downloads <DropdownMenuShortcut>⌥⇧L</DropdownMenuShortcut>
      </DropdownMenuItem>
      <DropdownMenuItem>
        Delete browsing data <DropdownMenuShortcut>⇧⌘⌫</DropdownMenuShortcut>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
