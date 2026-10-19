<!-- example: 6. With Chat Input -->
<script setup lang="ts">
import { ArrowUp, Paperclip, Upload, X } from '@lucide/vue'
import { computed, ref } from 'vue'
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
import { Textarea } from '@/components/ui/textarea'

const input = ref('')
const files = ref<File[]>([])
const uploading = ref(false)
const sent = ref<string[]>([])

/** Unggahan tiruan: 10 potong dengan jeda 100–300 ms, lalu 500 ms "pemrosesan server". */
async function upload(
  incoming: File[],
  { onProgress, onSuccess }: {
    onProgress: (file: File, percent: number) => void
    onSuccess: (file: File) => void
    onError: (file: File, message: string) => void
  },
) {
  uploading.value = true
  await Promise.all(incoming.map(async (file) => {
    for (let chunk = 1; chunk <= 10; chunk++) {
      await new Promise(resolve => setTimeout(resolve, Math.random() * 200 + 100))
      onProgress(file, chunk * 10)
    }
    await new Promise(resolve => setTimeout(resolve, 500))
    onSuccess(file)
  }))
  uploading.value = false
}

const canSend = computed(() => !!input.value.trim() && !uploading.value)

function send() {
  if (!canSend.value) return
  const attached = files.value.length ? ` (${files.value.length} file${files.value.length > 1 ? 's' : ''})` : ''
  sent.value = [...sent.value.slice(-2), `${input.value.trim()}${attached}`]
  input.value = ''
  files.value = []
}
</script>

<template>
  <div class="flex w-full max-w-md flex-col gap-3">
    <ul v-if="sent.length" class="flex flex-col items-end gap-1.5">
      <li v-for="(message, i) in sent" :key="i" class="rounded-lg bg-primary px-3 py-1.5 text-sm text-primary-foreground">
        {{ message }}
      </li>
    </ul>
    <FileUpload v-model="files" :disabled="uploading" :max-files="5" :max-size="5 * 1024 * 1024" :on-upload="upload">
      <!-- Seluruh kotak obrolan jadi area jatuhkan berkas. Klik di dalam
           formulir dihentikan di formulirnya, jadi mengetik tidak membuka
           pemilih berkas — yang membukanya tombol klip. -->
      <FileUploadDropzone class="group relative items-stretch gap-0 border-0 p-0 hover:bg-transparent data-[dragging]:bg-transparent">
        <div class="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center gap-1 rounded-md border-2 border-dashed border-primary/30 bg-background/80 opacity-0 backdrop-blur transition-opacity group-data-[dragging]:opacity-100">
          <Upload class="size-6 text-muted-foreground" />
          <p class="text-sm font-medium">
            Drop files to attach
          </p>
          <p class="text-xs text-muted-foreground">
            Up to 5 files, 5MB each
          </p>
        </div>
        <form
          class="flex w-full flex-col gap-2.5 rounded-md border border-input px-3 py-2 focus-within:ring-1 focus-within:ring-ring/50"
          @click.stop
          @submit.prevent="send"
        >
          <FileUploadList v-if="files.length" v-slot="{ file }" class="overflow-x-auto px-0 py-1" orientation="horizontal">
            <FileUploadItem class="max-w-52 p-1.5" :file="file">
              <FileUploadItemPreview class="size-8 [&>svg]:size-5" />
              <FileUploadItemMetadata size="sm" />
              <FileUploadItemDelete class="absolute -top-1 -right-1 size-4 rounded-full bg-secondary">
                <X class="size-2.5" />
              </FileUploadItemDelete>
            </FileUploadItem>
          </FileUploadList>
          <Textarea
            v-model="input"
            aria-label="Message"
            class="field-sizing-content min-h-10 w-full resize-none border-0 bg-transparent p-0 shadow-none focus-visible:ring-0 dark:bg-transparent"
            :disabled="uploading"
            placeholder="Type your message here..."
            @keydown.enter.exact.prevent="send"
          />
          <div class="flex items-center justify-end gap-1.5">
            <FileUploadTrigger as-child>
              <Button aria-label="Attach file" class="size-7" size="icon" type="button" variant="ghost">
                <Paperclip class="size-3.5" />
              </Button>
            </FileUploadTrigger>
            <Button aria-label="Send message" class="size-7" :disabled="!canSend" size="icon" type="submit">
              <ArrowUp class="size-3.5" />
            </Button>
          </div>
        </form>
      </FileUploadDropzone>
    </FileUpload>
  </div>
</template>
