<script setup lang="ts">
import { hookCategories } from '../hooks'
import HooksIcon from '../HooksIcon.vue'
import LinkedCard from '../LinkedCard.vue'

/**
 * Isi halaman Hooks › All (`/hooks`): satu kartu per kategori, berjejer seperti
 * Blocks › All dan indeks Variants.
 */
</script>

<template>
  <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    <LinkedCard v-for="k in hookCategories" :key="k.href" :href="k.href">
      <span class="mb-4 flex size-11 items-center justify-center rounded-lg border bg-background text-foreground/80 shadow-xs">
        <HooksIcon :name="k.slug" />
      </span>
      <p class="font-medium">
        {{ k.name }}
      </p>
      <p class="mt-1 text-muted-foreground text-sm">
        {{ k.items.length }} {{ k.items.length === 1 ? 'composable' : 'composables' }}
      </p>
    </LinkedCard>
  </div>
</template>
