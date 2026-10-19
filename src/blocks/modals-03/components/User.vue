<script setup lang="ts">
import { ref } from 'vue'
import { ChevronDownIcon, PencilIcon } from '@lucide/vue'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

defineProps<{
  name: string
  img: string
  email: string
}>()

const selected = ref("Can View")
</script>

<template>
  <div class="flex items-center justify-between gap-4">
    <div class="flex items-center gap-4">
      <Avatar>
        <AvatarImage :src="img" :alt="name" />
        <AvatarFallback>{{ name.charAt(0) }}</AvatarFallback>
      </Avatar>
      <div class="space-y-0.5">
        <p class="text-sm font-semibold">{{ name }}</p>
        <p class="text-muted-foreground text-sm">{{ email }}</p>
      </div>
    </div>
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button variant="ghost" size="sm" class="group">
          <span class="hidden items-center gap-1 sm:flex">
            {{ selected }}
            <ChevronDownIcon class="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
          </span>
          <PencilIcon class="block h-4 w-4 sm:hidden" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem @select="selected = 'Can View'">
          Can View
        </DropdownMenuItem>
        <DropdownMenuItem @select="selected = 'Can Edit'">
          Can Edit
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>
