<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { cn } from '@/lib/utils'

/**
 * Satu avatar di dalam tumpukan, beserta guntingan di sisi yang tertimpa.
 *
 * Avatar yang saling menumpuk tanpa guntingan terlihat kotor: tepi avatar di
 * belakang menyentuh tepi avatar di depannya tanpa jarak. Yang menggunting
 * `mask-image` berbentuk lingkaran yang dipasang tepat di posisi tetangganya,
 * jadi celahnya mengikuti bentuk avatar, bukan sekadar garis lurus.
 *
 * Sumbernya menuliskan arah guntingan itu sebagai empat lapis `if` bersarang
 * — orientasi, arah baca, lalu terbalik atau tidak — yang menghasilkan
 * delapan cabang. Kedelapannya ternyata cuma dua jawaban, dan yang menentukan
 * satu perbandingan: guntingannya di sisi jauh kalau arah baca dan urutan
 * terbaliknya sepakat. Orientasi tidak ikut menentukan, ia cuma memilih sumbu.
 */
const props = defineProps<{
  /** Position of this avatar in the group, starting at 0; decides whether it gets a cut-out. */
  index: number
  /** Total number of avatars rendered in the group. */
  itemCount: number
  size: number
  orientation: 'horizontal' | 'vertical'
  dir: 'ltr' | 'rtl'
  /** Reverses the overlap so later avatars sit on top of earlier ones. */
  reverse: boolean
  class?: HTMLAttributes['class']
}>()

const masked = computed(() => {
  if (props.orientation === 'vertical' && props.dir === 'rtl' && props.reverse)
    return props.index !== props.itemCount - 1

  return props.reverse ? props.index < props.itemCount - 1 : props.index > 0
})

const style = computed(() => {
  if (!masked.value)
    return { width: `${props.size}px`, height: `${props.size}px`, maskImage: '' }

  const radius = props.size / 2
  const shift = props.size / 4 + props.size / 10

  // Lingkaran guntingannya diletakkan di tempat tetangga berada.
  const farSide = (props.dir === 'ltr') === props.reverse
  const offset = farSide ? `${props.size + shift}px` : `-${shift}px`
  const point = props.orientation === 'vertical' ? `50% ${offset}` : `${offset} 50%`

  return {
    width: `${props.size}px`,
    height: `${props.size}px`,
    maskImage: `radial-gradient(circle ${radius}px at ${point}, transparent 99%, white 100%)`,
  }
})
</script>

<template>
  <div
    :class="cn('size-full shrink-0 overflow-hidden rounded-full [&_img]:size-full', props.class)"
    data-slot="avatar-group-item"
    :style="style"
  >
    <slot />
  </div>
</template>
