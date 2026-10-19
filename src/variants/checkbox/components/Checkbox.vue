<script setup lang="ts">
import type { CheckboxRootEmits, CheckboxRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { CheckIcon, MinusIcon } from '@lucide/vue'
import { reactiveOmit } from '@vueuse/core'
import { CheckboxRoot, useForwardPropsEmits } from 'reka-ui'
import { cn } from '@/lib/utils'

/**
 * Checkbox yang tandanya bisa diganti, termasuk keadaan setengahnya.
 *
 * Dua varian mengganti `Checkbox` bawaan: satu menampilkan garis untuk
 * keadaan setengah tercentang, satu lagi memakai ikon pilihan sendiri. Di
 * sumbernya yang kedua menitipkan elemen React lewat prop `icon` dan
 * `checkedIcon`; di sini keduanya jadi slot — dan yang tidak mengisinya
 * mendapat garis-dan-centang bawaan.
 */
const props = defineProps<CheckboxRootProps & { class?: HTMLAttributes['class'] }>()
const emits = defineEmits<CheckboxRootEmits>()

const forwarded = useForwardPropsEmits(reactiveOmit(props, 'class'), emits)
</script>

<template>
  <CheckboxRoot
    v-bind="forwarded"
    :class="cn(
      'group peer h-4 w-4 shrink-0 rounded border border-primary shadow-sm focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground',
      props.class,
    )"
  >
    <div class="flex items-center justify-center text-current">
      <span class="group-data-[state=checked]:hidden group-data-[state=indeterminate]:hidden">
        <slot />
      </span>
      <span class="hidden group-data-[state=indeterminate]:block">
        <slot name="indeterminate">
          <MinusIcon class="h-4 w-4" />
        </slot>
      </span>
      <span class="hidden group-data-[state=checked]:block">
        <slot name="checked">
          <CheckIcon class="h-4 w-4" />
        </slot>
      </span>
    </div>
  </CheckboxRoot>
</template>
