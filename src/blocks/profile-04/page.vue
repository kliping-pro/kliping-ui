<script lang="ts">
export const description = "Profil dua kolom bertab dengan formulir di sebelahnya."
</script>

<script setup lang="ts">
import {
  BriefcaseIcon,
  MapPinIcon,
  MoreHorizontalIcon,
  PencilIcon,
  UserIcon,
} from '@lucide/vue'
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Bluesky from '@/blocks/profile-04/components/Bluesky.vue'
import X from '@/blocks/profile-04/components/X.vue'
import DailyDev from '@/blocks/profile-04/components/DailyDev.vue'
import Hashnode from '@/blocks/profile-04/components/Hashnode.vue'
import Peerlist from '@/blocks/profile-04/components/Peerlist.vue'
import Reddit from '@/blocks/profile-04/components/Reddit.vue'
import UserInfo from '@/blocks/profile-04/components/UserInfo.vue'
</script>

<template>
  <div class="min-h-dvh">
    <div class="relative mx-auto flex w-full max-w-3xl flex-col p-6 py-10">
      <div class="mb-4 flex items-center gap-8 max-[24rem]:gap-4">
        <div class="flex items-center gap-4">
          <Avatar class="size-28 border max-[24rem]:size-20 sm:size-40">
            <AvatarImage
              alt="User avatar"
              src="/samples/avatars/avatar-16.svg"
            />
            <AvatarFallback class="font-medium text-2xl">
              CN
            </AvatarFallback>
          </Avatar>
        </div>
        <div class="flex flex-col gap-0.5 sm:gap-1">
          <span class="font-medium text-lg tracking-tight sm:text-2xl">
            John Doe
          </span>
          <span class="text-muted-foreground sm:text-lg">
            john.doe@example.com
          </span>
        </div>
      </div>

      <p class="mt-0.5 line-clamp-4 text-muted-foreground">
        I'm a passionate software developer with over 5 years of
        experience building web applications. I love working with modern
        technologies and creating user-friendly interfaces that solve
        real-world problems.
      </p>

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

    <div class="mt-8 border-b">
      <Tabs class="mx-auto w-full max-w-3xl px-6" defaultValue="profile">
        <ScrollArea class="mask-r-from-95%">
          <TabsList
            :class="cn(
              'rounded-none bg-transparent p-0',
              '*:rounded-none *:border-0 *:border-b-2 *:px-4 *:text-muted-foreground',
              '*:data-[state=active]:border-foreground *:data-[state=active]:border-b-2 *:data-[state=active]:bg-transparent',
              '*:data-[state=active]:text-foreground *:data-[state=active]:shadow-none!'
            )"
          >
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="followers">Followers</TabsTrigger>
            <TabsTrigger value="followings">Followings</TabsTrigger>
            <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </Tabs>
    </div>

    <div class="mx-auto w-full max-w-3xl px-6">
      <div class="space-y-8 py-8">
        <div>
          <div class="-ms-px flex items-center justify-between gap-2.5 border border-b-0 border-dashed bg-muted/50 px-4 py-3">
            <h2 class="flex items-center gap-2.5 font-medium text-lg">
              <UserIcon class="size-5 fill-foreground/8" />
              Personal Information
            </h2>

            <Button aria-label="Edit personal information" class="-me-1 size-8" size="icon" variant="ghost">
              <PencilIcon />
            </Button>
          </div>
          <div class="grid grid-cols-1 *:-ms-px *:-mt-px *:border *:border-dashed *:px-4 *:py-3 md:grid-cols-2">
            <UserInfo label="Full Name" value="Alex Johnson" />
            <UserInfo label="Email" value="alex.johnson@example.com" />
            <UserInfo label="Phone" value="+1 (555) 123-4567" />
            <UserInfo label="Date of Birth" value="March 15, 1992" />
          </div>
        </div>

        <div>
          <div class="-ms-px flex items-center justify-between gap-2.5 border border-b-0 border-dashed bg-muted/50 px-4 py-3">
            <h2 class="flex items-center gap-2.5 font-medium text-lg">
              <MapPinIcon class="size-5 fill-foreground/8" />
              Location
            </h2>

            <Button aria-label="Edit location" class="-me-1 size-8" size="icon" variant="ghost">
              <PencilIcon />
            </Button>
          </div>
          <div class="grid grid-cols-1 *:-ms-px *:-mt-px *:border *:border-dashed *:px-4 *:py-3 md:grid-cols-2">
            <UserInfo label="Country" value="United States" />
            <UserInfo label="State/Province" value="California" />
            <UserInfo label="City" value="San Francisco" />
            <UserInfo label="Postal Code" value="94102" />
          </div>
        </div>

        <div>
          <div class="-ms-px flex items-center justify-between gap-2.5 border border-b-0 border-dashed bg-muted/50 px-4 py-3">
            <h2 class="flex items-center gap-2.5 font-medium text-lg">
              <BriefcaseIcon class="size-5 fill-foreground/8" />
              Professional Details
            </h2>

            <Button aria-label="Edit professional details" class="-me-1 size-8" size="icon" variant="ghost">
              <PencilIcon />
            </Button>
          </div>
          <div class="grid grid-cols-1 *:-ms-px *:-mt-px *:border *:border-dashed *:px-4 *:py-3 md:grid-cols-2">
            <UserInfo label="Job Title" value="Senior Frontend Developer" />
            <UserInfo label="Company" value="TechCorp Inc." />
            <UserInfo label="Department" value="Engineering" />
            <UserInfo label="Years of Experience" value="6 years" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
