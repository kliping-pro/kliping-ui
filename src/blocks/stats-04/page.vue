<script lang="ts">
export const description = "Tiga angka dalam satu petak berbingkai yang menyatu."
export default {}
</script>

<!--
  Block ini tidak mengimpor apa pun. Default export-nya ditulis terang-terangan
  karena SFC tanpa `<script setup>` berisi tidak menghasilkan komponen.
-->
<template>
  <div class="mx-auto max-w-5xl px-6 py-20">
    <h2 class="text-balance text-center font-medium text-3xl tracking-[-0.04em] sm:text-4xl md:text-[2.75rem]">
      Our Impact
    </h2>
    <p class="mt-3.5 text-center text-muted-foreground text-xl tracking-[-0.015em] sm:text-lg md:text-2xl">
      Trusted by thousands to build modern UIs faster
    </p>

    <div class="mt-14 grid grid-cols-1 overflow-hidden rounded-2xl border sm:grid-cols-2 md:grid-cols-3">
      <div class="-m-px border-t border-l p-10">
        <span class="font-medium text-5xl">70%</span>
        <p class="mt-4 text-foreground/80 text-xl">
          Faster UI development
        </p>
      </div>
      <div class="-m-px border-t border-l p-10">
        <span class="font-medium text-5xl">5x</span>
        <p class="mt-4 text-foreground/80 text-xl">
          Increase in productivity
        </p>
      </div>
      <div class="-m-px border-t border-l p-10 sm:col-span-2 md:col-span-1">
        <span class="font-medium text-5xl">98%</span>
        <p class="mt-4 text-foreground/80 text-xl">
          Customer satisfaction
        </p>
      </div>
    </div>
  </div>
</template>
