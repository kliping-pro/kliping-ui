<script setup lang="ts">
import AddToSetup from '../AddToSetup.vue'
import { chartSlug } from '@/lib/blocks'
import {
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CodeIcon,
  EyeIcon,
  LayoutGridIcon,
  MonitorIcon,
  MoonIcon,
  PanelLeftIcon,
  SmartphoneIcon,
  SunIcon,
  TabletIcon,
  TerminalIcon,
} from '@lucide/vue'
import { useData, useRouter, withBase } from 'vitepress'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import type { GalleryKind } from '../gallery'
import { cn } from '@/lib/utils'
import BlockCode from '../BlockCode.vue'
import { mainMenu } from '../chrome/main-menu'
import { categoryItemLinks, CATALOG, installCommand } from '../gallery'
import PackageCommand from '../PackageCommand.vue'
import CategoryList from './CategoryList.vue'

/**
 * Halaman satu block (`/blocks/<name>`), meniru halaman block shadcn.io.
 *
 * Bilah atas berisi tab Preview, Code, Install, dan tautan ke galerinya,
 * pratinjaunya memenuhi layar, dan bilah bawah membawa ke block sebelum dan
 * sesudahnya di seluruh galeri — melintasi kategori. Pratinjaunya iframe ke `/view/<name>`: block
 * adalah halaman utuh yang membaca lebar layar lewat media query, jadi ia perlu
 * jendelanya sendiri supaya tombol Desktop/Tablet/Mobile berarti sesuatu.
 *
 * Halaman ini `layout: false`, jadi ia tidak memakai kerangka situs sama
 * sekali — yang dilihat cuma block-nya dan alat untuk mengambilnya.
 *
 * Varian (`/variants/<name>`) dan grafik (`/charts/<name>`) memakai halaman yang
 * sama lewat `kind`: alamat, kanvas, kode, dan galerinya dibaca dari
 * `CATALOG`. `uses` adalah komponen yang diimpor isinya, ditulis skrip
 * penyusun halamannya — varian dan grafik dipasang lewat komponen-komponen itu,
 * bukan lewat namanya sendiri.
 */
const props = withDefaults(
  defineProps<{ name: string, kind?: GalleryKind, uses?: string[] }>(),
  { kind: 'block', uses: () => [] },
)

const catalog = computed(() => CATALOG[props.kind])

const { isDark } = useData()
const router = useRouter()

const description = computed(() => catalog.value.description(props.name))
const label = computed(() => catalog.value.label(props.name))
const gallery = computed(() => catalog.value.categoryOf(props.name))

/**
 * Previous/Next berjalan di seluruh galeri, bukan cuma di kategori ini: dari
 * isi pertama kategori pertama sampai isi terakhir kategori terakhir, berurutan
 * seperti di sidebar. Isi yang muncul di dua kategori (Featured) dihitung sekali,
 * di tempat pertama ia muncul. "n of N" juga dihitung dari seluruh galeri.
 */
const allItems = computed(() => [...new Set(catalog.value.categories.flatMap(r => r.items))])
const position = computed(() => allItems.value.indexOf(props.name))
const prev = computed(() => (position.value > 0 ? allItems.value[position.value - 1] : undefined))
const next = computed(() => position.value >= 0 && position.value < allItems.value.length - 1 ? allItems.value[position.value + 1] : undefined)

type Tab = 'preview' | 'code' | 'install'
const tab = ref<Tab>('preview')
const width = ref(100)
watch(() => props.name, () => {
  tab.value = 'preview'
})

const TABS = [
  { id: 'preview', label: 'Preview', icon: EyeIcon },
  { id: 'code', label: 'Code', icon: CodeIcon },
  { id: 'install', label: 'Install', icon: TerminalIcon },
] as const

const WIDTHS = [
  { n: 100, icon: MonitorIcon, label: 'Desktop' },
  { n: 60, icon: TabletIcon, label: 'Tablet' },
  { n: 30, icon: SmartphoneIcon, label: 'Mobile' },
] as const

const command = computed(() => installCommand(props.kind, props.name, props.uses))

/** ← dan → berpindah block, selama yang sedang diketik bukan isian. */
function onKeydown(e: KeyboardEvent) {
  if (e.metaKey || e.ctrlKey || e.altKey)
    return
  const target = e.target as HTMLElement | null
  if (target && (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)))
    return
  const destination = e.key === 'ArrowLeft' ? prev.value : e.key === 'ArrowRight' ? next.value : undefined
  if (destination)
    void router.go(withBase(catalog.value.detailPage(destination)))
}

/**
 * Sidebar halaman detail, berkonsep sidebar Claude: tertutup, yang tersisa
 * cuma tombol "Show sidebar" di pojok kiri atas — tidak
 * ada deretan ikon yang tertinggal. Terbuka, sidebar-nya memenuhi tinggi layar
 * di kiri dengan tombol "Hide sidebar" di kepalanya. Isinya tautan ke
 * galeri-galeri dan kategori galeri ini, dengan isi yang sedang dibuka disorot.
 *
 * Di layar lebar sidebar-nya mendorong pratinjau; di layar sempit ia menutupi
 * halaman di atas tirai. Pilihan buka-tutupnya disimpan, dan ⌘/Ctrl+B
 * membalikkannya — sama dengan sidebar halaman berkategori. Server selalu
 * menggambarnya tertutup; pilihan pembaca dibaca setelah terpasang.
 */
const SIDEBAR_STORAGE_KEY = 'kliping:sidebar-detail'
const sidebar = ref(false)

watch(sidebar, (open) => {
  try {
    localStorage.setItem(SIDEBAR_STORAGE_KEY, open ? '1' : '0')
  }
  catch {}
})

function toggleSidebar(e: KeyboardEvent) {
  if (!(e.metaKey || e.ctrlKey) || e.altKey || e.key.toLowerCase() !== 'b')
    return
  e.preventDefault()
  sidebar.value = !sidebar.value
}

const otherGalleries = (mainMenu.find(e => e.title === 'Browse') as { items: { title: string, href: string, icon?: unknown }[] } | undefined)?.items ?? []

const categoryNav = computed(() => [
  { name: 'All', href: catalog.value.root, count: catalog.value.count },
  ...catalog.value.categories.map(r => ({
    name: r.name,
    href: `${catalog.value.root}/${r.slug}`,
    count: r.items.length,
    children: categoryItemLinks(props.kind, r.slug),
  })),
])
const categorySlugOf = (href: string) => href.slice(catalog.value.root.length + 1)

onMounted(() => {
  try {
    sidebar.value = localStorage.getItem(SIDEBAR_STORAGE_KEY) === '1'
  }
  catch {}
  window.addEventListener('keydown', onKeydown)
  window.addEventListener('keydown', toggleSidebar)
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  window.removeEventListener('keydown', toggleSidebar)
})

// Pill, seperti item sidebar dan nav utama: sorotan membulat saat disorot dan saat aktif.
// Pembuka dan penutup sidebar: pill ikon + teks — tanpa nama situs; jalan keluar dari halaman ini sudah ada di tombol Docs.
const sidebarButton = 'flex h-8 shrink-0 items-center gap-2 rounded-lg px-2.5 text-muted-foreground text-sm outline-none transition-colors hover:bg-pill hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring'
const tabButton = 'flex h-8 shrink-0 items-center gap-2 rounded-lg px-3 text-sm no-underline outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring'
</script>

<template>
  <div class="flex h-svh bg-background text-foreground">
    <!-- Tirai di layar sempit: sidebar-nya menutupi halaman. -->
    <div v-if="sidebar" class="fixed inset-0 z-30 bg-black/50 lg:hidden" aria-hidden="true" @click="sidebar = false" />

    <aside
      v-if="sidebar"
      id="kliping-sidebar-detail"
      class="fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r bg-sidebar text-sidebar-foreground lg:static lg:z-auto lg:w-64"
      :aria-label="`${catalog.title} navigation`"
    >
      <div class="flex h-12 shrink-0 items-center gap-1 border-b px-2">
        <button type="button" :class="sidebarButton" aria-controls="kliping-sidebar-detail" aria-expanded="true" title="Ctrl B" @click="sidebar = false">
          <PanelLeftIcon class="size-4 shrink-0" />
          Hide sidebar
        </button>
      </div>

      <nav class="scrollbar-none flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-2" :aria-label="catalog.title">
        <ul class="flex flex-col gap-0.5">
          <li v-for="g in otherGalleries" :key="g.href">
            <a
              :href="withBase(g.href)"
              class="flex h-9 items-center gap-3 rounded-lg px-2.5 text-sm no-underline outline-none transition-colors hover:bg-pill hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
              :class="g.href === catalog.root ? 'bg-pill font-medium text-foreground' : 'text-sidebar-foreground'"
            >
              <component :is="g.icon" class="size-4 shrink-0" />
              {{ g.title }}
            </a>
          </li>
        </ul>
        <div class="flex flex-col gap-1">
          <p class="px-2.5 font-medium text-muted-foreground text-xs">
            {{ catalog.title }} categories
          </p>
          <CategoryList :items="categoryNav">
            <template #icon="{ item: i }">
              <LayoutGridIcon v-if="i.href === catalog.root" />
              <component :is="catalog.icon" v-else :name="categorySlugOf(i.href)" />
            </template>
          </CategoryList>
        </div>
      </nav>
    </aside>

    <div class="flex min-w-0 flex-1 flex-col">
      <header class="flex h-12 shrink-0 items-stretch border-b">
        <div class="flex shrink-0 items-center gap-1 px-2 lg:flex-1">
          <template v-if="!sidebar">
            <button type="button" :class="sidebarButton" aria-controls="kliping-sidebar-detail" aria-expanded="false" aria-label="Show sidebar" title="Ctrl B" @click="sidebar = true">
              <PanelLeftIcon class="size-4 shrink-0" />
              <!-- Di HP cukup ikonnya: tab di tengah butuh ruangnya. -->
              <span class="hidden sm:inline">Show sidebar</span>
            </button>
          </template>
        </div>

        <nav class="flex items-center gap-1 px-2" :aria-label="catalog.singular">
          <button
            v-for="t in TABS"
            :key="t.id"
            type="button"
            :class="cn(tabButton, tab === t.id ? 'bg-pill font-medium text-foreground' : 'text-muted-foreground hover:bg-pill hover:text-foreground')"
            :aria-label="t.label"
            :aria-pressed="tab === t.id"
            @click="tab = t.id"
          >
            <component :is="t.icon" class="size-4" />
            <span class="hidden md:inline">{{ t.label }}</span>
          </button>
          <a :href="withBase(catalog.docsPage(name))" :class="cn(tabButton, 'hidden text-muted-foreground hover:bg-pill hover:text-foreground lg:flex')">
            <ArrowRightIcon class="size-4" />
            Docs
          </a>
          <a
            v-if="gallery"
            :href="withBase(`${catalog.root}/${gallery.slug}`)"
            :class="cn(tabButton, 'text-muted-foreground hover:bg-pill hover:text-foreground')"
            :aria-label="`${gallery.name} ${catalog.title}`"
          >
            <LayoutGridIcon class="size-4" />
            <span class="hidden lg:inline">{{ gallery.name }} {{ catalog.title }}</span>
          </a>
        </nav>

        <!-- Identitas isi yang sedang dibuka di pojok kanan, berdampingan dengan
             posisinya di galeri — kiri cukup logo, tengah tab. -->
        <div class="flex min-w-0 flex-1 items-center justify-end gap-2 px-3 sm:px-4">
          <!-- Di HP cukup ikonnya — namanya tidak muat utuh di samping tab, dan
               nama yang terpotong lebih buruk daripada tidak ada. -->
          <span class="flex size-6 shrink-0 items-center justify-center rounded-md border text-muted-foreground" :title="label" :aria-label="label" role="img">
            <component :is="catalog.icon" :name="gallery?.slug ?? 'other'" class="size-4" />
          </span>
          <span class="hidden truncate font-medium font-mono text-sm md:inline">{{ label }}</span>
          <template v-if="gallery && position >= 0">
            <span class="hidden text-muted-foreground/50 md:inline">·</span>
            <span class="hidden shrink-0 text-muted-foreground text-sm tabular-nums md:inline">{{ position + 1 }} of {{ allItems.length }}</span>
          </template>
        </div>
      </header>

      <main class="relative min-h-0 flex-1">
        <div v-show="tab === 'preview'" class="flex size-full justify-center bg-muted/30">
          <iframe
            :key="name"
            :src="withBase(catalog.canvas(name))"
            :title="label"
            class="h-full border-0 bg-background transition-[width] duration-300 ease-out"
            :class="width < 100 && 'border-x'"
            :style="{ width: `${width}%` }"
          />
        </div>

        <div v-if="tab === 'code'" class="size-full p-3 sm:p-4">
          <BlockCode :key="name" class="size-full" :name="name" :folder="catalog.codeFolder" active />
        </div>

        <div v-if="tab === 'install'" class="size-full overflow-auto">
          <div class="mx-auto flex max-w-2xl flex-col gap-4 px-4 py-12">
            <h1 class="font-semibold text-xl tracking-tight">
              Install {{ label }}
            </h1>
            <p class="text-muted-foreground text-sm">
              {{ description }}
            </p>
            <template v-if="!command">
              <p class="rounded-lg border bg-muted/40 px-4 py-3 text-sm">
                Tidak ada yang perlu dipasang — {{ label }} adalah padanan yang sudah disediakan Vue
                sendiri. Cara memakainya ada di
                <a :href="withBase(catalog.docsPage(name))" class="underline underline-offset-4">dokumentasinya</a>.
              </p>
            </template>
            <PackageCommand v-else :command="command" />
            <AddToSetup v-if="command" class="w-fit" :name="kind === 'chart' ? chartSlug(name) : name" />
            <p v-if="command && kind === 'template'" class="text-muted-foreground text-sm">
              Perintah ini memasang komponen yang dipakai template ini. Setelah itu salin
              berkasnya dari tab
              <button type="button" class="underline underline-offset-4" @click="tab = 'code'">Code</button>
              ke project Anda.
            </p>
            <p v-else-if="command" class="text-muted-foreground text-sm">
              Perintah ini menyalin {{ kind === 'hook' ? 'composable' : kind === 'chart' ? 'grafik' : kind === 'variant' ? 'varian' : 'block' }}-nya
              ke project Anda, lengkap dengan komponen yang dipakainya.
            </p>
            <p v-if="command && ['block', 'variant', 'chart'].includes(kind)" class="text-muted-foreground text-sm">
              Cara memakai, {{ kind === 'chart' ? 'bentuk datanya' : kind === 'variant' ? 'props yang dipakainya' : 'data contoh yang perlu diganti' }}, dan Requirements-nya ada di
              <a :href="withBase(catalog.docsPage(name))" class="underline underline-offset-4">dokumentasi {{ label }}</a>.
            </p>
            <p v-if="command" class="text-muted-foreground text-sm">
              Belum ada project? Jalankan <code>npx kliping@latest init</code> dulu —
              <a :href="withBase('/installation')" class="underline underline-offset-4">lihat Installation</a>.
            </p>
          </div>
        </div>

        <div class="absolute right-4 bottom-4 z-10 flex items-center gap-2">
          <div v-if="tab === 'preview'" class="kliping-segmented hidden items-center gap-1 border bg-background p-1 shadow-sm lg:flex">
            <button
              v-for="l in WIDTHS"
              :key="l.n"
              type="button"
              class="flex size-8 items-center justify-center transition-colors"
              :class="width === l.n ? 'bg-pill text-foreground' : 'text-muted-foreground hover:bg-pill hover:text-foreground'"
              :title="l.label"
              :aria-pressed="width === l.n"
              @click="width = l.n"
            >
              <component :is="l.icon" class="size-4" />
              <span class="sr-only">{{ l.label }}</span>
            </button>
          </div>
          <button
            type="button"
            class="flex size-10 items-center justify-center rounded-full border bg-background text-muted-foreground shadow-sm transition-colors hover:bg-pill hover:text-foreground"
            title="Toggle theme"
            @click="isDark = !isDark"
          >
            <!-- Keduanya dirender, CSS yang memilih: server selalu merender versi
                 terang, jadi `v-if="isDark"` membuat halaman gelap tidak cocok
                 saat dihidrasi. -->
            <SunIcon class="hidden size-4 dark:block" />
            <MoonIcon class="size-4 dark:hidden" />
            <span class="sr-only">Toggle theme</span>
          </button>
        </div>
      </main>

      <footer class="grid shrink-0 grid-cols-2 gap-2 border-t p-2">
        <a
          v-if="prev"
          :href="withBase(catalog.detailPage(prev))"
          class="flex min-w-0 items-center gap-3 kliping-card px-4 py-2 no-underline"
        >
          <ChevronLeftIcon class="size-4 shrink-0 text-muted-foreground" />
          <span class="flex min-w-0 flex-col">
            <span class="text-[10px] text-muted-foreground uppercase tracking-widest">Previous</span>
            <span class="truncate font-mono text-sm">{{ catalog.label(prev) }}</span>
          </span>
        </a>
        <span v-else />
        <a
          v-if="next"
          :href="withBase(catalog.detailPage(next))"
          class="col-start-2 flex min-w-0 items-center justify-end gap-3 kliping-card px-4 py-2 text-right no-underline"
        >
          <span class="flex min-w-0 flex-col">
            <span class="text-[10px] text-muted-foreground uppercase tracking-widest">Next</span>
            <span class="truncate font-mono text-sm">{{ catalog.label(next) }}</span>
          </span>
          <ChevronRightIcon class="size-4 shrink-0 text-muted-foreground" />
        </a>
      </footer>
    </div>
  </div>
</template>
