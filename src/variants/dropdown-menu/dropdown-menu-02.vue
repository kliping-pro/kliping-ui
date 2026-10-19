<script lang="ts">
export const description = "Dipicu avatar, dengan ikon di tiap barisnya."
</script>

<script setup lang="ts">
import { LogOut, Settings, User } from '@lucide/vue'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
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
  <DropdownMenu>
    <DropdownMenuTrigger class="rounded-full focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2">
      <Avatar>
        <AvatarImage src="/samples/avatars/avatar-08.svg" />
      </Avatar>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <User class="h-4 w-4" /> Profile
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Settings class="h-4 w-4" /> Settings
      </DropdownMenuItem>
      <DropdownMenuItem variant="destructive">
        <LogOut class="h-4 w-4" /> Logout
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
