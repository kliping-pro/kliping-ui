<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { injectMentionContext } from './context'

/**
 * Daftar saran yang mengambang di bawah kursor teks.
 *
 * Diletakkan mutlak terhadap akarnya, bukan dipindahkan ke `body`. Itu cukup
 * karena daftarnya selalu menempel pada masukannya sendiri — dan menghindari
 * satu masalah yang tidak sepele: daftar yang dipindahkan ke `body` harus
 * mengikuti masukannya saat halaman digulir.
 */
const props = defineProps<{ class?: HTMLAttributes['class'] }>()

const { state } = injectMentionContext('MentionContent')

const style = computed(() => {
  const position = state.value.position
  if (!position) return undefined
  return { left: `${position.x}px`, top: `${position.y + position.lineHeight}px` }
})
</script>

<template>
  <div
    v-if="state.open"
    :class="cn(
      'fade-in-0 zoom-in-95 absolute z-50 min-w-32 animate-in overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md',
      props.class,
    )"
    data-slot="mention-content"
    data-state="open"
    role="listbox"
    :style="style"
  >
    <slot />
  </div>
</template>
