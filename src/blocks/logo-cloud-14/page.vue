<script lang="ts">
export const description = "Logo dengan ajakan bertindak dan tautan panah di bawahnya."
</script>

<script setup lang="ts">
import { ArrowUpRight } from '@lucide/vue'
import Logo01 from '@/blocks/logo-cloud-14/components/Logo01.vue'
import Logo02 from '@/blocks/logo-cloud-14/components/Logo02.vue'
import Logo03 from '@/blocks/logo-cloud-14/components/Logo03.vue'
import Logo04 from '@/blocks/logo-cloud-14/components/Logo04.vue'
import Logo05 from '@/blocks/logo-cloud-14/components/Logo05.vue'
import Logo06 from '@/blocks/logo-cloud-14/components/Logo06.vue'
import Logo07 from '@/blocks/logo-cloud-14/components/Logo07.vue'
import Logo08 from '@/blocks/logo-cloud-14/components/Logo08.vue'
import { Button } from '@/components/ui/button'

const logos = [
  Logo01,
  Logo02,
  Logo03,
  Logo04,
  Logo05,
  Logo06,
  Logo07,
  Logo08,
  Logo01,
]
</script>

<template>
  <div class="px-6 py-12">
    <div class="mx-auto mt-10 grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
      <div class="flex flex-col rounded-xl bg-muted p-5 max-sm:col-span-full sm:row-span-3">
        <p class="mb-8 max-w-[20ch] text-balance font-medium text-2xl tracking-tight sm:text-xl lg:text-2xl">
          Trusted by teams and companies around the world
        </p>

        <Button class="mt-auto max-sm:me-auto" size="lg">
          View companies <ArrowUpRight />
        </Button>
      </div>
      <div v-for="(Logo, index) in logos"
        class="flex w-full items-center justify-center rounded-xl bg-muted px-3 py-7"
        :key="index"
      >
        <component :is="Logo" class="h-7 sm:h-8" />
      </div>
    </div>
  </div>
</template>
