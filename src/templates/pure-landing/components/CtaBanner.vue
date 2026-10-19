<script setup lang="ts">
/**
 * Dua penyimpangan dari sumbernya, keduanya pada latar petaknya.
 *
 * Sumbernya menumpuk dua `AnimatedGridPattern` dengan kotak berbeda
 * (`inset-y-[-30%]` dan `inset-y-0`). Garis petak keduanya tidak pernah
 * berimpit — selisihnya 30% tinggi kotak, bukan kelipatan 40px — jadi di bagian
 * yang tertutup keduanya, garis mendatarnya tampil ganda dengan jarak yang
 * tidak rata. Di sini cukup satu petak dengan dua sorotan `mask-image` yang
 * digabung; `at_left_15%` adalah pojok kiri atas kotak CTA, karena petaknya
 * dimulai 30% dari 200% tingginya di atas kotak itu.
 *
 * Keyframe `grid-square-fade` ditulis ulang di `<style>` di bawah: yang ada di
 * `src/assets/animations.css` tinggal di dalam `@theme`, dan Tailwind membuang
 * keyframe di sana yang tidak dirujuk kelas mana pun — nama animasinya cuma
 * muncul di gaya sebaris komponen. Tanpanya kotak-kotaknya diam dengan
 * kepekatan penuh, bukan berkedip samar sampai `maxOpacity`.
 */
import { ArrowUpRight, Forward } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { AnimatedGridPattern } from '@/components/ui/animated-grid-pattern'
import { cn } from "@/lib/utils"
</script>

<template>
  <div class="px-6">
    <div class="dark:border relative overflow-hidden my-20 w-full dark bg-background text-foreground max-w-screen-lg mx-auto rounded-2xl py-10 md:py-16 px-6 md:px-14">
      <AnimatedGridPattern
        :num-squares="60"
        :max-opacity="0.1"
        :duration="3"
        :class="cn(
          '[mask-image:radial-gradient(400px_circle_at_right,white,rgba(255,255,255,0.6),transparent),radial-gradient(400px_circle_at_left_15%,white,rgba(255,255,255,0.6),transparent)]',
          'inset-x-0 inset-y-[-30%] h-[200%] skew-y-12'
        )"
      />
      <div class="relative z-0 flex flex-col gap-3">
        <h3 class="text-3xl md:text-4xl font-semibold">
          Ready to Elevate Your Experience?
        </h3>
        <p class="mt-2 text-base md:text-lg">
          Take your workflow to the next level with Acme UI. Sign up
          today and start exploring!
        </p>
      </div>
      <div class="relative z-0 mt-14 flex flex-col sm:flex-row gap-4">
        <Button size="lg">
          Get Started <ArrowUpRight class="!h-5 !w-5" />
        </Button>
        <Button size="lg" variant="outline">
          Discover More <Forward class="!h-5 !w-5" />
        </Button>
      </div>
    </div>
  </div>
</template>

<style>
@keyframes grid-square-fade {
  from {
    opacity: 0;
  }
  to {
    opacity: var(--grid-square-opacity, 0.5);
  }
}
</style>
