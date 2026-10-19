<script setup lang="ts">
import { withBase } from 'vitepress'
import { Separator } from '@/components/ui/separator'
import GitHubLink from './GitHubLink.vue'
import MainNav from './MainNav.vue'
import MobileNav from './MobileNav.vue'
import ModeSwitcher from './ModeSwitcher.vue'
import SearchBox from './SearchBox.vue'
import SetupButton from './SetupButton.vue'
</script>

<template>
  <header class="bg-background sticky top-0 z-50 w-full">
    <!-- Latar header selebar layar, isinya di dalam kontainer situs — sama
         dengan panel mega menu di bawahnya. -->
    <div class="container">
      <!-- Pola shadcn.io: logo dan nav rata kiri, kotak cari dan tombol rata
           kanan, ruang kosong di antaranya. Tepi kiri logo sejajar dengan
           kartu pertama mega menu, tepi kanan tombol tema dengan kartu
           terakhir — keduanya di kontainer yang sama. -->
      <div class="flex h-(--header-height) items-center gap-2 **:data-[slot=separator]:h-4!">
        <!-- MobileNav punya dua akar — pemicunya dan sheet-nya yang di-teleport
             — jadi kelas tidak bisa dititipkan lewat atribut. Pembungkus ini
             yang mengatur kapan ia tampil. -->
        <div class="flex items-center lg:hidden">
          <MobileNav />
        </div>

        <a :href="withBase('/')" class="flex shrink-0 items-center gap-2 rounded-lg pr-1 no-underline outline-none focus-visible:ring-2 focus-visible:ring-ring">
          <img :src="withBase('/favicon.svg')" alt="" class="size-6">
          <span class="font-semibold text-[1.0625rem] tracking-tight">kliping.pro</span>
        </a>

        <MainNav class="ml-4 hidden lg:flex" />

        <!-- Deret nav tidak bisa menyusut. Kalau ruangnya kurang — lg di
             sekitar 1024px, atau fon sistem yang lebih lebar — kotak cari yang
             mengalah, bukan header yang meluap keluar layar. -->
        <div class="ml-auto flex min-w-0 flex-1 items-center justify-end gap-2 pl-4">
          <div class="hidden min-w-0 flex-1 justify-end md:flex">
            <SearchBox />
          </div>
          <SetupButton />
          <Separator orientation="vertical" class="ml-2 hidden lg:block" />
          <GitHubLink />
          <Separator orientation="vertical" />
          <ModeSwitcher />
        </div>
      </div>
    </div>
  </header>
</template>
