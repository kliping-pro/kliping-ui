<script lang="ts">
export const description = "Tiga kolom tautan di kiri, form langganan Email dan checkbox di kanan."
</script>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

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
]

const YEAR = new Date().getFullYear()
</script>

<template>
  <footer class="pt-16 pb-8">
    <div class="container mx-auto">
      <div class="grid grid-cols-1 justify-between gap-10 md:grid-cols-2">
        <div class="grid grid-cols-3 justify-between gap-x-6 gap-y-4">
          <div v-for="{ title, items } in LINKS" :key="title">
            <p class="mb-2 font-semibold">{{ title }}</p>
            <ul>
              <li v-for="item in items" :key="item.title" class="mb-1">
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
        <div class="lg:ml-auto">
          <p class="mb-2 font-semibold">Subscribe</p>
          <p class="text-foreground max-w-sm [text-wrap:_balance]">
            Get access to subscriber exclusive deals and be the first who gets
            informed about fresh sales.
          </p>
          <div class="mt-4 flex w-full max-w-sm items-end gap-2">
            <div class="w-full">
              <Label
                for="email"
                class="mb-2 inline-block text-sm font-semibold"
              >
                Your Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="someone@example.com"
              />
            </div>
            <Button class="shrink-0">Subscribe</Button>
          </div>
          <div class="mt-3 flex items-center gap-2">
            <Checkbox id="checkbox-link" />
            <Label
              for="checkbox-link"
              class="text-foreground flex gap-1 select-none"
            >
              I agree with the
              <a href="#" class="text-primary">
                terms and conditions
              </a>
            </Label>
          </div>
        </div>
      </div>
      <p class="text-foreground mt-10 text-center">
        &copy; {{ YEAR }} Acme Inc. All Rights Reserved.
      </p>
    </div>
  </footer>
</template>
