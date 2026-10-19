<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { injectPhoneInputContext } from './context'

/** The number field, without the dialing code. */
const props = defineProps<{ class?: HTMLAttributes['class'] }>()

const { state, setNumber, localNumber } = injectPhoneInputContext('PhoneInputField')
</script>

<template>
  <input
    :aria-invalid="state.invalid ? 'true' : undefined"
    autocomplete="tel-national"
    :class="cn(
      'h-9 w-full min-w-0 bg-transparent px-3 text-base outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed md:text-sm',
      props.class,
    )"
    data-slot="phone-input-field"
    :disabled="state.disabled"
    inputmode="tel"
    :placeholder="state.placeholder"
    :readonly="state.readonly"
    :required="state.required"
    type="tel"
    :value="localNumber"
    @input="e => setNumber((e.target as HTMLInputElement).value)"
  >
</template>
