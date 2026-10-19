<script lang="ts">
export const description = "Kartu berbingkai dengan foto dan ikon media sosial."
</script>

<script setup lang="ts">
import {
  IconBrandDribbble,
  IconBrandGithub,
  IconBrandTwitter,
} from '@tabler/icons-vue'

const teamMembers = [
  {
    name: "Liam Martinez",
    image: "/samples/avatars/avatar-14.svg",
    role: "Chief Executive Officer",
  },
  {
    name: "Ava Thompson",
    image: "/samples/avatars/avatar-15.svg",
    role: "Chief Technology Officer",
  },
  {
    name: "Sophia Patel",
    image: "/samples/avatars/avatar-16.svg",
    role: "Head of Design",
  },
  {
    name: "Noah Chen",
    image: "/samples/avatars/avatar-17.svg",
    role: "Product Manager",
  },
  {
    name: "Emma Garcia",
    image: "/samples/avatars/avatar-18.svg",
    role: "Software Engineer",
  },
  {
    name: "Ethan Kim",
    image: "/samples/avatars/avatar-19.svg",
    role: "DevOps Engineer",
  },
  {
    name: "Mia Johnson",
    image: "/samples/avatars/avatar-20.svg",
    role: "Marketing Lead",
  },
  {
    name: "Oliver Singh",
    image: "/samples/avatars/avatar-21.svg",
    role: "Customer Success Manager",
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

    <div class="mt-12 grid grid-cols-1 gap-2 rounded-xl border border-border/75 bg-muted p-2 sm:mt-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 dark:border-border/60">
      <div v-for="(member, index) in teamMembers"
        class="rounded-lg border border-border/85 bg-background py-8 dark:border-foreground/13"
        :key="index"
      >
        <div class="mx-auto aspect-square max-w-48 overflow-hidden rounded-4xl bg-muted">
          <img :alt="member.name" :src="member.image" />
        </div>
        <p class="mt-6 text-center font-medium text-lg">
          {{ member.name }}
        </p>
        <p class="text-center text-muted-foreground">{{ member.role }}</p>
        <div class="mt-5 flex items-center justify-center gap-4">
          <a aria-label="Twitter" href="#" target="_blank">
            <IconBrandTwitter class="h-5 w-5 text-muted-foreground hover:text-primary" />
          </a>
          <a aria-label="GitHub" href="#" target="_blank">
            <IconBrandGithub class="h-5 w-5 text-muted-foreground hover:text-primary" />
          </a>
          <a aria-label="Dribbble" href="#" target="_blank">
            <IconBrandDribbble class="h-5 w-5 text-muted-foreground hover:text-primary" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
