<script lang="ts">
export const description = "Logo dalam petak empat kolom yang lega."
</script>

<script setup lang="ts">
import Logo01 from '@/blocks/logo-cloud-04/components/Logo01.vue'
import Logo02 from '@/blocks/logo-cloud-04/components/Logo02.vue'
import Logo03 from '@/blocks/logo-cloud-04/components/Logo03.vue'
import Logo04 from '@/blocks/logo-cloud-04/components/Logo04.vue'
import Logo05 from '@/blocks/logo-cloud-04/components/Logo05.vue'
import Logo06 from '@/blocks/logo-cloud-04/components/Logo06.vue'
import Logo07 from '@/blocks/logo-cloud-04/components/Logo07.vue'
import Logo08 from '@/blocks/logo-cloud-04/components/Logo08.vue'

const logos = [Logo01, Logo02, Logo03, Logo04, Logo05, Logo06, Logo07, Logo08]
</script>

<template>
  <div class="flex min-h-screen items-center justify-center px-6 py-16">
    <div>
      <p class="text-center font-medium text-foreground/80 text-xl tracking-[-0.01em]">
        More than 2.2 million companies worldwide already trust us
      </p>
      <div class="mt-16 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
        <div v-for="(Logo, i) in logos"
          class="flex items-center justify-center rounded border border-dashed py-6 *:h-8 sm:px-10 sm:py-8 sm:*:h-10"
          :key="i"
        >
          <component :is="Logo" />
        </div>
      </div>
    </div>
  </div>
</template>
