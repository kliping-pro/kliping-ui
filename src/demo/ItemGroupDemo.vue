<script setup lang="ts">
import { Plus } from '@lucide/vue'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from '@/components/ui/item'

const people = [
  {
    username: 'shadcn',
    avatar: '/samples/avatars/avatar-14.svg',
    email: 'shadcn@vercel.com',
  },
  {
    username: 'maxleiter',
    avatar: '/samples/avatars/avatar-15.svg',
    email: 'maxleiter@vercel.com',
  },
  {
    username: 'evilrabbit',
    avatar: '/samples/avatars/avatar-16.svg',
    email: 'evilrabbit@vercel.com',
  },
]
</script>

<template>
  <div class="flex w-full max-w-md flex-col gap-6">
    <ItemGroup>
      <template v-for="(person, index) in people" :key="person.username">
        <Item role="listitem">
          <ItemMedia>
            <Avatar>
              <AvatarImage :src="person.avatar" class="grayscale" />
              <AvatarFallback>{{ person.username.charAt(0) }}</AvatarFallback>
            </Avatar>
          </ItemMedia>
          <ItemContent class="gap-1">
            <ItemTitle>{{ person.username }}</ItemTitle>
            <ItemDescription>{{ person.email }}</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button variant="ghost" size="icon" class="rounded-full" :aria-label="`Add ${person.username}`">
              <Plus />
            </Button>
          </ItemActions>
        </Item>
        <ItemSeparator v-if="index !== people.length - 1" />
      </template>
    </ItemGroup>
  </div>
</template>
