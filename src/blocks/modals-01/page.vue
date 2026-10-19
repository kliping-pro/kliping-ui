<script lang="ts">
export const description = "Modal peringatan reset pengaturan dengan input konfirmasi teks."
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { TriangleAlertIcon, XIcon } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const isOpen = ref(false)
</script>

<template>
  <div class="grid min-h-screen w-full place-items-center">
    <Dialog v-model:open="isOpen">
      <DialogTrigger as-child>
        <Button @click="isOpen = true">Open Modal</Button>
      </DialogTrigger>
      <DialogContent class="sm:max-w-[500px]" :show-close-button="false">
        <button
          class="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none"
          @click="isOpen = false"
        >
          <XIcon class="h-4 w-4" />
          <span class="sr-only">Close</span>
        </button>
        <div class="flex items-start gap-4">
          <div class="flex-1">
            <TriangleAlertIcon class="text-destructive mb-6 h-14 w-14" />
            <DialogHeader>
              <DialogTitle class="mb-1 text-xl">
                Reset Settings
              </DialogTitle>
            </DialogHeader>
            <p class="text-muted-foreground mt-2 max-w-xl text-sm">
              Are you sure you want to reset all settings to their default
              values? This action cannot be undone.
            </p>
          </div>
        </div>

        <form class="mt-6 space-y-4">
          <div class="space-y-2">
            <Label for="reset" class="text-sm">
              Please type
              <span class="text-foreground font-semibold">"Reset settings"</span>
              to confirm.
            </Label>
            <div class="flex w-full flex-col items-center gap-2 sm:flex-row">
              <Input
                id="reset"
                placeholder="Reset settings"
                class="flex-1"
              />
              <Button type="submit" class="w-full shrink-0 sm:w-auto">
                I understand, reset settings
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  </div>
</template>
