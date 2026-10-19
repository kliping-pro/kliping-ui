<script lang="ts">
export const description = "Empat angka rapat dalam satu baris, tanpa judul di atasnya."
export default {}
</script>

<!--
  Block ini tidak mengimpor apa pun. Default export-nya ditulis terang-terangan
  karena SFC tanpa `<script setup>` berisi tidak menghasilkan komponen.
-->
<template>
  <div class="py-20">
    <div class="mx-auto w-full max-w-(--breakpoint-xl) px-6 py-12 xl:px-0">
      <h2 class="font-medium text-4xl tracking-[-0.04em] md:text-[2.75rem]">
        The impact we've made so far
      </h2>
      <p class="mt-4.5 max-w-2xl text-lg text-muted-foreground md:text-xl">
        The world's most advanced UI kit for Figma. Meticulously crafted
        with 100% Auto Layout 5.0, variables, smart variants, and WCAG
        accessibility.
      </p>

      <div class="mt-16 grid justify-center gap-x-10 gap-y-16 sm:mt-24 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <div>
          <span class="font-medium text-5xl tracking-tight md:text-6xl">
            900+
          </span>
          <p class="mt-6 font-medium text-xl">
            Global styles + variables
          </p>
          <p class="mt-2 text-muted-foreground">
            Super smart global color, typography and effects styles +
            variables!
          </p>
        </div>
        <div>
          <span class="font-medium text-5xl text-muted-foreground tracking-tight md:text-6xl">
            10,000+
          </span>
          <p class="mt-6 font-medium text-xl">Components and variants</p>
          <p class="mt-2 text-muted-foreground">
            We've thought of everything you need so you don't have
            to.
          </p>
        </div>
        <div>
          <span class="font-medium text-5xl tracking-tight md:text-6xl">
            420+
          </span>
          <p class="mt-6 font-medium text-xl">Page design examples</p>
          <p class="mt-2 text-muted-foreground">
            A whopping 420+ ready-to-go desktop and mobile page examples.
          </p>
        </div>
        <div>
          <span class="font-medium text-5xl text-muted-foreground tracking-tight md:text-6xl">
            2,000+
          </span>
          <p class="mt-6 font-medium text-xl">Icons and logos</p>
          <p class="mt-2 text-muted-foreground">
            All the icons you'll need, including country flags and
            payments.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
