<script setup lang="ts">
import { onMounted, ref } from 'vue'

/**
 * Menggambar isinya di tempat lain dalam pohon DOM.
 *
 * Vue sudah punya `<Teleport>`, jadi yang ditambahkan di sini satu hal saja:
 * penundaan sampai terpasang. Saat render server tidak ada `document`, dan
 * `<Teleport>` yang menunjuk `body` di sana menghasilkan HTML yang tidak
 * cocok dengan yang disusun ulang klien — hidrasi mengeluh, dan keluhannya
 * muncul jauh dari komponen yang menyebabkannya.
 *
 * Versi React-nya menempuh hal yang sama dengan cara berbeda: ia
 * mengembalikan `null` selama potret servernya belum berganti potret klien.
 */
const props = withDefaults(defineProps<{
  /** The target container — a CSS selector or an element. Defaults to `body`. */
  to?: string | HTMLElement
  /** Renders in place, without moving. */
  disabled?: boolean
}>(), {
  to: 'body',
})

const mounted = ref(false)

onMounted(() => {
  mounted.value = true
})
</script>

<template>
  <Teleport v-if="mounted" :disabled="props.disabled" :to="props.to">
    <slot />
  </Teleport>
</template>
