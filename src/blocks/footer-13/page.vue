<script lang="ts">
export const description = "Brand, tagline, dan ikon sosial di kiri; empat kolom tautan di kanan."
</script>

<script setup lang="ts">
import {
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandTwitter,
  IconBrandYoutube,
} from '@tabler/icons-vue'
import { Button } from '@/components/ui/button'

const LINKS = [
  {
    title: "Company",
    items: [
      { title: "About Us", href: "#" },
      { title: "Careers", href: "#" },
      { title: "Premium Tools", href: "#" },
      { title: "Blogs", href: "#" },
    ],
  },
  {
    title: "Pages",
    items: [
      { title: "Login", href: "#" },
      { title: "Register", href: "#" },
      { title: "Add List", href: "#" },
      { title: "Contact", href: "#" },
    ],
  },
  {
    title: "Legal",
    items: [
      { title: "Terms", href: "#" },
      { title: "Privacy", href: "#" },
      { title: "Teams", href: "#" },
      { title: "About Us", href: "#" },
    ],
  },
  {
    title: "Resources",
    items: [
      { title: "Blog", href: "#" },
      { title: "Services", href: "#" },
      { title: "Products", href: "#" },
      { title: "Pricing", href: "#" },
    ],
  },
]

const YEAR = new Date().getFullYear()
</script>

<template>
  <footer class="pt-16 pb-8">
    <div class="container mx-auto">
      <div class="grid grid-cols-1 justify-between gap-4 md:grid-cols-2">
        <div>
          <h6 class="text-xl font-semibold">Acme Inc.</h6>
          <p class="text-foreground my-4">
            The next generation of design systems.
          </p>
          <div class="flex gap-1">
            <Button as-child variant="ghost" size="icon">
              <a href="#" aria-label="Twitter">
                <IconBrandTwitter class="h-4 w-4" />
              </a>
            </Button>
            <Button as-child variant="ghost" size="icon">
              <a href="#" aria-label="YouTube">
                <IconBrandYoutube class="h-4 w-4" />
              </a>
            </Button>
            <Button as-child variant="ghost" size="icon">
              <a href="#" aria-label="Instagram">
                <IconBrandInstagram class="h-4 w-4" />
              </a>
            </Button>
            <Button as-child variant="ghost" size="icon">
              <a href="#" aria-label="GitHub">
                <IconBrandGithub class="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
        <div class="grid grid-cols-2 justify-between gap-6 lg:grid-cols-4">
          <div v-for="{ title, items } in LINKS" :key="title" class="space-y-2">
            <p class="mb-2 font-semibold">{{ title }}</p>
            <ul class="space-y-2">
              <li v-for="item in items" :key="item.title">
                <a
                  :href="item.href"
                  class="text-foreground hover:text-primary"
                >
                  {{ item.title }}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <p class="text-foreground mt-20 text-center">
        &copy; {{ YEAR }} Acme Inc. All Rights Reserved.
      </p>
    </div>
  </footer>
</template>
