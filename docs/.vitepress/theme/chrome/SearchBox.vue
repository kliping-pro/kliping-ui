<script setup lang="ts">
import { SearchIcon } from '@lucide/vue'
import { useData } from 'vitepress'
import { computed, defineAsyncComponent, onMounted, onUnmounted, ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Kbd } from '@/components/ui/kbd'

/**
 * Kotak pencarian bawaan VitePress, dibungkus tombol bergaya Kliping.
 *
 * Yang diganti cuma pemicunya. Mesin pencarinya sendiri — indeks yang ikut
 * dibangun, MiniSearch, dan penyorotan hasilnya — tetap milik VitePress, jadi
 * pencarian tetap berjalan di sisi pembaca tanpa menghubungi layanan luar.
 *
 * Dimuat malas: modalnya membawa serta MiniSearch dan mark.js, dan pembaca yang
 * tidak pernah menekan tombolnya tidak perlu ikut mengunduhnya.
 */
const LocalSearchBox = defineAsyncComponent(
  () => import('vitepress/dist/client/theme-default/components/VPLocalSearchBox.vue'),
)

const { theme } = useData()
const open = ref(false)
const mac = ref(false)

const label = computed(() => theme.value.search?.options?.translations?.button?.buttonText ?? 'Search')

function onShortcut(e: KeyboardEvent) {
  // Halaman yang punya pencarian sendiri (Blocks, Variants, Hooks) memakai `/`
  // untuk dialognya, dan menandai event-nya lebih dulu. Dua dialog yang terbuka
  // bersamaan saling merebut fokus tanpa henti dan membekukan tab.
  if (e.defaultPrevented)
    return
  const target = e.target as HTMLElement | null
  const isTyping = target?.isContentEditable
    || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target?.tagName ?? '')

  if ((e.key.toLowerCase() === 'k' && (e.metaKey || e.ctrlKey)) || (!isTyping && e.key === '/')) {
    e.preventDefault()
    open.value = true
  }
}

onMounted(() => {
  mac.value = /Mac|iPhone|iPod|iPad/i.test(navigator.platform)
  window.addEventListener('keydown', onShortcut)
})

onUnmounted(() => window.removeEventListener('keydown', onShortcut))
</script>

<template>
  <Button
    variant="outline"
    size="sm"
    class="@container text-muted-foreground h-8 w-full min-w-0 shrink justify-start gap-2 rounded-lg px-2.5 font-normal shadow-none md:w-52 lg:w-56 xl:w-64"
    @click="open = true"
  >
    <SearchIcon class="size-4 shrink-0" />
    <!-- Lebar tombolnya tidak selalu sebesar kelasnya: header yang sesak
         menyusutkannya. Label pendek dipilih menurut lebar tombol yang
         sebenarnya, bukan lebar layar, supaya tidak terpotong di tengah kata.
         Sesempit-sempitnya — nav di tengah memakan ruangnya di sekitar 1024px —
         yang tersisa cuma ikonnya; namanya tetap ada lewat aria-label. -->
    <!-- Nama yang dibaca pembaca layar = teks yang terlihat (WCAG "label in
         name"); saat hanya ikon yang tampil, teks sr-only ini yang dibaca. -->
    <span class="sr-only @min-[6rem]:hidden">{{ label }} docs</span>
    <span class="truncate @max-[6rem]:hidden @min-[14rem]:hidden">{{ label }}…</span>
    <span class="hidden truncate @min-[14rem]:inline">{{ label }} docs…</span>
    <Kbd aria-hidden="true" class="ml-auto hidden @min-[10rem]:md:inline-flex">{{ mac ? '⌘' : 'Ctrl' }} K</Kbd>
  </Button>

  <!-- Modalnya menggambar latar dan perangkap fokusnya sendiri, jadi tidak
       dibungkus apa pun di sini. -->
  <LocalSearchBox v-if="open" @close="open = false" />
</template>
