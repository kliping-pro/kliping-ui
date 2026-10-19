<script lang="ts">
export const description = "Logo dalam petak dengan judul dan keterangan di atasnya."
</script>

<script setup lang="ts">
import Logo01 from '@/blocks/logo-cloud-08/components/Logo01.vue'
import Logo02 from '@/blocks/logo-cloud-08/components/Logo02.vue'
import Logo03 from '@/blocks/logo-cloud-08/components/Logo03.vue'
import Logo04 from '@/blocks/logo-cloud-08/components/Logo04.vue'
import Logo05 from '@/blocks/logo-cloud-08/components/Logo05.vue'
import Logo06 from '@/blocks/logo-cloud-08/components/Logo06.vue'
import Logo07 from '@/blocks/logo-cloud-08/components/Logo07.vue'
import Logo08 from '@/blocks/logo-cloud-08/components/Logo08.vue'

const logos = [Logo01, Logo02, Logo03, Logo07, Logo05, Logo06, Logo04, Logo08]
</script>

<template>
  <section class="mx-auto max-w-5xl px-6 py-12">
    <p class="text-balance text-center font-medium text-muted-foreground text-sm uppercase">
      Trusted by teams and companies around the world
    </p>
    <div class="mt-10 grid grid-cols-2 place-items-center border-t border-l border-dashed grayscale-100 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4">
      <div v-for="(Logo, index) in logos"
        class="flex w-full items-center justify-center border-r border-b border-dashed bg-card p-6"
        :key="index"
      >
        <component :is="Logo" class="h-7 sm:h-8" />
      </div>
    </div>
  </section>
</template>
