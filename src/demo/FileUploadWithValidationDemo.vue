<!-- example: 1. With Validation -->
<script setup lang="ts">
import { Upload } from '@lucide/vue'
import { ref } from 'vue'
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

const files = ref<File[]>([])
const rejected = ref<string[]>([])

// Aturannya lewat prop: hanya gambar, maksimal 2 berkas, 2 MB per berkas.
// Berkas yang ditolak memicu `file-reject` beserta alasannya.
function onReject(file: File, message: string) {
  const name = file.name.length > 20 ? `${file.name.slice(0, 20)}...` : file.name
  rejected.value = [...rejected.value.slice(-2), `"${name}": ${message}`]
}
</script>

<template>
  <div class="flex w-full max-w-md flex-col gap-3">
    <FileUpload v-model="files" accept="image/*" :max-files="2" :max-size="2 * 1024 * 1024" @file-reject="onReject">
      <FileUploadDropzone>
        <div class="flex flex-col items-center gap-1 text-center">
          <div class="flex items-center justify-center rounded-full border p-2.5">
            <Upload class="size-6 text-muted-foreground" />
          </div>
          <p class="text-sm font-medium">
            Drag & drop images here
          </p>
          <p class="text-xs text-muted-foreground">
            Or click to browse (max 2 files, up to 2MB each)
          </p>
        </div>
        <FileUploadTrigger as-child>
          <Button class="mt-2 w-fit" size="sm" variant="outline">
            Browse files
          </Button>
        </FileUploadTrigger>
      </FileUploadDropzone>
      <FileUploadList v-slot="{ file }">
        <FileUploadItem :file="file">
          <FileUploadItemPreview />
          <FileUploadItemMetadata class="flex-1" />
          <FileUploadItemDelete />
        </FileUploadItem>
      </FileUploadList>
    </FileUpload>
    <ul v-if="rejected.length" class="text-xs text-destructive">
      <li v-for="(reason, i) in rejected" :key="i">
        {{ reason }}
      </li>
    </ul>
  </div>
</template>
