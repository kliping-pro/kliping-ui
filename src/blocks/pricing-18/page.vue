<script lang="ts">
export const description = "Dua paket berdampingan, Gratis dan Pro, dengan pita paling populer dan deretan testimoni."
</script>

<script setup lang="ts">
import { Check, Quote, Star, X } from '@lucide/vue'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import TestimonialCard from '@/blocks/pricing-18/components/TestimonialCard.vue'

const freeFeatures = [
  { label: 'Up to 3 notebooks', on: true },
  { label: 'Sync across 2 devices', on: true },
  { label: 'Markdown & code blocks', on: true },
  { label: 'Offline access', on: false },
  { label: 'AI summaries', on: false },
  { label: 'Publish to the web', on: false },
]

const proFeatures = [
  'Unlimited notebooks',
  'Sync across unlimited devices',
  'Markdown & code blocks',
  'Offline access',
  'AI summaries — 500 / month',
  'Publish to the web with custom domains',
]

const testimonials = [
  {
    quote: 'Switched my whole research workflow over in an afternoon. Pro paid for itself within a week.',
    name: 'Amara Osei',
    role: 'PhD candidate',
    initials: 'AO',
  },
  {
    quote: 'Offline mode is the reason I upgraded. I write on every flight now, and it just syncs when I land.',
    name: 'Daniel Ruiz',
    role: 'Technical writer',
    initials: 'DR',
  },
  {
    quote: 'The free plan is genuinely useful — Pro is simply the obvious next step once you are hooked.',
    name: 'Mei Tanaka',
    role: 'Product designer',
    initials: 'MT',
  },
]
</script>

<template>
  <section class="bg-background px-4 py-20 sm:px-6 sm:py-24">
    <div class="mx-auto max-w-4xl">
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="font-semibold text-4xl tracking-tight sm:text-5xl">Free to start. Pro when you need it.</h2>
        <p class="mt-4 text-lg text-muted-foreground">
          Two plans, no fine print. Upgrade in one click and keep everything you have written.
        </p>
      </div>

      <div class="mt-14 grid gap-6 md:grid-cols-2">
        <article class="flex flex-col rounded-lg border bg-card p-7 sm:p-8">
          <h3 class="font-semibold text-lg">Free</h3>
          <p class="mt-1 text-muted-foreground text-sm">Everything you need to get organised.</p>
          <p class="mt-6 flex items-baseline gap-1.5">
            <span class="font-semibold text-5xl tracking-tight">$0</span>
            <span class="text-muted-foreground text-sm">forever</span>
          </p>
          <Button variant="outline" size="lg" class="mt-7 w-full">Get started</Button>
          <ul class="mt-8 space-y-3 text-sm">
            <li
              v-for="f in freeFeatures"
              :key="f.label"
              :class="['flex items-center gap-3', !f.on && 'text-muted-foreground']"
            >
              <Check v-if="f.on" class="size-4 shrink-0 text-foreground" />
              <X v-else class="size-4 shrink-0 text-muted-foreground/60" />
              <span :class="!f.on && 'line-through decoration-muted-foreground/40'">{{ f.label }}</span>
            </li>
          </ul>
        </article>

        <article class="relative flex flex-col overflow-hidden rounded-lg border border-primary bg-card p-7 shadow-lg shadow-primary/10 ring-1 ring-primary sm:p-8">
          <!-- Pita miring di sudut kanan atas -->
          <div class="pointer-events-none absolute top-0 right-0 size-32 overflow-hidden" aria-hidden="true">
            <span
              class="absolute top-7 -right-10 w-44 rotate-45 bg-primary py-1.5 text-center font-semibold text-[0.6875rem] text-primary-foreground uppercase tracking-wider shadow-sm"
            >
              Most popular
            </span>
          </div>
          <span class="sr-only">Most popular plan</span>

          <div
            aria-hidden="true"
            class="pointer-events-none absolute -bottom-24 -left-24 size-72 rounded-full bg-primary/10 blur-3xl"
          />

          <h3 class="relative font-semibold text-lg">Pro</h3>
          <p class="relative mt-1 text-muted-foreground text-sm">For people who write every day.</p>
          <p class="relative mt-6 flex items-baseline gap-1.5">
            <span class="font-semibold text-5xl tracking-tight">$8</span>
            <span class="text-muted-foreground text-sm">/ month, billed yearly</span>
          </p>
          <Button size="lg" class="relative mt-7 w-full">Upgrade to Pro</Button>
          <ul class="relative mt-8 space-y-3 text-sm">
            <li v-for="f in proFeatures" :key="f" class="flex items-center gap-3">
              <span class="grid size-4.5 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
                <Check class="size-3" />
              </span>
              {{ f }}
            </li>
          </ul>
        </article>
      </div>
    </div>

    <div class="mx-auto mt-20 max-w-6xl">
      <div class="flex flex-col items-center gap-3 text-center">
        <div class="flex items-center gap-1 text-primary">
          <Star v-for="n in 5" :key="n" class="size-4 fill-current" />
        </div>
        <p class="text-muted-foreground text-sm">
          Rated <span class="font-medium text-foreground">4.9 / 5</span> by more than 12,000 writers
        </p>
      </div>
      <div class="-mx-4 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 md:pb-0">
        <TestimonialCard
          v-for="t in testimonials"
          :key="t.name"
          :quote="t.quote"
          :name="t.name"
          :role="t.role"
          class="w-[85%] shrink-0 snap-center md:w-auto"
        >
          <template #icon><Quote class="size-5 text-primary/60" /></template>
          <template #avatar>
            <Avatar class="size-9">
              <AvatarFallback class="bg-primary font-medium text-primary-foreground text-xs">{{ t.initials }}</AvatarFallback>
            </Avatar>
          </template>
        </TestimonialCard>
      </div>
    </div>
  </section>
</template>
