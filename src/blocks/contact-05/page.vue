<script lang="ts">
export const description = "Formulir kontak dengan nomor telepon di kiri, foto penuh di kanan."
</script>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
</script>

<template>
  <section class="grid min-h-screen w-full grid-cols-1 items-center md:grid-cols-2">
    <div class="p-6 sm:p-12 lg:p-16">
      <div class="mb-10">
        <h2 class="my-4 text-3xl font-bold">Contact us</h2>
        <p class="text-muted-foreground max-w-lg text-lg">
          Whether you have questions or you would just like to say hello,
          contact us.
        </p>
      </div>
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
          <Input id="email" type="email" placeholder="someone@example.com" />
        </div>
        <div class="space-y-2">
          <Label for="phone">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            :maxlength="16"
            placeholder="e.g., +1 123-456-7890"
            pattern="^\+\d{1,3}\s\d{1,4}-\d{1,4}-\d{4}$"
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
    </div>
    <img
      src="/samples/photos/photo-06.svg"
      alt="contact"
      class="hidden h-full w-full object-cover object-center md:block"
    />
  </section>
</template>
