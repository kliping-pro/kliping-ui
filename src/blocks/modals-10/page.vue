<script lang="ts">
export const description = "Modal hapus arsip permanen dengan card tinjauan dan daftar efek tindakan."
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { CircleAlertIcon, XIcon } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
      <DialogContent class="sm:max-w-[550px]" :show-close-button="false">
        <button
          class="ring-offset-background focus:ring-ring absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none"
          @click="isOpen = false"
        >
          <XIcon class="h-4 w-4" />
          <span class="sr-only">Close</span>
        </button>
        <DialogHeader>
          <DialogTitle class="mb-2 text-xl">
            Permanently Remove Archive
          </DialogTitle>
        </DialogHeader>
        <p class="text-muted-foreground mt-2 text-sm">
          Erasing this fashion vault will wipe its data across your platform
          and collaborators.
        </p>

        <Card class="border-destructive/50 bg-destructive/5 my-6">
          <CardHeader class="pb-3">
            <CardTitle class="flex items-center gap-2 text-base">
              <CircleAlertIcon class="text-destructive h-4 w-4" />
              Review Before Deleting
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p class="text-muted-foreground text-sm">
              Once removed, associated content (lookbooks, notes, edits) will
              be lost forever.
            </p>
          </CardContent>
        </Card>

        <div class="mb-6 space-y-3">
          <p class="text-sm font-semibold">This action will:</p>
          <ul class="text-muted-foreground space-y-2 text-sm">
            <li class="flex items-start gap-2">
              <span class="text-destructive mt-1">•</span>
              <span>Deletes all digital outfits and metadata</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-destructive mt-1">•</span>
              <span>Disconnects synced creative briefs</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-primary mt-1">•</span>
              <span>No change to billing or usage limits</span>
            </li>
          </ul>
        </div>

        <div class="flex items-center justify-end gap-2 pt-4">
          <Button
            type="button"
            variant="outline"
            @click="isOpen = false"
          >
            Cancel
          </Button>
          <Button type="submit">I acknowledge and confirm</Button>
        </div>
      </DialogContent>
    </Dialog>
  </div>
</template>
