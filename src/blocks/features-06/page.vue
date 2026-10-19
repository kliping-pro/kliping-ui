<script lang="ts">
export const description = "Dua kolom fitur polos tanpa bingkai maupun ikon."
</script>

<script setup lang="ts">
import Star_1 from '@/blocks/features-06/components/Star_1.vue'
import Flower_10 from '@/blocks/features-06/components/Flower_10.vue'
import Moon_12 from '@/blocks/features-06/components/Moon_12.vue'
import Triangle_14 from '@/blocks/features-06/components/Triangle_14.vue'

const features = [
  {
    category: "Marketing and Sales",
    title: "Collect and Enrich Leads Your Way",
    details:
      "Take control over how and when to follow up with your leads. Store and reference leads in multiple tables and automatically send them personalized emails.",
    tutorialLink: "#",
    icon: Flower_10,
  },
  {
    category: "Project Management",
    title: "Streamline Your Workflows Easily",
    details:
      "Organize tasks, deadlines, and team collaboration in one place. Use customizable boards to manage projects efficiently and automate routine updates.",
    tutorialLink: "#",
    icon: Star_1,
  },
  {
    category: "Customer Support",
    title: "Deliver Seamless Customer Experiences",
    details:
      "Track customer queries faster with an integrated ticketing system. Set priorities, automate follow-ups, and enhance satisfaction with personalized responses.",
    tutorialLink: "#",
    icon: Moon_12,
  },
  {
    category: "Team Collaboration",
    title: "Stay Connected with Your Team",
    details:
      "Simplify communication with shared boards and real-time updates. Enable transparent goal tracking and instant feedback for better results.",
    tutorialLink: "#",
    icon: Triangle_14,
  },
]
</script>

<template>
     <div class="px-6 py-20">
       <div class="mx-auto w-full max-w-(--breakpoint-lg)">
         <h2 class="text-pretty text-center font-medium text-4xl tracking-[-0.04em] md:text-[2.75rem]">
           Less setup, more building
         </h2>
         <p class="mt-3 text-pretty text-center text-lg text-muted-foreground tracking-[-0.01em] md:text-2xl">
           Simple, customizable, and easy to drop into your workflow
         </p>
         <div class="mx-auto mt-12 grid w-full gap-x-8 gap-y-12 md:mt-18 lg:grid-cols-2">
           <div v-for="feature in features"
             class="flex flex-col items-center gap-x-12 gap-y-6"
             :key="feature.category"
           >
             <div class="relative aspect-video w-full rounded-xl bg-linear-to-r from-indigo-400 to-orange-300 p-2">
               <div class="size-full rounded-lg bg-card" />

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

               <component :is="feature.icon" v-if="feature.icon" class="absolute inset-0 isolate m-auto size-20" />
             </div>
             <div class="flex flex-1 basis-1/2 flex-col items-start">
               <h4 class="mt-1 mb-2 font-medium text-2xl tracking-[-0.02em]">
                 {{ feature.title }}
               </h4>
               <p class="mb-6 text-lg text-muted-foreground">
                 {{ feature.details }}
               </p>
             </div>
           </div>
         </div>
       </div>
     </div>
</template>
