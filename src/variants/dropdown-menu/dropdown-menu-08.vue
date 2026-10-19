<script lang="ts">
export const description = "Pemilih ruang kerja; yang sedang aktif ditandai centang."
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { Check, ChevronsUpDown } from '@lucide/vue'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const workspaces = [
  {
    id: 1,
    name: "Workspace 1",
    createdBy: "abc@example.com",
  },
  {
    id: 2,
    name: "Workspace 2",
    createdBy: "def@example.com",
  },
  {
    id: 3,
    name: "Workspace 3",
    createdBy: "ghi@example.com",
  },
]

const selectedWorkspace = ref(workspaces[0])

function setSelectedWorkspace(value: typeof selectedWorkspace['value']) {
  selectedWorkspace.value = value
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger class="flex items-center gap-2 rounded-lg bg-accent px-3 py-2.5">
      <Avatar class="h-8 w-8 rounded-lg">
        <AvatarFallback class="rounded-lg bg-primary text-primary-foreground">
          {{ selectedWorkspace.name[0] }}
        </AvatarFallback>
      </Avatar>
      <div class="flex flex-col gap-1 text-start leading-none">
        <span class="max-w-[17ch] truncate font-semibold text-sm leading-none">
          {{ selectedWorkspace.name }}
        </span>
        <span class="max-w-[20ch] truncate text-muted-foreground text-xs">
          {{ selectedWorkspace.createdBy }}
        </span>
      </div>
      <ChevronsUpDown class="ml-6 h-4 w-4 text-muted-foreground" />
    </DropdownMenuTrigger>
    <DropdownMenuContent align="start" class="w-52">
      <DropdownMenuLabel>Workspaces</DropdownMenuLabel>
      <DropdownMenuItem v-for="workspace in workspaces"
        :key="workspace.id"
        @click="setSelectedWorkspace(workspace)"
      >
        <div class="flex items-center gap-2">
          <Avatar class="h-8 w-8 rounded-md">
            <AvatarFallback class="rounded-md bg-primary/10 text-foreground">
              {{ workspace.name[0] }}
            </AvatarFallback>
          </Avatar>
          <div class="flex flex-col">
            <span>{{ workspace.name }}</span>
            <span class="text-muted-foreground text-xs">
              {{ workspace.createdBy }}
            </span>
          </div>
        </div>
        <Check v-if="selectedWorkspace.id === workspace.id" class="ml-auto" />
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
