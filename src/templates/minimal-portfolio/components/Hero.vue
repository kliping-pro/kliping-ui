<script setup lang="ts">
/**
 * Latar petaknya menyimpang dari sumber di dua tempat.
 *
 * Masker sumbernya lingkaran 500px. Di layar sempit lingkaran itu lebih lebar
 * dari hero-nya sendiri, jadi petaknya terpotong tegas di tepi kiri-kanan, dan
 * di layar lebar ia melewati tepi bawah. `closest-side` membuat sorotannya
 * pudar habis tepat di sisi terdekat, berapa pun ukuran hero-nya.
 *
 * Keyframe `grid-square-fade` ditulis ulang di `<style>` di bawah: yang ada di
 * `src/assets/animations.css` tinggal di dalam `@theme`, dan Tailwind membuang
 * keyframe di sana yang tidak dirujuk kelas mana pun — nama animasinya cuma
 * muncul di gaya sebaris komponen. Tanpanya kotak-kotaknya diam dengan
 * kepekatan penuh dan menimpa judul, bukan berkedip samar sampai `maxOpacity`.
 */
import { AnimatedGridPattern } from '@/components/ui/animated-grid-pattern'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { CircleArrowDown, Zap } from '@lucide/vue'
</script>

<template>
  <div class="relative min-h-screen flex items-center justify-center px-6 pt-6 overflow-hidden">
    <AnimatedGridPattern
      :num-squares="30"
      :max-opacity="0.1"
      :duration="3"
      :class="cn(
        '[mask-image:radial-gradient(ellipse_closest-side_at_center,white,transparent)]',
        'inset-x-0 h-full skew-y-12'
      )"
    />
    <div class="relative z-[1] text-center max-w-screen-md">
      <Badge class="rounded-full border-none">
        <Zap class="fill-current" />
        Fullstack Web Developer
      </Badge>
      <h1 class="mt-6 text-4xl sm:text-5xl md:text-6xl font-bold !leading-[1.2] tracking-tight">
        Building Scalable & Engaging Web Experiences
      </h1>
      <p class="mt-6 text-[17px] md:text-lg">
        Hey there! I'm a John Doe, a Full Stack Developer who loves
        building cool and scalable web experiences. From crafting beautiful
        frontends to powering robust backends, I bring ideas to life with
        clean code and great design. Let's create something amazing
        together! 🚀
      </p>
      <div class="mt-12 flex items-center justify-center gap-4">
        <Button size="lg" class="rounded-full text-base">
          See What I Do <CircleArrowDown class="ml-2 !h-5.5 !w-5.5" />
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
