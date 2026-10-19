<script setup lang="ts">
import type { ColorFormat, PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { PopoverRoot, Primitive } from 'reka-ui'
import { computed, ref, watch } from 'vue'
import { cn } from '@/lib/utils'
import { provideColorPickerContext } from './context'

/**
 * Pemilih warna.
 *
 * Ditulis di atas keluarga warna Reka UI — `ColorAreaRoot`, `ColorSliderRoot`,
 * `ColorFieldRoot`, dan `ColorSwatchPickerRoot`. Yang dibawanya bukan sekadar
 * penggeser: perhitungan ruang warna, penguraian dan penulisan hex, rgb, hsl,
 * dan hsb, serta pengubahan antar ketiganya tanpa kehilangan ketepatan.
 *
 * Sumbernya menulis seluruh lapisan itu sendiri — sekitar seribu tujuh ratus
 * baris termasuk pengurai warna dan penukar ruang warnanya. Yang tersisa di
 * sini susunan dan kelasnya.
 *
 * `v-model` menyimpan teks warna, bukan objek. Warna yang disimpan dan dikirim
 * ke mana pun berupa teks — dan objek warna yang bocor ke luar memaksa tiap
 * pemakainya mengubahnya kembali.
 *
 * Akarnya sekaligus `PopoverRoot`, supaya `ColorPickerTrigger` dan
 * `ColorPickerContent` bisa dipakai tanpa membungkus apa pun lagi. Yang
 * memakainya sebaris — bidang dan penggeser langsung di dalam akar, tanpa
 * pemicu — tidak terpengaruh: tanpa pemicu, popover-nya tidak pernah terbuka.
 */
const props = withDefaults(defineProps<PrimitiveProps & {
  /** The output text format. */
  format?: ColorFormat
  disabled?: boolean
  name?: string
  class?: HTMLAttributes['class']
}>(), {
  format: 'hex',
  disabled: false,
})

const model = defineModel<string>({ default: '#3b82f6' })
const open = defineModel<boolean>('open', { default: false })

const format = ref<ColorFormat>(props.format)

// `format` prop-nya nilai awal yang boleh diubah `ColorPickerFormatSelect`.
// Kalau induknya mengubah prop-nya, itu tetap harus menang.
watch(() => props.format, (next) => {
  format.value = next
})

provideColorPickerContext({
  state: computed(() => ({
    value: model.value,
    format: format.value,
    disabled: props.disabled,
  })),
  setValue: (value) => {
    model.value = value
  },
  setFormat: (next) => {
    format.value = next
  },
})
</script>

<template>
  <PopoverRoot v-model:open="open">
    <Primitive
      :as="props.as"
      :as-child="props.asChild"
      :class="cn('flex flex-col gap-3', props.class)"
      :data-disabled="props.disabled ? '' : undefined"
      data-slot="color-picker"
    >
      <slot :value="model" />
      <input v-if="props.name" :name="props.name" type="hidden" :value="model">
    </Primitive>
  </PopoverRoot>
</template>
