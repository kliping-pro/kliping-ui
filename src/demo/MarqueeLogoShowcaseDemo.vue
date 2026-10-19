<!-- example: 1. Logo Showcase -->
<script setup lang="ts">
import { Logo01, Logo02, Logo03, Logo04, Logo05, Logo06 } from '@/components/logos'
import { Marquee, MarqueeContent, MarqueeEdge, MarqueeItem } from '@/components/marquee'

// Logo contoh Kliping (perusahaan fiktif), bukan logo merek sungguhan.
const companies = [
  { name: 'Amara', logo: Logo01 },
  { name: 'Hexa', logo: Logo02 },
  { name: 'Treva', logo: Logo03 },
  { name: 'Aven', logo: Logo04 },
  { name: 'Goldline', logo: Logo05 },
  { name: 'Kanba', logo: Logo06 },
]
</script>

<template>
  <Marquee auto-fill class="w-full">
    <MarqueeContent>
      <MarqueeItem v-for="company in companies" :key="company.name">
        <div class="flex h-16 w-36 items-center justify-center rounded-full bg-accent px-5 text-foreground">
          <component :is="company.logo" class="h-6 w-full" />
          <span class="sr-only">{{ company.name }}</span>
        </div>
      </MarqueeItem>
    </MarqueeContent>
    <MarqueeEdge side="left" />
    <MarqueeEdge side="right" />
  </Marquee>
</template>
