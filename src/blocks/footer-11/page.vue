<script lang="ts">
export const description = "Card newsletter berlatar primary di atas baris tautan dan ikon sosial."
</script>

<script setup lang="ts">
import {
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandTwitter,
  IconBrandYoutube,
} from '@tabler/icons-vue'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

const LINKS = [
  { title: "About Us", href: "#" },
  { title: "Careers", href: "#" },
  { title: "Press", href: "#" },
  { title: "Blog", href: "#" },
  { title: "Pricing", href: "#" },
]

const YEAR = new Date().getFullYear()
</script>

<template>
  <section class="pt-16 pb-8">
    <div class="container mx-auto text-center">
      <Card class="bg-primary border-primary grid justify-center px-6 py-12 text-center shadow-none">
        <h2 class="text-secondary text-2xl font-semibold">
          Be the first who see the news
        </h2>
        <p class="text-secondary mt-4 max-w-lg [text-wrap:_balance]">
          Your company may not be in the software business, but eventually, a
          software company will be in your business.
        </p>
        <div class="mx-auto mt-10 flex w-full max-w-sm flex-col gap-x-2 gap-y-4 sm:flex-row">
          <Input
            id="email"
            type="email"
            placeholder="someone@example.com"
            class="border-white/20 bg-white/10 text-white placeholder:text-white/60"
          />
          <Button variant="secondary" class="shrink-0">
            Subscribe
          </Button>
        </div>
      </Card>
      <div class="mt-16 mb-6 flex flex-col items-center !justify-center gap-x-10 gap-y-3 lg:flex-row lg:!justify-between">
        <p class="font-semibold">Acme Inc.</p>
        <ul class="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <li v-for="({ title, href }, key) in LINKS" :key="key">
            <a :href="href" class="text-foreground hover:text-primary">
              {{ title }}
            </a>
          </li>
        </ul>
        <div class="flex gap-1">
          <Button as-child variant="ghost" size="icon" class="h-8 w-8">
            <a href="#" aria-label="Twitter">
              <IconBrandTwitter class="h-5 w-5" />
            </a>
          </Button>
          <Button as-child variant="ghost" size="icon" class="h-8 w-8">
            <a href="#" aria-label="YouTube">
              <IconBrandYoutube class="h-5 w-5" />
            </a>
          </Button>
          <Button as-child variant="ghost" size="icon" class="h-8 w-8">
            <a href="#" aria-label="Instagram">
              <IconBrandInstagram class="h-5 w-5" />
            </a>
          </Button>
          <Button as-child variant="ghost" size="icon" class="h-8 w-8">
            <a href="#" aria-label="GitHub">
              <IconBrandGithub class="h-5 w-5" />
            </a>
          </Button>
        </div>
      </div>
      <p class="text-foreground text-sm">
        All rights reserved. Copyright &copy; {{ YEAR }} Acme Inc.
      </p>
    </div>
  </section>
</template>
