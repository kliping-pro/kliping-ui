<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { BannerVariant } from './context'
import { useResizeObserver } from '@vueuse/core'
import { computed, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue'
import { cn } from '@/lib/utils'
import { bannerVariants } from '.'
import { ANIMATION_DURATION, injectBannersContextOptional, provideBannerContext } from './context'

/**
 * Satu pita pemberitahuan.
 *
 * Dua cara pakai, dan komponennya mengenali sendiri yang mana:
 *
 *   di dalam `<Banners>` — ikut antrean, menumpuk, menutup otomatis
 *   di luar `<Banners>`  — pita biasa yang digambar di tempatnya
 *
 * Yang membedakan bukan prop, melainkan ada tidaknya antrean di atasnya.
 * Itu dibawa apa adanya dari sumbernya, dan tetap masuk akal: pemakai yang
 * cuma butuh satu pita tetap tidak perlu memasang wadah apa pun.
 */
const props = withDefaults(defineProps<{
  variant?: BannerVariant
  /** The initial state when used without `v-model:open`. */
  defaultOpen?: boolean
  /** Higher values show first; only applies inside a queue. */
  priority?: number
  /** Closes itself after this many milliseconds; zero means never. */
  duration?: number
  /** Whether BannerClose renders its close button. */
  dismissible?: boolean
  class?: HTMLAttributes['class']
}>(), {
  variant: 'default',
  defaultOpen: true,
  priority: 0,
  duration: 0,
  dismissible: true,
})

const emit = defineEmits<{
  /** The dismiss button was clicked. */
  dismiss: []
}>()

const model = defineModel<boolean | undefined>('open', { default: undefined })

const isOpen = computed({
  get: () => model.value ?? props.defaultOpen,
  set: (value) => {
    model.value = value
  },
})

// Boleh kosong: pita yang dipakai sendirian memang tidak punya antrean di
// atasnya, dan itu bukan kesalahan.
const queue = injectBannersContextOptional()

const id = useId()
const bannerRef = ref<HTMLElement>()
const isMounted = ref(false)

let durationTimer: ReturnType<typeof setTimeout> | undefined

function close() {
  emit('dismiss')
  if (queue) queue.close(id)
  else isOpen.value = false
}

onMounted(() => {
  // Satu bingkai tunda supaya animasi masuknya benar-benar terlihat: elemen
  // yang lahir sudah di posisi akhirnya tidak beranimasi ke mana pun.
  requestAnimationFrame(() => {
    isMounted.value = true
  })
})

watch(isOpen, (open) => {
  if (!queue) return
  if (open) queue.register(id, props.priority)
  else queue.close(id)
}, { immediate: true })

watch([isOpen, () => props.duration], ([open, duration]) => {
  clearTimeout(durationTimer)
  if (open && duration > 0) durationTimer = setTimeout(close, duration)
}, { immediate: true })

onBeforeUnmount(() => {
  clearTimeout(durationTimer)
  queue?.unregister(id)
})

useResizeObserver(bannerRef, ([entry]) => {
  queue?.measure(id, entry.contentRect.height)
})

const queueEntry = computed(() => queue?.items.value.find(b => b.id === id))
const isClosing = computed(() => queueEntry.value?.closing ?? false)
const index = computed(() => queue?.getIndex(id) ?? 0)
const isTop = computed(() => queue?.side.value !== 'bottom')

const style = computed(() => {
  if (!queue) return undefined

  const offset = queue.getOffset(id)
  const hidden = isTop.value ? 'translateY(-100%)' : 'translateY(100%)'

  const transform = !isMounted.value
    ? hidden
    : isClosing.value
      ? (isTop.value
          ? `translateY(calc(${offset}px - 100%))`
          : `translateY(calc(-${offset}px + 100%))`)
      : (isTop.value ? `translateY(${offset}px)` : `translateY(-${offset}px)`)

  return {
    position: 'absolute' as const,
    [isTop.value ? 'top' : 'bottom']: 0,
    left: 0,
    right: 0,
    zIndex: isClosing.value ? 0 : 50 - index.value,
    transform,
    opacity: isMounted.value && !isClosing.value ? 1 : 0,
    transition: `transform ${ANIMATION_DURATION}ms cubic-bezier(0.32, 0.72, 0, 1), opacity ${isClosing.value ? ANIMATION_DURATION / 2 : ANIMATION_DURATION}ms ease`,
  }
})

const isVisible = computed(() => {
  if (!queue) return isOpen.value
  return index.value !== -1
})

provideBannerContext(computed(() => ({
  variant: props.variant,
  dismissible: props.dismissible,
  close,
})))
</script>

<template>
  <Teleport v-if="queue && queue.container.value" :to="queue.container.value">
    <div
      v-if="isVisible"
      ref="bannerRef"
      aria-live="polite"
      :class="cn(bannerVariants({ variant: props.variant }), props.class)"
      :data-front="index === 0"
      :data-index="index"
      data-slot="queued-banner"
      :data-state="isClosing ? 'closed' : 'open'"
      role="status"
      :style="style"
    >
      <slot />
    </div>
  </Teleport>

  <div
    v-else-if="!queue && isOpen"
    aria-live="polite"
    :class="cn(bannerVariants({ variant: props.variant }), props.class)"
    data-slot="banner"
    data-state="open"
    role="status"
  >
    <slot />
  </div>
</template>
