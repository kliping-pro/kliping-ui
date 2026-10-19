<script lang="ts">
export const description = "Footer gelap empat kolom tautan dengan Select bahasa, mata uang, dan newsletter."
</script>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

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
  <footer class="bg-primary pt-16 pb-8">
    <div class="container mx-auto">
      <div class="grid grid-cols-1 justify-between gap-10 sm:grid-cols-2">
        <div class="row-start-2 grid grid-cols-2 justify-between gap-6 sm:row-auto lg:grid-cols-4">
          <div v-for="{ title, items } in LINKS" :key="title" class="space-y-2">
            <p class="text-secondary mb-2 font-semibold">{{ title }}</p>
            <ul class="space-y-2">
              <li v-for="item in items" :key="item.title">
                <a
                  :href="item.href"
                  class="text-secondary hover:text-secondary"
                >
                  {{ item.title }}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="lg:ml-auto">
          <p class="text-secondary mb-4 flex font-semibold lg:justify-end">
            Language & Currency
          </p>
          <Select>
            <SelectTrigger aria-label="Language" class="mb-4 border-white/20 bg-white/5 text-white data-[placeholder]:text-white lg:w-72">
              <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="spanish">Spanish</SelectItem>
              <SelectItem value="hindi">Hindi</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger aria-label="Currency" class="border-white/20 bg-white/5 text-white data-[placeholder]:text-white lg:w-72">
              <SelectValue placeholder="Select Currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="usd">USD</SelectItem>
              <SelectItem value="euro">Euro</SelectItem>
              <SelectItem value="rupee">Rupee</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div class="border-surface/50 mt-10 flex flex-col justify-between gap-4 border-t border-b pt-6 pb-8 md:flex-row lg:items-end">
        <div>
          <p class="text-secondary mb-2 font-semibold">
            Subscribe to our newsletters
          </p>
          <p class="text-secondary">
            The latest news, articles and resources sent to your inbox weekly.
          </p>
        </div>
        <div class="flex w-full items-end gap-2 md:max-w-sm">
          <div class="w-full">
            <Label
              for="email"
              class="text-secondary mb-2 inline-block text-sm font-semibold"
            >
              Your Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="someone@example.com"
              class="border-white/20 bg-white/10 text-white placeholder:text-white/60"
            />
          </div>
          <Button variant="secondary" class="shrink-0">
            subscribe
          </Button>
        </div>
      </div>
      <p class="text-secondary mt-8">
        All rights reserved. &copy; {{ YEAR }} Acme Inc.
      </p>
    </div>
  </footer>
</template>
