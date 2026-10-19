<script lang="ts">
export const description = "Formulir rata tengah berisi nama perusahaan di atas foto latar samar."
</script>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
</script>

<template>
  <section class="relative flex min-h-screen items-center py-20">
    <div
      class="absolute inset-0 bg-cover bg-center opacity-20"
      :style="{
        backgroundImage:
          `url('/samples/photos/photo-15.svg')`,
      }"
    />
    <div class="relative z-10 container mx-auto">
      <div class="mx-auto max-w-2xl">
        <div class="mb-12 text-center">
          <h2 class="mb-4 text-4xl font-bold">Let's Talk</h2>
          <p class="text-muted-foreground text-lg">
            Fill out the form below and we'll be in touch shortly.
          </p>
        </div>
        <form
          action="#"
          class="bg-card space-y-6 rounded-2xl p-8 shadow-xl"
        >
          <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
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
            <Input id="email" type="email" placeholder="john@example.com" />
          </div>
          <div class="space-y-2">
            <Label for="company">Company</Label>
            <Input id="company" placeholder="Your Company" />
          </div>
          <div class="space-y-2">
            <Label for="message">How can we help?</Label>
            <Textarea
              id="message"
              placeholder="Tell us about your project..."
              :rows="5"
            />
          </div>
          <Button class="w-full" size="lg">
            Submit
          </Button>
        </form>
      </div>
    </div>
  </section>
</template>
