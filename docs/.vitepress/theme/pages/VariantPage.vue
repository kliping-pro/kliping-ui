<script setup lang="ts">
import { LayoutGridIcon, ShapesIcon } from '@lucide/vue'
import { useData, withBase } from 'vitepress'
import { Button } from '@/components/ui/button'
import { componentTitle, variantCount, variantComponents, allVariants } from '@/lib/variants'
import { categoryItemLinks } from '../gallery'
import VariantIcon from '../VariantIcon.vue'
import CategoryPage from './CategoryPage.vue'
import PageHeader from './PageHeader.vue'
import VariantSearch from './VariantSearch.vue'

/**
 * Kerangka halaman Variasi: sidebar komponen di kiri, kepala halaman dan
 * variannya di kanan.
 *
 * Judul dan keterangannya dibaca dari frontmatter halaman, sama seperti
 * halaman Blocks — jadi tiap halaman komponen menuliskannya sendiri, dan tidak
 * ada daftar judul kedua yang harus dijaga tetap sinkron.
 */
const { frontmatter } = useData()

const items = [
  { name: 'All', href: '/variants', count: allVariants.length },
  ...variantComponents.map(k => ({ name: componentTitle(k), href: `/variants/${k}`, count: variantCount(k), children: categoryItemLinks('variant', k) })),
]
const slug = (href: string) => href.replace(/^\/variants\/?/, '')
</script>

<template>
  <CategoryPage title="Variants" home-href="/variants" :title-icon="ShapesIcon" :items="items" label="Variant components">
    <template #search>
      <VariantSearch />
    </template>
    <template #icon="{ item: i }">
      <LayoutGridIcon v-if="!slug(i.href)" />
      <VariantIcon v-else :name="slug(i.href)" />
    </template>

    <PageHeader
      :title="frontmatter.title"
      :description="frontmatter.description"
      :announcement="`New: ${allVariants.length} component variants`"
    >
      <template #actions>
        <Button as-child size="sm">
          <a href="#variants">Browse Variants</a>
        </Button>
        <Button as-child variant="ghost" size="sm">
          <a :href="withBase('/variants/docs')">Documentation</a>
        </Button>
      </template>
    </PageHeader>

    <div id="variants" class="section-soft flex-1 scroll-mt-24 md:py-12">
      <div class="container-wrapper">
        <div class="container flex flex-col gap-12 py-6 md:gap-16">
          <slot />
        </div>
      </div>
    </div>
  </CategoryPage>
</template>
