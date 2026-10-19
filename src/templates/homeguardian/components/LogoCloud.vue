<script setup lang="ts">
import Airbnb from '@/templates/homeguardian/components/Airbnb.vue'
import Cursor from '@/templates/homeguardian/components/Cursor.vue'
import Firebase from '@/templates/homeguardian/components/Firebase.vue'
import Mocha from '@/templates/homeguardian/components/Mocha.vue'
import Roblox from '@/templates/homeguardian/components/Roblox.vue'
import Shopify from '@/templates/homeguardian/components/Shopify.vue'
import TravelPerk from '@/templates/homeguardian/components/TravelPerk.vue'
import Turso from '@/templates/homeguardian/components/Turso.vue'
import Vercel from '@/templates/homeguardian/components/Vercel.vue'
import Webflow from '@/templates/homeguardian/components/Webflow.vue'
import Logo from '@/templates/homeguardian/components/Logo.vue'

const logos = [
  Roblox,
  Vercel,
  TravelPerk,
  Cursor,
  Mocha,
  Firebase,
  Turso,
  Shopify,
  Airbnb,
  Webflow,
]
</script>

<template>
  <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-1 bg-primary/5 rounded-lg border border-dashed p-1">
    <div v-for="(Logo, index) in logos"
      :key="index"
      class="bg-background h-24 border rounded-md border-dashed flex items-center justify-center px-6"
    >
      <Logo class="aspect-video h-18 grayscale-100 text-foreground/70" />
    </div>
    <div class="hidden md:flex lg:hidden col-span-2 items-center justify-center">
      …and countless others who trust us every day
    </div>
  </div>
</template>
