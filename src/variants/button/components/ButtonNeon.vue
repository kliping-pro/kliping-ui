<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

/**
 * Tombol neon, dibuat dengan menumpuk kelas di atas `Button` biasa.
 *
 * Prop selain `class` diteruskan Vue sendiri lewat atribut sisa, jadi
 * `{...props}` di sumbernya tidak perlu padanan di sini.
 */
const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
  <Button :class="cn('border-indigo-500 bg-indigo-500 text-primary-foreground shadow-indigo-400/70 shadow-lg hover:bg-indigo-600 dark:text-foreground dark:shadow-indigo-700', props.class)">
    <slot />
  </Button>
</template>
