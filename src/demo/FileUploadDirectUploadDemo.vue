<!-- example: 2. Direct Upload -->
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
  FileUploadItemProgress,
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
    <FileUpload v-model="files" :max-files="2" :on-upload="upload" @file-reject="(_, message) => rejected = message">
      <FileUploadDropzone>
        <div class="flex flex-col items-center gap-1 text-center">
          <div class="flex items-center justify-center rounded-full border p-2.5">
            <Upload class="size-6 text-muted-foreground" />
          </div>
          <p class="text-sm font-medium">
            Drag & drop files here
          </p>
          <p class="text-xs text-muted-foreground">
            Or click to browse (max 2 files)
          </p>
        </div>
        <FileUploadTrigger as-child>
          <Button class="mt-2 w-fit" size="sm" variant="outline">
            Browse files
          </Button>
        </FileUploadTrigger>
      </FileUploadDropzone>
      <FileUploadList v-slot="{ file }">
        <FileUploadItem class="flex-col" :file="file">
          <div class="flex w-full items-center gap-2">
            <FileUploadItemPreview />
            <FileUploadItemMetadata class="flex-1" />
            <FileUploadItemDelete />
          </div>
          <FileUploadItemProgress class="w-full" />
        </FileUploadItem>
      </FileUploadList>
    </FileUpload>
    <p v-if="rejected" class="text-xs text-destructive">
      {{ rejected }}
    </p>
  </div>
</template>
