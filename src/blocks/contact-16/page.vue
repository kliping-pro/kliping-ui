<script lang="ts">
export const description = "Empat card info kontak berikon di atas, formulir dalam card di bawah."
</script>

<script setup lang="ts">
import { ClockIcon, MailIcon, MapPinIcon, PhoneIcon } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const CONTACT_INFO = [
  {
    icon: MapPinIcon,
    title: "Visit us",
    info: "123 Main Street, New York, NY 10001",
  },
  {
    icon: PhoneIcon,
    title: "Call us",
    info: "+1 (424) 535-3523",
  },
  {
    icon: MailIcon,
    title: "Email us",
    info: "hello@mail.com",
  },
  {
    icon: ClockIcon,
    title: "Working hours",
    info: "Mon - Fri, 9:00 AM - 6:00 PM",
  },
]
</script>

<template>
  <section class="py-16">
    <div class="container mx-auto">
      <div class="mb-16 text-center">
        <h2 class="mb-4 text-3xl font-bold">Contact Information</h2>
        <p class="text-muted-foreground mx-auto max-w-2xl text-lg">
          We're here to answer any questions you may have about our services.
          Reach out to us and we'll respond as soon as we can.
        </p>
      </div>
      <div class="mb-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <Card v-for="({ icon, title, info }, key) in CONTACT_INFO" :key="key" class="p-6 text-center">
          <div class="bg-primary/10 mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full">
            <component :is="icon" class="text-primary h-6 w-6" />
          </div>
          <h3 class="mb-2 font-semibold">{{ title }}</h3>
          <p class="text-muted-foreground text-sm">{{ info }}</p>
        </Card>
      </div>
      <Card class="mx-auto max-w-2xl p-8">
        <h3 class="mb-6 text-2xl font-bold">Send us a message</h3>
        <form action="#" class="space-y-6">
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div class="space-y-2">
              <Label for="name">Name</Label>
              <Input id="name" placeholder="Your name" />
            </div>
            <div class="space-y-2">
              <Label for="email">Email</Label>
              <Input id="email" type="email" placeholder="your@email.com" />
            </div>
          </div>
          <div class="space-y-2">
            <Label for="message">Message</Label>
            <Textarea
              id="message"
              placeholder="How can we help you?"
              :rows="5"
            />
          </div>
          <Button class="w-full">Send Message</Button>
        </form>
      </Card>
    </div>
  </section>
</template>
