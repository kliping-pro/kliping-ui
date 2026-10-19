<script lang="ts">
export const description = "Ada submenu yang terbuka ke samping."
</script>

<script setup lang="ts">
import {
  Copy,
  Ellipsis,
  ExternalLink,
  Eye,
  MessageCircle,
  Search,
  User,
} from '@lucide/vue'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
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
        <Ellipsis />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="mt-2 w-full">
      <DropdownMenuItem>
        <Eye /> Open conversation details
      </DropdownMenuItem>
      <DropdownMenuItem>
        <User /> View full profile
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <MessageCircle /> Start conversation
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuSub>
        <DropdownMenuSubTrigger>
          <Copy class="size-4 text-muted-foreground" />
          Copy
        </DropdownMenuSubTrigger>
        <DropdownMenuSubContent>
          <DropdownMenuItem>Copy name</DropdownMenuItem>
          <DropdownMenuItem>Copy email</DropdownMenuItem>
          <DropdownMenuItem>Copy link</DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuSub>
      <DropdownMenuItem>
        <Search /> Search in conversation
      </DropdownMenuItem>
      <DropdownMenuItem>
        <ExternalLink /> Open in new window
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
