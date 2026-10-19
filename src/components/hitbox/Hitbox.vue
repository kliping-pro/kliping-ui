<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { Primitive } from 'reka-ui'
import { cn } from '@/lib/utils'
import type { HitboxSize, HitboxVariants } from '.'
import { hitboxVariants, NAMED_SIZES } from '.'

/**
 * Melebarkan daerah sentuh sebuah elemen tanpa mengubah tampilannya.
 *
 * Yang melebar pseudo-elemen `::after`, bukan elemennya sendiri — jadi tata
 * letak di sekitarnya tidak bergeser sedikit pun. Berguna untuk tombol ikon
 * kecil, gagang penggeser, dan apa pun yang secara visual memang harus mungil
 * tapi tetap harus mudah disentuh jempol.
 *
 * `size` menerima nama baku maupun panjang CSS apa pun. Yang bukan nama baku
 * dialirkan lewat peubah `--size`, jadi `size="2rem"` sama sahnya dengan
 * `size="lg"`.
 */
const props = withDefaults(defineProps<PrimitiveProps & {
  size?: HitboxSize
  /** Sides the hit area extends past: 'all', 'top', 'bottom', 'left', 'right', 'vertical', or 'horizontal'. */
  position?: HitboxVariants['position']
  /** Corner rounding of the hit area: 'none', 'sm', 'md', 'lg', or 'full'. */
  radius?: HitboxVariants['radius']
  /** Outlines the hit area, for checking during development. */
  debug?: boolean
  class?: HTMLAttributes['class']
}>(), {
  asChild: true,
  debug: false,
})

const isCustomSize = computed(() => Boolean(props.size) && !NAMED_SIZES.includes(props.size as never))

const style = computed(() => (isCustomSize.value ? { '--size': props.size } : undefined))
</script>

<template>
  <Primitive
    :as="props.as"
    :as-child="props.asChild"
    :class="cn(hitboxVariants({
      size: isCustomSize ? 'dynamic' : (props.size as HitboxVariants['size']),
      position: props.position,
      radius: props.radius,
      debug: props.debug,
    }), props.class)"
    data-slot="hitbox"
    :style="style"
  >
    <slot />
  </Primitive>
</template>
