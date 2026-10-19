<script setup lang="ts">
import { Marquee, MarqueeContent, MarqueeEdge, MarqueeItem } from '@/components/marquee'

const teknologi = ['Vue', 'Vite', 'TypeScript', 'Tailwind CSS', 'Reka UI', 'VitePress', 'Vitest']
</script>

<template>
  <div class="flex w-full flex-col gap-8">
    <Marquee class="py-2" pause-on-hover :speed="40">
      <MarqueeContent>
        <MarqueeItem v-for="t in teknologi" :key="t" class="rounded-md border bg-card px-4 py-2 text-sm">
          {{ t }}
        </MarqueeItem>
      </MarqueeContent>
      <MarqueeEdge side="left" size="sm" />
      <MarqueeEdge side="right" size="sm" />
    </Marquee>

    <Marquee class="py-2" reverse side="right" :speed="30">
      <MarqueeContent>
        <MarqueeItem v-for="t in teknologi" :key="t" class="rounded-md bg-muted px-4 py-2 text-sm">
          {{ t }}
        </MarqueeItem>
      </MarqueeContent>
    </Marquee>
  </div>
</template>
