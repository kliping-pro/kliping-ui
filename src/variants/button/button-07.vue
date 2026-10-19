<script lang="ts">
export const description = "Tombol terbelah — aksi utamanya di kiri, menu turun di kanan."
</script>

<script setup lang="ts">
import { ChevronDown, Plus, Star, X } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { ButtonGroup } from '@/components/ui/button-group'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
</script>

<template>
  <ButtonGroup>
    <Button variant="outline">
      <Star /> Star
    </Button>
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button size="icon" variant="outline">
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent class="min-w-52">
        <DropdownMenuLabel class="flex items-center justify-between gap-2">
          Lists
          <Button class="h-5 w-5" size="icon" variant="ghost">
            <X />
          </Button>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>🔮 Future ideas</DropdownMenuItem>
        <DropdownMenuItem>🚀 My stack</DropdownMenuItem>
        <DropdownMenuItem>✨ Inspiration</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Plus /> Create List
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </ButtonGroup>
</template>
