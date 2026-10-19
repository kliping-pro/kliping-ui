<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed, onMounted, ref } from 'vue'
import { cn } from '@/lib/utils'
import { injectTourContext } from './context'

/**
 * Kartu penjelasan langkah yang sedang jalan.
 *
 * Letaknya dihitung sendiri, bukan lewat Floating UI. Yang perlu dijawab di
 * sini cuma satu: kartu berukuran tetap yang menempel pada satu kotak, dan
 * berbalik ke sisi seberang kalau sisi yang diminta tidak muat. Middleware
 * yang menjawab pertanyaan lain — elemen acuan yang berpindah, pengapit yang
 * bergeser, sasaran di dalam wadah yang tergulir sendiri — tidak terpakai,
 * karena tur menggulirkan sasarannya ke tengah layar sebelum menyorotnya.
 *
 * Langkah tanpa sasaran mendapat kartu di tengah layar. Itu bukan kasus
 * khusus yang ditambal: langkah pembuka dan penutup memang tidak menunjuk apa
 * pun, dan kartu di tengah yang paling tepat untuk keduanya.
 */
const props = withDefaults(defineProps<{
  /** Distance of the card from the highlight edge, in pixels. */
  sideOffset?: number
  /** Minimum space from the viewport edges. */
  collisionPadding?: number
  class?: HTMLAttributes['class']
}>(), {
  sideOffset: 12,
  collisionPadding: 16,
})

const { state, card } = injectTourContext('TourContent')

const mounted = ref(false)

onMounted(() => {
  mounted.value = true
})

/** The card size, updated whenever the step changes. */
const size = computed(() => ({
  width: card.value?.offsetWidth ?? 320,
  height: card.value?.offsetHeight ?? 160,
}))

const placement = computed(() => {
  const r = state.value.rect

  // Tanpa sasaran: di tengah layar, dan tetap di sana saat halamannya
  // tergulir — jadi `fixed`, bukan `absolute` seperti yang punya sasaran.
  if (!r) return { fixed: true, style: undefined }

  const { width, height } = size.value
  const step = state.value.current
  const side = step?.side ?? 'bottom'
  const align = step?.align ?? 'center'

  const viewportTop = r.top - window.scrollY
  const viewportBottom = viewportTop + r.height
  const viewportLeft = r.left - window.scrollX
  const viewportRight = viewportLeft + r.width

  const fits = {
    top: viewportTop - height - props.sideOffset >= props.collisionPadding,
    bottom: viewportBottom + height + props.sideOffset <= window.innerHeight - props.collisionPadding,
    left: viewportLeft - width - props.sideOffset >= props.collisionPadding,
    right: viewportRight + width + props.sideOffset <= window.innerWidth - props.collisionPadding,
  }

  const opposite = { top: 'bottom', bottom: 'top', left: 'right', right: 'left' } as const
  const used = fits[side] ? side : (fits[opposite[side]] ? opposite[side] : side)

  const vertical = used === 'top' || used === 'bottom'

  const top = used === 'top'
    ? r.top - height - props.sideOffset
    : used === 'bottom'
      ? r.top + r.height + props.sideOffset
      : alignAxis(r.top, r.height, height, align)

  const left = used === 'left'
    ? r.left - width - props.sideOffset
    : used === 'right'
      ? r.left + r.width + props.sideOffset
      : alignAxis(r.left, r.width, width, align)

  return {
    fixed: false,
    style: {
      top: `${clampAxis(top, height, window.innerHeight, window.scrollY, vertical)}px`,
      left: `${clampAxis(left, width, window.innerWidth, window.scrollX, !vertical)}px`,
    },
  }
})

/** Aligns along the axis that is not the side axis. */
function alignAxis(start: number, rectLength: number, cardLength: number, align: 'start' | 'center' | 'end') {
  if (align === 'start') return start
  if (align === 'end') return start + rectLength - cardLength
  return start + rectLength / 2 - cardLength / 2
}

// Sumbu sisinya sengaja tidak dijepit — kalau sisi atas dan bawah sama-sama
// tidak muat, menjepitnya menempelkan kartu ke tepi layar dan menutupi
// sasarannya sendiri. Yang begitu lebih baik dibiarkan menonjol sedikit.
/** Clamps one axis into the viewport. */
function clampAxis(value: number, length: number, viewport: number, scroll: number, active: boolean) {
  if (!active) return value

  return Math.min(
    Math.max(value, scroll + 16),
    scroll + viewport - length - 16,
  )
}
</script>

<template>
  <Teleport v-if="mounted" to="body">
    <div
      v-if="state.open && state.current"
      ref="card"
      :aria-label="state.current.title"
      :class="cn(
        'fade-in-0 zoom-in-95 z-50 w-80 max-w-[calc(100vw-2rem)] animate-in rounded-lg border bg-card p-4 text-card-foreground shadow-xl outline-none duration-200',
        placement.fixed
          ? 'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
          : 'absolute transition-[top,left] duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none',
        props.class,
      )"
      data-slot="tour-content"
      role="dialog"
      :style="placement.style"
      tabindex="-1"
    >
      <slot :step="state.current" />
    </div>
  </Teleport>
</template>
