<script setup lang="ts">
import { useData, withBase } from 'vitepress'
import { Button } from '@/components/ui/button'
import { BracesIcon, LayoutGridIcon } from '@lucide/vue'
import { hookCounts, hookCategories, hookNav } from '../hooks'
import HooksIcon from '../HooksIcon.vue'
import { hookIcon } from '../hook-icons'
import CategoryPage from './CategoryPage.vue'
import HooksSearch from './HooksSearch.vue'
import PageHeader from './PageHeader.vue'

/**
 * Kerangka halaman Hooks, mengikuti pola `BlockPage.vue`: sidebar kategori
 * di kiri dengan All di atas, dan tombol cari di kepalanya.
 *
 * Judul dan keterangannya dibaca dari frontmatter, sama seperti halaman lepas
 * lainnya — jadi tidak ada judul kedua yang harus dijaga tetap sinkron.
 */
const { frontmatter } = useData()

const total = hookCategories.reduce((n, k) => n + k.items.length, 0)
const items = hookNav.map((n) => {
  const k = hookCategories.find(k => k.href === n.href)
  return {
    ...n,
    count: n.href === '/hooks' ? total : k?.items.length,
    children: k?.items.map(i => ({ name: i.title, href: `/hooks/${i.name}`, icon: hookIcon(i.name) })),
  }
})
const slug = (href: string) => href.replace(/^\/hooks\/?/, '')
</script>

<template>
  <CategoryPage title="Hooks" home-href="/hooks" :title-icon="BracesIcon" :items="items" label="Composable categories">
    <template #search>
      <HooksSearch />
    </template>
    <template #icon="{ item: i }">
      <LayoutGridIcon v-if="!slug(i.href)" />
      <HooksIcon v-else :name="slug(i.href)" />
    </template>

    <PageHeader
      :title="frontmatter.title"
      :description="frontmatter.description"
      :announcement="`New: ${hookCounts.composables} Vue composables, zero dependencies`"
    >
      <template #actions>
        <Button as-child size="sm">
          <a href="#hooks">Browse Hooks</a>
        </Button>
        <Button as-child variant="ghost" size="sm">
          <a :href="withBase('/hooks/introduction')">Documentation</a>
        </Button>
      </template>
    </PageHeader>

    <div id="hooks" class="section-soft flex-1 scroll-mt-24 md:py-12">
      <div class="container-wrapper">
        <div class="container flex flex-col gap-12 py-6 md:gap-16">
          <slot />
        </div>
      </div>
    </div>
  </CategoryPage>
</template>
