<script setup lang="ts">
/**
 * Kode sumber sebuah contoh, tanpa pratinjaunya.
 *
 * Dipakai di halaman yang sudah menampilkan pratinjau di tempat lain dan di
 * sini cuma ingin menunjukkan kodenya. Sumbernya disisipkan sebagai blok kode
 * saat build oleh transform markdown yang sama dengan yang melayani
 * `<ComponentPreview>` — jadi tidak ada berkas yang dibaca ulang di peramban,
 * dan tidak ada API registry yang perlu dihubungi.
 */
defineProps<{ name: string, title?: string }>()
</script>

<template>
  <div class="kliping-source my-6 overflow-hidden rounded-lg border">
    <div v-if="title" class="kliping-source-title">
      {{ title }}
    </div>
    <div class="kliping-source-code">
      <slot />
    </div>
  </div>
</template>
