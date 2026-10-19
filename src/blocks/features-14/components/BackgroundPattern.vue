<script setup lang="ts">
/**
 * Kisi garis putus-putus di belakang tiap kartu features-14, memudar ke bawah.
 *
 * Garis kisinya digambar `backgroundImage`, lalu dipotong tiga mask sekaligus:
 * dua pola belang membuat garisnya putus-putus, dan gradien elips membuatnya
 * pudar menjauhi tepi atas. `maskComposite: intersect` yang menyatukan
 * ketiganya — tanpa itu mask-nya ditumpuk, bukan diiris, dan kisinya tampil
 * utuh tanpa putus.
 */
</script>

<template>
  <div
    class="absolute inset-0 -top-px -left-px"
    :style="{
      backgroundImage: `
        linear-gradient(to right, var(--border) 1px, transparent 1px),
        linear-gradient(to bottom, var(--border) 1px, transparent 1px)
      `,
      backgroundSize: '20px 20px',
      backgroundPosition: '0 0, 0 0',
      maskImage: `
        repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)
      `,
      WebkitMaskImage: `
 repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)
      `,
      maskComposite: 'intersect',
      WebkitMaskComposite: 'source-in',
    }"
  />
</template>
