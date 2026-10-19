<script lang="ts">
export const description = "Hero dengan navbar pil, judul bergradien, dan pratinjau produk bergaris."
</script>

<script setup lang="ts">
import { ArrowUpRight, CirclePlay } from '@lucide/vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import GradientText from '@/blocks/hero-03/components/GradientText.vue'
import Navbar from '@/blocks/hero-03/components/Navbar.vue'
</script>

<template>
     <div class="flex min-h-screen w-full flex-col items-center justify-center px-6 pt-8 pb-16">
       <Navbar />

       <div class="mt-16 max-w-3xl text-center">
         <Badge
           as-child
           class="rounded-full border-border py-1"
           variant="secondary"
         >
           <a href="#">
             Just released v1.0.0 <ArrowUpRight class="ml-1 size-4" />
           </a>
         </Badge>
         <h1 class="mx-auto mt-6 max-w-xl font-medium text-4xl tracking-[-0.045em] sm:text-[2.75rem] md:text-6xl/[1.2]">
           Ship 
           <GradientText
             :animation-speed="2"
             class="border-b-2 border-dotted sm:border-b-3"
             :colors="[
               'var(--color-purple-500)',
               'var(--color-indigo-400)',
               'var(--color-sky-500)',
             ]"
             direction="diagonal"
           >
             better UI
           </GradientText> 
           without&nbsp;the&nbsp;hassle
         </h1>
         <p class="mx-auto mt-6 max-w-2xl text-muted-foreground text-xl tracking-[-0.01em] md:text-2xl/normal">
           Instead of starting from scratch every time, use thoughtfully designed
           blocks that give you a solid foundation for any UI.
         </p>
         <div class="mt-10 flex items-center justify-center gap-4">
           <Button class="rounded-full" size="lg">
             Get Started <ArrowUpRight class="h-5! w-5!" />
           </Button>
           <Button
             class="rounded-full shadow-none"
             size="lg"
             variant="outline"
           >
             <CirclePlay class="h-5! w-5!" /> Watch Demo
           </Button>
         </div>
       </div>
       <div class="relative mx-auto mt-20 aspect-video w-full max-w-(--breakpoint-xl) rounded-xl bg-linear-to-br from-indigo-400/90 via-indigo-300 to-sky-400/80 p-2">
         <div class="size-full rounded-lg bg-background" />
         <div
           class="absolute inset-0 isolate z-0"
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
           radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)
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
           radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)
       `,
             maskComposite: 'intersect',
             WebkitMaskComposite: 'source-in',
           }"
         />
       </div>

       <div
         class="fixed inset-0 isolate -z-1 h-screen [--color-hero-bg:var(--color-indigo-600)] dark:[--color-hero-bg:var(--color-indigo-500)]"
         :style="{
           background:
             'radial-gradient(125% 125% at 50% 10%, var(--color-background) 40%, var(--color-hero-bg) 100%)',
         }"
       />
     </div>
</template>
