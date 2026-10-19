<script lang="ts">
export const description = "Petak foto bulat empat kolom dengan nama dan jabatan."
</script>

<script setup lang="ts">
const teamMembers = [
  {
    name: "John Doe",
    title: "Founder & CEO",
    imageUrl:
      "/samples/avatars/avatar-21.svg",
  },
  {
    name: "Jane Doe",
    title: "Engineering Manager",
    imageUrl:
      "/samples/avatars/avatar-22.svg",
  },
  {
    name: "Bob Smith",
    title: "Product Manager",
    imageUrl:
      "/samples/avatars/avatar-23.svg",
  },
  {
    name: "Peter Johnson",
    title: "Frontend Developer",
    imageUrl:
      "/samples/avatars/avatar-24.svg",
  },
  {
    name: "David Lee",
    title: "Backend Developer",
    imageUrl:
      "/samples/avatars/avatar-01.svg",
  },
  {
    name: "Sarah Williams",
    title: "Product Designer",
    imageUrl:
      "/samples/avatars/avatar-02.svg",
  },
  {
    name: "Michael Brown",
    title: "UX Researcher",
    imageUrl:
      "/samples/avatars/avatar-03.svg",
  },
  {
    name: "Elizabeth Johnson",
    title: "Customer Success",
    imageUrl:
      "/samples/avatars/avatar-04.svg",
  },
]
</script>

<template>
  <div class="flex flex-col items-center justify-center px-4 py-20 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-xl text-center">
      <b class="text-center font-medium text-muted-foreground text-sm uppercase">
        We're hiring!
      </b>
      <h2 class="mt-4 font-medium text-4xl tracking-[-0.04em] sm:text-[2.75rem]">
        Meet Our Team
      </h2>
      <p class="mt-4 text-base text-muted-foreground -tracking-[0.01em] sm:text-xl">
        Our philosophy is simple — hire a team of passionate people and foster
        a culture that empowers you to do you best work.
      </p>
    </div>

    <div class="mx-auto mt-20 grid w-full max-w-(--breakpoint-lg) grid-cols-2 gap-12 sm:grid-cols-3 md:grid-cols-4">
      <div v-for="member in teamMembers" class="text-center" :key="member.name">
        <img loading="lazy"
          :alt="member.name"
          class="mx-auto h-20 w-20 rounded-full bg-secondary object-cover"
          :height="120"
          :src="member.imageUrl"
          :width="120"
        />
        <h3 class="mt-5 font-medium text-lg">{{ member.name }}</h3>
        <p class="text-muted-foreground">{{ member.title }}</p>
      </div>
    </div>
  </div>
</template>
