<script setup lang="ts">
import type { Direction } from 'reka-ui'
import { ConfigProvider } from 'reka-ui'

/**
 * Menentukan arah baca untuk seluruh pohon di bawahnya.
 *
 * Radix menyediakan `DirectionProvider` tersendiri; Reka UI menaruh arah baca
 * di `ConfigProvider` bersama beberapa setelan lain. Yang di sini pembungkus
 * setipis mungkin di atasnya, supaya nama dan bentuk propnya tetap sama
 * dengan yang didokumentasikan sumbernya.
 *
 * `direction` disediakan sebagai nama lain untuk `dir` karena sumbernya
 * menerima keduanya.
 */
const props = withDefaults(defineProps<{
  dir?: Direction
  /** Alias of `dir`; takes precedence over it when set. */
  direction?: Direction
}>(), {
  dir: 'ltr',
})
</script>

<template>
  <ConfigProvider :dir="props.direction ?? props.dir">
    <slot />
  </ConfigProvider>
</template>
