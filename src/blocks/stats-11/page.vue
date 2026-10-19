<script lang="ts">
export const description = "Tiga angka di dalam panel membulat berlatar abu."
export default {}
</script>

<!--
  Block ini tidak mengimpor apa pun. Default export-nya ditulis terang-terangan
  karena SFC tanpa `<script setup>` berisi tidak menghasilkan komponen.
-->
<template>
  <div class="w-full px-6">
    <div class="relative mx-auto my-20 max-w-5xl overflow-hidden rounded-2xl bg-muted px-6 py-16">
      <h2 class="text-balance text-center font-medium text-3xl tracking-[-0.04em] sm:text-4xl md:text-[2.75rem]">
        Reliable by Design
      </h2>
      <p class="mt-4 text-center text-muted-foreground text-xl tracking-[-0.01em] sm:text-lg md:text-2xl">
        Trusted by thousands to build modern UIs faster
      </p>

      <div class="mt-20 grid grid-cols-1 gap-4 gap-y-16 text-center sm:grid-cols-2 md:grid-cols-3">
        <div>
          <span class="font-medium text-5xl text-foreground">70%</span>
          <p class="mt-4 text-foreground/80 text-xl">
            Faster UI development
          </p>
        </div>
        <div>
          <span class="font-medium text-5xl text-foreground">5x</span>
          <p class="mt-4 text-foreground/80 text-xl">
            Increase in productivity
          </p>
        </div>
        <div>
          <span class="font-medium text-5xl">98%</span>
          <p class="mt-4 text-foreground/80 text-xl">
            Customer satisfaction
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
