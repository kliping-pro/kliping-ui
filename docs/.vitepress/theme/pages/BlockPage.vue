<script setup lang="ts">
import { LayoutGridIcon } from '@lucide/vue'
import { useData, withBase } from 'vitepress'
import { Button } from '@/components/ui/button'
import { blocks, blockCount, blockNav } from '@/lib/blocks'
import { categoryItemLinks } from '../gallery'
import BlockIcon from '../BlockIcon.vue'
import BlockSearch from './BlockSearch.vue'
import CategoryPage from './CategoryPage.vue'
import PageHeader from './PageHeader.vue'

/**
 * Kerangka halaman Blocks: sidebar kategori di kiri, kepala halaman dan isinya
 * di kanan.
 *
 * Judul dan keterangannya dibaca dari frontmatter halaman, sama seperti halaman
 * dokumentasi — jadi tiap halaman kategori menuliskannya sendiri, dan tidak ada
 * daftar judul kedua yang harus dijaga tetap sinkron.
 */
const { frontmatter } = useData()

const items = blockNav.map(k => ({
  ...k,
  count: k.href === '/blocks' ? blocks.length : blockCount(k.href),
  children: k.href === '/blocks' ? undefined : categoryItemLinks('block', k.href.replace('/blocks/', '')),
}))
const slug = (href: string) => href.replace(/^\/blocks\/?/, '')
</script>

<template>
  <CategoryPage title="Blocks" home-href="/blocks" :title-icon="LayoutGridIcon" :items="items" label="Block categories">
    <template #search>
      <BlockSearch />
    </template>
    <template #icon="{ item: i }">
      <LayoutGridIcon v-if="!slug(i.href)" />
      <BlockIcon v-else :name="slug(i.href)" />
    </template>

    <PageHeader
      :title="frontmatter.title"
      :description="frontmatter.description"
      announcement="New: Typeset, Questionnaire, and more"
    >
      <template #actions>
        <Button as-child size="sm">
          <a href="#blocks">Browse Blocks</a>
        </Button>
        <Button as-child variant="ghost" size="sm">
          <a :href="withBase('/blocks/docs')">Documentation</a>
        </Button>
      </template>
    </PageHeader>

    <div id="blocks" class="section-soft flex-1 scroll-mt-24 md:py-12">
      <div class="container-wrapper">
        <div class="container flex flex-col gap-12 py-6 md:gap-20">
          <slot />
        </div>
      </div>
    </div>
  </CategoryPage>
</template>
