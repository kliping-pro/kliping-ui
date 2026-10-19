<script lang="ts">
export const description = "Tiga angka besar di tengah halaman, tanpa bingkai apa pun."
export default {}
</script>

<!--
  Block ini tidak mengimpor apa pun. Default export-nya ditulis terang-terangan
  karena SFC tanpa `<script setup>` berisi tidak menghasilkan komponen.
-->
<template>
  <div class="mx-auto max-w-(--breakpoint-lg) px-6 py-20 text-center">
    <h2 class="font-medium text-4xl tracking-[-0.04em] md:text-[2.75rem]">
      Why Should You Choose Us?
    </h2>
    <p class="mt-4 text-muted-foreground text-xl md:text-2xl">
      Because after switching to us...
    </p>

    <div class="mt-16 grid justify-center gap-x-12 gap-y-16 sm:mt-24 sm:grid-cols-2 lg:grid-cols-3">
      <div class="max-w-3xs">
        <span class="font-medium text-5xl">96%</span>
        <p class="mt-6 text-lg">
          of customers say they have a better brand experience
        </p>
      </div>
      <div class="max-w-3xs">
        <span class="font-medium text-5xl">95%</span>
        <p class="mt-6 text-lg">
          of customers say they gather more data, more easily
        </p>
      </div>
      <div class="max-w-3xs">
        <span class="font-medium text-5xl">87%</span>
        <p class="mt-6 text-lg">
          of customers say they reveal deeper insights from data
        </p>
      </div>
    </div>
  </div>
</template>
