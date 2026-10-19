<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { SpeedDialActivationMode, SpeedDialSide } from './context'
import { Primitive } from 'reka-ui'
import { computed, ref } from 'vue'
import { cn } from '@/lib/utils'
import { provideSpeedDialContext } from './context'

/**
 * Tombol aksi mengambang yang membuka kipas aksi.
 *
 * Aksinya muncul berurutan, bukan serentak — jeda kecil antar aksi membuat
 * arah mengembangnya terbaca. Saat menutup urutannya dibalik, dari yang
 * terjauh dulu, supaya gerakannya terasa mengumpul kembali ke tombolnya.
 */
const props = withDefaults(defineProps<PrimitiveProps & {
  /** Direction the actions fan out from the trigger: 'top', 'bottom', 'left', or 'right'. */
  side?: SpeedDialSide
  /** What opens it: a click or just a hover. */
  activationMode?: SpeedDialActivationMode
  /** The delay between actions while expanding, in milliseconds. */
  delay?: number
  disabled?: boolean
  class?: HTMLAttributes['class']
}>(), {
  side: 'top',
  activationMode: 'click',
  delay: 250,
  disabled: false,
})

const model = defineModel<boolean>('open', { default: false })

const actions = ref<string[]>([])

function open() {
  if (!props.disabled) model.value = true
}

function close() {
  model.value = false
}

function toggle() {
  if (props.disabled) return
  model.value = !model.value
}

provideSpeedDialContext({
  state: computed(() => ({
    side: props.side,
    open: model.value,
    disabled: props.disabled,
    activationMode: props.activationMode,
    delay: props.delay,
  })),
  open,
  close,
  toggle,
  actions,
  register: (id) => {
    if (!actions.value.includes(id)) actions.value = [...actions.value, id]
  },
  unregister: (id) => {
    actions.value = actions.value.filter(a => a !== id)
  },
})
</script>

<template>
  <Primitive
    :as="props.as"
    :as-child="props.asChild"
    :class="cn('relative flex flex-col items-end', props.class)"
    :data-disabled="props.disabled ? '' : undefined"
    :data-side="props.side"
    data-slot="speed-dial"
    :data-state="model ? 'open' : 'closed'"
    @mouseenter="props.activationMode === 'hover' && open()"
    @mouseleave="props.activationMode === 'hover' && close()"
  >
    <slot />
  </Primitive>
</template>
