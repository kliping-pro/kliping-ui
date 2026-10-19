<script lang="ts">
export const description = "Tautan, ikon sosial, dan hak cipta tersusun rata tengah bertumpuk."
</script>

<script setup lang="ts">
import {
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandTwitter,
  IconBrandYoutube,
} from '@tabler/icons-vue'
import { Button } from '@/components/ui/button'

const YEAR = new Date().getFullYear()

const LINKS = [
  { title: "Company", href: "#" },
  { title: "About Us", href: "#" },
  { title: "Team", href: "#" },
  { title: "Products", href: "#" },
  { title: "Blogs", href: "#" },
  { title: "Pricing", href: "#" },
]
</script>

<template>
  <footer class="pt-16 pb-8">
    <div class="container mx-auto grid place-items-center">
      <ul class="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
        <li v-for="({ title, href }, key) in LINKS" :key="key">
          <a
            :href="href"
            class="text-foreground hover:text-primary font-semibold"
          >
            {{ title }}
          </a>
        </li>
      </ul>
      <div class="my-8 flex gap-1">
        <Button as-child variant="ghost" size="icon">
          <a href="#" aria-label="Twitter">
            <IconBrandTwitter class="h-5 w-5" />
          </a>
        </Button>
        <Button as-child variant="ghost" size="icon">
          <a href="#" aria-label="YouTube">
            <IconBrandYoutube class="h-5 w-5" />
          </a>
        </Button>
        <Button as-child variant="ghost" size="icon">
          <a href="#" aria-label="Instagram">
            <IconBrandInstagram class="h-5 w-5" />
          </a>
        </Button>
        <Button as-child variant="ghost" size="icon">
          <a href="#" aria-label="GitHub">
            <IconBrandGithub class="h-5 w-5" />
          </a>
        </Button>
      </div>
      <p class="text-foreground">Copyright &copy; {{ YEAR }} Acme Inc.</p>
    </div>
  </footer>
</template>
