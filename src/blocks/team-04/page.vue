<script lang="ts">
export const description = "Petak empat kolom di tengah dengan tautan media sosial."
</script>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  IconBrandDribbble,
  IconBrandTwitch,
  IconBrandTwitter,
} from '@tabler/icons-vue'

const teamMembers = [
  {
    name: "John Doe",
    title: "Founder & CEO",
    bio: "Former founder of Opendoor. Early staff at Spotify.",
    imageUrl:
      "/samples/avatars/avatar-10.svg",
  },
  {
    name: "Jane Doe",
    title: "Engineering Manager",
    bio: "Lead engineering teams at Figma and Protocol Labs.",
    imageUrl:
      "/samples/avatars/avatar-11.svg",
  },
  {
    name: "Bob Smith",
    title: "Product Manager",
    bio: "Former PM for Linear, Lambda School, and On Deck.",
    imageUrl:
      "/samples/avatars/avatar-12.svg",
  },
  {
    name: "Peter Johnson",
    title: "Frontend Developer",
    bio: "Former frontend dev for Linear, Coinbase, and Postscript.",
    imageUrl:
      "/samples/avatars/avatar-13.svg",
  },
  {
    name: "David Lee",
    title: "Backend Developer",
    bio: "Lead backend dev at Clearbit. Former Clearbit and Loom.",
    imageUrl:
      "/samples/avatars/avatar-14.svg",
  },
  {
    name: "Sarah Williams",
    title: "Product Designer",
    bio: "Founding design team at Figma. Former Pleo and Stripe.",
    imageUrl:
      "/samples/avatars/avatar-15.svg",
  },
  {
    name: "Michael Brown",
    title: "UX Researcher",
    bio: "Lead user research for Slack. Contractor for Netflix.",
    imageUrl:
      "/samples/avatars/avatar-16.svg",
  },
  {
    name: "Elizabeth Johnson",
    title: "Customer Success",
    bio: "Lead CX at Wealthsimple. Former PagerDuty.",
    imageUrl:
      "/samples/avatars/avatar-17.svg",
  },
]
</script>

<template>
  <div class="mx-auto flex max-w-(--breakpoint-xl) flex-col justify-center gap-16 px-6 py-20 lg:px-8">
    <div class="mx-auto max-w-2xl text-center">
      <b class="text-center font-medium text-muted-foreground text-sm uppercase">
        We're hiring!
      </b>
      <h2 class="mt-3 font-medium text-4xl tracking-[-0.04em] sm:text-[2.75rem]">
        Team behind the product
      </h2>
      <p class="mt-4 text-pretty text-base text-muted-foreground sm:text-xl">
        Our philosophy is simple — hire a team of diverse, passionate people
        and foster a culture that empowers you to do you best work.
      </p>
      <div class="mt-8 flex flex-col gap-3 sm:flex-row-reverse sm:justify-center">
        <Button size="lg">Open Positions</Button>
        <Button size="lg" variant="outline">
          About Us
        </Button>
      </div>
    </div>

    <div class="grid w-full grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <div v-for="member in teamMembers"
        class="flex flex-col items-center rounded-lg bg-accent px-6 py-8 text-center"
        :key="member.name"
      >
        <img loading="lazy"
          :alt="member.name"
          class="h-16 w-16 shrink-0 rounded-full bg-accent object-cover sm:h-20 sm:w-20"
          :height="120"
          :src="member.imageUrl"
          :width="120"
        />
        <h3 class="mt-5 font-medium text-lg">{{ member.name }}</h3>
        <p class="text-muted-foreground text-sm">{{ member.title }}</p>
        <p class="mt-3 mb-6 text-pretty">{{ member.bio }}</p>
        <div class="mt-auto flex items-center gap-4">
          <a aria-label="Twitter" href="#" target="_blank">
            <IconBrandTwitter class="h-5 w-5 stroke-muted-foreground" />
          </a>
          <a aria-label="Dribbble" href="#" target="_blank">
            <IconBrandDribbble class="h-5 w-5 stroke-muted-foreground" />
          </a>
          <a aria-label="Twitch" href="#" target="_blank">
            <IconBrandTwitch class="h-5 w-5 stroke-muted-foreground" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
