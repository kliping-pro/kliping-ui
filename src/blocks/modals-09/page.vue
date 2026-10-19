<script lang="ts">
export const description = "Modal transfer kepemilikan dengan select pemilik, input handle, dan peringatan kuning."
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { TriangleAlertIcon, XIcon } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

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
            Transfer Showroom Ownership
          </DialogTitle>
        </DialogHeader>
        <p class="text-muted-foreground mt-2 text-sm">
          Switch control of this fashion showroom space to another user or
          organization.
        </p>

        <form class="mt-6 space-y-6">
          <div class="space-y-2">
            <Label for="owner" class="font-semibold">
              Select new owner
            </Label>
            <Select>
              <SelectTrigger id="owner" class="w-full">
                <SelectValue placeholder="Choose owner" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="styling-team">Styling Team</SelectItem>
                <SelectItem value="content-studio">Content Studio</SelectItem>
                <SelectItem value="retail-partner">Retail Partner</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div class="space-y-2">
            <Label for="handle" class="font-semibold">
              Confirm collection handle
            </Label>
            <Input id="handle" placeholder="resort-collection-2026" />
          </div>

          <Card class="border-yellow-500/50 bg-yellow-500/5">
            <CardContent class="p-4">
              <div class="flex items-start gap-3">
                <TriangleAlertIcon class="mt-0.5 h-5 w-5 shrink-0 text-yellow-600" />
                <p class="text-muted-foreground text-sm">
                  Transferring ownership will revoke your access to draft
                  sets, unpublished campaigns, and internal analytics.
                </p>
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
            <Button type="submit" variant="destructive">
              Transfer Access
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  </div>
</template>
