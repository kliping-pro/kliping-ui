<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { FileIcon } from '@lucide/vue'
import { onBeforeUnmount, ref, watch } from 'vue'
import { cn } from '@/lib/utils'
import { injectFileUploadItemContext } from './context'

/**
 * Pratinjau berkasnya.
 *
 * Gambar dipratinjau lewat `URL.createObjectURL`, dan URL-nya dicabut saat
 * komponennya dilepas. Tanpa pencabutan itu, tiap gambar yang pernah dipilih
 * tetap tersimpan di memori sampai halamannya ditutup.
 */
const props = defineProps<{ class?: HTMLAttributes['class'] }>()

const file = injectFileUploadItemContext('FileUploadItemPreview')

const url = ref<string>()

watch(file, (b) => {
  if (url.value) URL.revokeObjectURL(url.value)
  url.value = b.file.type.startsWith('image/') ? URL.createObjectURL(b.file) : undefined
}, { immediate: true })

onBeforeUnmount(() => {
  if (url.value) URL.revokeObjectURL(url.value)
})
</script>

<template>
  <div
    :class="cn('relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded border bg-accent/50 [&>svg]:size-5', props.class)"
    data-slot="file-upload-item-preview"
  >
    <slot>
      <img v-if="url" :alt="file.file.name" class="size-full object-cover" :src="url">
      <FileIcon v-else class="text-muted-foreground" />
    </slot>
  </div>
</template>
