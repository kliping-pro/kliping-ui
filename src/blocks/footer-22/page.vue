<script lang="ts">
export const description = "Brand dan tautan di kiri, dua baris kutipan dan ikon sosial rata kanan."
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
  { title: "About Us", href: "#" },
  { title: "Careers", href: "#" },
  { title: "Press", href: "#" },
  { title: "Blog", href: "#" },
  { title: "Pricing", href: "#" },
]
</script>

<template>
  <footer class="pt-16 pb-8">
    <div class="container mx-auto">
      <div class="mb-4 flex flex-col justify-between gap-4 md:flex-row">
        <div>
          <h6 class="text-xl font-semibold">Acme Inc.</h6>
          <ul class="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
            <li v-for="({ title, href }, key) in LINKS" :key="key">
              <a
                :href="href"
                class="text-foreground hover:text-primary font-medium"
              >
                {{ title }}
              </a>
            </li>
          </ul>
        </div>
        <div class="md:text-right">
          <p class="font-semibold">
            The reward for getting on the stage is fame.
          </p>
          <p class="mb-4 font-semibold">
            The price of fame is you can't get off the stage.
          </p>
          <div class="flex gap-1 md:justify-end">
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
        </div>
      </div>
      <p class="text-foreground">
        All rights reserved. &copy; {{ YEAR }} Acme Inc.
      </p>
    </div>
  </footer>
</template>
