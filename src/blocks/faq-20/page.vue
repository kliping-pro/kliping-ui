<script lang="ts">
export const description = "Dua pertanyaan FAQ statis dengan garis pemisah di bawah judulnya."
export default {}
</script>

<!--
  Block ini tidak mengimpor apa pun. Default export-nya ditulis terang-terangan
  karena SFC tanpa `<script setup>` berisi tidak menghasilkan komponen.
-->
<template>
  <section class="px-6 py-16">
    <div class="mx-auto max-w-3xl">
      <div class="mb-20 text-center">
        <h2 class="mb-4 text-3xl font-bold">
          Frequently asked questions
        </h2>
        <p class="text-muted-foreground mx-auto max-w-2xl text-lg">
          A lot of people don't appreciate the moment until it's
          passed. I'm not trying my hardest, and I'm not trying to
          do
        </p>
      </div>
      <div class="mb-6">
        <h3 class="border-b py-6 text-lg font-semibold">
          How do I order?
        </h3>
        <p class="text-muted-foreground py-6 leading-relaxed">
          We're not always in the position that we want to be at.
          We're constantly growing. We're constantly making
          mistakes. We're constantly trying to express ourselves and
          actualize our dreams. If you have the opportunity to play this game
          of life you need to appreciate every moment. A lot of people
          don't appreciate the moment until it's passed.
        </p>
      </div>
      <div class="mb-6">
        <h3 class="border-b py-6 text-lg font-semibold">
          How can i make the payment?
        </h3>
        <p class="text-muted-foreground py-6 leading-relaxed">
          It really matters and then like it really doesn't matter. What
          matters is the people who are sparked by it. And the people who are
          like offended by it, it doesn't matter. Because it's about
          motivating the doers. Because I'm here to follow my dreams and
          inspire other people to follow their dreams, too. We're not
          always in the position that we want to be at. We're constantly
          growing. We're constantly making mistakes. We're
          constantly trying to express ourselves and actualize our dreams. If
          you have the opportunity to play this game of life you need to
          appreciate every moment. A lot of people don't appreciate the
          moment until it's passed.
        </p>
      </div>
    </div>
  </section>
</template>
