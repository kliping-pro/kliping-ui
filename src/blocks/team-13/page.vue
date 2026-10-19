<script lang="ts">
export const description = "Petak empat kolom paling rapat, foto kecil dan nama saja."
</script>

<script setup lang="ts">
const teamMembers = [
  {
    name: "Liam Martinez",
    image: "/samples/avatars/avatar-20.svg",
    role: "Chief Technology Officer",
  },
  {
    name: "Ava Thompson",
    image: "/samples/avatars/avatar-21.svg",
    role: "Chief Executive Officer",
  },
  {
    name: "Sophia Patel",
    image: "/samples/avatars/avatar-22.svg",
    role: "Head of Design",
  },
  {
    name: "Noah Chen",
    image: "/samples/avatars/avatar-23.svg",
    role: "Product Manager",
  },
  {
    name: "Emma Garcia",
    image: "/samples/avatars/avatar-24.svg",
    role: "Software Engineer",
  },
  {
    name: "Ethan Kim",
    image: "/samples/avatars/avatar-01.svg",
    role: "DevOps Engineer",
  },
  {
    name: "Mia Johnson",
    image: "/samples/avatars/avatar-02.svg",
    role: "Marketing Lead",
  },
  {
    name: "Oliver Singh",
    image: "/samples/avatars/avatar-03.svg",
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

    <div class="mt-12 grid grid-cols-1 gap-8 max-sm:justify-center sm:mt-18 sm:grid-cols-2 sm:gap-10 md:grid-cols-3 lg:grid-cols-4">
      <div v-for="(member, index) in teamMembers"
        class="relative flex items-center gap-x-6 gap-y-10"
        :key="index"
      >
        <div class="aspect-square overflow-hidden rounded-lg sm:aspect-4/5">
          <img
            :alt="member.name"
            class="size-full object-cover object-top"
            :src="member.image"
          />
        </div>
        <div class="absolute right-0 bottom-0 left-0 isolate overflow-hidden rounded-b-lg bg-linear-to-t from-foreground/90 via-foreground/80 p-4 pt-16">
          <p class="font-medium text-background text-lg">
            {{ member.name }}
          </p>
          <p class="mt-0.5 font-medium text-background/75 text-sm">
            {{ member.role }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
