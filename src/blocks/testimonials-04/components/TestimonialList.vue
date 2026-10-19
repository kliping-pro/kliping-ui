<script setup lang="ts">
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import TwitterLogo from '@/blocks/testimonials-04/components/TwitterLogo.vue'

const testimonials = [
  {
    id: 1,
    name: "John Doe",
    designation: "Software Engineer",
    company: "TechCorp",
    testimonial:
      "This product has completely transformed the way we work. The efficiency and ease of use are unmatched!",
    avatar: "/samples/avatars/avatar-14.svg",
  },
  {
    id: 2,
    name: "Sophia Lee",
    designation: "Data Analyst",
    company: "InsightTech",
    testimonial:
      "This tool has saved me hours of work! The analytics and reporting features are incredibly powerful.",
    avatar: "/samples/avatars/avatar-15.svg",
  },
  {
    id: 3,
    name: "Michael Johnson",
    designation: "UX Designer",
    company: "DesignPro",
    testimonial:
      "An amazing tool that simplifies complex tasks. Highly recommended for professionals in the industry.",
    avatar: "/samples/avatars/avatar-16.svg",
  },
  {
    id: 4,
    name: "Emily Davis",
    designation: "Marketing Specialist",
    company: "BrandBoost",
    testimonial:
      "I've seen a significant improvement in our team's productivity since we started using this service.",
    avatar: "/samples/avatars/avatar-17.svg",
  },
  {
    id: 5,
    name: "Daniel Martinez",
    designation: "Full-Stack Developer",
    company: "CodeCrafters",
    testimonial:
      "The best investment we've made! The support team is also super responsive and helpful.",
    avatar: "/samples/avatars/avatar-18.svg",
  },
  {
    id: 6,
    name: "Jane Smith",
    designation: "Product Manager",
    company: "InnovateX",
    testimonial:
      "The user experience is top-notch! The interface is clean, intuitive, and easy to navigate.",
    avatar: "/samples/avatars/avatar-19.svg",
  },
]
</script>

<template>
  <div v-for="testimonial in testimonials"
    class="min-w-96 max-w-sm rounded-xl bg-accent p-6"
    :key="testimonial.id"
  >
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <Avatar class="size-10">
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
</template>
