<script lang="ts">
export const description = "Formulir kaca buram di atas latar gradasi gelap, telepon dan email di bawah."
</script>

<script setup lang="ts">
import { MailIcon, PhoneIcon } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
</script>

<template>
  <section class="grid min-h-screen place-items-center bg-gradient-to-br from-stone-900 to-stone-800 py-16 text-white">
    <div class="container mx-auto">
      <div class="mb-12 text-center">
        <h2 class="mb-4 text-3xl font-bold">Get In Touch</h2>
        <p class="mx-auto max-w-2xl text-stone-300">
          Have a question or want to work together? Leave your details and
          we'll get back to you as soon as possible.
        </p>
      </div>
      <div class="mx-auto max-w-2xl">
        <form
          action="#"
          class="space-y-6 rounded-2xl bg-white/10 p-8 backdrop-blur-sm"
        >
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div class="space-y-2">
              <Label for="name" class="text-white">
                Name
              </Label>
              <Input
                id="name"
                placeholder="Your name"
                class="border-white/30 bg-white/20 text-white placeholder:text-stone-300"
              />
            </div>
            <div class="space-y-2">
              <Label for="email" class="text-white">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                class="border-white/30 bg-white/20 text-white placeholder:text-stone-300"
              />
            </div>
          </div>
          <div class="space-y-2">
            <Label for="subject" class="text-white">
              Subject
            </Label>
            <Input
              id="subject"
              placeholder="How can we help?"
              class="border-white/30 bg-white/20 text-white placeholder:text-stone-300"
            />
          </div>
          <div class="space-y-2">
            <Label for="message" class="text-white">
              Message
            </Label>
            <Textarea
              id="message"
              placeholder="Your message..."
              :rows="6"
              class="border-white/30 bg-white/20 text-white placeholder:text-stone-300"
            />
          </div>
          <Button class="w-full" size="lg">
            Send Message
          </Button>
        </form>
        <div class="mt-12 flex justify-center gap-12">
          <div class="text-center">
            <PhoneIcon class="mx-auto mb-2 h-6 w-6" />
            <p class="text-sm text-stone-300">+1 (424) 535-3523</p>
          </div>
          <div class="text-center">
            <MailIcon class="mx-auto mb-2 h-6 w-6" />
            <p class="text-sm text-stone-300">hello@mail.com</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
