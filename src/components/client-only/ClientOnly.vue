<script setup lang="ts">
import { onMounted, ref } from 'vue'

/**
 * Menahan isinya sampai komponennya benar-benar terpasang di peramban.
 *
 * Di React ini ditempuh `useSyncExternalStore` dengan potret server yang
 * sengaja dibuat berbeda dari potret klien. Vue tidak memerlukan siasat itu:
 * `onMounted` tidak pernah jalan saat render server, jadi `terpasang` masih
 * `false` waktu HTML-nya disusun dan berubah `true` tepat setelah hidrasi.
 *
 * Yang digambar selama menunggu isi slot `cadangan`. Membiarkannya kosong pun
 * sah — bedanya cuma pada apakah pembaca melihat ruang kosong atau kerangka.
 */
const mounted = ref(false)

onMounted(() => {
  mounted.value = true
})

defineSlots<{
  default: () => unknown
  fallback?: () => unknown
}>()
</script>

<template>
  <slot v-if="mounted" />
  <slot v-else name="fallback" />
</template>
