<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { ScrollDirection, ScrollOrientation, ScrollTriggerMode } from './context'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { cn } from '@/lib/utils'
import { scrollerVariants } from '.'
import ScrollButton from './ScrollButton.vue'

/**
 * Wadah bergulir dengan bayangan di tepinya.
 *
 * Bayangannya bukan gradien yang ditumpuk di atas isinya, melainkan
 * `mask-image` pada wadahnya sendiri. Bedanya terasa pada latar bercorak: yang
 * ditumpuk harus menebak warna latar dan selalu salah di salah satu tema,
 * sedangkan yang digunting benar-benar memudarkan isinya.
 *
 * Keadaannya ditulis sebagai atribut `data-*` langsung ke elemennya, bukan
 * lewat kelas yang dihitung ulang. Itu dibawa dari sumbernya, dan alasannya
 * tetap berlaku: guliran memicu banyak sekali peristiwa, dan menulis satu
 * atribut jauh lebih murah daripada menggambar ulang komponennya.
 */
const props = withDefaults(defineProps<{
  orientation?: ScrollOrientation
  /** Hides the native scrollbar while keeping the content scrollable. */
  hideScrollbar?: boolean
  /** The shadow height, in pixels. */
  size?: number
  /** The tolerance threshold before the shadow appears. */
  offset?: number
  /** How far one scroll-button step goes. */
  scrollStep?: number
  /** Shows scroll buttons at the edges that still have content to scroll to. */
  withNavigation?: boolean
  /** How the navigation buttons scroll: 'press' (while held), 'hover', or 'click' (one step). */
  scrollTriggerMode?: ScrollTriggerMode
  class?: HTMLAttributes['class']
}>(), {
  orientation: 'vertical',
  hideScrollbar: false,
  size: 40,
  offset: 0,
  scrollStep: 40,
  withNavigation: false,
  scrollTriggerMode: 'press',
})

const container = ref<HTMLElement>()
const visible = ref({ up: false, down: false, left: false, right: false })

function scrollToward(direction: ScrollDirection) {
  const el = container.value
  if (!el) return

  if (direction === 'up') el.scrollTop -= props.scrollStep
  else if (direction === 'down') el.scrollTop += props.scrollStep
  else if (direction === 'left') el.scrollLeft -= props.scrollStep
  else el.scrollLeft += props.scrollStep
}

/** Sets or removes a single marker attribute, without re-rendering anything. */
function setFlag(el: HTMLElement, name: string, enabled: boolean) {
  if (enabled) el.setAttribute(name, 'true')
  else el.removeAttribute(name)
}

function check() {
  const el = container.value
  if (!el) return

  if (props.orientation === 'vertical') {
    const { scrollTop, clientHeight, scrollHeight } = el

    const hasTop = scrollTop > props.offset
    const hasBottom = scrollTop + clientHeight + props.offset < scrollHeight
    const isScrollable = scrollHeight > clientHeight

    // Kedua tepi sekaligus dipisahkan jadi penandanya sendiri: gradien untuk
    // "memudar di atas dan di bawah" bukan gabungan dua gradien satu sisi.
    const hasBoth = hasTop && hasBottom && isScrollable
    setFlag(el, 'data-top-bottom-scroll', hasBoth)
    setFlag(el, 'data-top-scroll', !hasBoth && hasTop)
    setFlag(el, 'data-bottom-scroll', !hasBoth && hasBottom && isScrollable)

    if (props.withNavigation) {
      visible.value = {
        ...visible.value,
        up: hasTop,
        down: scrollTop + clientHeight < scrollHeight,
      }
    }
  }

  const { scrollLeft, clientWidth, scrollWidth } = el

  const hasLeft = scrollLeft > props.offset
  const hasRight = scrollLeft + clientWidth + props.offset < scrollWidth
  const isScrollableX = scrollWidth > clientWidth

  const hasBothX = hasLeft && hasRight && isScrollableX
  setFlag(el, 'data-left-right-scroll', hasBothX)
  setFlag(el, 'data-left-scroll', !hasBothX && hasLeft)
  setFlag(el, 'data-right-scroll', !hasBothX && hasRight && isScrollableX)

  if (props.withNavigation) {
    visible.value = {
      ...visible.value,
      left: hasLeft,
      right: scrollLeft + clientWidth < scrollWidth,
    }
  }
}

onMounted(() => {
  check()
  container.value?.addEventListener('scroll', check, { passive: true })
  window.addEventListener('resize', check)
})

onBeforeUnmount(() => {
  container.value?.removeEventListener('scroll', check)
  window.removeEventListener('resize', check)
})

const directions = computed<ScrollDirection[]>(() => {
  if (!props.withNavigation) return []
  return props.orientation === 'vertical' ? ['up', 'down'] : ['left', 'right']
})
</script>

<template>
  <!--
    Pembungkusnya selalu ada, tapi `display: contents` membuatnya hilang dari
    tata letak saat tombolnya tidak diminta — anaknya naik menggantikannya,
    persis seperti kalau div-nya tidak ditulis sama sekali.

    Alternatifnya menulis wadah bergulirnya dua kali di dua cabang `v-if`, dan
    dua salinan yang harus dijaga tetap sama adalah cara paling pasti membuat
    keduanya lambat laun berbeda.
  -->
  <div :class="props.withNavigation ? 'relative w-full' : 'contents'">
    <template v-if="props.withNavigation">
      <ScrollButton
        v-for="direction in directions"
        v-show="visible[direction]"
        :key="direction"
        :direction="direction"
        :trigger-mode="props.scrollTriggerMode"
        @scroll="scrollToward(direction)"
      />
    </template>

    <div
      ref="container"
      :class="cn(scrollerVariants({ orientation: props.orientation, hideScrollbar: props.hideScrollbar }), props.class)"
      data-slot="scroller"
      :style="{ '--scroll-shadow-size': `${props.size}px` }"
      tabindex="0"
    >
      <slot />
    </div>
  </div>
</template>
