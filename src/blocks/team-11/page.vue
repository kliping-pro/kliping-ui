<script lang="ts">
export const description = "Petak tiga kolom dengan foto persegi panjang."
</script>

<script setup lang="ts">
const teamMembers = [
  {
    name: "Liam Martinez",
    image: "/samples/avatars/avatar-06.svg",
    role: "Chief Technology Officer",
  },
  {
    name: "Ava Thompson",
    image: "/samples/avatars/avatar-07.svg",
    role: "Chief Executive Officer",
  },
  {
    name: "Sophia Patel",
    image: "/samples/avatars/avatar-08.svg",
    role: "Head of Design",
  },
  {
    name: "Noah Chen",
    image: "/samples/avatars/avatar-09.svg",
    role: "Product Manager",
  },
  {
    name: "Emma Garcia",
    image: "/samples/avatars/avatar-10.svg",
    role: "Software Engineer",
  },
  {
    name: "Ethan Kim",
    image: "/samples/avatars/avatar-11.svg",
    role: "DevOps Engineer",
  },
  {
    name: "Mia Johnson",
    image: "/samples/avatars/avatar-12.svg",
    role: "Marketing Lead",
  },
  {
    name: "Oliver Singh",
    image: "/samples/avatars/avatar-13.svg",
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

    <div class="mt-12 grid grid-cols-1 gap-10 max-sm:justify-center sm:mt-18 sm:grid-cols-2 lg:grid-cols-3">
      <div v-for="(member, index) in teamMembers" class="flex items-center gap-x-6 gap-y-10" :key="index">
        <div class="aspect-square w-20 shrink-0 overflow-hidden rounded-lg">
          <img :alt="member.name" :src="member.image" />
        </div>
        <div>
          <p class="font-medium text-lg">{{ member.name }}</p>
          <p class="text-muted-foreground">{{ member.role }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
