<script lang="ts">
export const description = "Formulir kontak dalam card di kiri, alamat kantor dan telepon berikon di kanan."
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
  <section class="grid min-h-screen place-items-center py-16">
    <div class="container mx-auto grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
      <Card class="mx-auto p-6 lg:max-w-lg lg:p-12">
        <h3 class="mb-2 text-2xl font-semibold">Contact us</h3>
        <p class="text-muted-foreground mb-6">
          We'd love to hear from you.
        </p>
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
      <div class="mx-auto space-y-10 lg:max-w-lg">
        <div v-for="({ icon, title, options }, key) in DATA" :key="key" class="flex gap-4">
          <div class="shrink-0">
            <component :is="icon" class="h-6 w-6" />
          </div>
          <div>
            <h4 class="mb-2 font-semibold">{{ title }}</h4>
            <p v-for="(option, idx) in options" :key="idx" class="text-muted-foreground">
              {{ option }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
