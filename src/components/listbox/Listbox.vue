<script setup lang="ts">
import type { AcceptableValue, PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { ListboxContent, ListboxRoot } from 'reka-ui'
import { cn } from '@/lib/utils'

/**
 * Daftar pilihan yang dikemudikan papan ketik.
 *
 * Sumbernya membungkus paket React tersendiri; penggantinya
 * `ListboxRoot` milik Reka UI. Akar dan wadah isinya digabung di satu
 * komponen karena keduanya selalu dipakai berpasangan — dan sumbernya pun
 * tidak memisahkannya.
 *
 * `orientation="horizontal"` mengubah daftarnya jadi petak: panah kiri-kanan
 * yang berpindah, bukan atas-bawah.
 */
const props = withDefaults(defineProps<PrimitiveProps & {
  defaultValue?: AcceptableValue | AcceptableValue[]
  /** Allows selecting more than one item; the model is then an array. */
  multiple?: boolean
  orientation?: 'vertical' | 'horizontal'
  dir?: 'ltr' | 'rtl'
  disabled?: boolean
  /** Highlights items under the pointer, not only on keyboard focus. */
  highlightOnHover?: boolean
  /** 'toggle' flips each clicked item; 'replace' swaps the selection unless a modifier key is held. */
  selectionBehavior?: 'toggle' | 'replace'
  name?: string
  required?: boolean
  /** Accessible name of the list; set on the element with role="listbox". */
  ariaLabel?: string
  /** Id of a visible element naming the list; set on the element with role="listbox". */
  ariaLabelledby?: string
  class?: HTMLAttributes['class']
}>(), {
  orientation: 'vertical',
})

const model = defineModel<AcceptableValue | AcceptableValue[]>()
</script>

<template>
  <ListboxRoot
    v-model="model"
    :as="props.as"
    :as-child="props.asChild"
    :class="cn(
      'flex gap-2 focus-visible:outline-none',
      props.orientation === 'vertical' && 'flex-col *:data-[slot=listbox-group]:flex-col',
      props.class,
    )"
    data-slot="listbox"
    :default-value="props.defaultValue"
    :dir="props.dir"
    :disabled="props.disabled"
    :highlight-on-hover="props.highlightOnHover"
    :multiple="props.multiple"
    :name="props.name"
    :orientation="props.orientation"
    :required="props.required"
    :selection-behavior="props.selectionBehavior"
  >
    <!-- Peran listbox ada di wadah ini, bukan di akarnya — namanya ikut ke sini. -->
    <ListboxContent :aria-label="props.ariaLabel" :aria-labelledby="props.ariaLabelledby" class="contents">
      <slot />
    </ListboxContent>
  </ListboxRoot>
</template>
