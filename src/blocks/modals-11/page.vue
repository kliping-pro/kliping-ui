<script lang="ts">
export const description = "Modal hapus vault dengan satu input pengenal koleksi sebagai verifikasi."
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
          class="ring-offset-background focus:ring-ring absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none"
          @click="isOpen = false"
        >
          <XIcon class="h-4 w-4" />
          <span class="sr-only">Close</span>
        </button>
        <DialogHeader>
          <DialogTitle class="mb-2 text-xl">
            Erase Fashion Vault
          </DialogTitle>
        </DialogHeader>
        <p class="text-muted-foreground mt-2 text-sm">
          Type the full collection handle to confirm irreversible deletion of
          this vault.
        </p>

        <form class="mt-6 space-y-6">
          <div class="space-y-2">
            <Label for="identifier" class="font-semibold">
              Collection identifier
            </Label>
            <Input id="identifier" placeholder="spring-edit-collection" />
          </div>

          <div class="flex items-center justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              @click="isOpen = false"
            >
              Cancel
            </Button>
            <Button type="submit" variant="destructive">
              Delete Vault
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  </div>
</template>
