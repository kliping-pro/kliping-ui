<script lang="ts">
export const description = "Modal publikasi koleksi dengan ikon gembok terbuka dan card metadata."
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { LockOpenIcon, XIcon } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

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
          class="ring-offset-background focus:ring-ring absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none"
          @click="isOpen = false"
        >
          <XIcon class="h-4 w-4" />
          <span class="sr-only">Close</span>
        </button>
        <div class="flex items-start gap-4">
          <div class="flex-1">
            <LockOpenIcon class="text-primary mb-6 h-12 w-12" />
            <DialogHeader>
              <DialogTitle class="mb-2 text-xl">
                Publish Capsule Collection
              </DialogTitle>
            </DialogHeader>
            <p class="text-muted-foreground mt-2 text-sm">
              This action will expose your private capsule collection to
              public viewing across all fashion storefronts.
            </p>
          </div>
        </div>

        <Card class="my-6">
          <CardContent class="space-y-3 p-4">
            <div class="flex items-center justify-between">
              <span class="text-muted-foreground text-sm">
                Collection
              </span>
              <span class="text-sm font-medium">fall-winter-vault</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-muted-foreground text-sm">Views</span>
              <span class="text-sm font-medium">0</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-muted-foreground text-sm">Likes</span>
              <span class="text-sm font-medium">0</span>
            </div>
          </CardContent>
        </Card>

        <div class="flex items-center justify-end gap-2 pt-4">
          <Button
            type="button"
            variant="outline"
            @click="isOpen = false"
          >
            Cancel
          </Button>
          <Button type="submit">Make Collection Public</Button>
        </div>
      </DialogContent>
    </Dialog>
  </div>
</template>
