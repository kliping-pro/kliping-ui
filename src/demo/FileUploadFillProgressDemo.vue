<!-- example: 4. Fill Progress -->
<script setup lang="ts">
import { Upload, X } from '@lucide/vue'
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
const rejected = ref<string>()

/** Unggahan tiruan: 10 potong dengan jeda 100–300 ms, lalu 500 ms "pemrosesan server". */
async function upload(
  incoming: File[],
  { onProgress, onSuccess, onError }: {
    onProgress: (file: File, percent: number) => void
    onSuccess: (file: File) => void
    onError: (file: File, message: string) => void
  },
) {
  await Promise.all(incoming.map(async (file) => {
    try {
      for (let chunk = 1; chunk <= 10; chunk++) {
        await new Promise(resolve => setTimeout(resolve, Math.random() * 200 + 100))
        onProgress(file, chunk * 10)
      }
      await new Promise(resolve => setTimeout(resolve, 500))
      onSuccess(file)
    }
    catch (error) {
      onError(file, error instanceof Error ? error.message : 'Upload failed')
    }
  }))
}
</script>

<template>
  <div class="flex w-full max-w-md flex-col gap-3">
    <FileUpload v-model="files" :max-files="10" :max-size="5 * 1024 * 1024" :on-upload="upload" @file-reject="(_, message) => rejected = message">
      <FileUploadDropzone>
        <div class="flex flex-col items-center gap-1 text-center">
          <div class="flex items-center justify-center rounded-full border p-2.5">
            <Upload class="size-6 text-muted-foreground" />
          </div>
          <p class="text-sm font-medium">
            Drag & drop files here
          </p>
          <p class="text-xs text-muted-foreground">
            Or click to browse (max 10 files, up to 5MB each)
          </p>
        </div>
        <FileUploadTrigger as-child>
          <Button class="mt-2 w-fit" size="sm" variant="outline">
            Browse files
          </Button>
        </FileUploadTrigger>
      </FileUploadDropzone>
      <FileUploadList v-slot="{ file }" orientation="horizontal">
        <FileUploadItem class="p-0" :file="file">
          <div class="relative">
            <FileUploadItemPreview class="size-20" />
            <!-- Pratinjau "terisi" dari bawah mengikuti kemajuan unggahan. -->
            <div
              v-if="file.status === 'uploading'"
              class="absolute inset-x-0 top-0 rounded-t bg-background/70 transition-[height] duration-300 ease-linear"
              :style="{ height: `${100 - file.progress}%` }"
            />
          </div>
          <FileUploadItemMetadata class="sr-only" />
          <FileUploadItemDelete class="absolute -top-1 -right-1 size-5 rounded-full bg-secondary">
            <X class="size-3" />
          </FileUploadItemDelete>
        </FileUploadItem>
      </FileUploadList>
    </FileUpload>
    <p v-if="rejected" class="text-xs text-destructive">
      {{ rejected }}
    </p>
  </div>
</template>
