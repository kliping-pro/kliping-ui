<template>
  <!-- Padanan blok ::steps milik Nuxt Content. Tiap langkah dibungkus
       div.kliping-step, dan nomornya digambar CSS lewat counter — jadi isi tiap
       langkah tetap markdown biasa, termasuk blok kode di dalamnya. -->
  <div class="kliping-steps">
    <slot />
  </div>
</template>

<style>
/*
 * Nomornya digambar CSS lewat counter, bukan ditulis di markdown — isi tiap
 * langkah tetap markdown biasa, termasuk blok kode di dalamnya.
 *
 * Bentuknya mengikuti shadcn: garis pemisah menempel di kiri, dan bulatan
 * nomornya duduk di atas garis itu, bukan di sampingnya.
 */
.kliping-steps {
  counter-reset: step;
  margin: 1.5rem 0 3rem;
  border-left: 1px solid var(--border);
  padding-left: 1.75rem;
}

.kliping-steps > .kliping-step {
  counter-increment: step;
  position: relative;
  padding-bottom: 0.75rem;
}

.kliping-steps > .kliping-step::before {
  content: counter(step);
  position: absolute;
  top: -0.15rem;
  left: -2.87rem;
  display: inline-flex;
  height: 2.25rem;
  width: 2.25rem;
  align-items: center;
  justify-content: center;
  border: 4px solid var(--background);
  border-radius: 9999px;
  background: var(--muted);
  color: var(--foreground);
  font-family: var(--vp-font-family-mono);
  font-size: 0.875rem;
  font-weight: 500;
  text-indent: -1px;
}

.kliping-steps > .kliping-step > :first-child {
  margin-top: 0;
}
</style>
