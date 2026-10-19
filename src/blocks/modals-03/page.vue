<script lang="ts">
export const description = "Modal undang anggota tim lewat Email, dengan daftar anggota dan hak akses."
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { XIcon } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import User from '@/blocks/modals-03/components/User.vue'

const isOpen = ref(false)
</script>

<template>
  <div class="grid min-h-screen w-full place-items-center">
    <Dialog v-model:open="isOpen">
      <DialogTrigger as-child>
        <Button @click="isOpen = true">Open Modal</Button>
      </DialogTrigger>
      <DialogContent class="sm:max-w-[550px]" :show-close-button="false">
        <button
          class="ring-offset-background focus:ring-ring absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none"
          @click="isOpen = false"
        >
          <XIcon class="h-4 w-4" />
          <span class="sr-only">Close</span>
        </button>
        <DialogHeader>
          <DialogTitle class="mb-1 text-xl">
            Share with New Members
          </DialogTitle>
          <p class="text-muted-foreground max-w-xl text-sm">
            Welcome new members to your team! Use this modal to seamlessly add
            individuals to your dashboard, enabling collaboration and
            enhancing productivity.
          </p>
        </DialogHeader>

        <form class="my-6 flex w-full flex-col items-center gap-2 sm:flex-row">
          <Input type="email" placeholder="Email, comma separated" />
          <Button type="submit" class="w-full shrink-0 sm:w-auto">
            Invite
          </Button>
          <Button
            type="button"
            variant="outline"
            class="w-full shrink-0 sm:w-auto"
          >
            Copy Link
          </Button>
        </form>

        <div class="space-y-6">
          <User
            img="/samples/avatars/avatar-12.svg"
            name="Emma Roberts"
            email="emma@mail.com"
          />
          <User
            img="/samples/avatars/avatar-13.svg"
            name="John Smith"
            email="john@mail.com"
          />
          <User
            img="/samples/avatars/avatar-14.svg"
            name="Sarah Johnson"
            email="sarah@mail.com"
          />
        </div>
      </DialogContent>
    </Dialog>
  </div>
</template>
