<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { Primitive } from 'reka-ui'
import { cn } from '@/lib/utils'

/**
 * Deretan lencana untuk nilai yang sudah terpilih.
 *
 * Berbeda dari sumbernya, isinya diulang pemakainya sendiri dari
 * `v-model`-nya. Alasannya ada di keterangan `Combobox.vue`.
 */
const props = defineProps<PrimitiveProps & {
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <Primitive
    :as="props.as"
    :as-child="props.asChild"
    :class="cn('flex flex-wrap items-center gap-1.5', props.class)"
    data-slot="combobox-badge-list"
  >
    <slot />
  </Primitive>
</template>
