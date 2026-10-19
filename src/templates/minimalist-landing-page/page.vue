<script lang="ts">
export const description = "Halaman pendarat paling polos di antara keempatnya: hero berdampingan gambar, empat fitur, tanya jawab, testimoni berkorsel, dan tabel harga."
</script>

<script setup lang="ts">
import FAQ from '@/templates/minimalist-landing-page/components/Faq.vue'
import Features from '@/templates/minimalist-landing-page/components/Features.vue'
import Footer from '@/templates/minimalist-landing-page/components/Footer.vue'
import Hero from '@/templates/minimalist-landing-page/components/Hero.vue'
import Navbar from '@/templates/minimalist-landing-page/components/Navbar.vue'
import Pricing from '@/templates/minimalist-landing-page/components/Pricing.vue'
import Testimonial from '@/templates/minimalist-landing-page/components/Testimonial.vue'
</script>

<template>
    <Navbar />
    <Hero />
    <Features />
    <FAQ />
    <Testimonial />
    <Pricing />
    <Footer />
</template>
