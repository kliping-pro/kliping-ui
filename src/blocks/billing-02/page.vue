<script lang="ts">
export const description = "Dua kartu kredit berdampingan, varian gelap dan terang, dengan chip emas."
</script>

<script setup lang="ts">
import { WifiIcon } from '@lucide/vue'
import { Card } from '@/components/ui/card'

const cards: {
  variant: "dark" | "light"
  number: string
  holder: string
  expires: string
}[] = [
  {
    variant: "dark",
    expires: "10/25",
    holder: "Jack Peterson",
    number: "4562112245947852",
  },
  {
    variant: "light",
    expires: "10/26",
    holder: "Jack Peterson",
    number: "4562112245948844",
  },
]

const formatNumber = (number: string) => String(number).match(/.{1,4}/g)?.join("  ")
</script>

<template>
  <div class="mx-auto grid max-w-5xl grid-cols-1 gap-8 p-6 md:grid-cols-2">
    <Card
      v-for="{ variant, number, holder, expires } in cards"
      :key="number"
      :class="`group relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl ${
        variant === 'dark'
          ? 'bg-black text-white'
          : 'border-border/50 bg-white text-black shadow-lg'
      }`"
    >
      <div class="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div class="relative m-0 flex w-full items-center justify-between p-6">
        <div
          :class="`rounded-lg p-2 ${variant === 'dark' ? 'bg-white/10' : 'bg-gray-100'}`"
        >
          <WifiIcon class="h-6 w-6" />
        </div>
        <div
          :class="`h-10 w-14 rounded ${variant === 'dark' ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' : 'bg-gradient-to-br from-yellow-300 to-yellow-500'}`"
        >
          <div class="h-full w-full rounded bg-gradient-to-tr from-transparent via-white/20 to-white/40" />
        </div>
      </div>

      <div class="relative px-6 py-4">
        <p class="text-lg font-bold tracking-[0.2em]">
          {{ formatNumber(number) }}
        </p>
      </div>

      <div class="relative flex items-end justify-between gap-6 p-6 pt-2">
        <div class="flex gap-6">
          <div class="space-y-1">
            <p
              :class="`text-xs font-semibold tracking-wider uppercase ${variant === 'dark' ? 'text-gray-400' : 'text-gray-500'}`"
            >
              Card Holder
            </p>
            <p class="text-sm font-bold">{{ holder }}</p>
          </div>
          <div class="space-y-1">
            <p
              :class="`text-xs font-semibold tracking-wider uppercase ${variant === 'dark' ? 'text-gray-400' : 'text-gray-500'}`"
            >
              Expires
            </p>
            <p class="text-sm font-bold">{{ expires }}</p>
          </div>
        </div>
        <div class="flex items-center">
          <img
            src="/samples/logos/logo-04.svg"
            alt="mastercard logo"
            class="h-10 w-auto transition-transform group-hover:scale-110"
          >
        </div>
      </div>
    </Card>
  </div>
</template>
