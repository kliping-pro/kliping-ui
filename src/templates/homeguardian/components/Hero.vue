<script setup lang="ts">
import { Button } from '@/components/ui/button'
</script>

<template>
     <div class="min-h-[calc(100svh-4rem)] py-16 max-w-(--breakpoint-xl) mx-auto text-center px-6">
       <strong class="font-semibold text-muted-foreground/90">
         Make Better Decisions, Faster
       </strong>
       <h1 class="mt-5 max-w-3xl mx-auto text-4xl sm:text-5xl md:text-6xl leading-[1.1] font-semibold tracking-tighter text-balance">
         Find Safety in Your Home with a Tech Smart Assistant
       </h1>
       <div class="mt-8 max-w-3xl mx-auto text-lg text-muted-foreground text-balance">
         <p>
           Our smart assistant uses AI to help you find safety in your home. Find
           peace of mind with a system that adapts to your needs.
         </p>
       </div>
       <div class="mt-12 flex gap-4 justify-center">
         <Button size="lg">Make a Request</Button>
         <Button variant="outline" size="lg">
           Learn More
         </Button>
       </div>

       <div class="mt-20 aspect-video border rounded-lg bg-muted p-2">
         <div class="bg-background h-full w-full rounded border relative">
           <div
             class="absolute inset-0 z-0"
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
       </div>
     </div>
</template>
