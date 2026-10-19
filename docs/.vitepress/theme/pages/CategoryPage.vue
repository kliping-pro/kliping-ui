<script setup lang="ts">
import type { Component } from 'vue'
import type { CategoryItem } from './CategoryList.vue'
import { PanelLeftIcon } from '@lucide/vue'
import { withBase } from 'vitepress'
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import CategoryList from './CategoryList.vue'

/**
 * Kerangka halaman berkategori — Blocks, Variants, Templates, Hooks, Charts —
 * dengan sidebar kategori di kiri, bergaya Doras UI.
 *
 * Desktop: sidebar mengambang (membulat, berbingkai, berjarak dari tepi) yang
 * menempel saat halaman digulir, dan bisa dilipat jadi deretan ikon lewat
 * tombol di kepalanya atau ⌘/Ctrl+B. Pilihan lipatnya disimpan, jadi tetap sama
 * saat berpindah halaman — dan sama untuk semua halaman berkategori.
 *
 * Layar sempit: sidebar-nya jadi laci yang dibuka dari bilah di atas isi.
 *
 * Tombol cari dirender di kepala sidebar dan, di layar sempit, di kepala laci.
 * Komponen cari mengabaikan pintasan `/` selama tombolnya sendiri tidak
 * terlihat, jadi dua salinannya tidak pernah terbuka bersamaan.
 */
const props = defineProps<{
  /** Judul di kepala sidebar, juga tautan ke halaman All-nya. */
  title: string
  /** Halaman All — tujuan judulnya. */
  homeHref: string
  titleIcon: Component
  items: CategoryItem[]
  /** Nama landmark nav-nya, untuk pembaca layar. */
  label: string
}>()

const STORAGE_KEY = 'kliping:sidebar-category-collapsed'
const collapsed = ref(false)
const drawer = ref(false)

function readCollapsed() {
  try {
    collapsed.value = localStorage.getItem(STORAGE_KEY) === '1'
  }
  catch {}
}

watch(collapsed, (value) => {
  try {
    localStorage.setItem(STORAGE_KEY, value ? '1' : '0')
  }
  catch {}
})

function onKeydown(e: KeyboardEvent) {
  if (!(e.metaKey || e.ctrlKey) || e.altKey || e.key.toLowerCase() !== 'b')
    return
  e.preventDefault()
  collapsed.value = !collapsed.value
}

onMounted(() => {
  readCollapsed()
  window.addEventListener('keydown', onKeydown)
})
onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown))

const iconButton = 'flex size-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground outline-none transition-colors hover:bg-pill hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring'
</script>

<template>
  <div class="flex flex-1 items-start">
    <!-- Desktop: sidebar mengambang. -->
    <div class="sticky top-(--header-height) hidden shrink-0 p-(--frame-gap) pt-1 lg:block">
      <aside
        id="kliping-sidebar-category"
        class="flex h-[calc(100svh-var(--header-height)-var(--frame-gap)-0.25rem)] flex-col overflow-hidden rounded-lg border bg-sidebar text-sidebar-foreground transition-[width] duration-200 ease-out"
        :class="collapsed ? 'w-14' : 'w-64'"
        :data-state="collapsed ? 'collapsed' : 'expanded'"
      >
        <div class="flex shrink-0 gap-1 border-b p-2" :class="collapsed ? 'flex-col items-center' : 'items-center'">
          <a
            v-if="!collapsed"
            :href="withBase(props.homeHref)"
            class="flex min-w-0 flex-1 items-center gap-2.5 rounded-lg px-2 py-1.5 font-semibold text-sm no-underline outline-none hover:bg-pill focus-visible:ring-2 focus-visible:ring-ring"
          >
            <component :is="titleIcon" class="size-4 shrink-0" />
            <span class="truncate">{{ title }}</span>
          </a>
          <slot name="search" />
          <Tooltip>
            <TooltipTrigger as-child>
              <button
                type="button"
                :class="iconButton"
                aria-controls="kliping-sidebar-category"
                :aria-expanded="!collapsed"
                :aria-label="collapsed ? 'Expand sidebar' : 'Collapse sidebar'"
                @click="collapsed = !collapsed"
              >
                <PanelLeftIcon class="size-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">
              {{ collapsed ? 'Expand' : 'Collapse' }} <kbd class="ml-1 font-sans opacity-70">Ctrl B</kbd>
            </TooltipContent>
          </Tooltip>
        </div>

        <nav :aria-label="label" class="scrollbar-none min-h-0 flex-1 overflow-y-auto overflow-x-hidden p-2">
          <CategoryList :items="items" :collapsed="collapsed">
            <template #icon="s">
              <slot name="icon" v-bind="s" />
            </template>
          </CategoryList>
        </nav>
      </aside>
    </div>

    <div class="flex min-w-0 flex-1 flex-col">
      <!-- Layar sempit: bilah pembuka laci kategori. -->
      <div class="flex items-center gap-2 px-6 pt-4 lg:hidden">
        <Sheet v-model:open="drawer">
          <SheetTrigger as-child>
            <button
              type="button"
              class="flex h-9 items-center gap-2 rounded-lg border bg-background px-3 text-sm font-medium shadow-xs outline-none hover:bg-pill focus-visible:ring-2 focus-visible:ring-ring"
            >
              <PanelLeftIcon class="size-4" />
              {{ title }} categories
            </button>
          </SheetTrigger>
          <SheetContent side="left" class="w-72 gap-0 bg-sidebar p-0">
            <SheetHeader class="flex-row items-center gap-2 border-b p-2 pr-12">
              <SheetTitle as-child>
                <a :href="withBase(props.homeHref)" class="flex min-w-0 flex-1 items-center gap-2.5 rounded-lg px-2 py-1.5 font-semibold text-sm no-underline">
                  <component :is="titleIcon" class="size-4 shrink-0" />
                  <span class="truncate">{{ title }}</span>
                </a>
              </SheetTitle>
              <SheetDescription class="sr-only">
                {{ label }}
              </SheetDescription>
              <slot name="search" />
            </SheetHeader>
            <nav :aria-label="label" class="min-h-0 flex-1 overflow-y-auto p-2">
              <CategoryList :items="items" @select="drawer = false">
                <template #icon="s">
                  <slot name="icon" v-bind="s" />
                </template>
              </CategoryList>
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      <slot />
    </div>
  </div>
</template>
