<script setup lang="ts">
import { MenuIcon } from '@lucide/vue'
import { useData, useRoute, withBase } from 'vitepress'
import { computed, ref, watch } from 'vue'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { flattenMenu } from './main-menu'
import { normalizePath, sidebarFor } from './navigation'

/**
 * Navigasi untuk layar sempit.
 *
 * Isinya sengaja lengkap — nav utama sekaligus seluruh pohon sidebar. Di lebar
 * ini sidebar dokumentasi tidak ikut tampil sama sekali, jadi kalau tidak ada
 * di sini, sebagian besar halaman tidak punya jalan untuk dijangkau.
 */
const { site, theme } = useData()
const route = useRoute()
const open = ref(false)

// Diratakan, bukan digambar sebagai menu turun. Menu turun di nav utama ada
// karena lebarnya terbatas; di sini lebarnya tidak jadi soal, dan satu ketukan
// tambahan untuk membuka kelompok justru membuat halamannya lebih jauh.
const menuLinks = flattenMenu()

// Sidebar dipilih menurut jalur yang sedang dibuka: /hooks punya daftarnya
// sendiri, terpisah dari dokumentasi komponen.
const sidebarGroups = computed(() => sidebarFor(theme.value.sidebar, route.path))

// Menutup sendiri setelah pindah halaman: rutenya berganti tanpa memuat ulang
// dokumen, jadi tanpa ini sheet-nya tetap menutupi halaman yang baru dibuka.
watch(() => route.path, () => (open.value = false))

function isActive(link: string) {
  return normalizePath(link) === normalizePath(route.path)
}
</script>

<template>
  <Sheet v-model:open="open">
    <SheetTrigger as-child>
      <Button variant="ghost" size="icon" class="size-8 rounded-full shadow-none hover:bg-pill">
        <MenuIcon class="size-5" />
        <span class="sr-only">{{ theme.sidebarMenuLabel ?? 'Menu' }}</span>
      </Button>
    </SheetTrigger>

    <SheetContent side="left" class="w-[85vw] max-w-sm p-0">
      <SheetHeader class="border-b p-4">
        <SheetTitle class="text-left text-sm font-semibold">
          {{ site.title }}
        </SheetTitle>
        <SheetDescription class="sr-only">Documentation navigation</SheetDescription>
      </SheetHeader>

      <div class="no-scrollbar h-[calc(100svh-4rem)] overflow-y-auto px-4 pb-12">
        <nav class="flex flex-col gap-1 py-4">
          <a
            v-for="entry in menuLinks"
            :key="entry.link"
            :href="withBase(entry.link)"
            class="text-sm font-medium no-underline"
            :class="isActive(entry.link) ? 'text-foreground' : 'text-muted-foreground'"
          >
            {{ entry.text }}
          </a>
        </nav>

        <div v-for="group in sidebarGroups" :key="group.text" class="flex flex-col gap-2 border-t py-4">
          <p class="text-muted-foreground text-xs font-medium">
            {{ group.text }}
          </p>
          <a
            v-for="child in group.items"
            :key="child.link"
            :href="withBase(child.link!)"
            class="text-[0.8rem] no-underline"
            :class="isActive(child.link!) ? 'text-foreground font-medium' : 'text-muted-foreground'"
          >
            {{ child.text }}
          </a>
        </div>
      </div>
    </SheetContent>
  </Sheet>
</template>
