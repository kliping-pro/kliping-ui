<script lang="ts">
export const description = "Modal edit profil dengan input, select profesi, checkbox, dan radio notifikasi."
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { XIcon } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const NOTIFICATION = ["Email", "SMS", "Push Notification"]
const TOOLS = ["React", "Material Tailwind", "TailwindCSS", "Next.js"]

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
          <DialogTitle class="mb-1 text-xl">Edit Profile</DialogTitle>
          <p class="text-muted-foreground text-sm">
            Update your profile information below.
          </p>
        </DialogHeader>

        <form class="mt-6 space-y-6">
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div class="space-y-2">
              <Label for="name" class="font-semibold">
                My Name
              </Label>
              <Input id="name" placeholder="Emma Roberts" />
            </div>
            <div class="space-y-2">
              <Label for="profession" class="font-semibold">
                I'm
              </Label>
              <Select>
                <SelectTrigger id="profession" class="w-full">
                  <SelectValue placeholder="Select Profession" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ui-ux">UI/UX Designer</SelectItem>
                  <SelectItem value="frontend">Frontend Developer</SelectItem>
                  <SelectItem value="backend">Backend Developer</SelectItem>
                  <SelectItem value="fullstack">
                    Fullstack Developer
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div class="space-y-2 border-y py-6">
            <p class="font-semibold">
              Interested in the following technologies
            </p>
            <p class="text-muted-foreground text-sm">
              Choose the frameworks you work on
            </p>
            <div class="mt-4 flex flex-wrap items-center gap-6">
              <div v-for="tool in TOOLS" :key="tool" class="flex items-center gap-2">
                <Checkbox :id="tool" />
                <Label
                  :for="tool"
                  class="text-muted-foreground cursor-pointer text-sm"
                >
                  {{ tool }}
                </Label>
              </div>
            </div>
          </div>

          <div class="space-y-2">
            <p class="font-semibold">Notification preferences</p>
            <p class="text-muted-foreground text-sm">
              Select where you want to be notified
            </p>
            <RadioGroup class="mt-4 flex items-center gap-6">
              <div v-for="notify in NOTIFICATION" :key="notify" class="flex items-center gap-2">
                <RadioGroupItem :id="notify" :value="notify" />
                <Label
                  :for="notify"
                  class="text-muted-foreground text-sm"
                >
                  {{ notify }}
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div class="flex items-center justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              @click="isOpen = false"
            >
              Cancel
            </Button>
            <Button type="submit">Update Profile</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  </div>
</template>
