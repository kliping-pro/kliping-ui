<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { RatingSize } from './context'
import { RatingRoot } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { provideRatingContext } from './context'
import RatingItem from './RatingItem.vue'

/**
 * Penilaian berbintang.
 *
 * Ditulis di atas `RatingRoot` milik Reka UI, dan itu membuang sekitar tujuh
 * ratus baris dari sumbernya sekaligus: fokus berputar antar bintang,
 * pelacakan nilai yang sedang disinggahi, penanganan panah dan Home/End,
 * pembagian tiap bintang jadi langkah pecahan, dan masukan tersembunyi untuk
 * formulir — semuanya sudah ada di sana.
 *
 * Yang tersisa di sini keputusan tampilannya: ukuran, ikon, dan bagaimana
 * bintang yang terisi separuh digambar.
 *
 * Satu perbedaan mekanis pantas dicatat. Sumbernya menggambar isian pecahan
 * dengan gradien SVG yang ditanam di dokumen lalu ditunjuk `fill`. Reka UI
 * menempuhnya dengan menumpuk beberapa penunjuk yang lebarnya dipotong. Yang
 * kedua tidak memerlukan `<defs>` global maupun id yang harus unik
 * se-halaman.
 */
const props = withDefaults(defineProps<PrimitiveProps & {
  /** The total number of stars. */
  max?: number
  size?: RatingSize
  /** The fraction per star: 1 for whole, 0.5 for half, and so on. */
  step?: 1 | 0.5 | 0.25 | 0.1
  /** Clicking the currently selected star clears it. */
  clearable?: boolean
  /** The value follows the pointer on hover. */
  hoverable?: boolean
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  name?: string
  dir?: 'ltr' | 'rtl'
  orientation?: 'horizontal' | 'vertical'
  class?: HTMLAttributes['class']
}>(), {
  max: 5,
  size: 'default',
  step: 1,
  clearable: false,
  hoverable: true,
  orientation: 'horizontal',
})

const model = defineModel<number>({ default: 0 })

provideRatingContext(computed(() => ({ size: props.size })))
</script>

<template>
  <RatingRoot
    v-model="model"
    :as="props.as"
    :as-child="props.asChild"
    :class="cn(
      'flex gap-1 text-primary outline-none',
      props.orientation === 'horizontal' ? 'flex-row items-center' : 'flex-col items-start',
      props.class,
    )"
    :clearable="props.clearable"
    :data-disabled="props.disabled ? '' : undefined"
    :data-orientation="props.orientation"
    :data-readonly="props.readonly ? '' : undefined"
    data-slot="rating"
    :dir="props.dir"
    :disabled="props.disabled || props.readonly"
    :hoverable="props.hoverable"
    :length="props.max"
    :name="props.name"
    :orientation="props.orientation"
    :required="props.required"
    :step="props.step"
  >
    <!-- Tanpa isi, bintang sebanyak `max` digambar sendiri. -->
    <slot>
      <RatingItem v-for="i in props.max" :key="i" :item="i" />
    </slot>
  </RatingRoot>
</template>
