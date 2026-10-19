<script lang="ts">
export const description = "Profil bertab untuk memisahkan data dan pengaturan."
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
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import Bluesky from '@/blocks/profile-03/components/Bluesky.vue'
import X from '@/blocks/profile-03/components/X.vue'
import DailyDev from '@/blocks/profile-03/components/DailyDev.vue'
import Hashnode from '@/blocks/profile-03/components/Hashnode.vue'
import Peerlist from '@/blocks/profile-03/components/Peerlist.vue'
import Reddit from '@/blocks/profile-03/components/Reddit.vue'
import Projects from '@/blocks/profile-03/components/Projects.vue'

const projects = [
  {
    name: "Acme UI",
    description: "A collection of shadcn/ui blocks.",
    image: "/samples/photos/photo-09.svg",
  },
  {
    name: "Databuddy",
    description: "Privacy-first web analytics.",
    image: "/samples/photos/photo-10.svg",
  },
  {
    name: "dddepth",
    description: "A collection of AI-generated abstract 3D shapes.",
    image: "/samples/photos/photo-11.svg",
  },
  {
    name: "Pattern Craft",
    description: "Modern background patterns and gradient snippets.",
    image: "/samples/photos/photo-12.svg",
  },
]
</script>

<template>
  <div class="min-h-dvh bg-muted/50 px-6 py-10">
    <div class="mx-auto w-full max-w-2xl border bg-background">
      <div class="relative border-b border-dashed p-3">
        <div class="overflow-hidden p-3">
          <div
            class="absolute inset-0 -top-px z-0"
            :style="{
              backgroundImage: `
      linear-gradient(to right, var(--border) 1px, transparent 1px),
      linear-gradient(to bottom, var(--border) 1px, transparent 1px)
    `,
              backgroundSize: '20px 20px',
              backgroundPosition: '0 0, 0 0',
              maskImage: `
        repeating-linear-gradient(
            to right,
            black 0px,
            black 3px,
            transparent 3px,
            transparent 8px
          ),
          repeating-linear-gradient(
            to bottom,
            black 0px,
            black 3px,
            transparent 3px,
            transparent 8px
          ),
          radial-gradient(ellipse 80% 80% at 100% 0%, #000 50%, transparent 90%)
    `,
              WebkitMaskImage: `
  repeating-linear-gradient(
            to right,
            black 0px,
            black 3px,
            transparent 3px,
            transparent 8px
          ),
          repeating-linear-gradient(
            to bottom,
            black 0px,
            black 3px,
            transparent 3px,
            transparent 8px
          ),
          radial-gradient(ellipse 80% 80% at 100% 0%, #000 50%, transparent 90%)
    `,
              maskComposite: 'intersect',
              WebkitMaskComposite: 'source-in',
            }"
          />

          <Tooltip>
            <TooltipTrigger as-child>
              <Button
                class="absolute top-4 right-4 z-1"
                size="icon"
                variant="outline"
                aria-label="Edit profile"
              >
                <PencilIcon class="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Edit Profile</TooltipContent>
          </Tooltip>

          <div class="relative isolate flex flex-col">
            <div class="mb-5 flex items-center gap-4">
              <Avatar class="size-24 border">
                <AvatarImage
                  alt="User avatar"
                  src="/samples/avatars/avatar-09.svg"
                />
                <AvatarFallback class="font-medium text-2xl">
                  CN
                </AvatarFallback>
              </Avatar>
            </div>
            <span class="font-medium text-xl tracking-tight">
              John Doe
            </span>
            <span class="text-muted-foreground">
              john.doe@example.com
            </span>

            <div class="mt-5 flex w-full items-center gap-2">
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
      </div>

      <div>
        <Tabs
          class="border-b border-dashed px-3 py-2"
          defaultValue="projects"
        >
          <TabsList class="*:px-3">
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="experience">Contact</TabsTrigger>
          </TabsList>
        </Tabs>
        <Projects :projects="projects" />
      </div>
    </div>
  </div>
</template>
