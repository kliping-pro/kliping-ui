<script lang="ts">
export const description = "Tiga info kontak berikon dalam lingkaran, dengan subjudul, tanpa formulir."
</script>

<script setup lang="ts">
import { MailIcon, MapPinIcon, PhoneIcon } from '@lucide/vue'

const OPTIONS = [
  {
    icon: MapPinIcon,
    title: "Address",
    subTitle: "Find us at the office",
    description: "12124 First Street, nr 54",
  },
  {
    icon: MailIcon,
    title: "Email",
    subTitle: "Send us your feedback",
    description: "hello@email.com",
  },
  {
    icon: PhoneIcon,
    title: "Phone",
    subTitle: "Give us a ring",
    description: "+1 (424) 535-3523",
  },
]
</script>

<template>
  <section class="py-16">
    <div class="container mx-auto">
      <div class="mb-16 text-center">
        <span class="text-primary block text-sm font-semibold">
          Contact Us
        </span>
        <h2 class="my-4 text-center text-3xl font-bold">
          Got a Question?
        </h2>
        <p class="text-muted-foreground mx-auto max-w-lg text-center text-lg">
          We'd like to talk more about what you need
        </p>
      </div>
      <div class="grid grid-cols-1 justify-items-center gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
        <div v-for="({ icon, title, subTitle, description }, key) in OPTIONS" :key="key" class="text-center">
          <div class="bg-primary mx-auto mb-6 grid h-14 w-14 place-items-center rounded-full">
            <component :is="icon" class="text-primary-foreground h-6 w-6" />
          </div>
          <p class="text-lg font-semibold">{{ title }}</p>
          <p class="text-muted-foreground my-3 block">{{ subTitle }}</p>
          <p>{{ description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
