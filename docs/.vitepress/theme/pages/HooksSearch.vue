<script setup lang="ts">
import { SearchIcon } from '@lucide/vue'
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
import { hookCategories, categorySlug } from '../hooks'
import HooksIcon from '../HooksIcon.vue'
import { hookIcon } from '../hook-icons'

/**
 * Pencarian di halaman Hooks, padanan BlockSearch.
 *
 * Isinya kategori, lalu tiap composable beserta keterangannya — orang lebih
 * sering ingat "menunda sampai berhenti mengetik" daripada `useDebounce`.
 * Memilih composable langsung membuka halamannya.
 */
const hookList = hookCategories.flatMap(k => k.items.map(i => ({ ...i, category: k.name })))

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
    aria-label="Search composables"
    title="Search composables ( / )"
    @click="open = true"
  >
    <SearchIcon class="size-4" />
  </button>

  <CommandDialog
    v-model:open="open"
    title="Search composables"
    description="Search a category or composable and open its page."
  >
    <CommandInput placeholder="Search categories or composables…" />
    <CommandList class="max-h-[min(60vh,420px)]">
      <CommandEmpty>No results found.</CommandEmpty>

      <CommandGroup heading="Categories">
        <CommandItem
          v-for="k in hookCategories"
          :key="k.href"
          :value="`category-${k.name}`"
          @select="go(k.href)"
        >
          <HooksIcon :name="categorySlug(k.name)" class="size-4 text-muted-foreground" />
          <span>{{ k.name }}</span>
          <CommandShortcut>{{ k.items.length }} composables</CommandShortcut>
        </CommandItem>
      </CommandGroup>

      <CommandSeparator />

      <CommandGroup heading="Composables">
        <CommandItem
          v-for="i in hookList"
          :key="i.name"
          :value="`${i.title} ${i.name} ${i.description ?? ''}`"
          @select="go(`/hooks/${i.name}`)"
        >
          <component :is="hookIcon(i.name)" class="size-4 text-muted-foreground" />
          <span class="shrink-0 font-mono text-xs">{{ i.title }}</span>
          <span class="truncate text-muted-foreground">{{ i.description ?? i.category }}</span>
        </CommandItem>
      </CommandGroup>
    </CommandList>
  </CommandDialog>
</template>
