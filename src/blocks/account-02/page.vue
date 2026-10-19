<script lang="ts">
export const description = "Unggah foto profil dengan pratinjau avatar dan switch status ketersediaan."
</script>

<script setup lang="ts">
import { ref } from 'vue'
import {
  CircleCheckIcon,
  CircleXIcon,
  PencilIcon,
  Trash2Icon,
  UploadIcon,
  UserIcon,
} from '@lucide/vue'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

const status = ref("Online")
const avatarPreview = ref<string | null>(null)

const handleFileUpload = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onloadend = () => {
      avatarPreview.value = reader.result as string
    }
    reader.readAsDataURL(file)
  }
}

const handleRemoveAvatar = () => {
  avatarPreview.value = null
}

const toggleStatus = () => {
  status.value = status.value === "Online" ? "Offline" : "Online"
}
</script>

<template>
  <div class="mx-auto max-w-5xl p-6">
    <Card class="bg-card border p-8">
      <div class="border-b pb-6">
        <div class="flex items-center gap-3">
          <div class="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-lg">
            <UserIcon class="text-primary h-6 w-6" />
          </div>
          <div>
            <h2 class="text-2xl font-semibold tracking-tight">
              Profile Picture
            </h2>
            <p class="text-muted-foreground mt-1 text-sm">
              Update your profile picture and personal information
            </p>
          </div>
        </div>
      </div>

      <div class="flex flex-wrap items-center justify-between gap-6">
        <div class="flex flex-wrap items-center gap-6">
          <div class="flex items-center gap-4">
            <div class="relative">
              <Avatar class="border-border h-16 w-16 border-2">
                <AvatarImage
                  :src="
                    avatarPreview
                      || '/samples/avatars/avatar-14.svg'
                  "
                  alt="Profile Picture"
                  class="object-cover"
                />
                <AvatarFallback class="bg-muted-foreground/10 text-muted-foreground">
                  <UserIcon class="h-8 w-8" />
                </AvatarFallback>
              </Avatar>
              <label
                for="avatar-upload"
                class="absolute right-0 bottom-0 cursor-pointer"
              >
                <div class="bg-primary/10 text-primary hover:bg-primary/20 border-border rounded-full border p-1.5">
                  <PencilIcon class="h-3.5 w-3.5" />
                </div>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/png,image/jpeg,image/svg+xml"
                  class="hidden"
                  @change="handleFileUpload"
                >
              </label>
            </div>

            <div class="space-y-1">
              <h3 class="font-semibold">Select and Upload Image</h3>
              <p class="text-muted-foreground text-sm">
                .svg, .png, .jpg (size 400x400px)
              </p>
            </div>
          </div>

          <div class="flex flex-wrap items-center gap-3">
            <Button>
              <UploadIcon class="mr-2 h-4 w-4" />
              Upload Avatar
            </Button>
            <Button v-if="avatarPreview" variant="destructive" @click="handleRemoveAvatar">
              <Trash2Icon class="mr-2 h-4 w-4" />
              Remove
            </Button>
          </div>
        </div>

        <div class="flex flex-col">
          <Label class="mb-3 flex items-center gap-2">
            <CircleCheckIcon class="text-muted-foreground h-4 w-4" />
            Availability Status
          </Label>
          <div class="flex items-center gap-3">
            <Switch
              id="status"
              :model-value="status === 'Online'"
              @update:model-value="toggleStatus"
            />
            <Label
              for="status"
              class="flex cursor-pointer items-center gap-2"
            >
              <CircleCheckIcon v-if="status === 'Online'" class="h-4 w-4 text-green-500" />
              <CircleXIcon v-else class="text-muted-foreground h-4 w-4" />
              {{ status }}
            </Label>
          </div>
        </div>
      </div>

      <div class="bg-muted/50 mt-6 rounded-lg border p-4">
        <div class="flex items-start gap-3">
          <CircleCheckIcon class="mt-0.5 h-5 w-5 text-blue-500" />
          <div>
            <h4 class="mb-1 text-sm font-medium">Profile Picture Tips</h4>
            <p class="text-muted-foreground text-sm">
              Choose a high-quality, professional image that clearly shows
              your face. Recommended image size is 400x400 pixels. Only .svg,
              .png, and .jpg formats are supported.
            </p>
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>
