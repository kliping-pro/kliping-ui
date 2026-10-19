<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { ActionBarDirection, ActionBarOrientation } from './context'
import { onKeyStroke } from '@vueuse/core'
import { Primitive, useDirection } from 'reka-ui'
import { computed, onMounted, ref } from 'vue'
import { cn } from '@/lib/utils'
import { provideActionBarContext } from './context'

/**
 * Bilah aksi mengambang yang muncul saat ada yang terpilih.
 *
 * Digambar sebagai anak `body` lewat `<Teleport>`, bukan di tempatnya
 * dituliskan. Posisinya `fixed`, dan `fixed` yang berada di dalam elemen
 * ber-`transform` akan diukur terhadap elemen itu — bukan terhadap layar.
 * Satu `transform` di leluhur mana pun sudah cukup, dan `transform` ada di
 * mana-mana pada halaman beranimasi.
 */
const props = withDefaults(defineProps<PrimitiveProps & {
  /** Viewport edge the bar is fixed to: `top` or `bottom`. */
  side?: 'top' | 'bottom'
  /** Distance in px between the bar and that viewport edge. */
  sideOffset?: number
  /** Horizontal placement in the viewport: `start` (left), `center`, or `end` (right). */
  align?: 'start' | 'center' | 'end'
  /** Distance in px from the left or right viewport edge; ignored when `align` is `center`. */
  alignOffset?: number
  dir?: ActionBarDirection
  orientation?: ActionBarOrientation
  /** Arrow keys wrap around from end to end. */
  loop?: boolean
  /** The target container. Defaults to `body`. */
  portalContainer?: string | HTMLElement
  class?: HTMLAttributes['class']
}>(), {
  side: 'bottom',
  sideOffset: 16,
  align: 'center',
  alignOffset: 0,
  orientation: 'horizontal',
  loop: true,
})

const emit = defineEmits<{
  /** Escape was pressed while the bar had focus. */
  escape: [event: KeyboardEvent]
}>()

const open = defineModel<boolean>('open', { default: false })

const direction = useDirection(computed(() => props.dir))

const mounted = ref(false)
onMounted(() => {
  mounted.value = true
})

onKeyStroke('Escape', (event) => {
  if (!open.value) return
  emit('escape', event)
  if (!event.defaultPrevented) open.value = false
})

const position = computed(() => {
  const style: Record<string, string> = { [props.side]: `${props.sideOffset}px` }

  if (props.align === 'center') {
    style.left = '50%'
    style.translate = '-50% 0'
  }
  else if (props.align === 'start') style.left = `${props.alignOffset}px`
  else style.right = `${props.alignOffset}px`

  return style
})

provideActionBarContext(computed(() => ({
  dir: direction.value,
  orientation: props.orientation,
  loop: props.loop,
  close: () => {
    open.value = false
  },
})))
</script>

<template>
  <Teleport v-if="mounted && open" :to="props.portalContainer ?? 'body'">
    <Primitive
      :aria-orientation="props.orientation"
      :as="props.as"
      :as-child="props.asChild"
      :class="cn(
        'fixed z-50 rounded-lg border bg-card shadow-lg outline-none',
        'fade-in-0 zoom-in-95 animate-in duration-250 [animation-timing-function:cubic-bezier(0.16,1,0.3,1)]',
        'data-[side=bottom]:slide-in-from-bottom-4 data-[side=top]:slide-in-from-top-4',
        'motion-reduce:animate-none motion-reduce:transition-none',
        props.orientation === 'horizontal'
          ? 'flex flex-row items-center gap-2 px-2 py-1.5'
          : 'flex flex-col items-start gap-2 px-1.5 py-2',
        props.class,
      )"
      :data-align="props.align"
      :data-orientation="props.orientation"
      :data-side="props.side"
      :style="position"
      data-slot="action-bar"
      :dir="direction"
      role="toolbar"
    >
      <slot />
    </Primitive>
  </Teleport>
</template>
