<script lang="ts">
export const description = "Tiga opsi kontak berikon dengan tautan aksi di kiri, card formulir singkat di kanan."
</script>

<script setup lang="ts">
import { FileTextIcon, HeadphonesIcon, MessageSquareIcon } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const CONTACT_OPTIONS = [
  {
    icon: MessageSquareIcon,
    title: "Chat with Sales",
    description: "Speak to our sales team",
    action: "Start Chat",
  },
  {
    icon: HeadphonesIcon,
    title: "Get Support",
    description: "We're here to help",
    action: "Contact Support",
  },
  {
    icon: FileTextIcon,
    title: "Documentation",
    description: "Browse our docs",
    action: "View Docs",
  },
]
</script>

<template>
  <section class="py-16">
    <div class="container mx-auto">
      <div class="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <h2 class="mb-4 text-4xl font-bold">
            Let's start a conversation
          </h2>
          <p class="text-muted-foreground mb-8 text-lg">
            We're always happy to help with any questions you might have. Get
            in touch with us and we'll respond as soon as possible.
          </p>
          <div class="space-y-6">
            <div
              v-for="({ icon, title, description, action }, key) in CONTACT_OPTIONS"
              :key="key"
              class="flex items-start gap-4"
            >
              <div class="bg-primary/10 grid h-12 w-12 shrink-0 place-items-center rounded-lg">
                <component :is="icon" class="text-primary h-6 w-6" />
              </div>
              <div class="flex-1">
                <h3 class="mb-1 font-semibold">{{ title }}</h3>
                <p class="text-muted-foreground mb-3 text-sm">
                  {{ description }}
                </p>
                <Button variant="link" class="h-auto p-0">
                  {{ action }} →
                </Button>
              </div>
            </div>
          </div>
        </div>
        <Card class="p-8">
          <h3 class="mb-6 text-2xl font-bold">Quick Contact</h3>
          <form action="#" class="space-y-6">
            <div class="space-y-2">
              <Label for="name">Your Name</Label>
              <Input id="name" placeholder="Enter your name" />
            </div>
            <div class="space-y-2">
              <Label for="email">Your Email</Label>
              <Input id="email" type="email" placeholder="Enter your email" />
            </div>
            <div class="space-y-2">
              <Label for="phone">Phone Number (Optional)</Label>
              <Input id="phone" type="tel" placeholder="Enter your phone" />
            </div>
            <div class="space-y-2">
              <Label for="inquiry">Your Inquiry</Label>
              <Input id="inquiry" placeholder="What can we help you with?" />
            </div>
            <Button class="w-full">Submit</Button>
          </form>
        </Card>
      </div>
    </div>
  </section>
</template>
