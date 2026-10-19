<script setup lang="ts">
import { ChevronRightIcon, InboxIcon, SendIcon, StarIcon, Trash2Icon } from '@lucide/vue'
import { ref } from 'vue'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { List, ListItem, ListItemEnd, ListItemStart } from '@/components/list'

const folders = [
  { name: 'Inbox', icon: InboxIcon, count: 14 },
  { name: 'Starred', icon: StarIcon, count: 3 },
  { name: 'Sent', icon: SendIcon },
  { name: 'Trash', icon: Trash2Icon, disabled: true },
]
const active = ref('Inbox')

const people = [
  { name: 'Olivia Martin', role: 'Product Designer' },
  { name: 'Jackson Lee', role: 'Frontend Developer' },
  { name: 'Sofia Davis', role: 'Project Manager' },
]
</script>

<template>
  <div class="grid w-full max-w-2xl gap-6 sm:grid-cols-2">
    <List as="div" class="rounded-lg border p-2">
      <ListItem
        v-for="folder in folders"
        :key="folder.name"
        as="button"
        type="button"
        :selected="active === folder.name"
        :disabled="folder.disabled"
        @click="active = folder.name"
      >
        <ListItemStart>
          <component :is="folder.icon" class="size-4" />
        </ListItemStart>
        {{ folder.name }}
        <ListItemEnd v-if="folder.count">
          <Badge variant="secondary">{{ folder.count }}</Badge>
        </ListItemEnd>
      </ListItem>
    </List>

    <List class="rounded-lg border p-2">
      <ListItem v-for="person in people" :key="person.name" class="cursor-pointer">
        <ListItemStart>
          <Avatar class="size-9">
            <AvatarFallback>{{ person.name.split(' ').map(n => n[0]).join('') }}</AvatarFallback>
          </Avatar>
        </ListItemStart>
        <div class="flex min-w-0 flex-col">
          <span class="truncate font-medium">{{ person.name }}</span>
          <span class="truncate text-muted-foreground text-xs">{{ person.role }}</span>
        </div>
        <ListItemEnd>
          <ChevronRightIcon class="size-4 text-muted-foreground" />
        </ListItemEnd>
      </ListItem>
    </List>
  </div>
</template>
