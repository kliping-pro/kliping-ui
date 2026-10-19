<script lang="ts">
export const description = "Petak empat kolom dengan ikon media sosial berjajar."
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
    image: "/samples/avatars/avatar-07.svg",
    role: "Chief Executive Officer",
  },
  {
    name: "Ava Thompson",
    image: "/samples/avatars/avatar-08.svg",
    role: "Chief Technology Officer",
  },
  {
    name: "Sophia Patel",
    image: "/samples/avatars/avatar-09.svg",
    role: "Head of Design",
  },
  {
    name: "Noah Chen",
    image: "/samples/avatars/avatar-10.svg",
    role: "Product Manager",
  },
  {
    name: "Emma Garcia",
    image: "/samples/avatars/avatar-11.svg",
    role: "Software Engineer",
  },
  {
    name: "Ethan Kim",
    image: "/samples/avatars/avatar-12.svg",
    role: "DevOps Engineer",
  },
  {
    name: "Mia Johnson",
    image: "/samples/avatars/avatar-13.svg",
    role: "Marketing Lead",
  },
  {
    name: "Oliver Singh",
    image: "/samples/avatars/avatar-14.svg",
    role: "Customer Success Manager",
  },
]
</script>

<template>
  <div class="mx-auto max-w-7xl px-6 py-20">
    <h2 class="text-balance text-center font-medium text-3xl tracking-[-0.04em] sm:text-4xl md:text-[2.75rem]">
      Built by makers
    </h2>
    <p class="mt-3 text-balance text-center text-lg text-muted-foreground tracking-[-0.01em] md:text-2xl">
      A team that values simplicity and speed
    </p>

    <div class="mt-12 grid grid-cols-1 sm:mt-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <div v-for="(member, index) in teamMembers" class="-mt-px -ml-px border py-8" :key="index">
        <div class="mx-auto aspect-square max-w-48 overflow-hidden rounded-full bg-muted">
          <img :alt="member.name" :src="member.image" />
        </div>
        <p class="mt-4 text-center font-medium text-lg">
          {{ member.name }}
        </p>
        <p class="mt-0.5 text-center text-muted-foreground">
          {{ member.role }}
        </p>
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
