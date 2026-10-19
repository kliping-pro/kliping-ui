<script setup lang="ts">
import type { DefaultTheme } from 'vitepress'
import type { Component } from 'vue'
import {
  BookOpenIcon,
  BracesIcon,
  ChartAreaIcon,
  ChevronRightIcon,
  ComponentIcon,
  DownloadIcon,
  EllipsisIcon,
  FileTextIcon,
  LayoutGridIcon,
  LayoutTemplateIcon,
  MoonIcon,
  PackageIcon,
  ShapesIcon,
  WrenchIcon,
} from '@lucide/vue'
import { useData, useRoute, withBase } from 'vitepress'
import { computed, onMounted, ref, watch } from 'vue'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import BlockIcon from '../BlockIcon.vue'
import ChartIcon from '../ChartIcon.vue'
import HooksIcon from '../HooksIcon.vue'
import VariantIcon from '../VariantIcon.vue'
import { hookIcon } from '../hook-icons'
import { normalizePath, sidebarFor } from './navigation'

/**
 * Sidebar dokumentasi, bergaya Doras UI.
 *
 * Panel mengambang yang membulat dan berbingkai, sama dengan sidebar halaman
 * berkategori. Tiap kelompok adalah sebuah collapsible: kepalanya pill berikon
 * — di Hooks, kepala itu tautan ke halaman kategorinya — dengan tombol chevron
 * di kanannya untuk membuka dan menutup isinya.
 *
 * Yang terbuka saat halaman dimuat hanya kelompok yang berisi halaman aktif.
 * Pilihan buka-tutup pembaca disimpan per kelompok, jadi tidak diulang saat
 * berpindah halaman. Saat render di server pilihan itu belum terbaca; yang
 * digambar cuma aturan bawaannya, lalu pilihan pembaca diterapkan setelah
 * terpasang.
 *
 * `collapsible="none"` milik Sidebar dipakai karena lipatan panelnya urusan
 * layar sempit, dan layar sempit sudah ditangani MobileNav.
 */
interface SidebarGroup extends DefaultTheme.SidebarItem {
  /** Halaman kategori kelompok ini (Hooks), di luar urutan pager. */
  categoryLink?: string
}

const { theme } = useData()
const route = useRoute()

const groups = computed(() => sidebarFor(theme.value.sidebar, route.path) as SidebarGroup[])
/**
 * Bagian dokumentasi yang sedang dibuka. Tiap modul Browse punya dokumentasinya
 * sendiri dengan bentuk yang sama dengan Hooks; `categoryIcon` adalah ikon kategori
 * galerinya, dipakai di kepala kelompoknya.
 */
const SECTIONS = [
  { prefix: '/hooks', title: 'Hooks', icon: BracesIcon, href: '/hooks/introduction', categoryIcon: HooksIcon },
  { prefix: '/blocks/docs', title: 'Blocks', icon: LayoutGridIcon, href: '/blocks/docs', categoryIcon: BlockIcon },
  { prefix: '/variants/docs', title: 'Variants', icon: ShapesIcon, href: '/variants/docs', categoryIcon: VariantIcon },
  { prefix: '/charts/docs', title: 'Charts', icon: ChartAreaIcon, href: '/charts/docs', categoryIcon: ChartIcon },
  { prefix: '/templates/docs', title: 'Templates', icon: LayoutTemplateIcon, href: '/templates/docs', categoryIcon: BlockIcon },
] as const

const currentSection = computed(() => SECTIONS.find(b => normalizePath(route.path).startsWith(b.prefix)))
const sectionKind = computed(() => currentSection.value?.prefix === '/hooks' ? 'hooks' : currentSection.value ? 'gallery' : 'docs')

const header = computed(() => currentSection.value ?? { title: 'Docs', icon: BookOpenIcon, href: '/introduction' })

/**
 * Ikon kepala kelompok. Hooks memakai ikon kategorinya dari namanya; galeri
 * lain dari slug halaman kategorinya (`categoryLink`); Getting Started sebuah
 * bendera; kelompok dokumentasi umum dari `DOCS_ICONS`.
 */
function groupIcon(k: SidebarGroup): { icon: Component, name?: string } {
  if (sectionKind.value === 'hooks')
    return { icon: HooksIcon, name: slug(k.text!) }
  if (sectionKind.value === 'gallery')
    return k.categoryLink ? { icon: currentSection.value!.categoryIcon, name: k.categoryLink.split('/').pop() } : { icon: HooksIcon, name: 'getting-started' }
  return { icon: DOCS_ICONS[k.text!] ?? BookOpenIcon }
}

/** Ikon kelompok Docs; kelompok Hooks memakai ikon kategorinya sendiri. */
const DOCS_ICONS: Record<string, Component> = {
  'Sections': BookOpenIcon,
  'Installation': DownloadIcon,
  'Dark Mode': MoonIcon,
  'Forms': FileTextIcon,
  'Registry': PackageIcon,
  'Utilities': WrenchIcon,
  'More': EllipsisIcon,
  'Components': ComponentIcon,
}

const slug = (text: string) => text.toLowerCase().replace(/\s+/g, '-')

function isActive(link?: string) {
  return !!link && normalizePath(link) === normalizePath(route.path)
}

const containsActive = (k: SidebarGroup) => isActive(k.categoryLink) || (k.items ?? []).some(i => isActive(i.link))

const STORAGE_KEY = 'kliping:sidebar-docs-open'
const openState = ref<Record<string, boolean>>({})

onMounted(() => {
  try {
    openState.value = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}')
  }
  catch {}
})

watch(openState, (value) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
  }
  catch {}
}, { deep: true })

const groupKey = (k: SidebarGroup) => `${header.value.title}:${k.text}`

function isOpen(k: SidebarGroup) {
  // Kelompok yang berisi halaman aktif selalu terbuka saat dibuka: pembaca
  // harus bisa melihat di mana dia berada.
  if (containsActive(k))
    return openState.value[groupKey(k)] ?? true
  return openState.value[groupKey(k)] ?? false
}

function setOpen(k: SidebarGroup, open: boolean) {
  openState.value = { ...openState.value, [groupKey(k)]: open }
}

// Pindah halaman ke kelompok lain membuka kelompok itu lagi, meski sebelumnya
// ditutup pembaca.
watch(() => route.path, () => {
  const k = groups.value.find(containsActive)
  if (k && openState.value[groupKey(k)] === false)
    setOpen(k, true)
})

const pill = 'h-9 rounded-lg px-2.5 text-sm font-normal text-sidebar-foreground transition-colors duration-150 hover:bg-pill hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring data-[active=true]:bg-pill data-[active=true]:font-medium data-[active=true]:text-foreground'
</script>

<template>
  <div class="sticky top-(--header-height) z-30 hidden h-[calc(100svh-var(--header-height))] shrink-0 p-(--frame-gap) pt-1 pl-[calc(var(--frame-gap)-var(--wrapper-padding))] lg:block">
    <Sidebar
      class="h-full w-64 overflow-hidden overscroll-none rounded-lg border bg-sidebar"
      collapsible="none"
    >
      <div class="flex shrink-0 items-center border-b p-2">
        <a
          :href="withBase(header.href)"
          class="flex min-w-0 flex-1 items-center gap-2.5 rounded-lg px-2 py-1.5 font-semibold text-sm no-underline outline-none hover:bg-pill focus-visible:ring-2 focus-visible:ring-ring"
        >
          <component :is="header.icon" class="size-4 shrink-0" />
          <span class="truncate">{{ header.title }}</span>
        </a>
      </div>
      <SidebarContent class="scroll-fade scrollbar-none overflow-x-hidden p-2">
        <SidebarMenu class="gap-0.5">
          <!-- `as-child`: kelompoknya sendiri satu <li>, supaya <ul> hanya
               berisi <li> (pembaca layar mengumumkan jumlah butir dengan benar). -->
          <Collapsible
            v-for="group in groups"
            :key="group.text"
            as-child
            :open="isOpen(group)"
            @update:open="setOpen(group, $event)"
          >
            <SidebarMenuItem class="flex flex-col gap-0.5">
              <div class="flex items-center gap-0.5">
                <!-- Kepala kelompok: tautan ke halaman kategorinya kalau ada,
                     kalau tidak seluruh barisnya pembuka. -->
                <SidebarMenuButton
                  v-if="group.categoryLink"
                  as-child
                  :is-active="isActive(group.categoryLink)"
                  :class="[pill, 'min-w-0 flex-1 font-medium']"
                >
                  <a :href="withBase(group.categoryLink)" :aria-current="isActive(group.categoryLink) ? 'page' : undefined">
                    <component :is="groupIcon(group).icon" :name="groupIcon(group).name" class="size-4 shrink-0" />
                    <span class="truncate">{{ group.text }}</span>
                    <span class="ml-auto text-muted-foreground text-xs tabular-nums">{{ group.items?.length }}</span>
                  </a>
                </SidebarMenuButton>
                <CollapsibleTrigger v-else as-child>
                  <SidebarMenuButton :class="[pill, 'min-w-0 flex-1 font-medium']">
                    <component :is="groupIcon(group).icon" :name="groupIcon(group).name" class="size-4 shrink-0" />
                    <span class="truncate">{{ group.text }}</span>
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleTrigger
                  class="flex size-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground outline-none transition-colors hover:bg-pill hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
                  :aria-label="`${isOpen(group) ? 'Collapse' : 'Expand'} ${group.text}`"
                >
                  <ChevronRightIcon class="size-4 transition-transform duration-200" :class="isOpen(group) && 'rotate-90'" />
                </CollapsibleTrigger>
              </div>
              <CollapsibleContent class="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                <ul class="flex flex-col gap-0.5 pb-2 pl-4">
                  <SidebarMenuItem v-for="item in group.items" :key="item.link">
                    <SidebarMenuButton
                      as-child
                      :is-active="isActive(item.link)"
                      :class="pill"
                    >
                      <a :href="withBase(item.link!)" :aria-current="isActive(item.link) ? 'page' : undefined">
                        <component :is="hookIcon(item.link!)" v-if="sectionKind === 'hooks'" class="size-4 shrink-0" />
                        <span class="truncate">{{ item.text }}</span>
                        <span v-if="(item as any).isNew" class="ml-auto flex size-2 shrink-0 rounded-full bg-green-500" title="New" />
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </ul>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  </div>
</template>
