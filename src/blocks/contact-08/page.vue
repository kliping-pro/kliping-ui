<script lang="ts">
export const description = "Foto di kiri, formulir dengan tombol pilihan topik di kanan, lencana di atas judul."
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const OPTIONS = ["General Inquiry", "Product Support"]

const selectedOption = ref("")

const toggleOption = (option: string) => {
  selectedOption.value = selectedOption.value === option ? "" : option
}
</script>

<template>
  <section class="bg-white py-16">
    <div class="container mx-auto">
      <div class="mb-20 text-center">
        <Badge variant="secondary">Customer Care</Badge>
        <h2 class="mt-8 mb-4 text-3xl font-bold">
          We're Here to Help
        </h2>
        <p class="text-muted-foreground mx-auto max-w-2xl text-lg">
          Whether it's a question about our services, a request for
          technical assistance, or suggestions for improvement, our team is
          eager to hear from you.
        </p>
      </div>
      <div class="grid grid-cols-1 gap-x-16 gap-y-10 lg:grid-cols-2">
        <img
          src="/samples/photos/photo-03.svg"
          alt="Contact"
          class="h-full min-h-[400px] w-full rounded-2xl object-cover"
        />
        <form
          action="#"
          class="mx-auto max-w-lg space-y-6 lg:mx-0 lg:py-2"
        >
          <div class="space-y-4">
            <Label>Select Options for Business Engagement</Label>
            <div class="flex flex-wrap gap-2">
              <Button
                v-for="option in OPTIONS"
                :key="option"
                type="button"
                :variant="selectedOption === option ? 'default' : 'outline'"
                @click="toggleOption(option)"
              >
                {{ option }}
              </Button>
            </div>
          </div>
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
            <Label for="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Something about your request."
            />
          </div>
          <Button class="w-full">Send Message</Button>
        </form>
      </div>
    </div>
  </section>
</template>
