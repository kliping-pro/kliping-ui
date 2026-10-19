<script lang="ts">
export const description = "Panel hitam berisi info kontak di kiri dan formulir dalam card di kanan."
</script>

<script setup lang="ts">
import { MailIcon, PhoneIcon } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const DATA = [
  {
    icon: MailIcon,
    title: "Find us at the office",
    options: ["Bld Mihail Kogalniceanu, nr. 8,", "7652 Bucharest,", "Romania"],
  },
  {
    icon: PhoneIcon,
    title: "+1(424) 535 3523",
    options: ["Michael Jordan", "+40 762 321 762", "Mon - Fri, 8:00-22:00"],
  },
]
</script>

<template>
  <section class="p-6">
    <div class="grid items-center gap-6 rounded-xl bg-black p-4 lg:grid-cols-2 lg:p-8">
      <div class="p-8 lg:mx-auto lg:max-w-lg lg:p-0">
        <h2 class="mb-4 text-3xl font-bold text-white">Get in Touch</h2>
        <p class="text-lg text-white lg:max-w-xl">
          You need more information? Check what other persons are saying about
          our product. They are very happy with their purchase.
        </p>
        <div v-for="({ icon, title, options }, key) in DATA" :key="key" class="mt-12">
          <div class="mb-6 flex items-center gap-3">
            <component :is="icon" class="h-7 w-7 text-white" />
            <h4 class="text-lg font-semibold text-white">{{ title }}</h4>
          </div>
          <div class="ml-10 space-y-2">
            <p v-for="(option, idx) in options" :key="idx" class="text-white">
              {{ option }}
            </p>
          </div>
        </div>
      </div>
      <Card class="p-6 lg:p-8">
        <h3 class="mb-6 text-2xl font-semibold">Contact us</h3>
        <form action="#" class="space-y-6">
          <div class="grid grid-cols-1 gap-x-4 gap-y-6 lg:grid-cols-2">
            <div class="space-y-2">
              <Label for="first-name">First Name</Label>
              <Input id="first-name" placeholder="John" />
            </div>
            <div class="space-y-2">
              <Label for="last-name">Last Name</Label>
              <Input id="last-name" placeholder="Doe" />
            </div>
          </div>
          <div class="space-y-2">
            <Label for="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="someone@example.com"
            />
          </div>
          <div class="space-y-2">
            <Label for="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Something about your request."
            />
          </div>
          <div class="flex items-center gap-2">
            <Checkbox id="privacy-policy" />
            <Label
              for="privacy-policy"
              class="cursor-pointer text-sm font-normal"
            >
              You agree to your friendly
              <a href="#" class="text-primary hover:underline">
                Privacy Policy
              </a>
            </Label>
          </div>
          <Button class="w-full">Send Message</Button>
        </form>
      </Card>
    </div>
  </section>
</template>
