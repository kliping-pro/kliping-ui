<script setup lang="ts">
import type { AcceptableValue, PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { ComboboxRoot } from 'reka-ui'
import { cn } from '@/lib/utils'

/**
 * Masukan bersandingan daftar pilihan yang menyaring sambil diketik.
 *
 * Sumbernya membungkus paket React tersendiri; penggantinya
 * `ComboboxRoot` milik Reka UI.
 *
 * Satu bagian ditulis berbeda dan itu disengaja. Di sumbernya,
 * `ComboboxBadgeList` menggambar sendiri lencana untuk tiap nilai terpilih,
 * dibaca dari keadaan dalam komponennya. Di sini lencananya diulang
 * pemakainya sendiri dari `v-model`-nya — sama seperti `TagsInput`, dan sama
 * seperti tiap daftar lain di Vue. Yang didapat dari itu: isinya bebas,
 * urutannya bebas, dan tidak ada keadaan tersembunyi yang harus dipercaya.
 */
const props = defineProps<PrimitiveProps & {
  defaultValue?: AcceptableValue | AcceptableValue[]
  /** Allows selecting several values; the model then holds an array. */
  multiple?: boolean
  disabled?: boolean
  name?: string
  required?: boolean
  dir?: 'ltr' | 'rtl'
  /** Opens the list as soon as the input is focused. */
  openOnFocus?: boolean
  /** Opens the list when the input is clicked. */
  openOnClick?: boolean
  /** Disables built-in filtering — use it when filtering happens on the server. */
  ignoreFilter?: boolean
  /** Clears the typed search text when the input loses focus. */
  resetSearchTermOnBlur?: boolean
  /** Clears the typed search text after an option is selected. */
  resetSearchTermOnSelect?: boolean
  /** Highlights an option when the pointer hovers over it. */
  highlightOnHover?: boolean
  class?: HTMLAttributes['class']
}>()

const model = defineModel<AcceptableValue | AcceptableValue[]>()
const open = defineModel<boolean | undefined>('open')
</script>

<template>
  <ComboboxRoot
    v-model="model"
    v-model:open="open"
    :as="props.as"
    :as-child="props.asChild"
    :class="cn('w-full', props.class)"
    data-slot="combobox"
    :default-value="props.defaultValue"
    :dir="props.dir"
    :disabled="props.disabled"
    :highlight-on-hover="props.highlightOnHover"
    :ignore-filter="props.ignoreFilter"
    :multiple="props.multiple"
    :name="props.name"
    :open-on-click="props.openOnClick"
    :open-on-focus="props.openOnFocus"
    :required="props.required"
    :reset-search-term-on-blur="props.resetSearchTermOnBlur"
    :reset-search-term-on-select="props.resetSearchTermOnSelect"
  >
    <slot />
  </ComboboxRoot>
</template>
