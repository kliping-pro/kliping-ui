<script setup lang="ts">
import { CloudUpload } from '@lucide/vue'
import { ref } from 'vue'
import {
  FileUpload,
  FileUploadClear,
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
const rejected = ref<string[]>([])

/** Simulated upload, so the progress bars actually move. */
function upload(
  incoming: File[],
  callbacks: {
    onProgress: (file: File, percent: number) => void
    onSuccess: (file: File) => void
    onError: (file: File, message: string) => void
  },
) {
  for (const file of incoming) {
    let percent = 0
    const timer = setInterval(() => {
      percent += 10
      if (percent >= 100) {
        clearInterval(timer)
        callbacks.onSuccess(file)
        return
      }
      callbacks.onProgress(file, percent)
    }, 180)
  }
}
</script>

<template>
  <div class="flex w-full max-w-md flex-col gap-3">
    <FileUpload
      v-model="files"
      accept="image/*,.pdf"
      :max-files="4"
      :max-size="2 * 1024 * 1024"
      :on-upload="upload"
      @file-reject="(_, message) => rejected = [...rejected.slice(-2), message]"
    >
      <FileUploadDropzone>
        <CloudUpload class="size-6 text-muted-foreground" />
        <p class="text-sm">
          Drag files here
        </p>
        <p class="text-muted-foreground text-xs">
          Images or PDFs, up to 2 MB each, max 4 files
        </p>
        <FileUploadTrigger as-child>
          <Button class="mt-1" size="sm" variant="outline">
            Browse files
          </Button>
        </FileUploadTrigger>
      </FileUploadDropzone>

      <FileUploadList v-slot="{ file }">
        <FileUploadItem :file="file">
          <FileUploadItemPreview />
          <div class="flex min-w-0 flex-1 flex-col gap-1">
            <FileUploadItemMetadata size="sm" />
            <FileUploadItemProgress />
          </div>
          <FileUploadItemDelete />
        </FileUploadItem>
      </FileUploadList>

      <FileUploadClear />
    </FileUpload>

    <ul v-if="rejected.length" class="text-destructive text-xs">
      <li v-for="(reason, i) in rejected" :key="i">
        {{ reason }}
      </li>
    </ul>
  </div>
</template>
