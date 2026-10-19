<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { Primitive } from 'reka-ui'
import { computed, onBeforeUnmount, onMounted, useId } from 'vue'
import { cn } from '@/lib/utils'
import { speedDialItemVariants } from '.'
import { injectSpeedDialContext, provideSpeedDialItemContext } from './context'

/**
 * Satu baris aksi: labelnya dan tombolnya.
 *
 * Jedanya dihitung dari urutan pendaftarannya. Saat membuka, aksi terdekat
 * muncul lebih dulu; saat menutup, urutannya dibalik supaya gerakannya
 * terasa mengumpul kembali ke tombol utamanya alih-alih runtuh serentak.
 */
const props = defineProps<PrimitiveProps & {
  class?: HTMLAttributes['class']
}>()

const { state, actions, register, unregister } = injectSpeedDialContext('SpeedDialItem')

const id = useId()
const labelId = useId()

onMounted(() => register(id))
onBeforeUnmount(() => unregister(id))

const order = computed(() => Math.max(0, actions.value.indexOf(id)))

const delay = computed(() => {
  const count = actions.value.length
  const step = state.value.delay / Math.max(1, count)
  const index = state.value.open ? order.value : count - 1 - order.value
  return Math.round(index * step)
})

provideSpeedDialItemContext(computed(() => ({ delay: delay.value, labelId })))
</script>

<template>
  <Primitive
    :as="props.as"
    :as-child="props.asChild"
    :class="cn(speedDialItemVariants({ side: state.side }), props.class)"
    data-slot="speed-dial-item"
    :data-state="state.open ? 'open' : 'closed'"
    role="none"
    :style="{ '--speed-dial-delay': `${delay}ms` }"
  >
    <slot />
  </Primitive>
</template>
