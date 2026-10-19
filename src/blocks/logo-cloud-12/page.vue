<script lang="ts">
export const description = "Logo dalam petak dengan judul di sebelah kiri."
</script>

<script setup lang="ts">
import Logo01 from '@/blocks/logo-cloud-12/components/Logo01.vue'
import Logo02 from '@/blocks/logo-cloud-12/components/Logo02.vue'
import Logo03 from '@/blocks/logo-cloud-12/components/Logo03.vue'
import Logo04 from '@/blocks/logo-cloud-12/components/Logo04.vue'
import Logo05 from '@/blocks/logo-cloud-12/components/Logo05.vue'
import Logo06 from '@/blocks/logo-cloud-12/components/Logo06.vue'
import Logo07 from '@/blocks/logo-cloud-12/components/Logo07.vue'
import Logo08 from '@/blocks/logo-cloud-12/components/Logo08.vue'

const logos = [Logo01, Logo02, Logo03, Logo07, Logo05, Logo06, Logo04, Logo08]
</script>

<template>
  <section class="mx-auto max-w-5xl px-12 py-12">
    <p class="text-balance text-center font-medium text-muted-foreground text-sm uppercase">
      Trusted by teams and companies around the world
    </p>
    <div class="mt-14 grid grid-cols-2 place-items-center grayscale-100 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4">
      <div class="absolute inset-x-0 top-0 w-[calc(100%+4rem)] -translate-x-8 border-t" />
      <div class="absolute inset-x-0 bottom-0 w-[calc(100%+4rem)] -translate-x-8 border-b" />
      <div class="absolute inset-y-0 left-0 h-[calc(100%+4rem)] -translate-y-8 border-s" />
      <div class="absolute inset-y-0 right-0 h-[calc(100%+4rem)] -translate-y-8 border-e" />

      <div class="absolute inset-x-0 -top-1 w-[calc(100%+3rem)] -translate-x-6 border-t" />
      <div class="absolute inset-x-0 -bottom-1 w-[calc(100%+3rem)] -translate-x-6 border-b" />
      <div class="absolute inset-y-0 -left-1 h-[calc(100%+3rem)] -translate-y-6 border-s" />
      <div class="absolute inset-y-0 -right-1 h-[calc(100%+3rem)] -translate-y-6 border-e" />

      <div v-for="(Logo, index) in logos"
        class="flex w-full items-center justify-center border-r border-b p-6"
        :key="index"
      >
        <component :is="Logo" class="h-6 sm:h-8" />
      </div>

      <div class="hidden w-full items-center justify-center border-r text-center sm:flex lg:hidden">
        and 1000+ more companies
      </div>
    </div>
  </section>
</template>
