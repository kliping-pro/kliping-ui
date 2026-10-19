<!-- example: 2. With File Upload -->
<script setup lang="ts">
import type { CropArea } from '@/components/cropper'
import { CloudUpload, Crop } from '@lucide/vue'
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { canvasToBlob, Cropper, CropperArea, CropperImage, CropperViewport, CropperZoomSlider, cropToCanvas } from '@/components/cropper'
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadList,
  FileUploadTrigger,
} from '@/components/file-upload'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'

const files = ref<File[]>([])
/** Hasil potong per nama berkas (URL objek). */
const cropped = ref<Record<string, string>>({})

const editing = ref<File>()
const editingUrl = computed(() => editing.value ? URL.createObjectURL(editing.value) : undefined)
watch(editingUrl, (_, old) => old && URL.revokeObjectURL(old))

const cropArea = ref<CropArea>()
const dialog = ref<HTMLElement>()

// Berkas yang dihapus dari daftar ikut melepas hasil potongnya.
watch(files, (list) => {
  const names = new Set(list.map(f => f.name))
  for (const [name, url] of Object.entries(cropped.value)) {
    if (names.has(name)) continue
    URL.revokeObjectURL(url)
    delete cropped.value[name]
  }
})

async function save() {
  const image = dialog.value?.querySelector('img')
  if (!editing.value || !image || !cropArea.value) return
  const canvas = await cropToCanvas(image, { width: image.naturalWidth, height: image.naturalHeight }, cropArea.value)
  const blob = await canvasToBlob(canvas, 'image/png')
  const name = editing.value.name
  if (cropped.value[name]) URL.revokeObjectURL(cropped.value[name])
  cropped.value = { ...cropped.value, [name]: URL.createObjectURL(blob) }
  editing.value = undefined
}

onBeforeUnmount(() => {
  Object.values(cropped.value).forEach(url => URL.revokeObjectURL(url))
  if (editingUrl.value) URL.revokeObjectURL(editingUrl.value)
})
</script>

<template>
  <div class="flex w-full max-w-md flex-col gap-3">
    <FileUpload v-model="files" accept="image/*" :max-files="4">
      <FileUploadDropzone>
        <CloudUpload class="size-6 text-muted-foreground" />
        <p class="text-sm">
          Drag images here
        </p>
        <FileUploadTrigger as-child>
          <Button class="mt-1" size="sm" variant="outline">
            Browse images
          </Button>
        </FileUploadTrigger>
      </FileUploadDropzone>
      <FileUploadList v-slot="{ file }">
        <FileUploadItem :file="file">
          <img
            v-if="cropped[file.file.name]"
            alt="Cropped preview"
            class="size-10 shrink-0 rounded-md border object-cover"
            :src="cropped[file.file.name]"
          >
          <FileUploadItemPreview v-else />
          <FileUploadItemMetadata class="flex-1" size="sm" />
          <Button
            :aria-label="`Crop ${file.file.name}`"
            class="size-7"
            size="icon"
            variant="ghost"
            @click="editing = file.file"
          >
            <Crop />
          </Button>
          <FileUploadItemDelete />
        </FileUploadItem>
      </FileUploadList>
    </FileUpload>

    <Dialog :open="!!editing" @update:open="value => !value && (editing = undefined)">
      <DialogContent class="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Crop image</DialogTitle>
          <DialogDescription>Drag to move, scroll or use the slider to zoom.</DialogDescription>
        </DialogHeader>
        <div ref="dialog">
          <Cropper v-if="editingUrl" :aspect-ratio="1" @crop-change="cropArea = $event">
            <CropperViewport class="max-h-72">
              <CropperImage alt="Image to crop" :src="editingUrl" />
              <CropperArea />
            </CropperViewport>
            <CropperZoomSlider />
          </Cropper>
        </div>
        <DialogFooter>
          <Button variant="outline" @click="editing = undefined">
            Cancel
          </Button>
          <Button @click="save">
            Crop
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>
