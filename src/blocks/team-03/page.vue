<script lang="ts">
export const description = "Kartu tim dengan tautan media sosial di tiap orang."
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
    bio: "Former co-founder of Opendoor. Early staff at Spotify.",
    imageUrl:
      "/samples/avatars/avatar-03.svg",
  },
  {
    name: "Jane Doe",
    title: "Engineering Manager",
    bio: "Lead engineering teams at Figma, Pitch, and Protocol Labs.",
    imageUrl:
      "/samples/avatars/avatar-04.svg",
  },
  {
    name: "Bob Smith",
    title: "Product Manager",
    bio: "Former PM for Linear, Lambda School, and On Deck.",
    imageUrl:
      "/samples/avatars/avatar-05.svg",
  },
  {
    name: "Peter Johnson",
    title: "Frontend Developer",
    bio: "Former frontend dev for Linear, Coinbase, and Postscript.",
    imageUrl:
      "/samples/avatars/avatar-06.svg",
  },
  {
    name: "David Lee",
    title: "Backend Developer",
    bio: "Lead backend dev at Clearbit. Former Clearbit and Loom.",
    imageUrl:
      "/samples/avatars/avatar-07.svg",
  },
  {
    name: "Sarah Williams",
    title: "Product Designer",
    bio: "Founding design team at Figma. Former Pleo, Stripe, and Tile.",
    imageUrl:
      "/samples/avatars/avatar-08.svg",
  },
]
</script>

<template>
  <div class="mx-auto flex max-w-(--breakpoint-xl) flex-col justify-center gap-14 px-6 py-20 lg:flex-row lg:px-8">
    <div class="sm:max-w-sm lg:max-w-xs">
      <b class="font-medium text-muted-foreground text-sm uppercase">
        Our team
      </b>
      <h2 class="mt-3 font-medium text-3xl tracking-[-0.04em] md:text-4xl">
        Leadership Team
      </h2>
      <p class="mt-4 text-base text-foreground/80 sm:text-lg">
        We're a cross-disciplinary team that loves to create great
        experiences for our customers.
      </p>
      <div class="mt-8 flex flex-col gap-3 sm:flex-row-reverse sm:justify-end">
        <Button size="lg">Open Positions</Button>
        <Button size="lg" variant="outline">
          About Us
        </Button>
      </div>
    </div>

    <div class="grid w-full grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 md:grid-cols-3">
      <div v-for="member in teamMembers" class="flex items-start gap-4 md:flex-col" :key="member.name">
        <img loading="lazy"
          :alt="member.name"
          class="h-16 w-16 shrink-0 rounded-full bg-secondary object-cover sm:h-20 sm:w-20"
          :height="120"
          :src="member.imageUrl"
          :width="120"
        />
        <div>
          <h3 class="font-medium text-lg">{{ member.name }}</h3>
          <p class="text-muted-foreground text-sm">{{ member.title }}</p>
          <p class="mt-2 text-foreground/90">{{ member.bio }}</p>
          <div class="mt-4 flex items-center gap-2.5">
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
  </div>
</template>
