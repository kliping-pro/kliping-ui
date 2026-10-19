<script setup lang="ts">
import { Separator } from "@/components/ui/separator"
import Logo from '@/templates/homeguardian/components/Logo.vue'
import {
  IconBrandDribbble,
  IconBrandGithub,
  IconBrandTwitter,
} from '@tabler/icons-vue'

const sections = [
  {
    title: "Company",
    links: [
      { title: "About", href: "#" },
      { title: "Careers", href: "#" },
      { title: "Blog", href: "#" },
      { title: "Press", href: "#" },
      { title: "Contact", href: "#" },
    ],
  },
  {
    title: "Product",
    links: [
      { title: "Features", href: "#" },
      { title: "Pricing", href: "#" },
      { title: "Integrations", href: "#" },
      { title: "Demo", href: "#" },
      { title: "FAQs", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { title: "Docs", href: "#" },
      { title: "Help Center", href: "#" },
      { title: "Community", href: "#" },
      { title: "Tutorials", href: "#" },
      { title: "Status", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { title: "Privacy Policy", href: "#" },
      { title: "Terms of Service", href: "#" },
      { title: "Cookie Policy", href: "#" },
      { title: "Security", href: "#" },
      { title: "Licenses", href: "#" },
    ],
  },
]
</script>

<template>
  <footer class="bg-muted dark:bg-card border-t px-6 py-2">
    <div class="mx-auto max-w-screen-xl">
      <div class="pt-8 pb-12">
        <div class="mt-10 grid grid-cols-2 gap-12 sm:grid-cols-4 lg:grid-cols-6">
          <div class="col-span-full lg:col-span-2">
            <a href="/" class="inline-flex items-center gap-2">
              <Logo />
            </a>
            <p class="text-muted-foreground mt-1.5">
              Beautify your website with our free and premium blocks.
            </p>
          </div>
          <div v-for="{ title, links } in sections" :key="title">
            <h3 class="text-lg font-semibold">{{ title }}</h3>
            <ul class="mt-3 flex flex-col gap-2">
              <li v-for="{ title, href } in links" :key="title">
                <a
                  :href="href"
                  class="text-muted-foreground hover:text-primary"
                >
                  {{ title }}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Separator />
      <div class="flex flex-col-reverse items-center justify-center gap-6 px-2 pt-6 pb-4 sm:flex-row sm:justify-between">
        <p class="text-muted-foreground text-sm font-medium">
          &copy; {{ new Date().getFullYear() }} Bloxxee. All rights reserved.
        </p>
        <div class="flex items-center gap-4">
          <a href="/">
            <IconBrandDribbble class="text-muted-foreground h-5 w-5" />
          </a>
          <a href="/">
            <IconBrandTwitter class="text-muted-foreground h-5 w-5" />
          </a>
          <a href="/">
            <IconBrandGithub class="text-muted-foreground h-5 w-5" />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
