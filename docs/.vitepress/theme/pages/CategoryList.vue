<script setup lang="ts">
import type { Component } from 'vue'
import { ChevronRightIcon } from '@lucide/vue'
import { useRoute, withBase } from 'vitepress'
import { computed, onMounted, ref, watch } from 'vue'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { normalizePath } from '../chrome/navigation'

/**
 * Daftar kategori di sidebar halaman berkategori, bergaya Doras UI: tiap item
 * sebuah pill membulat — ikon, nama, jumlah — yang berlatar pill saat disorot
 * dan saat aktif.
 *
 * Kategori yang punya isi (`children`) adalah collapsible, sama dengan sidebar
 * dokumentasi: kepalanya tetap tautan ke halaman kategorinya, dan tombol
 * chevron di kanannya membuka daftar isinya — tiap isi menautkan ke halaman
 * detailnya. Yang terbuka saat halaman dimuat hanya kategori yang sedang
 * dibuka; pilihan buka-tutup pembaca disimpan per kategori. Server selalu
 * menggambar aturan bawaannya, pilihan pembaca diterapkan setelah terpasang.
 *
 * Terlipat, yang tersisa cuma ikonnya; namanya pindah ke tooltip di kanan dan
 * ke `aria-label`, dan isi kategori tidak ditampilkan.
 */
export interface CategoryItem {
  name: string
  href: string
  count?: number
  /** Isi kategori; `icon` opsional — Hooks memberi tiap composable ikonnya. */
  children?: { name: string, href: string, icon?: Component }[]
}

const props = defineProps<{ items: CategoryItem[], collapsed?: boolean }>()
const emit = defineEmits<{ select: [] }>()

const route = useRoute()

/**
 * Item yang sedang dibuka. Halaman di bawah sebuah kategori — `/blocks/hero/all`
 * di bawah `/blocks/hero` — ikut menyalakan kategorinya. Item paling atas (All,
 * `/blocks`) dikecualikan: semua halaman ada di bawahnya.
 */
function isActive(href: string) {
  const current = normalizePath(route.path)
  const target = normalizePath(href)
  return current === target || (target.split('/').filter(Boolean).length > 1 && current.startsWith(`${target}/`))
}

/** Ada kategori yang bisa dibuka: item tanpa isi diberi ruang chevron kosong, supaya jumlahnya sejajar. */
const hasChildren = computed(() => props.items.some(i => i.children?.length))

const isExact = (href: string) => normalizePath(route.path) === normalizePath(href)
const containsActive = (i: CategoryItem) => isActive(i.href) || (i.children ?? []).some(a => isExact(a.href))

const STORAGE_KEY = 'kliping:sidebar-category-open'
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

function isOpen(i: CategoryItem) {
  return openState.value[i.href] ?? containsActive(i)
}

function setOpen(i: CategoryItem, open: boolean) {
  openState.value = { ...openState.value, [i.href]: open }
}

// Membuka kategori lain membuka daftarnya lagi, meski pernah ditutup pembaca.
watch(() => route.path, () => {
  const i = props.items.find(i => i.children && containsActive(i))
  if (i && openState.value[i.href] === false)
    setOpen(i, true)
})

const itemClass = (highlighted: boolean) => cn(
  'flex items-center gap-3 rounded-lg text-sm no-underline transition-colors duration-150 outline-none',
  'text-sidebar-foreground font-normal hover:bg-pill hover:text-foreground',
  'focus-visible:ring-2 focus-visible:ring-ring',
  props.collapsed ? 'size-10 justify-center' : 'h-9 w-full min-w-0 px-2.5',
  highlighted && 'bg-pill font-medium text-foreground',
)

const childClass = (highlighted: boolean) => cn(
  'flex h-8 w-full min-w-0 items-center gap-2 rounded-lg pr-2.5 pl-9 text-[0.8125rem] no-underline outline-none transition-colors duration-150',
  'text-muted-foreground hover:bg-pill hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring',
  highlighted && 'bg-pill font-medium text-foreground',
)
</script>

<template>
  <ul class="flex flex-col gap-0.5" :class="collapsed && 'items-center'">
    <li v-for="i in items" :key="i.href">
      <Tooltip v-if="collapsed">
        <TooltipTrigger as-child>
          <a
            :href="withBase(i.href)"
            :class="itemClass(isActive(i.href))"
            :aria-current="isActive(i.href) ? 'page' : undefined"
            :aria-label="i.name"
            :data-active="isActive(i.href)"
            @click="emit('select')"
          >
            <span class="flex size-4 shrink-0 items-center justify-center [&>svg]:size-4">
              <slot name="icon" :item="i" />
            </span>
          </a>
        </TooltipTrigger>
        <TooltipContent side="right">
          {{ i.name }}<template v-if="i.count !== undefined"> · {{ i.count }}</template>
        </TooltipContent>
      </Tooltip>

      <Collapsible
        v-else-if="i.children?.length"
        :open="isOpen(i)"
        class="flex flex-col gap-0.5"
        @update:open="setOpen(i, $event)"
      >
        <div class="flex items-center gap-0.5">
          <a
            :href="withBase(i.href)"
            :class="itemClass(isActive(i.href))"
            :aria-current="isActive(i.href) ? 'page' : undefined"
            :data-active="isActive(i.href)"
            @click="emit('select')"
          >
            <span class="flex size-4 shrink-0 items-center justify-center [&>svg]:size-4">
              <slot name="icon" :item="i" />
            </span>
            <span class="min-w-0 flex-1 truncate">{{ i.name }}</span>
            <span v-if="i.count !== undefined" class="shrink-0 text-muted-foreground text-xs tabular-nums in-data-[active=true]:text-foreground">{{ i.count }}</span>
          </a>
          <CollapsibleTrigger
            class="flex size-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground outline-none transition-colors hover:bg-pill hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
            :aria-label="`${isOpen(i) ? 'Collapse' : 'Expand'} ${i.name}`"
          >
            <ChevronRightIcon class="size-4 transition-transform duration-200" :class="isOpen(i) && 'rotate-90'" />
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent class="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
          <ul class="flex flex-col gap-0.5 pb-1.5">
            <li v-for="a in i.children" :key="a.href">
              <a
                :href="withBase(a.href)"
                :class="childClass(isExact(a.href))"
                :aria-current="isExact(a.href) ? 'page' : undefined"
                @click="emit('select')"
              >
                <component :is="a.icon" v-if="a.icon" class="size-4 shrink-0" />
                <span class="truncate">{{ a.name }}</span>
              </a>
            </li>
          </ul>
        </CollapsibleContent>
      </Collapsible>

      <div v-else class="flex items-center gap-0.5">
        <a
          :href="withBase(i.href)"
          :class="itemClass(isActive(i.href))"
          :aria-current="isActive(i.href) ? 'page' : undefined"
          :data-active="isActive(i.href)"
          @click="emit('select')"
        >
          <span class="flex size-4 shrink-0 items-center justify-center [&>svg]:size-4">
            <slot name="icon" :item="i" />
          </span>
          <span class="min-w-0 flex-1 truncate">{{ i.name }}</span>
          <span v-if="i.count !== undefined" class="shrink-0 text-muted-foreground text-xs tabular-nums in-data-[active=true]:text-foreground">{{ i.count }}</span>
        </a>
        <span v-if="hasChildren" class="size-9 shrink-0" aria-hidden="true" />
      </div>
    </li>
  </ul>
</template>
