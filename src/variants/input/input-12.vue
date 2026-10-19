<script lang="ts">
export const description = "Kotak jatuhkan berkas, gambarnya langsung terlihat setelah dipilih."
</script>

<script setup lang="ts">
import { useDropZone } from '@vueuse/core'
import { ImageIcon, XCircleIcon } from '@lucide/vue'
import { onScopeDispose, ref } from 'vue'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

const ACCEPTED_TYPES = ['image/png', 'image/jpeg', 'image/webp']

const dropZone = ref<HTMLElement | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)
const profilePhoto = ref<string | null>(null)

function applyFile(file: File | null | undefined) {
  if (!file) return
  // URL objek menahan berkasnya di memori sampai dicabut; yang lama dicabut
  // dulu supaya menjatuhkan gambar berkali-kali tidak menumpuk.
  if (profilePhoto.value) URL.revokeObjectURL(profilePhoto.value)
  profilePhoto.value = URL.createObjectURL(file)
}

function clearPhoto() {
  if (profilePhoto.value) URL.revokeObjectURL(profilePhoto.value)
  profilePhoto.value = null
}

onScopeDispose(clearPhoto)

const { isOverDropZone } = useDropZone(dropZone, {
  dataTypes: ACCEPTED_TYPES,
  multiple: false,
  onDrop: (files) => applyFile(files?.[0]),
})

function onFileChange(event: Event) {
  applyFile((event.target as HTMLInputElement).files?.[0])
}
</script>

<template>
  <div class="w-full max-w-40">
    <Label for="profile">Profile Picture</Label>
    <div class="mt-2 w-full">
      <div v-if="profilePhoto" class="relative aspect-square">
        <button
          class="-translate-y-1/2 absolute top-0 right-0 translate-x-1/2"
          type="button"
          @click="clearPhoto"
        >
          <XCircleIcon class="h-5 w-5 fill-primary text-primary-foreground" />
        </button>
        <img
          alt=""
          class="h-full w-full rounded-md border border-border object-cover"
          loading="lazy"
          :src="profilePhoto"
        >
      </div>
      <div
        v-else
        ref="dropZone"
        :class="cn(
          'flex aspect-square cursor-pointer items-center justify-center rounded-md border border-dashed focus:border-primary focus:outline-hidden',
          isOverDropZone && 'border-primary bg-secondary',
        )"
        @click="fileInput?.click()"
      >
        <input
          id="profile"
          ref="fileInput"
          :accept="ACCEPTED_TYPES.join(',')"
          class="hidden"
          type="file"
          @change="onFileChange"
        >
        <ImageIcon class="h-16 w-16" :stroke-width="1.25" />
      </div>
    </div>
  </div>
</template>
