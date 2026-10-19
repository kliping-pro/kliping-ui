<script lang="ts">
export const description = "Formulir dengan nomor telepon dalam card di kiri, tiga info kontak berikon di kanan."
</script>

<script setup lang="ts">
import { MailIcon, MapPinIcon, PhoneIcon } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const OPTIONS = [
  {
    icon: MapPinIcon,
    info: "12124 First Street, nr 54",
  },
  {
    icon: PhoneIcon,
    info: "+1(424) 535 3523",
  },
  {
    icon: MailIcon,
    info: "hello@mail.com",
  },
]
</script>

<template>
  <section class="py-16">
    <div class="container mx-auto">
      <h2 class="mb-16 text-center text-3xl font-bold">Contact Us</h2>
      <div class="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <Card class="p-8">
          <h3 class="mb-6 text-2xl font-semibold">Send us a message</h3>
          <form action="#" class="space-y-6">
            <div class="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
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
              <Label for="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="someone@example.com"
              />
            </div>
            <div class="space-y-2">
              <Label for="phone">Phone Number</Label>
              <Input id="phone" type="tel" placeholder="+1 123-456-7890" />
            </div>
            <div class="space-y-2">
              <Label for="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Write your message here..."
              />
            </div>
            <Button class="w-full">Send Message</Button>
          </form>
        </Card>
        <div class="space-y-8">
          <div>
            <h3 class="mb-4 text-2xl font-semibold">Get in touch</h3>
            <p class="text-muted-foreground">
              We're here to help and answer any question you might have.
              We look forward to hearing from you.
            </p>
          </div>
          <div class="space-y-6">
            <div v-for="({ icon, info }, key) in OPTIONS" :key="key" class="flex items-start gap-4">
              <div class="bg-primary/10 grid h-10 w-10 shrink-0 place-items-center rounded-lg">
                <component :is="icon" class="text-primary h-5 w-5" />
              </div>
              <div class="pt-2">
                <p class="font-medium">{{ info }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
