<script setup lang="ts">
import { LayersIcon, LayoutGridIcon } from '@lucide/vue'
import { useData, withBase } from 'vitepress'
import { computed } from 'vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { templateCategories, allTemplates, templatesIn } from '@/lib/templates'
import CategoryPage from './CategoryPage.vue'
import CategorySearch from './CategorySearch.vue'
import PageHeader from './PageHeader.vue'
import { categoryItemLinks } from '../gallery'
import BlockIcon from '../BlockIcon.vue'
import LinkedCard from '../LinkedCard.vue'
import TemplateCard from '../TemplateCard.vue'

/**
 * Halaman Template: seluruh isinya digambar di sini, bukan disusun dari
 * markdown.
 *
 * Bedanya dari halaman Blocks dan Variasi disengaja. Keduanya menampilkan
 * banyak potongan yang tiap barisnya perlu judul dan tautan sendiri, jadi
 * markdown yang disusun skrip masuk akal di sana. Template cuma empat, dan
 * yang membedakan satu dari yang lain seluruhnya ada di katalognya — nama,
 * kategori, bagian penyusunnya. Tidak ada yang tersisa untuk ditulis di
 * markdown, jadi halamannya membaca katalog itu langsung.
 */
const props = defineProps<{ category?: string }>()

const { frontmatter } = useData()

// Sama dengan Blocks dan Variants: All (`/templates`) berisi kartu kategori,
// tiap kategori punya halamannya sendiri, dan keduanya ada di sidebar kiri.
const items = [
  { name: 'All', href: '/templates', count: allTemplates.length },
  ...templateCategories.map(k => ({ name: k.name, href: `/templates/${k.slug}`, count: templatesIn(k.slug).length, children: categoryItemLinks('template', k.slug) })),
]
const slug = (href: string) => href.replace(/^\/templates\/?/, '')
const searchItems = allTemplates.map(t => ({ name: t.name, href: `/templates/${t.slug}/preview`, description: t.description }))

const visibleCategories = computed(() => templateCategories.filter(k => !props.category || k.slug === props.category))
</script>

<template>
  <CategoryPage title="Templates" home-href="/templates" :title-icon="LayersIcon" :items="items" label="Template categories">
    <template #search>
      <CategorySearch noun="templates" :categories="items.slice(1)" items-heading="Templates" :items="searchItems" :item-icon="LayersIcon" />
    </template>
    <template #icon="{ item: i }">
      <LayoutGridIcon v-if="!slug(i.href)" />
      <BlockIcon v-else :name="slug(i.href)" />
    </template>

    <PageHeader
      :title="frontmatter.title"
      :description="frontmatter.description"
      announcement="New: four full-page templates"
    >
      <template #actions>
        <Button as-child size="sm">
          <a href="#templates">
            <LayersIcon /> Browse Templates
          </a>
        </Button>
        <Button as-child size="sm" variant="ghost">
          <a :href="withBase('/templates/docs')">Documentation</a>
        </Button>
      </template>
    </PageHeader>

    <div id="templates" class="section-soft flex-1 scroll-mt-24 md:py-12">
      <div class="container-wrapper">
        <div class="container flex flex-col gap-12 py-6 md:gap-16">
          <div v-if="!category" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <LinkedCard v-for="k in templateCategories" :key="k.slug" :href="`/templates/${k.slug}`">
              <span class="mb-4 flex size-11 items-center justify-center rounded-lg border bg-background text-foreground/80 shadow-xs">
                <BlockIcon :name="k.slug" />
              </span>
              <p class="font-medium">
                {{ k.name }}
              </p>
              <p class="mt-1 text-muted-foreground text-sm">
                {{ templatesIn(k.slug).length }} {{ templatesIn(k.slug).length === 1 ? 'template' : 'templates' }}
              </p>
            </LinkedCard>
          </div>

          <template v-else>
            <section v-for="k in visibleCategories" :id="k.slug" :key="k.slug" class="scroll-mt-24">
              <h2 class="mb-6 font-semibold text-2xl tracking-tight sm:text-3xl">
                {{ k.name }}
                <Badge class="ml-2 align-middle" variant="secondary">
                  {{ templatesIn(k.slug).length }}
                </Badge>
              </h2>

              <div class="grid gap-8 md:grid-cols-2">
                <TemplateCard
                  v-for="t in templatesIn(k.slug)"
                  :key="t.slug"
                  :template="t"
                />
              </div>
            </section>
          </template>

          <p class="text-muted-foreground text-sm">
            License status of each template:
            <a class="underline" :href="withBase('/credits#template')">Credits</a>.
          </p>
        </div>
      </div>
    </div>
  </CategoryPage>
</template>
