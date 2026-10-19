<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { ScrollDirection, ScrollTriggerMode } from './context'
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from '@lucide/vue'
import { computed, onBeforeUnmount } from 'vue'
import { cn } from '@/lib/utils'
import { scrollButtonVariants } from '.'

/**
 * Tombol gulir di tepi wadahnya.
 *
 * Tiga cara memicunya, dan bedanya nyata bagi pemakainya:
 *
 *   press — ditekan terus, guliran berjalan selama jarinya menempel
 *   hover — cukup disinggahi tetikus
 *   click — satu klik, satu langkah
 *
 * Yang berjalan terus memakai pencacah 50 milidetik, bukan
 * `requestAnimationFrame`: yang diinginkan langkah yang tetap besarnya, bukan
 * guliran yang kecepatannya ikut kecepatan layar.
 */
const props = withDefaults(defineProps<{
  /** Edge the button sits on and scrolls toward: 'up', 'down', 'left', or 'right'. */
  direction: ScrollDirection
  /** How the button scrolls: 'press' (repeats while held), 'hover' (repeats on hover), or 'click' (one step). */
  triggerMode?: ScrollTriggerMode
  class?: HTMLAttributes['class']
}>(), {
  triggerMode: 'press',
})

const emit = defineEmits<{
  /** Fired on click, or repeatedly while held or hovered, per `triggerMode`. */
  scroll: []
}>()

const ICONS = {
  up: ChevronUp,
  down: ChevronDown,
  left: ChevronLeft,
  right: ChevronRight,
}

const icon = computed(() => ICONS[props.direction])

let interval: ReturnType<typeof setInterval> | null = null

function start() {
  if (interval !== null) return
  emit('scroll')
  interval = setInterval(() => emit('scroll'), 50)
}

function stop() {
  if (interval === null) return
  clearInterval(interval)
  interval = null
}

// Tanpa ini, tombol yang dilepas dari DOM saat jarinya masih menempel
// meninggalkan pencacah yang berjalan selamanya.
onBeforeUnmount(stop)
</script>

<template>
  <button
    :aria-label="`Scroll ${props.direction}`"
    :class="cn(scrollButtonVariants({ direction: props.direction }), props.class)"
    data-slot="scroll-button"
    type="button"
    @click="props.triggerMode === 'click' && emit('scroll')"
    @pointerdown="props.triggerMode === 'press' && start()"
    @pointerenter="props.triggerMode === 'hover' && start()"
    @pointerleave="stop"
    @pointerup="stop"
  >
    <component :is="icon" />
  </button>
</template>
