<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { RovingFocusGroup } from 'reka-ui'
import { cn } from '@/lib/utils'
import { injectActionBarContext } from './context'

/**
 * Kelompok tombol yang dikemudikan panah, bukan Tab.
 *
 * Di sumbernya seluruh perilaku ini ditulis tangan: pendaftaran tiap item,
 * pengurutan menurut letaknya di dokumen, pelacakan mana yang jadi
 * perhentian Tab, penanganan Shift+Tab untuk keluar, peristiwa kustom
 * `onEntryFocus`, dan pembungkusan array supaya panah berputar di ujung.
 * Semuanya sekitar dua ratus baris.
 *
 * Reka UI sudah menyediakannya sebagai `RovingFocusGroup`, dan pola itu
 * memang bukan milik action bar — ia milik tiap toolbar, menu, dan tab yang
 * pernah ada. Yang tersisa di sini cuma kelasnya.
 */
const props = defineProps<PrimitiveProps & {
  class?: HTMLAttributes['class']
}>()

const context = injectActionBarContext('ActionBarGroup')
</script>

<template>
  <RovingFocusGroup
    :as="props.as"
    :as-child="props.asChild"
    :class="cn(
      'flex gap-2 outline-none',
      context.orientation === 'horizontal' ? 'items-center' : 'w-full flex-col items-start',
      props.class,
    )"
    :data-orientation="context.orientation"
    data-slot="action-bar-group"
    :dir="context.dir"
    :loop="context.loop"
    :orientation="context.orientation"
    role="group"
  >
    <slot />
  </RovingFocusGroup>
</template>
