<script lang="ts">
export const description = "Modal unggah file dengan area drag and drop dan daftar file terunggah."
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { CloudUploadIcon, TrashIcon, XIcon } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

const IMAGES = [
  {
    name: "cover-1.jpg",
    size: "140 KB",
  },
  {
    name: "cover-2.jpg",
    size: "288 KB",
  },
]

const isOpen = ref(false)
</script>

<template>
  <div class="grid min-h-screen w-full place-items-center">
    <Dialog v-model:open="isOpen">
      <DialogTrigger as-child>
        <Button @click="isOpen = true">Open Modal</Button>
      </DialogTrigger>
      <DialogContent class="sm:max-w-[600px]" :show-close-button="false">
        <button
          class="ring-offset-background focus:ring-ring absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none"
          @click="isOpen = false"
        >
          <XIcon class="h-4 w-4" />
          <span class="sr-only">Close</span>
        </button>
        <DialogHeader>
          <DialogTitle class="mb-1 text-xl">Upload Files</DialogTitle>
          <p class="text-muted-foreground text-sm">
            Easily upload files to your account with just a few clicks.
          </p>
        </DialogHeader>

        <form class="mt-6 space-y-4">
          <Card class="border-2 border-dashed">
            <CardContent class="grid min-h-64 place-items-center p-6">
              <label for="upload" class="cursor-pointer">
                <input id="upload" type="file" class="hidden">
                <div class="mx-auto max-w-md text-center">
                  <CloudUploadIcon class="text-muted-foreground mx-auto mb-6 h-12 w-12" />
                  <p class="mb-2 font-semibold">
                    Drag and Drop or
                    <span class="underline">Choose a Local File</span>
                  </p>
                  <p class="text-muted-foreground text-sm">
                    Supported formats: .png, .jpg, .svg
                  </p>
                </div>
              </label>
            </CardContent>
          </Card>

          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Card v-for="{ name, size } in IMAGES" :key="name">
              <CardContent class="flex items-start justify-between p-3">
                <div class="flex items-center gap-4">
                  <img
                    src="/samples/avatars/avatar-02.svg"
                    :alt="name"
                    class="h-12 w-12 rounded object-cover object-center"
                  >
                  <div class="space-y-1">
                    <p class="text-sm font-semibold">{{ name }}</p>
                    <p class="text-muted-foreground text-sm">{{ size }}</p>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  class="shrink-0"
                >
                  <TrashIcon class="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>

          <div class="flex items-center justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              @click="isOpen = false"
            >
              Cancel
            </Button>
            <Button type="submit">Upload</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  </div>
</template>
