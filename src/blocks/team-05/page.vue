<script lang="ts">
export const description = "Foto besar empat kolom dengan tautan media sosial di bawahnya."
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
    bio: "Former co-founder of Opendoor. Early staff at Spotify and Clearbit.",
    imageUrl:
      "/samples/avatars/avatar-17.svg",
  },
  {
    name: "Jane Doe",
    title: "Engineering Manager",
    bio: "Lead engineering teams at Figma, Pitch, and Protocol Labs.",
    imageUrl:
      "/samples/avatars/avatar-18.svg",
  },
  {
    name: "Bob Smith",
    title: "Product Manager",
    bio: "Former PM for Linear, Lambda School, and On Deck.",
    imageUrl:
      "/samples/avatars/avatar-19.svg",
  },
  {
    name: "Peter Johnson",
    title: "Frontend Developer",
    bio: "Former frontend dev for Linear, Coinbase, and Postscript.",
    imageUrl:
      "/samples/avatars/avatar-20.svg",
  },
  {
    name: "David Lee",
    title: "Backend Developer",
    bio: "Lead backend dev at Clearbit. Former Clearbit and Loom.",
    imageUrl:
      "/samples/avatars/avatar-21.svg",
  },
  {
    name: "Sarah Williams",
    title: "Product Designer",
    bio: "Founding design team at Figma. Former Pleo, Stripe, and Tile.",
    imageUrl:
      "/samples/avatars/avatar-22.svg",
  },
  {
    name: "Michael Brown",
    title: "UX Researcher",
    bio: "Lead user research for Slack. Contractor for Netflix and Udacity.",
    imageUrl:
      "/samples/avatars/avatar-23.svg",
  },
  {
    name: "Elizabeth Johnson",
    title: "Customer Success",
    bio: "Lead CX at Wealthsimple. Former PagerDuty and Sqreen.",
    imageUrl:
      "/samples/avatars/avatar-24.svg",
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
        A team of creators
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

    <div class="grid w-full grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 md:grid-cols-4">
      <div v-for="member in teamMembers" :key="member.name">
        <img loading="lazy"
          :alt="member.name"
          class="aspect-square w-full rounded-lg bg-secondary object-cover"
          :height="600"
          :src="member.imageUrl"
          :width="600"
        />
        <h3 class="mt-4 font-medium text-lg">{{ member.name }}</h3>
        <p class="text-muted-foreground text-sm">{{ member.title }}</p>
        <p class="mt-3">{{ member.bio }}</p>
        <div class="mt-6 flex items-center gap-2.5">
          <Button as-child size="icon" variant="secondary">
            <a aria-label="Twitter" href="#" target="_blank">
              <IconBrandTwitter class="stroke-muted-foreground" />
            </a>
          </Button>
          <Button as-child size="icon" variant="secondary">
            <a aria-label="Dribbble" href="#" target="_blank">
              <IconBrandDribbble class="stroke-muted-foreground" />
            </a>
          </Button>
          <Button as-child size="icon" variant="secondary">
            <a aria-label="Twitch" href="#" target="_blank">
              <IconBrandTwitch class="stroke-muted-foreground" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
