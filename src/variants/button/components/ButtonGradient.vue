<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

/**
 * Tombol bergradasi, dibuat dengan menumpuk kelas di atas `Button` biasa.
 *
 * Prop selain `class` diteruskan Vue sendiri lewat atribut sisa, jadi
 * `{...props}` di sumbernya tidak perlu padanan di sini.
 */
const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
  <Button :class="cn('border-0 bg-linear-to-r from-blue-500 to-indigo-500 text-primary-foreground hover:to-blue-500 dark:text-foreground', props.class)">
    <slot />
  </Button>
</template>
