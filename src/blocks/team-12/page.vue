<script lang="ts">
export const description = "Petak dengan sel kosong sebagai penampung anggota berikutnya."
</script>

<script setup lang="ts">
import { cn } from "@/lib/utils"

const teamMembers = [
  {
    name: "Liam Martinez",
    image: "/samples/avatars/avatar-13.svg",
    role: "Chief Technology Officer",
  },
  {
    name: "Ava Thompson",
    image: "/samples/avatars/avatar-14.svg",
    role: "Chief Executive Officer",
  },
  {
    name: "Sophia Patel",
    image: "/samples/avatars/avatar-15.svg",
    role: "Head of Design",
  },
  {
    name: "Noah Chen",
    image: "/samples/avatars/avatar-16.svg",
    role: "Product Manager",
  },
  {
    name: "Emma Garcia",
    image: "/samples/avatars/avatar-17.svg",
    role: "Software Engineer",
  },
  {
    name: "Ethan Kim",
    image: "/samples/avatars/avatar-18.svg",
    role: "DevOps Engineer",
  },
  {
    name: "Mia Johnson",
    image: "/samples/avatars/avatar-19.svg",
    role: "Marketing Lead",
  },
  {
    name: "Oliver Singh",
    image: "/samples/avatars/avatar-20.svg",
    role: "Customer Success Manager",
  },
  {
    name: "Your Name",
    image: "/samples/avatars/avatar-20.svg",
    role: "Your Dream Role",
    isPlaceholder: true,
  },
]
</script>

<template>
  <div class="mx-auto max-w-7xl px-6 py-20">
    <h2 class="text-balance text-center font-medium text-3xl capitalize tracking-[-0.04em] sm:text-4xl md:text-[2.75rem]">
      Our core team
    </h2>
    <p class="mt-3 text-balance text-center text-lg text-muted-foreground tracking-[-0.01em] md:text-2xl">
      Passionate people building great products
    </p>

    <div class="mt-12 grid grid-cols-1 border border-e-0 border-b-0 max-sm:justify-center sm:mt-18 sm:grid-cols-2 lg:grid-cols-3">
      <div v-for="(member, index) in teamMembers"
        :class="cn('flex items-center gap-6 border-e border-b p-4', {
          'bg-[repeating-linear-gradient(315deg,color-mix(in_srgb,var(--muted),transparent_50%)_0,color-mix(in_srgb,var(--muted),transparent_50%)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] bg-fixed':
            member.isPlaceholder,
        })"
        :key="index"
      >
        <div class="aspect-square w-20 shrink-0 overflow-hidden rounded bg-foreground/10 dark:bg-muted/75">
          {member.isPlaceholder ? null : (
            <img
              :alt="member.name"
              :height="80"
              :src="member.image"
              :width="80"
            />
          )}
        </div>
        <div>
          <p class="font-medium text-lg">{{ member.name }}</p>
          <p class="mt-0.5 text-muted-foreground">{{ member.role }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
