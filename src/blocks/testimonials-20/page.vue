<script lang="ts">
export const description = "Testimoni interaktif dengan deretan avatar pengganti profil dan foto besar."
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const testimonials = [
  {
    image:
      "/samples/avatars/avatar-15.svg",
    name: "Sarah Johnson",
    role: "Product Designer",
    quote:
      "The attention to detail and component quality is outstanding. These UI blocks have significantly accelerated our design workflow and improved consistency across our products.",
  },
  {
    image:
      "/samples/avatars/avatar-16.svg",
    name: "Michael Chen",
    role: "Tech Lead at Stripe",
    quote:
      "Exceptional component library with excellent documentation. The customization options and TypeScript support make it perfect for enterprise applications. Highly recommend!",
  },
  {
    image:
      "/samples/avatars/avatar-17.svg",
    name: "Emma Rodriguez",
    role: "Frontend Developer",
    quote:
      "A game-changer for rapid prototyping and production. The components are production-ready, well-tested, and the design system is incredibly cohesive. Love it!",
  },
]

const selectedTestimonial = ref(0)

const initials = (name: string) => name.split(" ").map(n => n[0]).join("")
</script>

<template>
  <section class="py-16">
    <div class="container mx-auto grid grid-cols-12 items-center gap-y-8 px-4">
      <div class="col-span-full row-start-2 md:col-span-8 md:row-start-auto">
        <h2 class="text-3xl font-bold">What Developers Say</h2>
        <p class="text-muted-foreground my-4 max-w-lg">
          {{ testimonials[selectedTestimonial]!.quote }}
        </p>
        <div>
          <p class="font-semibold">
            {{ testimonials[selectedTestimonial]!.name }}
          </p>
          <p class="text-muted-foreground text-sm">
            {{ testimonials[selectedTestimonial]!.role }}
          </p>
        </div>
        <div class="divide-border mt-8 flex items-center divide-x">
          <div
            v-for="(testimonial, index) in testimonials"
            :key="index"
            :class="index !== 0 ? 'px-4' : 'pr-4'"
          >
            <Avatar
              role="button"
              class="h-12 w-12 cursor-pointer rounded-lg"
              @click="selectedTestimonial = index"
            >
              <AvatarImage :src="testimonial.image" />
              <AvatarFallback>{{ initials(testimonial.name) }}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
      <div class="col-span-full md:col-span-4">
        <img
          :src="testimonials[selectedTestimonial]!.image"
          alt="user profile"
          class="h-full max-h-96 w-full max-w-96 rounded-xl object-cover object-center"
        >
      </div>
    </div>
  </section>
</template>
