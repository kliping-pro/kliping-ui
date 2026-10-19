<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

/**
 * Garis pemisah di dalam kartu statistik.
 *
 * Ditulis tangan karena konverter menolaknya, dan penolakannya benar: berkas
 * sumbernya tidak mendeklarasikan satu prop pun — seluruh propnya diteruskan
 * ke `Separator` — sehingga tidak ada yang bisa disusun jadi `defineProps`.
 * Di Vue pun tidak perlu: atribut yang tidak dikenali diteruskan sendiri.
 */
const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
  <Separator :class="cn('my-2', props.class)" data-slot="stat-separator" />
</template>
