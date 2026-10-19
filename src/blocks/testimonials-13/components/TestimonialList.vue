<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import {
  Logo01,
  Logo02,
  Logo03,
  Logo04,
  Logo05,
  Logo06,
} from "@/components/logos"
import { cn } from "@/lib/utils"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import TwitterLogo from '@/blocks/testimonials-13/components/TwitterLogo.vue'

defineOptions({ inheritAttrs: false })

const props = defineProps<{ class?: HTMLAttributes['class'] }>()

const testimonials = [
  {
    id: 1,
    name: "John Doe",
    designation: "Software Engineer",
    company: "TechCorp",
    testimonial:
      "This product has completely transformed the way we work. The efficiency and ease of use are unmatched!",
    avatar:
      "/samples/avatars/avatar-16.svg",
    logo: Logo01,
  },
  {
    id: 2,
    name: "Sophia Lee",
    designation: "Data Analyst",
    company: "InsightTech",
    testimonial:
      "This tool has saved me hours of work! The analytics and reporting features are incredibly powerful.",
    avatar:
      "/samples/avatars/avatar-17.svg",
    logo: Logo02,
  },
  {
    id: 3,
    name: "Michael Johnson",
    designation: "UX Designer",
    company: "DesignPro",
    testimonial:
      "An amazing tool that simplifies complex tasks. Highly recommended for professionals in the industry.",
    avatar:
      "/samples/avatars/avatar-18.svg",
    logo: Logo03,
  },
  {
    id: 4,
    name: "Emily Davis",
    designation: "Marketing Specialist",
    company: "BrandBoost",
    testimonial:
      "I've seen a significant improvement in our team's productivity since we started using this service.",
    avatar:
      "/samples/avatars/avatar-19.svg",
    logo: Logo04,
  },
  {
    id: 5,
    name: "Daniel Martinez",
    designation: "Full-Stack Developer",
    company: "CodeCrafters",
    testimonial:
      "The best investment we've made! The support team is also super responsive and helpful.",
    avatar:
      "/samples/avatars/avatar-20.svg",
    logo: Logo05,
  },
  {
    id: 6,
    name: "Jane Smith",
    designation: "Product Manager",
    company: "InnovateX",
    testimonial:
      "The user experience is top-notch! The interface is clean, intuitive, and easy to navigate.",
    avatar:
      "/samples/avatars/avatar-21.svg",
    logo: Logo06,
  },
]

const gridPattern = {
  backgroundImage: [
    "linear-gradient(to right, var(--color-muted-foreground) 1px, transparent 1px)",
    "linear-gradient(to bottom, var(--color-muted-foreground) 1px, transparent 1px)",
  ].join(", "),
  backgroundSize: "20px 20px",
  backgroundPosition: "0 0, 0 0",
  maskImage: [
    "repeating-linear-gradient(to right, black 0px, black 3px, transparent 3px, transparent 8px)",
    "repeating-linear-gradient(to bottom, black 0px, black 3px, transparent 3px, transparent 8px)",
  ].join(", "),
  WebkitMaskImage: [
    "repeating-linear-gradient(to right, black 0px, black 3px, transparent 3px, transparent 8px)",
    "repeating-linear-gradient(to bottom, black 0px, black 3px, transparent 3px, transparent 8px)",
  ].join(", "),
  maskComposite: "intersect",
  WebkitMaskComposite: "source-in",
}
</script>

<template>
  <div v-for="testimonial in testimonials"
    class="-mx-1 flex w-full max-w-sm flex-col odd:flex-col-reverse"
    :key="testimonial.id"
  >
    <div
      :class="cn('rounded-xl border bg-background shadow-xs/3', props.class)"
      v-bind="$attrs"
    >
      <div class="p-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <Avatar class="size-10">
              <AvatarImage
                class="object-cover"
                :src="testimonial.avatar"
              />
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
          <Button as-child size="icon" variant="ghost">
            <a aria-label="Twitter" href="#" target="_blank">
              <TwitterLogo class="h-4 w-4" />
            </a>
          </Button>
        </div>
        <p class="mt-5 text-[17px]">{{ testimonial.testimonial }}</p>
      </div>
    </div>
    <div class="mask-y-from-75% mask-x-from-75% relative flex h-42 w-96 items-center justify-center p-6">
      <component :is="testimonial.logo" class="h-20 w-50 text-muted-foreground" />

      <div
        class="absolute inset-0 isolate -z-1 opacity-15"
        :style="gridPattern"
      />
    </div>
  </div>
</template>
