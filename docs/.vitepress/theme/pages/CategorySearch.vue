<script setup lang="ts">
import type { Component } from 'vue'
import { LayoutGridIcon, SearchIcon } from '@lucide/vue'
import { useRouter, withBase } from 'vitepress'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command'

/**
 * Pencarian kepala sidebar untuk halaman berkategori yang tidak butuh
 * pencarian khusus — Templates dan Charts. Bentuk dan perilakunya sama dengan
 * BlockSearch, VariantSearch, dan HooksSearch: kategori dulu, lalu isinya beserta
 * keterangannya, dan pintasan `/`.
 */
export interface SearchEntry {
  name: string
  href: string
  description?: string
  count?: number
}

const props = defineProps<{
  /** "templates", "charts" — dipakai di label dan placeholder. */
  noun: string
  categories: SearchEntry[]
  /** Judul kelompok kedua dan isinya. */
  itemsHeading: string
  items: SearchEntry[]
  itemIcon: Component
}>()

const open = ref(false)
// Salinan yang tombolnya tidak terlihat (sidebar desktop di layar sempit, atau
// sebaliknya) tidak ikut menjawab `/`.
const trigger = ref<HTMLButtonElement>()
const router = useRouter()

function go(destination: string) {
  open.value = false
  router.go(withBase(destination))
}

function onKeydown(e: KeyboardEvent) {
  if (!trigger.value?.offsetParent)
    return
  const target = e.target as HTMLElement | null
  if (e.key !== '/' || e.metaKey || e.ctrlKey || e.altKey)
    return
  if (target && (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)))
    return
  e.preventDefault()
  open.value = true
}

// Fase capture: berjalan sebelum pintasan `/` kotak cari dokumentasi di header,
// yang melewati event yang sudah ditandai `preventDefault` di sini.
onMounted(() => window.addEventListener('keydown', onKeydown, { capture: true }))
onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown, { capture: true }))
</script>

<template>
  <button
    ref="trigger"
    type="button"
    class="flex size-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground outline-none transition-colors hover:bg-pill hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
    :aria-label="`Search ${props.noun}`"
    :title="`Search ${props.noun} ( / )`"
    @click="open = true"
  >
    <SearchIcon class="size-4" />
  </button>

  <CommandDialog
    v-model:open="open"
    :title="`Search ${props.noun}`"
    :description="`Search a category or one of the ${props.noun} and open its page.`"
  >
    <CommandInput :placeholder="`Search categories or ${props.noun}…`" />
    <CommandList class="max-h-[min(60vh,420px)]">
      <CommandEmpty>No results found.</CommandEmpty>

      <CommandGroup heading="Categories">
        <CommandItem
          v-for="k in props.categories"
          :key="k.href"
          :value="`category-${k.name}`"
          @select="go(k.href)"
        >
          <LayoutGridIcon class="size-4 text-muted-foreground" />
          <span>{{ k.name }}</span>
          <CommandShortcut v-if="k.count !== undefined">
            {{ k.count }} {{ props.noun }}
          </CommandShortcut>
        </CommandItem>
      </CommandGroup>

      <CommandSeparator />

      <CommandGroup :heading="props.itemsHeading">
        <CommandItem
          v-for="i in props.items"
          :key="`${i.href}-${i.name}`"
          :value="`${i.name} ${i.description ?? ''}`"
          @select="go(i.href)"
        >
          <component :is="props.itemIcon" class="size-4 text-muted-foreground" />
          <span class="shrink-0 font-medium text-sm">{{ i.name }}</span>
          <span class="truncate text-muted-foreground">{{ i.description }}</span>
        </CommandItem>
      </CommandGroup>
    </CommandList>
  </CommandDialog>
</template>
