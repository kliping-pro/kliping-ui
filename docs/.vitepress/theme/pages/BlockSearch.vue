<script setup lang="ts">
import { LayoutGridIcon, PanelsTopLeftIcon, SearchIcon } from '@lucide/vue'
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
import { blocks, blockCount, blockCategories } from '@/lib/blocks'

/**
 * Pencarian di halaman Blocks, padanan VariantSearch.
 *
 * Isinya kategori, lalu tiap block beserta keterangannya — orang lebih sering
 * ingat "login dengan gambar di samping" daripada `login-04`. Memilih block
 * membuka halaman detailnya.
 */
const categories = blockCategories.filter(k => k.href !== '/blocks/featured')
const count = blockCount
const blockList = blocks

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
    aria-label="Search blocks"
    title="Search blocks ( / )"
    @click="open = true"
  >
    <SearchIcon class="size-4" />
  </button>

  <CommandDialog
    v-model:open="open"
    title="Search blocks"
    description="Search a category or block and open its page."
  >
    <CommandInput placeholder="Search categories or blocks…" />
    <CommandList class="max-h-[min(60vh,420px)]">
      <CommandEmpty>No results found.</CommandEmpty>

      <CommandGroup heading="Categories">
        <CommandItem
          v-for="k in categories"
          :key="k.href"
          :value="`category-${k.href}`"
          @select="go(k.href)"
        >
          <LayoutGridIcon class="size-4 text-muted-foreground" />
          <span>{{ k.name }}</span>
          <CommandShortcut>{{ count(k.href) }} blocks</CommandShortcut>
        </CommandItem>
      </CommandGroup>

      <CommandSeparator />

      <CommandGroup heading="Blocks">
        <CommandItem
          v-for="b in blockList"
          :key="b.name"
          :value="b.name"
          @select="go(`/blocks/${b.name}`)"
        >
          <PanelsTopLeftIcon class="size-4 text-muted-foreground" />
          <span class="shrink-0 font-mono text-xs">{{ b.name }}</span>
          <span class="truncate text-muted-foreground">{{ b.description }}</span>
        </CommandItem>
      </CommandGroup>
    </CommandList>
  </CommandDialog>
</template>
