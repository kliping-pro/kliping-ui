<script lang="ts">
export const description = "Petak tiga kolom dengan penilaian bintang di tiap sel."
</script>

<script setup lang="ts">
import { StarIcon } from '@lucide/vue'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { cn } from "@/lib/utils"

const testimonials = [
  {
    id: 1,
    name: "John Doe",
    designation: "Software Engineer",
    company: "TechCorp",
    testimonial:
      "This product has completely transformed the way we work. The efficiency and ease of use are unmatched!",
    avatar: "/samples/avatars/avatar-16.svg",
  },
  {
    id: 2,
    name: "Sophia Lee",
    designation: "Data Analyst",
    company: "InsightTech",
    testimonial:
      "This tool has saved me hours of work! The analytics and reporting features are incredibly powerful.",
    avatar: "/samples/avatars/avatar-17.svg",
  },
  {
    id: 3,
    name: "Michael Johnson",
    designation: "UX Designer",
    company: "DesignPro",
    testimonial:
      "An amazing tool that simplifies complex tasks. Highly recommended for professionals in the industry.",
    avatar: "/samples/avatars/avatar-18.svg",
  },
  {
    id: 4,
    name: "Emily Davis",
    designation: "Marketing Specialist",
    company: "BrandBoost",
    testimonial:
      "I've seen a significant improvement in our team's productivity since we started using this service.",
    avatar: "/samples/avatars/avatar-19.svg",
  },
  {
    id: 5,
    name: "Daniel Martinez",
    designation: "Full-Stack Developer",
    company: "CodeCrafters",
    testimonial:
      "The best investment we've made! The support team is also super responsive and helpful.",
    avatar: "/samples/avatars/avatar-20.svg",
  },
  {
    id: 6,
    name: "Jane Smith",
    designation: "Product Manager",
    company: "InnovateX",
    testimonial:
      "The user experience is top-notch! The interface is clean, intuitive, and easy to navigate.",
    avatar: "/samples/avatars/avatar-21.svg",
  },
]
</script>

<template>
  <div class="px-6 py-20">
    <div>
      <h2 class="text-center font-medium text-4xl tracking-[-0.04em] md:text-[2.75rem]">
        Loved by developers
      </h2>
      <p class="mt-4 text-center text-muted-foreground text-xl tracking-[-0.015em] md:text-2xl">
        See how developers and teams are achieving more with us
      </p>
      <div class="mx-auto mt-8 w-full max-w-(--breakpoint-xl) sm:mt-14 lg:mt-16">
        <div class="grid grid-cols-1 overflow-hidden md:grid-cols-2 lg:grid-cols-3">
          <div v-for="testimonial in testimonials"
            :class="cn(
              'relative flex flex-col px-6 py-10',
              'before:absolute before:inset-0 before:-m-px before:border-border before:border-r before:border-b before:border-dashed before:content-[\'\']'
            )"
            :key="testimonial.id"
          >
            <div class="flex items-center justify-center gap-1">
              <StarIcon class="h-6 w-6 fill-yellow-500 stroke-yellow-500" />
              <StarIcon class="h-6 w-6 fill-yellow-500 stroke-yellow-500" />
              <StarIcon class="h-6 w-6 fill-yellow-500 stroke-yellow-500" />
              <StarIcon class="h-6 w-6 fill-yellow-500 stroke-yellow-500" />
              <StarIcon class="h-6 w-6 fill-yellow-500 stroke-yellow-500" />
            </div>
            <p class="my-6 max-w-md text-pretty text-center text-[17px]">
              {{ testimonial.testimonial }}
            </p>
            <div class="mt-auto flex items-center justify-center gap-3">
              <Avatar class="size-9">
                <AvatarFallback class="bg-primary font-medium text-primary-foreground text-xl">
                  {{ testimonial.name.charAt(0) }}
                </AvatarFallback>
              </Avatar>
              <div>
                <p class="font-medium">{{ testimonial.name }}</p>
                <p class="text-muted-foreground text-sm">
                  {{ testimonial.designation }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
