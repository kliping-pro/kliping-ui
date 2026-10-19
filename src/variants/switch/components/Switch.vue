<script setup lang="ts">
import type { SwitchRootEmits, SwitchRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { SwitchRoot, SwitchThumb, useForwardPropsEmits } from 'reka-ui'
import { cn } from '@/lib/utils'

/**
 * Switch yang tuas dan ukurannya bisa diatur pemakainya.
 *
 * Dua varian mengganti `Switch` bawaan: satu untuk mengubah ukurannya, satu
 * lagi untuk menaruh ikon di dalam tuasnya. Yang kedua di sumbernya menitipkan
 * elemen React lewat prop `icon`; di sini isinya slot bawaan, jadi apa pun
 * yang ditulis di antara tag ikut ke dalam tuasnya — dan yang tidak menulis
 * apa-apa mendapat tuas kosong seperti biasa.
 */
const props = defineProps<SwitchRootProps & {
  class?: HTMLAttributes['class']
  thumbClass?: HTMLAttributes['class']
}>()
const emits = defineEmits<SwitchRootEmits>()

const forwarded = useForwardPropsEmits(reactiveOmit(props, 'class', 'thumbClass'), emits)
</script>

<template>
  <SwitchRoot
    v-bind="forwarded"
    :class="cn(
      'peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-xs transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input',
      props.class,
    )"
  >
    <SwitchThumb
      :class="cn(
        'pointer-events-none flex h-4 w-4 items-center justify-center rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0',
        props.thumbClass,
      )"
    >
      <slot />
    </SwitchThumb>
  </SwitchRoot>
</template>
