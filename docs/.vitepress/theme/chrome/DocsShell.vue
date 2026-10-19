<script setup lang="ts">
import { ArrowUpRightIcon } from '@lucide/vue'
import { Content, useData, useRoute, withBase } from 'vitepress'
import { Badge } from '@/components/ui/badge'
import { SidebarProvider } from '@/components/ui/sidebar'
import AddToSetup from '../AddToSetup.vue'
import DocsCopyPage from './DocsCopyPage.vue'
import DocsPager from './DocsPager.vue'
import DocsSidebar from './DocsSidebar.vue'
import DocsToc from './DocsToc.vue'
import { computed } from 'vue'
import { variantCount } from '@/lib/variants'
import { normalizePath } from './navigation'

/**
 * Kerangka halaman dokumentasi.
 *
 * Tiga kolom, dan yang menentukan lebarnya adalah layar — bukan sebuah nilai
 * maksimum yang memusatkan semuanya. Sidebar menempel di kiri, daftar isi di
 * kanan, dan kolom prosa di tengah tetap dibatasi `max-w-160` supaya barisnya
 * enak dibaca. Ini yang membedakannya dari tema bawaan VitePress, yang mengunci
 * seluruh isi halaman pada satu lebar lalu memusatkannya.
 *
 * Judul dan deskripsi digambar di sini, bukan disisipkan ke markdown. Itu yang
 * memungkinkan tombol sebelumnya/berikutnya duduk sebaris dengan judulnya.
 */
const { page, frontmatter } = useData()

/**
 * Halaman komponen yang punya varian menautkannya di kepala halaman.
 *
 * Nama komponennya diambil dari rutenya — `/components/button` — bukan dari
 * frontmatter, supaya tautannya muncul dan hilang sendiri mengikuti isi
 * `variasi.json`.
 */
const route = useRoute()

const currentComponent = computed(() => {
  const match = normalizePath(route.path).match(/^\/components\/([\w-]+)$/)
  return match?.[1] ?? ''
})

/**
 * Item registry yang diwakili halaman ini: segmen terakhir rutenya —
 * `/components/button`, `/hooks/use-boolean`, `/blocks/docs/hero-01`.
 * AddToSetup sendiri yang memastikan namanya memang item registry.
 */
const registryItem = computed(() => normalizePath(route.path).split('/').filter(Boolean).at(-1) ?? '')

const variantTotal = computed(() => (currentComponent.value ? variantCount(currentComponent.value) : 0))

/**
 * Judul yang dipotong di batas katanya sendiri.
 *
 * Nama composable seperti `useDeepCompareLayoutEffect` adalah satu kata tanpa
 * titik patah, jadi di layar ponsel ia mendorong halaman melebar. Memecahnya di
 * huruf mana saja menghasilkan `useDeepCompareLa / youtEffect`; memecahnya di
 * batas camelCase — dan sebelum titik, untuk `components.json` — tetap bisa
 * dibaca. Potongannya disambung lagi dengan `<wbr>`, jadi teksnya tidak berubah.
 *
 * Hanya untuk judul satu kata. Judul berspasi sudah punya titik patahnya, dan
 * `<wbr>` di sana malah bisa menghasilkan `TanStack` yang patah jadi `Tan / Stack`.
 */
const titleParts = computed(() => {
  const title = String(frontmatter.value.title ?? page.value.title ?? '')
  return /\s/.test(title) ? [title] : title.split(/(?<=[a-z\d])(?=[A-Z])|(?<=\w)(?=\.\w)/)
})
</script>

<template>
  <div class="container-wrapper flex flex-1 flex-col px-2">
    <SidebarProvider
      class="min-h-min flex-1 items-start px-0 [--top-spacing:0] lg:grid lg:grid-cols-[var(--sidebar-width)_minmax(0,1fr)] lg:[--top-spacing:calc(var(--spacing)*4)]"
      :style="{ '--sidebar-width': 'calc(var(--spacing) * 72)' }"
    >
      <DocsSidebar />

      <div class="h-full w-full">
        <div
          data-slot="docs"
          class="flex scroll-mt-24 items-stretch pb-8 text-[1.05rem] sm:text-[15px] xl:w-full"
        >
          <div class="flex min-w-0 flex-1 flex-col">
            <div class="h-(--top-spacing) shrink-0" />

            <div class="text-foreground mx-auto flex w-full max-w-160 min-w-0 flex-1 flex-col gap-6 px-4 py-6 md:px-0 lg:py-8">
              <div class="flex flex-col gap-2">
                <!-- Di bawah `sm` hanya ada dua tombol ikon. Judul yang tidak
                     muat bersanding dengannya mengambil satu baris penuh, dan
                     tombolnya turun ke baris berikutnya — rata kanan, tempat
                     yang sama seperti saat sebaris. Dari `sm` ke atas
                     barisnya tetap satu dan judulnya yang patah; jarak
                     minimumnya dilepas di sana supaya judul yang dulu pas
                     sebaris (`useDeepCompareLayoutEffect` di desktop) tetap
                     sebaris. -->
                <div class="flex flex-wrap items-center justify-between gap-x-2 gap-y-3 sm:flex-nowrap sm:gap-x-0 md:items-start">
                  <h1 class="min-w-0 scroll-m-24 text-3xl font-semibold tracking-tight wrap-break-word">
                    <template v-for="(part, i) in titleParts" :key="i"><wbr v-if="i">{{ part }}</template>
                  </h1>
                  <div class="docs-nav ml-auto flex shrink-0 items-center gap-2">
                    <AddToSetup v-if="registryItem" :name="registryItem" />
                    <div class="hidden sm:block">
                      <DocsCopyPage />
                    </div>
                    <DocsPager variant="icon" />
                  </div>
                </div>
                <p
                  v-if="frontmatter.description"
                  class="text-muted-foreground text-[1.05rem] sm:text-base sm:text-balance md:max-w-[80%]"
                >
                  {{ frontmatter.description }}
                </p>

                <!-- Tautan ke variannya, kalau komponen ini punya.
                     Dihitung dari rutenya, bukan dituliskan di frontmatter tiap
                     halaman: dua puluh tujuh halaman berarti dua puluh tujuh
                     tempat yang harus disunting bersamaan setiap kali ada varian
                     yang bertambah, dan yang terlupa tidak akan mengeluh. -->
                <div v-if="variantTotal" class="flex items-center space-x-2 pt-4">
                  <Badge as-child variant="secondary">
                    <a :href="withBase(`/variants/${currentComponent}`)">
                      View {{ variantTotal }} variants <ArrowUpRightIcon />
                    </a>
                  </Badge>
                </div>

                <!-- Tautan ke dokumentasi primitif di baliknya. Empat puluh
                     empat halaman komponen menyebutkannya di frontmatter, dan
                     sampai sekarang tidak ada yang menggambarnya. -->
                <div v-if="frontmatter.links" class="flex items-center space-x-2 pt-4">
                  <Badge v-if="frontmatter.links.doc" as-child variant="secondary">
                    <a :href="frontmatter.links.doc" target="_blank" rel="noreferrer">
                      Docs <ArrowUpRightIcon />
                    </a>
                  </Badge>
                  <Badge v-if="frontmatter.links.api" as-child variant="secondary">
                    <a :href="frontmatter.links.api" target="_blank" rel="noreferrer">
                      API Reference <ArrowUpRightIcon />
                    </a>
                  </Badge>
                </div>
              </div>

              <!-- Daftar isi berbentuk menu, untuk lebar yang tidak muat
                   menampung kolom di kanan. -->
              <DocsToc variant="menu" class="w-fit xl:hidden" />

              <Content class="vp-doc w-full flex-1" />
            </div>

            <!-- Dua kolom sama lebar untuk kartu sebelum/berikutnya. Kartu
                 berikutnya tetap di kolom kanan walau yang sebelumnya tidak ada. -->
            <div class="mx-auto grid w-full max-w-160 grid-cols-2 gap-4 px-4 py-6 md:px-0">
              <DocsPager />
            </div>
          </div>

          <div class="sticky top-[calc(var(--header-height)+1px)] z-30 ml-auto hidden h-[calc(100svh-var(--header-height)-var(--footer-height))] w-72 flex-col gap-4 overflow-hidden overscroll-none pb-8 xl:flex">
            <div class="h-(--top-spacing) shrink-0" />
            <div class="no-scrollbar overflow-y-auto px-8">
              <DocsToc />
              <div class="h-12" />
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  </div>
</template>
