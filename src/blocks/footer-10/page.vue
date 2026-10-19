<script lang="ts">
export const description = "Footer bergaris atas dengan hak cipta, empat tautan, dan tombol Sign in."
</script>

<script setup lang="ts">
import { Button } from '@/components/ui/button'

const YEAR = new Date().getFullYear()

const LINKS = [
  { title: "Home", href: "#" },
  { title: "About Us", href: "#" },
  { title: "Blog", href: "#" },
  { title: "Service", href: "#" },
]
</script>

<template>
  <footer class="pt-16 pb-8">
    <div class="container mx-auto">
      <div class="border-surface flex flex-row flex-wrap items-center !justify-center gap-x-10 gap-y-3 border-t pt-8 text-center md:!justify-between">
        <p class="text-foreground">
          Copyright &copy; {{ YEAR }} Acme Inc.
        </p>
        <ul class="flex flex-wrap items-center justify-center gap-6">
          <li v-for="({ title, href }, key) in LINKS" :key="key">
            <a :href="href" class="text-foreground hover:text-primary">
              {{ title }}
            </a>
          </li>
          <li class="w-full sm:w-auto">
            <Button class="w-full sm:max-w-fit">Sign in</Button>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>
