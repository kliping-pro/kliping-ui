<script lang="ts">
export const description = "Petak foto persegi dengan judul di sebelah kiri."
</script>

<script setup lang="ts">
const teamMembers = [
  {
    name: "John Doe",
    title: "Founder & CEO",
    bio: "Former co-founder of Opendoor. Early staff at Spotify and Clearbit.",
    imageUrl:
      "/samples/avatars/avatar-04.svg",
  },
  {
    name: "Jane Doe",
    title: "Engineering Manager",
    bio: "Lead engineering teams at Figma, Pitch, and Protocol Labs.",
    imageUrl:
      "/samples/avatars/avatar-05.svg",
  },
  {
    name: "Bob Smith",
    title: "Product Manager",
    bio: "Former PM for Linear, Lambda School, and On Deck.",
    imageUrl:
      "/samples/avatars/avatar-06.svg",
  },
  {
    name: "Peter Johnson",
    title: "Frontend Developer",
    bio: "Former frontend dev for Linear, Coinbase, and Postscript.",
    imageUrl:
      "/samples/avatars/avatar-07.svg",
  },
  {
    name: "David Lee",
    title: "Backend Developer",
    bio: "Lead backend dev at Clearbit. Former Clearbit and Loom.",
    imageUrl:
      "/samples/avatars/avatar-08.svg",
  },
  {
    name: "Sarah Williams",
    title: "Product Designer",
    bio: "Founding design team at Figma. Former Pleo, Stripe, and Tile.",
    imageUrl:
      "/samples/avatars/avatar-09.svg",
  },
  {
    name: "Michael Brown",
    title: "UX Researcher",
    bio: "Lead user research for Slack. Contractor for Netflix and Udacity.",
    imageUrl:
      "/samples/avatars/avatar-10.svg",
  },
  {
    name: "Elizabeth Johnson",
    title: "Customer Success",
    bio: "Lead CX at Wealthsimple. Former PagerDuty and Sqreen.",
    imageUrl:
      "/samples/avatars/avatar-11.svg",
  },
]
</script>

<template>
  <div class="mx-auto flex max-w-(--breakpoint-xl) flex-col justify-center px-6 py-8 sm:py-20 lg:px-8">
    <b class="font-medium text-muted-foreground text-sm uppercase">
      Our team
    </b>
    <h2 class="mt-4 font-medium text-3xl tracking-[-0.04em] md:text-4xl">
      Meet the people behind the product
    </h2>
    <p class="mt-3 text-pretty text-lg text-muted-foreground -tracking-[0.01em] sm:text-xl">
      We're a 100% remote team spread all across the world. Join us!
    </p>

    <div class="mt-14 grid w-full grid-cols-1 gap-x-8 gap-y-12 sm:mt-20 sm:grid-cols-2 md:grid-cols-4">
      <div v-for="member in teamMembers" :key="member.name">
        <img loading="lazy"
          :alt="member.name"
          class="h-20 w-20 rounded-full bg-secondary object-cover"
          :height="120"
          :src="member.imageUrl"
          :width="120"
        />
        <h3 class="mt-4 font-medium text-lg">{{ member.name }}</h3>
        <p class="text-muted-foreground text-sm">{{ member.title }}</p>
        <p class="mt-3 text-foreground/90">{{ member.bio }}</p>
      </div>
    </div>
  </div>
</template>
