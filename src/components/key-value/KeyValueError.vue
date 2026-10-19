<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { KeyValueEntry } from './context'
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { injectKeyValueContext, injectKeyValueItemContextOptional } from './context'

/**
 * Pesan galat untuk barisnya. Tidak tergambar kalau tidak ada galat.
 *
 * Boleh dipasang di dalam `KeyValueItem` maupun di luarnya. Yang di luar
 * perlu menyebut pasangannya sendiri lewat prop — dan itu susunan yang lazim,
 * karena `KeyValueItem` sebuah baris mendatar: pesan galat yang ikut masuk ke
 * dalamnya jadi kolom keempat di samping tombol hapus, bukan baris di
 * bawahnya.
 */
const props = defineProps<{
  /** The entry whose error is shown. Defaults to the one from `KeyValueItem`. */
  entry?: KeyValueEntry
  class?: HTMLAttributes['class']
}>()

const { state } = injectKeyValueContext('KeyValueError')
const fromItem = injectKeyValueItemContextOptional()

const entry = computed(() => props.entry ?? fromItem?.value)

const error = computed(() => {
  const id = entry.value?.id
  if (!id)
    throw new Error('`KeyValueError` needs an `entry` prop when used outside `KeyValueItem`.')

  return state.value.errors[id]
})
</script>

<template>
  <p
    v-if="error"
    :class="cn('font-medium text-destructive text-sm', props.class)"
    data-slot="key-value-error"
    role="alert"
  >
    {{ error }}
  </p>
</template>
