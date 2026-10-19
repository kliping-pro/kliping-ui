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
import { variantCount, componentTitle, variantComponents, allVariants } from '@/lib/variants'
import VariantIcon from '../VariantIcon.vue'

/**
 * Pencarian di halaman Variasi, untuk lompat langsung ke satu komponen atau
 * satu varian tanpa menggeser deretan kategori.
 *
 * Isinya dua kelompok: komponennya, lalu seluruh variannya. Varian ikut dicari
 * lewat keterangannya — orang lebih sering ingat "tombol dengan ikon di kiri"
 * daripada `button-07`. Memilih varian membuka halaman detailnya; memilih
 * komponen membuka grid-nya. Daftarnya digulir di dalam dialog, bukan dipotong.
 *
 * Pintasannya `/`, bukan Ctrl K: Ctrl K sudah milik pencarian dokumentasi.
 */
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
    aria-label="Search variants"
    title="Search variants ( / )"
    @click="open = true"
  >
    <SearchIcon class="size-4" />
  </button>

  <CommandDialog
    v-model:open="open"
    title="Search variants"
    description="Search a component or variant and open its page."
  >
    <CommandInput placeholder="Search components or variants…" />
    <CommandList class="max-h-[min(60vh,420px)]">
      <CommandEmpty>No results found.</CommandEmpty>

      <CommandGroup heading="Components">
        <CommandItem
          v-for="k in variantComponents"
          :key="k"
          :value="`component-${k}`"
          @select="go(`/variants/${k}`)"
        >
          <VariantIcon :name="k" class="size-4 text-muted-foreground" />
          <span>{{ componentTitle(k) }}</span>
          <CommandShortcut>{{ variantCount(k) }} variants</CommandShortcut>
        </CommandItem>
      </CommandGroup>

      <CommandSeparator />

      <CommandGroup heading="Variants">
        <CommandItem
          v-for="v in allVariants"
          :key="v.name"
          :value="v.name"
          @select="go(`/variants/${v.name}`)"
        >
          <VariantIcon :name="v.component" class="size-4 text-muted-foreground" />
          <span class="shrink-0 font-mono text-xs">{{ v.name }}</span>
          <span class="truncate text-muted-foreground">{{ v.description }}</span>
        </CommandItem>
      </CommandGroup>
    </CommandList>
  </CommandDialog>
</template>
