<script lang="ts">
export const description = "Modal nonaktifkan aturan kunci dengan card peringatan dan daftar dampak."
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { TriangleAlertIcon, XIcon } from '@lucide/vue'
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
            Disable Collection Lock Rules
          </DialogTitle>
        </DialogHeader>
        <p class="text-muted-foreground mt-2 text-sm">
          Removing edit rules will allow unrestricted changes to your seasonal
          campaign folders and product groups.
        </p>

        <Card class="border-destructive/50 bg-destructive/5 my-6">
          <CardHeader class="pb-3">
            <CardTitle class="flex items-center gap-2 text-base">
              <TriangleAlertIcon class="text-destructive h-4 w-4" />
              Access Restrictions Will Be Removed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p class="text-muted-foreground text-sm">
              Disabling these rules unlocks direct edits to sensitive assets
              and might affect internal syncs.
            </p>
          </CardContent>
        </Card>

        <div class="mb-6 space-y-3">
          <p class="text-sm font-semibold">This will impact:</p>
          <ul class="text-muted-foreground space-y-2 text-sm">
            <li class="flex items-start gap-2">
              <span class="text-destructive mt-1">•</span>
              <span>Designer review checkpoints</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-destructive mt-1">•</span>
              <span>Version freeze policies</span>
            </li>
          </ul>
        </div>

        <p class="text-muted-foreground mb-6 text-xs">
          Note: 0 edit lock rules currently active
        </p>

        <div class="flex items-center justify-end gap-2 pt-4">
          <Button
            type="button"
            variant="outline"
            @click="isOpen = false"
          >
            Cancel
          </Button>
          <Button variant="destructive">Disable Edit Locks</Button>
        </div>
      </DialogContent>
    </Dialog>
  </div>
</template>
