<script lang="ts">
export const description = "Tiga angka dalam kartu berbingkai terpisah."
export default {}
</script>

<!--
  Block ini tidak mengimpor apa pun. Default export-nya ditulis terang-terangan
  karena SFC tanpa `<script setup>` berisi tidak menghasilkan komponen.
-->
<template>
  <div class="mx-auto max-w-5xl px-6 py-20">
    <h2 class="text-balance text-center font-medium text-3xl tracking-[-0.04em] sm:text-4xl md:text-[2.75rem]">
      Backed by real usage
    </h2>
    <p class="mt-3.5 text-center text-muted-foreground text-xl tracking-[-0.015em] sm:text-lg md:text-2xl">
      Trusted by thousands to build modern UIs faster
    </p>

    <div class="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      <div class="rounded-xl border px-8 py-10">
        <span class="font-medium text-5xl">70%</span>
        <p class="mt-4 text-foreground/80 text-xl">
          Faster UI development
        </p>
      </div>
      <div class="rounded-xl border px-8 py-10">
        <span class="font-medium text-5xl">5x</span>
        <p class="mt-4 text-foreground/80 text-xl">
          Increase in productivity
        </p>
      </div>
      <div class="rounded-xl border px-8 py-10">
        <span class="font-medium text-5xl">98%</span>
        <p class="mt-4 text-foreground/80 text-xl">
          Customer satisfaction
        </p>
      </div>
    </div>
  </div>
</template>
