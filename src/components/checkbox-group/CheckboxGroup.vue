<script setup lang="ts">
import type { AcceptableValue, PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { CheckboxGroupRoot } from 'reka-ui'
import { cn } from '@/lib/utils'

/**
 * Sekelompok kotak centang yang dikelola bersama.
 *
 * Sumbernya membungkus paket React tersendiri. Padanannya di
 * Vue `CheckboxGroupRoot` milik Reka UI, yang membawa satu hal yang tidak ada
 * di sumbernya: kemudi panah antar kotak lewat roving focus, bisa dimatikan
 * dengan `rovingFocus: false`.
 */
// Prop boolean tanpa nilai bawaan diubah Vue jadi `false` — `rovingFocus`
// harus `true` di sini supaya bawaan Reka (panah aktif) tidak tertimpa.
const props = withDefaults(defineProps<PrimitiveProps & {
  defaultValue?: AcceptableValue[]
  disabled?: boolean
  required?: boolean
  name?: string
  id?: string
  dir?: 'ltr' | 'rtl'
  orientation?: 'horizontal' | 'vertical'
  /** Wraps arrow-key focus from the last checkbox to the first and back. */
  loop?: boolean
  /** Arrow keys move between checkboxes. Turn off if Tab navigation is expected. */
  rovingFocus?: boolean
  class?: HTMLAttributes['class']
}>(), {
  rovingFocus: true,
})

const model = defineModel<AcceptableValue[]>({ default: () => [] })
</script>

<template>
  <CheckboxGroupRoot
    v-model="model"
    :as="props.as"
    :as-child="props.asChild"
    :class="cn('peer flex flex-col gap-3.5', props.class)"
    data-slot="checkbox-group"
    :default-value="props.defaultValue"
    :dir="props.dir"
    :disabled="props.disabled"
    :id="props.id"
    :loop="props.loop"
    :name="props.name"
    :orientation="props.orientation"
    :required="props.required"
    :roving-focus="props.rovingFocus"
  >
    <slot />
  </CheckboxGroupRoot>
</template>
