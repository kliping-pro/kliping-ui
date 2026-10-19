<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { Primitive } from 'reka-ui'
import { cn } from '@/lib/utils'
import { injectGaugeContext } from './context'

/**
 * Nilai yang tertulis di tengah busurnya.
 *
 * Ditaruh di titik tengah tegak busur, bukan di pusat lingkarannya — pada
 * busur setengah lingkaran keduanya berjauhan, dan yang kedua membuat
 * teksnya melayang di luar busur.
 */
const props = defineProps<PrimitiveProps & {
  class?: HTMLAttributes['class']
}>()

const context = injectGaugeContext('GaugeValueText')
</script>

<template>
  <Primitive
    :as="props.as"
    :as-child="props.asChild"
    :class="cn('absolute right-0 left-0 flex -translate-y-1/2 items-center justify-center font-semibold text-2xl', props.class)"
    :data-state="context.state"
    :id="context.valueTextId"
    :style="{ top: `${context.arcCenterY}px` }"
  >
    <slot>{{ context.valueText }}</slot>
  </Primitive>
</template>
