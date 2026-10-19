<script setup lang="ts">
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import TwitterLogo from '@/templates/pure-landing/components/TwitterLogo.vue'

const testimonials = [
  {
    id: 1,
    name: "John Doe",
    designation: "Software Engineer",
    company: "TechCorp",
    testimonial:
      "This product has completely transformed the way we work. The efficiency and ease of use are unmatched!",
    avatar: "/samples/avatars/avatar-10.svg",
  },
  {
    id: 2,
    name: "Sophia Lee",
    designation: "Data Analyst",
    company: "InsightTech",
    testimonial:
      "This tool has saved me hours of work! The analytics and reporting features are incredibly powerful.",
    avatar: "/samples/avatars/avatar-11.svg",
  },
  {
    id: 3,
    name: "Michael Johnson",
    designation: "UX Designer",
    company: "DesignPro",
    testimonial:
      "An amazing tool that simplifies complex tasks. Highly recommended for professionals in the industry.",
    avatar: "/samples/avatars/avatar-12.svg",
  },
  {
    id: 4,
    name: "Emily Davis",
    designation: "Marketing Specialist",
    company: "BrandBoost",
    testimonial:
      "I've seen a significant improvement in our team's productivity since we started using this service.",
    avatar: "/samples/avatars/avatar-13.svg",
  },
  {
    id: 5,
    name: "Daniel Martinez",
    designation: "Full-Stack Developer",
    company: "CodeCrafters",
    testimonial:
      "The best investment we've made! The support team is also super responsive and helpful.",
    avatar: "/samples/avatars/avatar-14.svg",
  },
  {
    id: 6,
    name: "Jane Smith",
    designation: "Product Manager",
    company: "InnovateX",
    testimonial:
      "The user experience is top-notch! The interface is clean, intuitive, and easy to navigate.",
    avatar: "/samples/avatars/avatar-15.svg",
  },
]
</script>

<template>
    <div v-for="testimonial in testimonials"
      :key="testimonial.id"
      class="min-w-96 max-w-sm bg-accent rounded-xl p-6"
    >
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <Avatar>
            <AvatarFallback class="text-xl font-medium bg-primary text-primary-foreground">
              {{ testimonial.name.charAt(0) }}
            </AvatarFallback>
          </Avatar>
          <div>
            <p class="text-lg font-semibold">{{ testimonial.name }}</p>
            <p class="text-sm text-gray-500">{{ testimonial.designation }}</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" as-child>
          <a href="#" target="_blank">
            <TwitterLogo class="w-4 h-4" />
          </a>
        </Button>
      </div>
      <p class="mt-5 text-[17px]">{{ testimonial.testimonial }}</p>
    </div>
</template>
