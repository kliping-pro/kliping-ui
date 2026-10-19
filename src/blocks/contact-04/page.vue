<script lang="ts">
export const description = "Formulir kontak dalam card di kiri, judul dan tiga info kontak berikon di kanan."
</script>

<script setup lang="ts">
import { MailIcon, PhoneIcon, TicketIcon } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const OPTIONS = [
  {
    icon: PhoneIcon,
    info: "+1(424) 535 3523",
  },
  {
    icon: MailIcon,
    info: "hello@mail.com",
  },
  {
    icon: TicketIcon,
    info: "Open Support Ticket",
  },
]
</script>

<template>
  <section class="grid min-h-screen place-items-center py-16">
    <div class="container mx-auto grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
      <Card class="mx-auto p-6 lg:max-w-lg lg:p-12">
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
      <div class="mx-auto lg:max-w-lg">
        <h2 class="mb-4 text-3xl font-bold">Get in Touch</h2>
        <p class="text-muted-foreground text-lg lg:max-w-lg">
          You need more information? Check what other persons are saying about
          our product. They are very happy with their purchase.
        </p>
        <div class="mt-14 space-y-4">
          <div v-for="({ icon, info }, key) in OPTIONS" :key="key" class="flex items-center gap-4">
            <component :is="icon" class="h-5 w-5" />
            <span>{{ info }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
