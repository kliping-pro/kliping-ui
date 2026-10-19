<script lang="ts">
export const description = "Footer dengan logo besar dan tautan berjajar di bawahnya."
</script>

<script setup lang="ts">
import { Wheat } from '@lucide/vue'
import {
  IconBrandDribbble,
  IconBrandGithub,
  IconBrandTwitter,
} from '@tabler/icons-vue'

const links = [
  {
    title: "About",
    href: "#",
  },
  {
    title: "Contact",
    href: "#",
  },
  {
    title: "Terms of Service",
    href: "#",
  },
  {
    title: "Privacy Policy",
    href: "#",
  },
]
</script>

<template>
  <footer class="border-t bg-background px-6 py-2">
    <div class="mx-auto w-full max-w-screen-2xl divide-y">
      <div class="flex flex-col items-center justify-between gap-4 px-2 pt-3 pb-5 sm:flex-row">
        <a class="flex items-center gap-2" href="/">
          <Wheat />
          <span class="font-medium text-xl">Bloxxee</span>
        </a>

        <ul class="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-medium text-sm">
          <li v-for="{ title, href } in links" :key="title">
            <a :href="href">{{ title }}</a>
          </li>
        </ul>
      </div>
      <div class="flex flex-col-reverse items-center justify-between gap-4 px-2 pt-4 pb-2 sm:flex-row">
        <p class="font-medium text-muted-foreground text-sm">
          Copyright &copy; {{ new Date().getFullYear() }} Bloxxee. All rights
          reserved.
        </p>

        <div class="flex items-center gap-4">
          <a aria-label="Dribbble" href="/">
            <IconBrandDribbble class="h-5 w-5 text-muted-foreground" />
          </a>
          <a aria-label="Twitter" href="/">
            <IconBrandTwitter class="h-5 w-5 text-muted-foreground" />
          </a>
          <a aria-label="GitHub" href="/">
            <IconBrandGithub class="h-5 w-5 text-muted-foreground" />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
