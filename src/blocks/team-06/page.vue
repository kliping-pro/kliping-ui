<script lang="ts">
export const description = "Petak foto bulat tanpa tautan, ringkas dan lega."
</script>

<script setup lang="ts">
const teamMembers = [
  {
    name: "Liam Martinez",
    image: "/samples/avatars/avatar-24.svg",
    role: "Chief Technology Officer",
  },
  {
    name: "Ava Thompson",
    image: "/samples/avatars/avatar-01.svg",
    role: "Chief Executive Officer",
  },
  {
    name: "Sophia Patel",
    image: "/samples/avatars/avatar-02.svg",
    role: "Head of Design",
  },
  {
    name: "Noah Chen",
    image: "/samples/avatars/avatar-03.svg",
    role: "Product Manager",
  },
  {
    name: "Emma Garcia",
    image: "/samples/avatars/avatar-04.svg",
    role: "Software Engineer",
  },
  {
    name: "Ethan Kim",
    image: "/samples/avatars/avatar-05.svg",
    role: "DevOps Engineer",
  },
  {
    name: "Mia Johnson",
    image: "/samples/avatars/avatar-06.svg",
    role: "Marketing Lead",
  },
  {
    name: "Oliver Singh",
    image: "/samples/avatars/avatar-07.svg",
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

    <div class="mt-12 grid grid-cols-1 gap-10 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4">
      <div v-for="(member, index) in teamMembers" :key="index">
        <div class="aspect-square overflow-hidden rounded-lg">
          <img :alt="member.name" :src="member.image" />
        </div>
        <p class="mt-4 font-medium text-lg">{{ member.name }}</p>
        <p class="text-muted-foreground">{{ member.role }}</p>
      </div>
    </div>
  </div>
</template>
