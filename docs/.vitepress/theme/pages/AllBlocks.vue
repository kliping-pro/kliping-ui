<script setup lang="ts">
import type { GalleryKind } from '../gallery'
import { computed } from 'vue'
import LinkedCard from '../LinkedCard.vue'
import { CATALOG } from '../gallery'

/**
 * Isi halaman All sebuah galeri — `/blocks`, `/variants`, `/charts` — satu kartu
 * per kategori.
 *
 * Featured tidak ikut — itu pilihan kurasi dari kategori lain, bukan kategori
 * tersendiri. Jumlahnya dihitung dari galeri yang sama dengan sidebar dan
 * pencarian, jadi angka di kartu selalu cocok dengan isi halaman kategorinya.
 */
const props = withDefaults(defineProps<{ kind?: GalleryKind }>(), { kind: 'block' })

const catalog = computed(() => CATALOG[props.kind])
const categories = computed(() => catalog.value.categories
  .filter(r => r.slug !== 'featured')
  .map(r => ({ ...r, href: `${catalog.value.root}/${r.slug}`, count: r.items.length })))
</script>

<template>
  <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    <LinkedCard v-for="k in categories" :key="k.href" :href="k.href">
      <span class="mb-4 flex size-11 items-center justify-center rounded-lg border bg-background text-foreground/80 shadow-xs">
        <component :is="catalog.icon" :name="k.slug" />
      </span>
      <p class="font-medium">
        {{ k.name }}
      </p>
      <p class="mt-1 text-muted-foreground text-sm">
        {{ k.count }} {{ k.count === 1 ? catalog.singular : catalog.plural }}
      </p>
    </LinkedCard>
  </div>
</template>
