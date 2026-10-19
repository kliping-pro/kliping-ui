<script lang="ts">
export const description = "Card besar berisi formulir dan panel gelap info kontak dengan ikon sosial."
</script>

<script setup lang="ts">
import { MailIcon, PhoneIcon, TicketIcon } from '@lucide/vue'
import {
  IconBrandDribbble,
  IconBrandFacebook,
  IconBrandLinkedin,
  IconBrandTwitter,
} from '@tabler/icons-vue'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const DATA = [
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
  <section class="py-16">
    <div class="container mx-auto">
      <div class="mb-16 text-center">
        <h2 class="text-4xl font-bold">Contact Us</h2>
        <p class="text-muted-foreground mx-auto mt-4 max-w-lg text-lg">
          Any questions or remarks? Just write us a message!
        </p>
      </div>
      <Card class="grid grid-cols-1 gap-10 rounded-2xl p-8 shadow-xl lg:grid-cols-2 lg:p-10">
        <form action="#" class="space-y-6">
          <div class="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
            <div class="space-y-2">
              <Label for="first-name" class="text-base">
                First Name
              </Label>
              <Input id="first-name" placeholder="John" class="h-11" />
            </div>
            <div class="space-y-2">
              <Label for="last-name" class="text-base">
                Last Name
              </Label>
              <Input id="last-name" placeholder="Doe" class="h-11" />
            </div>
          </div>
          <div class="space-y-2">
            <Label for="email" class="text-base">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="someone@example.com"
              class="h-11"
            />
          </div>
          <div class="space-y-2">
            <Label for="message" class="text-base">
              Message
            </Label>
            <Textarea
              id="message"
              placeholder="Something about your request."
              :rows="5"
              class="resize-none"
            />
          </div>
          <Button class="w-full sm:w-auto sm:min-w-[150px]" size="lg">
            Send Message
          </Button>
        </form>
        <div class="flex flex-col justify-between rounded-xl bg-gradient-to-br from-gray-900 to-black p-8 lg:p-12">
          <div>
            <h3 class="mb-4 text-2xl font-bold text-white">
              Contact Information
            </h3>
            <p class="mb-12 max-w-lg text-gray-300">
              Fill up the form and our Team will get back to you within 24
              hours.
            </p>
            <div class="space-y-6">
              <div v-for="({ icon, info }, key) in DATA" :key="key" class="flex items-center gap-4">
                <div class="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                  <component :is="icon" class="h-5 w-5 text-white" />
                </div>
                <span class="text-gray-200">{{ info }}</span>
              </div>
            </div>
          </div>
          <div class="mt-12 flex items-center gap-6">
            <a
              aria-label="Twitter"
              href="#"
              class="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-gray-300 transition-all hover:bg-white/20 hover:text-white"
            >
              <IconBrandTwitter class="h-5 w-5" />
            </a>
            <a
              aria-label="LinkedIn"
              href="#"
              class="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-gray-300 transition-all hover:bg-white/20 hover:text-white"
            >
              <IconBrandLinkedin class="h-5 w-5" />
            </a>
            <a
              aria-label="Dribbble"
              href="#"
              class="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-gray-300 transition-all hover:bg-white/20 hover:text-white"
            >
              <IconBrandDribbble class="h-5 w-5" />
            </a>
            <a
              aria-label="Facebook"
              href="#"
              class="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-gray-300 transition-all hover:bg-white/20 hover:text-white"
            >
              <IconBrandFacebook class="h-5 w-5" />
            </a>
          </div>
        </div>
      </Card>
    </div>
  </section>
</template>
