<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import { Primitive } from 'reka-ui'
import { usePending } from './usePending'

/**
 * Menahan interaksi sebuah elemen selama sesuatu masih berjalan.
 *
 * Bawaannya `as-child`: yang dibungkus tetap elemen aslinya — tombol, tautan,
 * atau apa pun — dan yang ditambahkan cuma atributnya. Alasan lengkapnya ada
 * di `usePending.ts`.
 */
const props = withDefaults(defineProps<PrimitiveProps & {
  id?: string
  isPending?: boolean
  disabled?: boolean
}>(), {
  asChild: true,
})

const { pendingProps } = usePending(() => ({
  id: props.id,
  isPending: props.isPending,
  disabled: props.disabled,
}))
</script>

<template>
  <Primitive :as="props.as" :as-child="props.asChild" data-slot="pending" v-bind="pendingProps">
    <slot />
  </Primitive>
</template>
