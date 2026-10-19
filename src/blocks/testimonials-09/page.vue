<script lang="ts">
export const description = "Kolom masonry bergambar dengan bintang."
</script>

<script setup lang="ts">
const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Product Designer at Canva",
    avatar: "/samples/avatars/avatar-20.svg",
    testimonial:
      "This product completely changed the way I work. The interface is intuitive and the performance is top-notch.",
  },
  {
    name: "Daniel Kim",
    role: "CTO at NextLaunch",
    avatar: "/samples/avatars/avatar-21.svg",
    testimonial:
      "We integrated this solution into our stack within days, and the benefits were immediate. Our team collaboration improved, deployment times dropped, and the analytics insights have helped us fine-tune performance at every level.",
  },
  {
    name: "Emily Chen",
    role: "Marketing Manager at HubSpot",
    avatar: "/samples/avatars/avatar-22.svg",
    testimonial:
      "I've worked with multiple marketing platforms over the years, but none have offered the kind of personalized experience and seamless integration that this one does. It has truly elevated our campaigns and improved our ROI.",
  },
  {
    name: "Raj Mehta",
    role: "Frontend Developer at Zomato",
    avatar: "/samples/avatars/avatar-23.svg",
    testimonial: "Clean, fast, and reliable. Everything a dev could ask for.",
  },
  {
    name: "Aisha Patel",
    role: "Software Engineer at Swiggy",
    avatar: "/samples/avatars/avatar-24.svg",
    testimonial: "Smooth and delightful experience!",
  },
  {
    name: "Liam Garcia",
    role: "Startup Founder",
    avatar: "/samples/avatars/avatar-01.svg",
    testimonial:
      "I've used dozens of tools in the past year alone, and this is one of the few I'd actually recommend to other founders. It doesn't just work — it works smart. Everything feels thoughtfully designed and built with care.",
  },
]
</script>

<template>
  <div class="mx-auto max-w-7xl px-6 py-12 sm:py-20">
    <h2 class="text-center font-medium text-4xl tracking-[-0.04em] md:text-[2.75rem]">
      Loved by Our Users
    </h2>
    <p class="mt-2 text-balance text-center text-lg text-muted-foreground tracking-[-0.015em] sm:mt-4 sm:text-2xl">
      Their experiences speak louder than words
    </p>

    <div class="mx-auto mt-16 max-w-5xl columns-1 gap-6 sm:columns-2 lg:columns-3">
      <div v-for="({ name, avatar, role, testimonial }, index) in testimonials"
        class="relative mb-6 flex break-inside-avoid flex-col rounded-lg border border-primary/20 bg-linear-to-br from-primary/20 to-primary/10 px-5 pt-10 pb-3"
        :key="index"
      >
        <!-- Quote -->
        <span class="absolute top-0 left-4 select-none font-satoshi text-9xl text-primary/50">
          &ldquo;
        </span>

        <p class="grow py-6 font-medium text-lg">{{ testimonial }}</p>
        <div class="mt-2 flex items-center gap-3 py-3.5 sm:mt-4">
          <img alt="" class="size-12 rounded-full" :src="avatar" />
          <div class="flex flex-col">
            <p class="font-medium">{{ name }}</p>
            <p class="text-muted-foreground text-sm">{{ role }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
