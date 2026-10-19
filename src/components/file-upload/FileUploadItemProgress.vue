<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { injectFileUploadItemContext } from './context'

/**
 * Bilah kemajuan unggahnya.
 *
 * Tidak tergambar saat berkasnya belum atau sudah selesai diunggah — bilah
 * penuh yang menetap terbaca sebagai sesuatu yang macet, bukan sebagai
 * sesuatu yang selesai.
 */
const props = withDefaults(defineProps<{
  variant?: 'linear' | 'circular'
  size?: number
  class?: HTMLAttributes['class']
}>(), {
  variant: 'linear',
  size: 36,
})

const file = injectFileUploadItemContext('FileUploadItemProgress')

const visible = computed(() => file.value.status === 'uploading')

const ring = computed(() => {
  const radius = (props.size - 4) / 2
  const circumference = 2 * Math.PI * radius
  return {
    radius,
    circumference,
    offset: circumference - (file.value.progress / 100) * circumference,
    center: props.size / 2,
  }
})
</script>

<template>
  <template v-if="visible">
    <svg
      v-if="props.variant === 'circular'"
      :class="cn('-rotate-90 transform', props.class)"
      data-slot="file-upload-item-progress"
      :height="props.size"
      :viewBox="`0 0 ${props.size} ${props.size}`"
      :width="props.size"
    >
      <circle
        class="text-primary/20"
        :cx="ring.center"
        :cy="ring.center"
        fill="none"
        :r="ring.radius"
        stroke="currentColor"
        stroke-width="3"
      />
      <circle
        class="text-primary transition-[stroke-dashoffset] duration-300 ease-linear"
        :cx="ring.center"
        :cy="ring.center"
        fill="none"
        :r="ring.radius"
        stroke="currentColor"
        :stroke-dasharray="ring.circumference"
        :stroke-dashoffset="ring.offset"
        stroke-linecap="round"
        stroke-width="3"
      />
    </svg>

    <div
      v-else
      :aria-valuemax="100"
      :aria-valuemin="0"
      :aria-valuenow="file.progress"
      :class="cn('relative h-1.5 w-full overflow-hidden rounded-full bg-primary/20', props.class)"
      data-slot="file-upload-item-progress"
      role="progressbar"
    >
      <div
        class="h-full w-full flex-1 bg-primary transition-transform duration-300 ease-linear"
        :style="{ transform: `translateX(-${100 - file.progress}%)` }"
      />
    </div>
  </template>
</template>
