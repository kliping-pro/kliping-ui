<script lang="ts">
export const description = "Foto latar bergelap dengan judul dan empat info kontak berikon tanpa formulir."
</script>

<script setup lang="ts">
import { MailIcon, MapPinIcon, PhoneIcon, UserIcon } from '@lucide/vue'

const OPTIONS = [
  {
    icon: MapPinIcon,
    title: "Address",
    description: "12124 First Street, nr 54",
  },
  {
    icon: MailIcon,
    title: "Email",
    description: "hello@email.com",
  },
  {
    icon: PhoneIcon,
    title: "Phone",
    description: "+1 (424) 535-3523",
  },
  {
    icon: UserIcon,
    title: "Contact",
    description: "Andrew Samian",
  },
]
</script>

<template>
  <section class="relative min-h-[70vh] w-full bg-cover bg-center">
    <img
      src="/samples/photos/photo-20.svg"
      alt="Background"
      class="absolute inset-0 h-full w-full object-cover"
    />
    <div class="absolute inset-0 bg-black/50" />
    <div class="relative flex min-h-[70vh] flex-col items-center justify-center px-4 py-16 text-center">
      <h2 class="mb-6 text-5xl font-bold text-white">Got a Question?</h2>
      <p class="mx-auto mb-12 max-w-xl text-xl text-white/80">
        We'd like to talk more about what you need
      </p>
      <div class="grid grid-cols-1 justify-items-center gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="({ icon, title, description }, key) in OPTIONS"
          :key="key"
          class="group text-center transition-transform hover:scale-105"
        >
          <div class="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-white/10 shadow-lg transition-all group-hover:bg-white/20 group-hover:shadow-xl">
            <component :is="icon" class="h-8 w-8 text-white" />
          </div>
          <p class="mb-2 text-xl font-bold text-white">{{ title }}</p>
          <p class="text-base text-gray-300">{{ description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
