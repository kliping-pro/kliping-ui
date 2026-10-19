<script lang="ts">
export const description = "Portofolio pengembang satu halaman: perkenalan, riwayat kerja bergaris waktu, dan petak proyek berlencana teknologi."
</script>

<script setup lang="ts">
import About from '@/templates/minimal-portfolio/components/About.vue'
import Experience from '@/templates/minimal-portfolio/components/Experience.vue'
import Hero from '@/templates/minimal-portfolio/components/Hero.vue'
import Projects from '@/templates/minimal-portfolio/components/Projects.vue'
</script>

<template>
  <div class="space-y-10 sm:space-y-16">
    <Hero />
    <About />
    <Experience />
    <Projects />
  </div>
</template>
