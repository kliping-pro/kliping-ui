<script lang="ts">
export const description = "Halaman pendarat berlatar petak beranimasi, dengan testimoni yang berjalan sendiri dan tabel harga bertab bulanan-tahunan."
</script>

<script setup lang="ts">
import CTABanner from '@/templates/pure-landing/components/CtaBanner.vue'
import FAQ from '@/templates/pure-landing/components/Faq.vue'
import Features from '@/templates/pure-landing/components/Features.vue'
import Footer from '@/templates/pure-landing/components/Footer.vue'
import Hero from '@/templates/pure-landing/components/Hero.vue'
import Navbar from '@/templates/pure-landing/components/Navbar.vue'
import Pricing from '@/templates/pure-landing/components/Pricing.vue'
import Testimonials from '@/templates/pure-landing/components/Testimonials.vue'
</script>

<template>
    <Navbar />
    <main class="pt-16 xs:pt-20 sm:pt-24">
      <Hero />
      <Features />
      <Pricing />
      <FAQ />
      <Testimonials />
      <CTABanner />
      <Footer />
    </main>
</template>
