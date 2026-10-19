<script lang="ts">
export const description = "Petak kartu anggota bergambar."
</script>

<script setup lang="ts">
import { Dot, Search, UserPlus } from '@lucide/vue'
import { Button } from '@/components/ui/button'

const members = [
  {
    name: "Sarah Chen",
    email: "sarah.chen@company.com",
    role: "Admin",
    joined: "2021-01-01",
    image: "/samples/avatars/avatar-17.svg",
  },
  {
    name: "Michael Rodriguez",
    email: "michael.rodriguez@company.com",
    role: "Editor",
    joined: "2021-01-02",
    image: "/samples/avatars/avatar-18.svg",
  },
  {
    name: "Emily Johnson",
    email: "emily.johnson@company.com",
    role: "Viewer",
    joined: "2021-01-03",
    image: "/samples/avatars/avatar-19.svg",
  },
  {
    name: "David Kim",
    email: "david.kim@company.com",
    role: "Viewer",
    joined: "2021-01-04",
    image: "/samples/avatars/avatar-20.svg",
  },
  {
    name: "Lisa Thompson",
    email: "lisa.thompson@company.com",
    role: "Viewer",
    joined: "2021-01-05",
    image: "/samples/avatars/avatar-21.svg",
  },
]
</script>

<template>
  <div class="px-6 py-12">
    <div class="mx-auto max-w-3xl">
      <div class="flex justify-between gap-4 rounded-lg bg-muted/90 px-6 py-5 max-[32rem]:flex-col min-[32rem]:items-center">
        <div>
          <h2 class="font-medium text-lg">Members</h2>
          <div class="mt-0.5 flex items-center text-muted-foreground text-sm">
            <span>Team Avengers</span> <Dot /> <span>10 Members</span>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <Button aria-label="Search members" size="icon" variant="outline">
            <Search />

          </Button>
          <Button>
            <UserPlus /> Invite Members
          </Button>
        </div>
      </div>

      <div class="mt-6 grid grid-cols-1 gap-x-4 gap-y-8 lg:grid-cols-3 min-[32rem]:grid-cols-2">
        <div v-for="member in members" :key="member.name">
          <div class="aspect-square rounded-lg bg-muted">
            <img
              :alt="member.name"
              class="size-full rounded-lg object-cover"
              :src="member.image"
            />
          </div>

          <h3 class="mt-3 font-medium text-lg">{{ member.name }}</h3>
          <p class="text-muted-foreground text-sm">{{ member.role }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
