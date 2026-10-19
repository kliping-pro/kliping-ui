<script lang="ts">
export const description = "Modal update produk dengan galeri tiga gambar, form, select, dan textarea."
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { TrashIcon, XIcon } from '@lucide/vue'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

const isOpen = ref(false)
</script>

<template>
  <div class="grid min-h-screen w-full place-items-center">
    <Dialog v-model:open="isOpen">
      <DialogTrigger as-child>
        <Button @click="isOpen = true">Open Modal</Button>
      </DialogTrigger>
      <DialogContent class="max-h-[90vh] overflow-y-auto sm:max-w-[700px]" :show-close-button="false">
        <button
          class="ring-offset-background focus:ring-ring absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none"
          @click="isOpen = false"
        >
          <XIcon class="h-4 w-4" />
          <span class="sr-only">Close</span>
        </button>
        <DialogHeader>
          <DialogTitle class="mb-1 text-xl">
            Update Product Modal
          </DialogTitle>
          <p class="text-muted-foreground text-sm">
            Edit product features and save it.
          </p>
        </DialogHeader>

        <div class="my-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          <div
            v-for="i in 3"
            :key="i"
            class="bg-muted relative h-44 w-full overflow-hidden rounded-md"
          >
            <img
              src="/samples/avatars/avatar-19.svg"
              :alt="`Product ${i}`"
              class="h-full w-full object-cover object-center"
            >
            <Button
              size="sm"
              variant="ghost"
              class="!absolute right-2 bottom-2"
            >
              <TrashIcon class="h-4 w-4" />
            </Button>
          </div>
        </div>

        <form class="space-y-6">
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div class="space-y-2">
              <Label for="productName" class="font-semibold">
                Product Name
              </Label>
              <Input id="productName" placeholder="Laptop" />
            </div>
            <div class="space-y-2">
              <Label for="category" class="font-semibold">
                Category
              </Label>
              <Select>
                <SelectTrigger id="category" class="w-full">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="clothing">Clothing</SelectItem>
                  <SelectItem value="accessories">Accessories</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div class="space-y-2">
              <Label for="price" class="font-semibold">
                Price
              </Label>
              <Input id="price" placeholder="1000" />
            </div>
            <div class="space-y-2">
              <Label for="brand" class="font-semibold">
                Brand
              </Label>
              <Select>
                <SelectTrigger id="brand" class="w-full">
                  <SelectValue placeholder="Select Brand" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="samsung">Samsung</SelectItem>
                  <SelectItem value="microsoft">Microsoft</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div class="space-y-2">
            <Label for="description" class="font-semibold">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Write something about your product."
            />
          </div>

          <div class="space-y-2">
            <Label for="tags" class="font-semibold">
              Tags
            </Label>
            <Input
              id="tags"
              placeholder="Add up to 10 tags, separated by commas (,)"
            />
          </div>

          <div class="flex items-center justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              @click="isOpen = false"
            >
              Cancel
            </Button>
            <Button type="submit">Update Product</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  </div>
</template>
