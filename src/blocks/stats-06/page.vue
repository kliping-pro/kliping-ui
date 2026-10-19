<script lang="ts">
export const description = "Lima angka berikon dalam petak kartu yang tidak seragam."
</script>

<script setup lang="ts">
import {
  FastForward,
  HeartHandshake,
  MonitorSmartphone,
  TrendingUp,
  Users,
} from '@lucide/vue'
import PersonalGoalsIllustration from '@/blocks/stats-06/components/PersonalGoalsIllustration.vue'
</script>

<template>
  <div class="mx-auto max-w-5xl px-6 py-20">
    <h2 class="text-balance text-center font-medium text-4xl tracking-[-0.04em] md:text-[2.75rem]">
      Numbers that matter
    </h2>
    <p class="mt-3.5 text-pretty text-center text-muted-foreground text-xl tracking-[-0.015em] sm:text-lg md:text-2xl">
      A quick look at the impact and adoption of our UI components
    </p>

    <div class="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      <div class="rounded-xl border border-blue-200 bg-blue-50 p-6 py-7 dark:border-blue-400/30 dark:bg-blue-500/15">
        <MonitorSmartphone class="mb-7 h-10 w-10 stroke-[1.75px] text-blue-500" />
        <span class="font-medium text-5xl">70%</span>
        <p class="mt-4 text-foreground/80 text-xl">
          Faster UI development
        </p>
      </div>
      <div class="rounded-xl border border-green-600/30 bg-green-50 p-6 py-7 dark:border-green-500/30 dark:bg-green-500/15">
        <FastForward class="mb-7 h-10 w-10 stroke-[1.75px] text-green-600" />
        <span class="font-medium text-5xl">5x</span>
        <p class="mt-4 text-foreground/80 text-xl">
          Increase in productivity
        </p>
      </div>
      <div class="row-span-2 flex flex-col overflow-hidden rounded-xl border border-red-200 bg-red-50 p-6 py-7 pb-0 dark:border-red-400/30 dark:bg-red-400/15">
        <HeartHandshake class="mb-7 h-10 w-10 stroke-[1.75px] text-red-500" />
        <span class="font-medium text-5xl">98%</span>
        <p class="mt-4 mb-2 text-foreground/80 text-xl">
          Customer satisfaction
        </p>
        <PersonalGoalsIllustration class="mt-auto -mb-2 h-auto w-full" />
      </div>
      <div class="rounded-xl border border-amber-600/30 bg-amber-50 p-6 py-7 dark:border-amber-500/30 dark:bg-amber-500/15">
        <TrendingUp class="mb-7 h-10 w-10 stroke-[1.75px] text-amber-600" />
        <span class="font-medium text-5xl">300%</span>
        <p class="mt-4 text-foreground/80 text-xl">
          Growth in last 6 months
        </p>
      </div>
      <div class="rounded-xl border border-purple-200 bg-purple-50 p-6 py-7 dark:border-purple-400/30 dark:bg-purple-400/15">
        <Users class="mb-7 h-10 w-10 stroke-[1.75px] text-purple-500" />
        <span class="font-medium text-5xl">120K+</span>
        <p class="mt-4 text-foreground/80 text-xl">Daily active users</p>
      </div>
    </div>
  </div>
</template>
