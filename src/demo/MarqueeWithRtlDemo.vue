<!-- example: 3. With RTL -->
<script setup lang="ts">
import { Marquee, MarqueeContent, MarqueeEdge, MarqueeItem } from '@/components/marquee'

const features = [
  { title: 'Smooth Scrolling', description: 'Silky smooth infinite scrolling animation' },
  { title: 'Pause on Hover', description: 'Stops when the pointer is over the content' },
  { title: 'Right to Left', description: 'Follows the reading direction of the page' },
  { title: 'Accessible', description: 'Copies are hidden from screen readers' },
]
</script>

<template>
  <Marquee dir="rtl" class="w-full">
    <MarqueeContent>
      <MarqueeItem
        v-for="feature in features"
        :key="feature.title"
        class="flex w-[280px] flex-col gap-1 rounded-md border bg-card p-4 text-card-foreground shadow-sm"
      >
        <div class="text-sm leading-tight font-medium sm:text-base">
          {{ feature.title }}
        </div>
        <span class="line-clamp-2 text-sm text-muted-foreground">{{ feature.description }}</span>
      </MarqueeItem>
    </MarqueeContent>
    <MarqueeEdge side="left" />
    <MarqueeEdge side="right" />
  </Marquee>
</template>
