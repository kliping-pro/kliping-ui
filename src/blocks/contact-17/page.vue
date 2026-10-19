<script lang="ts">
export const description = "Formulir lebar tanpa card dengan kolom wajib dan tombol kirim berikon di tengah."
</script>

<script setup lang="ts">
import { SendIcon } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
</script>

<template>
  <section class="from-background to-muted/20 bg-gradient-to-b py-20">
    <div class="container mx-auto max-w-4xl">
      <div class="mb-12 text-center">
        <span class="text-primary text-sm font-semibold">
          GET IN TOUCH
        </span>
        <h2 class="mt-2 mb-4 text-4xl font-bold">
          We'd Love to Hear From You
        </h2>
        <p class="text-muted-foreground mx-auto max-w-2xl text-lg">
          Whether you have a question about features, pricing, or anything
          else, our team is ready to answer all your questions.
        </p>
      </div>
      <form action="#" class="space-y-8">
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div class="space-y-2">
            <Label for="name">Full Name *</Label>
            <Input id="name" placeholder="John Doe" required />
          </div>
          <div class="space-y-2">
            <Label for="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              required
            />
          </div>
        </div>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div class="space-y-2">
            <Label for="phone">Phone Number</Label>
            <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
          </div>
          <div class="space-y-2">
            <Label for="subject">Subject</Label>
            <Input id="subject" placeholder="How can we help?" />
          </div>
        </div>
        <div class="space-y-2">
          <Label for="message">Message *</Label>
          <Textarea
            id="message"
            placeholder="Tell us more about your inquiry..."
            :rows="6"
            required
          />
        </div>
        <div class="flex justify-center">
          <Button size="lg" class="gap-2">
            <SendIcon class="h-4 w-4" />
            Send Message
          </Button>
        </div>
      </form>
    </div>
  </section>
</template>
