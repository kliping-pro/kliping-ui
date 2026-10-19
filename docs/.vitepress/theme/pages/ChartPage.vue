<script setup lang="ts">
import { ChartAreaIcon, LayoutGridIcon } from '@lucide/vue'
import { useData, withBase } from 'vitepress'
import { Button } from '@/components/ui/button'
import { charts, chartGalleries, chartSlug, chartNav } from '@/lib/blocks'
import { categoryItemLinks } from '../gallery'
import ChartIcon from '../ChartIcon.vue'
import CategoryPage from './CategoryPage.vue'
import CategorySearch from './CategorySearch.vue'
import PageHeader from './PageHeader.vue'

/**
 * Kerangka halaman Charts: sidebar jenis grafik di kiri, kepala halaman dan
 * isinya di kanan — sama dengan BlockPage.
 *
 * Alurnya juga sama dengan Blocks: `/charts` adalah All (satu kartu per jenis),
 * `/charts/<jenis>` grid thumbnail, `/charts/<jenis>/all` pratinjau live, dan
 * tiap grafik punya halaman detailnya sendiri.
 */
const { frontmatter } = useData()

const items = chartNav.map(k => ({
  ...k,
  count: k.href === '/charts' ? charts.length : (chartGalleries.find(g => k.href === `/charts/${g.slug}`)?.items.length ?? 0),
  children: k.href === '/charts' ? undefined : categoryItemLinks('chart', k.href.replace('/charts/', '')),
}))
const slug = (href: string) => href.replace(/^\/charts\/?/, '')

/** Tiap grafik membuka halaman detailnya, bukan halaman jenisnya. */
const searchItems = charts.map(c => ({
  name: chartSlug(c.name),
  href: `/charts/${chartSlug(c.name)}`,
  description: c.description,
}))
</script>

<template>
  <CategoryPage title="Charts" home-href="/charts" :title-icon="ChartAreaIcon" :items="items" label="Chart types">
    <template #search>
      <CategorySearch noun="charts" :categories="items.slice(1)" items-heading="Charts" :items="searchItems" :item-icon="ChartAreaIcon" />
    </template>
    <template #icon="{ item: i }">
      <LayoutGridIcon v-if="!slug(i.href)" />
      <ChartIcon v-else :name="slug(i.href)" />
    </template>

    <PageHeader
      :title="frontmatter.title"
      :description="frontmatter.description"
      :announcement="`New: ${charts.length} charts in ${chartGalleries.length} types`"
    >
      <template #actions>
        <Button as-child size="sm">
          <a href="#charts">Browse Charts</a>
        </Button>
        <Button as-child variant="ghost" size="sm">
          <a :href="withBase('/charts/docs')">Documentation</a>
        </Button>
      </template>
    </PageHeader>

    <div id="charts" class="section-soft flex-1 scroll-mt-24 md:py-12">
      <div class="container-wrapper">
        <div class="container flex flex-col gap-12 py-6 md:gap-20">
          <slot />
        </div>
      </div>
    </div>
  </CategoryPage>
</template>
