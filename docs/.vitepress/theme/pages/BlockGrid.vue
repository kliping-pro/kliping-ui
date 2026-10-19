<script setup lang="ts">
import AddToSetup from '../AddToSetup.vue'
import { chartSlug } from '@/lib/blocks'
import { ChevronLeftIcon, ChevronRightIcon, PlayIcon } from '@lucide/vue'
import { withBase } from 'vitepress'
import { computed, nextTick, onMounted, ref } from 'vue'
import { Button } from '@/components/ui/button'
import type { GalleryKind } from '../gallery'
import { CATALOG } from '../gallery'

/**
 * Halaman kategori Blocks: grid thumbnail berpaginasi, meniru shadcn.io.
 *
 * Yang dimuat cuma gambar — dua belas per halaman, dan baru diambil saat
 * mendekati layar. Pratinjau live seluruh kategori tetap ada di
 * `/blocks/<category>/all`, satu tombol dari sini.
 *
 * Thumbnail-nya dua: terang dan gelap, dari `npm run generate:thumbnails`. Yang
 * tidak tampil karena `display: none` tidak diunduh sama sekali, jadi pembaca
 * cuma membayar satu dari keduanya. Block yang belum punya thumbnail jatuh ke
 * ikon kategorinya.
 *
 * Dipakai ketiga galeri — Blocks, Variants, Charts — lewat `kind`; alamat,
 * thumbnail, dan kata yang dipakainya dibaca dari `CATALOG`. Tanpa `kind`,
 * yang digambar galeri block, persis seperti sebelumnya.
 */
const props = withDefaults(defineProps<{ category: string, kind?: GalleryKind }>(), { kind: 'block' })

const catalog = computed(() => CATALOG[props.kind])

const PAGE_SIZE = 12

const gallery = computed(() => catalog.value.findCategory(props.category))
const entries = computed(() => (gallery.value?.items ?? []).map(name => ({
  name,
  label: catalog.value.label(name),
  description: catalog.value.description(name),
})))
const pageCount = computed(() => Math.max(1, Math.ceil(entries.value.length / PAGE_SIZE)))

const page = ref(1)
const visible = computed(() => entries.value.slice((page.value - 1) * PAGE_SIZE, page.value * PAGE_SIZE))

const failedThumbnails = ref(new Set<string>())
function markFailed(name: string) {
  failedThumbnails.value = new Set(failedThumbnails.value).add(name)
}

const sectionEl = ref<HTMLElement>()

/** Halaman ke-n, disimpan di `?page=` supaya bisa dibagikan dan bertahan saat dimuat ulang. */
async function goToPage(n: number, scroll = true) {
  page.value = Math.min(Math.max(1, n), pageCount.value)
  const url = new URL(window.location.href)
  if (page.value === 1)
    url.searchParams.delete('page')
  else
    url.searchParams.set('page', String(page.value))
  history.replaceState(history.state, '', url)
  if (scroll) {
    await nextTick()
    sectionEl.value?.scrollIntoView({ block: 'start', behavior: 'smooth' })
  }
}

onMounted(() => {
  const n = Number(new URL(window.location.href).searchParams.get('page'))
  if (n > 1)
    void goToPage(n, false)
})

/** Nomor halaman yang ditampilkan: ujung-ujungnya, sekitar halaman aktif, dan elipsis di celahnya. */
const pageNumbers = computed(() => {
  const total = pageCount.value
  const result: (number | '…')[] = []
  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total || Math.abs(i - page.value) <= 1)
      result.push(i)
    else if (result.at(-1) !== '…')
      result.push('…')
  }
  return result
})

const rangeStart = computed(() => (page.value - 1) * PAGE_SIZE + 1)
const rangeEnd = computed(() => Math.min(page.value * PAGE_SIZE, entries.value.length))
</script>

<template>
  <section v-if="gallery" ref="sectionEl" class="flex scroll-mt-24 flex-col gap-6">
    <div class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div class="flex flex-col gap-1">
        <h2 class="font-semibold text-lg tracking-tight">
          Browse every {{ gallery.name }} {{ catalog.singular }}
        </h2>
        <p class="text-muted-foreground text-sm">
          {{ entries.length }} {{ entries.length === 1 ? catalog.singular : catalog.plural }} · click a card to open it, or view them all live.
        </p>
      </div>
      <Button as-child variant="outline" size="sm" class="w-fit">
        <a :href="withBase(`${catalog.root}/${gallery.slug}/all`)">
          <PlayIcon />
          View all live
        </a>
      </Button>
    </div>

    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <div v-for="b in visible" :key="b.name" class="relative min-w-0">
      <a
        :href="withBase(catalog.detailPage(b.name))"
        class="group flex h-full min-w-0 flex-col kliping-card overflow-hidden no-underline"
      >
        <div class="relative aspect-[16/10] overflow-hidden border-b bg-muted/60">
          <template v-if="!failedThumbnails.has(b.name)">
            <img
              :src="withBase(catalog.thumbnail(b.name, false))"
              :alt="b.label"
              loading="lazy"
              decoding="async"
              class="size-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02] dark:hidden"
              @error="markFailed(b.name)"
            >
            <img
              :src="withBase(catalog.thumbnail(b.name, true))"
              :alt="b.label"
              loading="lazy"
              decoding="async"
              class="hidden size-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02] dark:block"
              @error="markFailed(b.name)"
            >
          </template>
          <div v-else class="flex size-full items-center justify-center text-muted-foreground/60">
            <component :is="catalog.icon" :name="gallery.slug" class="size-10" />
          </div>
        </div>
        <div class="flex flex-col gap-1 p-3">
          <span class="truncate font-medium font-mono text-sm text-foreground">{{ b.label }}</span>
          <span class="line-clamp-2 text-muted-foreground text-xs">{{ b.description }}</span>
        </div>
      </a>
      <!-- Di luar tautan kartu: tombol di dalam <a> tidak sah, dan klik
           "Add to setup" tidak boleh membuka halaman detailnya. -->
      <AddToSetup
        :name="props.kind === 'chart' ? chartSlug(b.name) : b.name"
        size="icon-sm"
        class="absolute top-2 right-2 bg-background/90 backdrop-blur-sm"
      />
      </div>
    </div>

    <nav v-if="pageCount > 1" class="flex flex-col items-center gap-2" aria-label="Pagination">
      <div class="flex items-center gap-1">
        <Button variant="ghost" size="sm" :disabled="page === 1" @click="goToPage(page - 1)">
          <ChevronLeftIcon />
          <span class="hidden sm:inline">Previous</span>
        </Button>
        <template v-for="(n, i) in pageNumbers" :key="`${n}-${i}`">
          <span v-if="n === '…'" class="px-2 text-muted-foreground text-sm">…</span>
          <Button
            v-else
            :variant="n === page ? 'outline' : 'ghost'"
            size="sm"
            class="min-w-8"
            :aria-current="n === page ? 'page' : undefined"
            @click="goToPage(n)"
          >
            {{ n }}
          </Button>
        </template>
        <Button variant="ghost" size="sm" :disabled="page === pageCount" @click="goToPage(page + 1)">
          <span class="hidden sm:inline">Next</span>
          <ChevronRightIcon />
        </Button>
      </div>
      <p class="text-muted-foreground text-xs">
        Showing {{ rangeStart }}–{{ rangeEnd }} of {{ entries.length }}
      </p>
    </nav>
  </section>
</template>
