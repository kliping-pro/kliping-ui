<script lang="ts">
export const description = "Bilah pengumuman setipis satu baris di puncak halaman."
export default {}
</script>

<!--
  Block ini tidak mengimpor apa pun. Default export-nya ditulis terang-terangan
  karena SFC tanpa `<script setup>` berisi tidak menghasilkan komponen.
-->
<template>
  <div class="flex min-h-10 flex-wrap items-center justify-center bg-primary px-3 py-2 text-center text-primary-foreground text-sm">
    <span>Your free trial ends in 3 days.</span>
    <div>
      <a class="mx-1 underline underline-offset-2" href="#">
        Upgrade
      </a>
      <span>to continue using the full features.</span>
    </div>
  </div>
</template>
