<script lang="ts">
export const description = "Kartu profil ringkas dengan avatar dan tombol sunting."
</script>

<script setup lang="ts">
import { MoreHorizontalIcon, PencilIcon } from '@lucide/vue'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import Bluesky from '@/blocks/profile-01/components/Bluesky.vue'
import X from '@/blocks/profile-01/components/X.vue'
import DailyDev from '@/blocks/profile-01/components/DailyDev.vue'
import Hashnode from '@/blocks/profile-01/components/Hashnode.vue'
import Peerlist from '@/blocks/profile-01/components/Peerlist.vue'
import Reddit from '@/blocks/profile-01/components/Reddit.vue'
</script>

<template>
  <div class="min-h-dvh bg-muted/50 px-6 py-10">
    <div class="relative mx-auto flex w-full max-w-md flex-col items-center rounded-xl border border-border/55 bg-background px-8 py-10 shadow-[0_0_10px_rgba(0,0,0,0.04)] dark:border-border/75 dark:shadow-[0_0_20px_rgba(0,0,0,0.4)]">
      <Tooltip>
        <TooltipTrigger as-child>
          <Button
            class="absolute top-4 right-4"
            size="icon"
            variant="outline"
            aria-label="Edit profile"
          >
            <PencilIcon class="size-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Edit Profile</TooltipContent>
      </Tooltip>

      <div class="mb-4 flex items-center gap-4">
        <Avatar class="size-24 border">
          <AvatarImage
            alt="User avatar"
            src="/samples/avatars/avatar-19.svg"
          />
          <AvatarFallback class="font-medium text-2xl">CN</AvatarFallback>
        </Avatar>
      </div>
      <span class="font-medium text-2xl tracking-tight">John Doe</span>
      <span class="mt-1 text-muted-foreground">john.doe@example.com</span>

      <div class="mt-8">
        <h2 class="font-medium text-lg">About</h2>
        <p class="mt-1 text-muted-foreground">
          I'm a passionate software developer with over 5 years of
          experience building web applications. I love working with modern
          technologies and creating user-friendly interfaces that solve
          real-world problems.
        </p>
      </div>

      <div class="mt-8 flex w-full items-center gap-2">
        <Button>Hire Me</Button>
        <Button aria-label="X (Twitter)" size="icon" variant="secondary">
          <X class="size-4!" />
        </Button>
        <Button aria-label="daily.dev" size="icon" variant="secondary">
          <DailyDev class="size-5.5!" />
        </Button>
        <Button aria-label="Bluesky" size="icon" variant="secondary">
          <Bluesky />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button aria-label="More options" size="icon" variant="secondary">
              <MoreHorizontalIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent class="w-fit">
            <DropdownMenuItem>
              <Hashnode />
              Follow on Hashnode
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Peerlist />
              Follow on Peerlist
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Reddit />
              Follow on Reddit
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  </div>
</template>
