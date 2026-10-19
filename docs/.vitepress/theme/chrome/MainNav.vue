<script setup lang="ts">
import type { MenuEntry } from './main-menu'
import { useRoute, withBase } from 'vitepress'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'
import { mainMenu } from './main-menu'
import { normalizePath } from './navigation'

/**
 * Nav utama di header: mega menu, pola NavigationMenu shadcn.
 *
 * Home, Components, dan Browse membuka panel; Docs, Directory, Colors, dan
 * Typeset tautan biasa. Pemicu dan tautannya pill seperti item sidebar:
 * membulat `rounded-lg`, berlatar pill saat disorot, saat panelnya terbuka,
 * dan saat bagian situs itu sedang dibuka.
 *
 * Panelnya meniru mega menu shadcn.io: membentang selebar header, berisi
 * kisi kartu tiga kolom (`.kliping-card`, pola kartu yang sama dengan seluruh
 * situs). `:viewport="false"` dipakai supaya tiap panel milik pemicunya
 * sendiri; posisinya dipindah ke header lewat root dan item yang `static`.
 */
const route = useRoute()

/** HomePage hanya aktif di beranda; yang lain juga untuk halaman di bawahnya. */
function isActive(href: string) {
  const target = normalizePath(href)
  const current = normalizePath(route.path)
  return target === '/' ? current === '/' : current === target || current.startsWith(`${target}/`)
}

function isEntryActive(e: MenuEntry) {
  if (e.kind === 'link')
    return isActive(e.href)
  if (e.kind === 'home')
    return isActive('/')
  return e.items.some(i => isActive(i.href))
}

const pill = 'h-8 rounded-lg bg-transparent px-2.5 text-sm font-normal text-muted-foreground transition-colors hover:bg-pill hover:text-foreground focus:bg-pill focus-visible:ring-2 focus-visible:ring-ring data-[state=open]:bg-pill data-[state=open]:text-foreground data-[state=open]:hover:bg-pill data-[state=open]:focus:bg-pill'
const highlighted = 'bg-pill font-medium text-foreground'

// Bawaan NavigationMenuContent tanpa viewport adalah popover kecil di bawah
// pemicunya. Di sini ia jadi panel penuh: menempel di bawah header, dari tepi
// kiri ke kanan, berlatar halaman, dipisah garis dan bayangan dari isi di
// bawahnya. Kelasnya ditulis dengan varian yang sama dengan bawaannya supaya
// tailwind-merge menggantinya, bukan menumpuknya.
const panel = cn(
  'md:right-0 md:left-0 md:w-auto p-0',
  'group-data-[viewport=false]/navigation-menu:mt-0 group-data-[viewport=false]/navigation-menu:rounded-none',
  'group-data-[viewport=false]/navigation-menu:border-0 group-data-[viewport=false]/navigation-menu:border-b',
  'group-data-[viewport=false]/navigation-menu:bg-background group-data-[viewport=false]/navigation-menu:shadow-lg',
  'group-data-[viewport=false]/navigation-menu:data-[state=open]:zoom-in-100 group-data-[viewport=false]/navigation-menu:data-[state=closed]:zoom-out-100',
)
</script>

<template>
  <!-- Root dan item `static`: panelnya diposisikan terhadap header (sticky),
       jadi bisa membentang dari tepi kiri sampai kanan layar. -->
  <NavigationMenu :viewport="false" class="kliping-main-nav static">
    <NavigationMenuList class="static gap-0">
      <NavigationMenuItem v-for="e in mainMenu" :key="e.title" class="static">
        <!-- Tautan biasa -->
        <NavigationMenuLink
          v-if="e.kind === 'link'"
          as-child
          :active="isActive(e.href)"
          :class="cn(pill, 'inline-flex flex-row items-center justify-center p-0 px-2.5 data-active:bg-pill', isEntryActive(e) && highlighted)"
        >
          <a :href="withBase(e.href)" :aria-current="isActive(e.href) ? 'page' : undefined">{{ e.title }}</a>
        </NavigationMenuLink>

        <template v-else>
          <NavigationMenuTrigger :class="cn(pill, isEntryActive(e) && highlighted)">
            {{ e.title }}
          </NavigationMenuTrigger>

          <!-- Panel selebar header, kisi kartu tiga kolom — pola mega menu
               shadcn.io. Tiap tujuan sebuah kartu: judul dan satu baris
               keterangan, tanpa ikon. -->
          <NavigationMenuContent :class="panel">
            <!-- Latar panel selebar layar; kisinya di kontainer yang sama
                 dengan isi header, jadi kartu pertama dan terakhir sejajar
                 dengan tepi isi header. -->
            <ul class="container grid grid-cols-3 gap-2 pt-2 pb-4">
              <li v-for="i in [...e.items, ...(e.kind === 'grid' && e.all ? [e.all] : [])]" :key="i.href">
                <NavigationMenuLink as-child :active="normalizePath(route.path) === normalizePath(i.href)">
                  <a :href="withBase(i.href)" class="kliping-card flex h-full flex-col gap-1 px-4 py-3 no-underline">
                    <span class="font-medium text-[0.9375rem] text-foreground leading-snug">{{ i.title }}</span>
                    <span class="line-clamp-2 text-muted-foreground text-sm leading-snug">{{ i.description }}</span>
                  </a>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </template>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
</template>
