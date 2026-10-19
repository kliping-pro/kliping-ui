<script lang="ts">
export const description = "Halaman pendarat jasa keamanan rumah: perbandingan paket berbentuk tabel, daftar industri yang dilayani, dan deretan logo klien."
</script>

<script setup lang="ts">
import BackgroundPattern from '@/templates/homeguardian/components/BackgroundPattern.vue'
import FAQ from '@/templates/homeguardian/components/Faq.vue'
import FeaturesComparison from '@/templates/homeguardian/components/FeaturesComparison.vue'
import Footer from '@/templates/homeguardian/components/Footer.vue'
import Hero from '@/templates/homeguardian/components/Hero.vue'
import Industries from '@/templates/homeguardian/components/Industries.vue'
import Navbar from '@/templates/homeguardian/components/Navbar.vue'
import Testimonials from '@/templates/homeguardian/components/Testimonials.vue'
import WhyChooseUs from '@/templates/homeguardian/components/WhyChooseUs.vue'
</script>

<template>
  <div>
    <div class="relative bg-primary/4">
      <Navbar />
      <Hero />
      <BackgroundPattern />
    </div>

    <WhyChooseUs />
    <Industries />
    <FeaturesComparison />
    <FAQ />
    <Testimonials />
    <Footer />
  </div>
</template>
