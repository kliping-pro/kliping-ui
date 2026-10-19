<script setup lang="ts">
import type { Component } from 'vue'
import { NfcIcon } from '@lucide/vue'
import { cn } from '@/lib/utils'

export interface PaymentCardData {
  id: string
  brand: string
  brandIcon: Component
  last4: string
  holder: string
  expiry: string
  cvc: string
  tone: "primary" | "ink" | "soft"
}

const props = defineProps<{
  card: PaymentCardData
  flipped?: boolean
}>()

// Semua warna berasal dari token tema, jadi kartu ikut berganti saat tema
// atau mode gelap berubah.
const TONES = {
  primary: "bg-linear-135 from-primary via-primary/85 to-primary/60 text-primary-foreground",
  ink: "bg-linear-135 from-foreground via-foreground/90 to-foreground/70 text-background",
  soft: "bg-linear-135 from-secondary via-muted to-accent text-foreground ring-1 ring-border ring-inset",
}

// Pita magnetik selalu kontras terhadap permukaan kartunya.
const STRIPES = {
  primary: "bg-foreground/80",
  ink: "bg-background/85",
  soft: "bg-foreground/80",
}
</script>

<template>
  <div class="aspect-[1.586] w-full perspective-[1200px]">
    <div
      class="relative size-full transition-transform duration-500 transform-3d motion-reduce:transition-none"
      :class="props.flipped && 'rotate-y-180'"
    >
      <!-- Depan -->
      <div
        :class="cn(
          'absolute inset-0 flex flex-col justify-between overflow-hidden rounded-xl p-5 shadow-md backface-hidden',
          TONES[card.tone],
        )"
        :aria-hidden="props.flipped"
      >
        <div class="pointer-events-none absolute -top-16 -right-10 size-48 rounded-full bg-current opacity-[0.07]" />
        <div class="pointer-events-none absolute -bottom-20 -left-12 size-56 rounded-full bg-current opacity-[0.05]" />

        <div class="relative flex items-start justify-between">
          <!-- Chip -->
          <div class="grid h-8 w-11 grid-cols-3 gap-px overflow-hidden rounded-md bg-current/25 p-1 opacity-80">
            <span v-for="n in 6" :key="n" class="rounded-[2px] bg-current/30" />
          </div>
          <NfcIcon class="size-6 opacity-70" />
        </div>

        <p class="relative font-mono text-base tracking-[0.12em] whitespace-nowrap tabular-nums sm:text-lg">
          •••• •••• •••• {{ card.last4 }}
        </p>

        <div class="relative flex items-end justify-between gap-4">
          <div class="min-w-0">
            <p class="text-[10px] tracking-widest uppercase opacity-70">Card holder</p>
            <p class="truncate text-sm font-medium">{{ card.holder }}</p>
          </div>
          <div class="shrink-0">
            <p class="text-[10px] tracking-widest uppercase opacity-70">Expires</p>
            <p class="text-sm font-medium tabular-nums">{{ card.expiry }}</p>
          </div>
          <component :is="card.brandIcon" class="size-10 shrink-0" :aria-label="card.brand" />
        </div>
      </div>

      <!-- Belakang -->
      <div
        :class="cn(
          'absolute inset-0 flex rotate-y-180 flex-col overflow-hidden rounded-xl py-5 shadow-md backface-hidden',
          TONES[card.tone],
        )"
        :aria-hidden="!props.flipped"
      >
        <div :class="cn('mt-2 h-10 w-full', STRIPES[card.tone])" />
        <div class="mt-5 flex items-center gap-3 px-5">
          <div class="bg-background/90 flex h-9 flex-1 items-center rounded-sm px-3">
            <span class="text-muted-foreground/60 truncate font-serif text-sm italic">
              {{ card.holder }}
            </span>
          </div>
          <div class="bg-background text-foreground rounded-sm px-3 py-1.5 font-mono text-sm font-semibold tabular-nums">
            {{ card.cvc }}
          </div>
        </div>
        <p class="mt-auto px-5 text-[10px] leading-relaxed opacity-70">
          This card is issued for demonstration purposes. Keep your security code private
          and never share it by email or phone.
        </p>
      </div>
    </div>
  </div>
</template>
