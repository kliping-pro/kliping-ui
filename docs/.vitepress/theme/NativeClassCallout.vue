<script setup lang="ts">
import { InfoIcon } from '@lucide/vue'

/**
 * Kotak penanda untuk halaman yang tidak memasang berkas apa pun.
 *
 * Sebagian pola yang di pustaka lain butuh composable tersendiri, di Vue sudah
 * dijawab bahasanya: `onMounted`, `watch`, `computed`, `provide`. Halamannya
 * tetap ada supaya polanya bisa dicari dan ditemukan, tapi yang ditawarkan
 * bukan perintah pemasangan melainkan padanan bawaannya.
 *
 * Kotak ini yang membuat perbedaan itu terlihat sebelum pembaca sempat mencari
 * tombol yang tidak akan ada.
 */
defineProps<{ equivalent?: string }>()
</script>

<template>
  <div class="not-prose my-6 flex gap-3 rounded-lg border border-dashed p-4">
    <InfoIcon class="mt-0.5 size-4 shrink-0 text-muted-foreground" />
    <div class="flex flex-col gap-2 text-sm">
      <p class="font-medium">
        Tidak ada yang perlu dipasang.
      </p>
      <p class="text-muted-foreground">
        Vue sudah menyediakan padanannya<template v-if="equivalent">
          — <code>{{ equivalent }}</code></template>. Halaman ini menjelaskan
        cara memakainya.
      </p>
    </div>
  </div>
</template>
