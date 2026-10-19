<script lang="ts">
export const description = "Panel hitam info kontak dengan ikon sosial di kiri, formulir dengan radio minat di kanan."
</script>

<script setup lang="ts">
import { MailIcon, PhoneIcon, TicketIcon } from '@lucide/vue'
import {
  IconBrandDribbble,
  IconBrandFacebook,
  IconBrandLinkedin,
  IconBrandTwitter,
} from '@tabler/icons-vue'
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
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

const OPTIONS = ["Design", "Development", "Support", "Other"]

const selectedOption = ref("")
</script>

<template>
  <section class="py-16">
    <div class="container mx-auto">
      <div class="mb-16 text-center">
        <h2 class="text-3xl font-bold">Contact Us</h2>
        <p class="text-muted-foreground mx-auto mt-4 max-w-lg text-lg">
          Any questions or remarks? Just write us a message!
        </p>
      </div>
      <Card class="grid grid-cols-1 gap-10 rounded-2xl p-4 lg:grid-cols-2 lg:p-6">
        <div class="grid rounded-lg bg-black p-8 lg:place-items-center lg:p-16">
          <div>
            <h2 class="mb-4 text-2xl font-bold text-white">
              Contact Information
            </h2>
            <p class="mb-16 max-w-lg text-gray-400">
              Fill up the form and our Team will get back to you within 24
              hours.
            </p>
            <div v-for="({ icon, info }, key) in DATA" :key="key" class="mb-4 flex items-center gap-4">
              <component :is="icon" class="h-5 w-5 text-gray-400" />
              <span class="text-gray-400">{{ info }}</span>
            </div>
            <div class="mt-12 flex items-center gap-6">
              <a aria-label="Twitter" href="#" class="text-gray-400 hover:text-white">
                <IconBrandTwitter class="h-6 w-6" />
              </a>
              <a aria-label="LinkedIn" href="#" class="text-gray-400 hover:text-white">
                <IconBrandLinkedin class="h-6 w-6" />
              </a>
              <a aria-label="Dribbble" href="#" class="text-gray-400 hover:text-white">
                <IconBrandDribbble class="h-6 w-6" />
              </a>
              <a aria-label="Facebook" href="#" class="text-gray-400 hover:text-white">
                <IconBrandFacebook class="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        <form action="#" class="space-y-6 px-2 py-0 lg:py-2">
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
            <Label for="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="someone@example.com"
            />
          </div>
          <div class="space-y-2">
            <Label>Area of Interest</Label>
            <RadioGroup v-model="selectedOption">
              <div class="grid grid-cols-2 gap-4">
                <div v-for="option in OPTIONS" :key="option" class="flex items-center space-x-2">
                  <RadioGroupItem :id="option" :value="option" />
                  <Label
                    :for="option"
                    class="cursor-pointer font-normal"
                  >
                    {{ option }}
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </div>
          <div class="space-y-2">
            <Label for="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Something about your request."
            />
          </div>
          <Button class="ml-auto flex max-w-fit">Send Message</Button>
        </form>
      </Card>
    </div>
  </section>
</template>
