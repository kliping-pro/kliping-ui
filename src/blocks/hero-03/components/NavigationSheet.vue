<script setup lang="ts">
/**
 * Menu layar sempit hero-03, dibuka dari tombol hamburger.
 *
 * `SheetTitle` wajib ada — Reka UI memakainya sebagai nama yang dibacakan
 * pembaca layar saat panelnya terbuka, dan tanpa itu ada peringatan aksesibilitas
 * di console. Karena judulnya tidak diinginkan terlihat, ia dibungkus
 * `VisuallyHidden`: tetap terbaca, tidak tergambar.
 */
import { MenuIcon } from '@lucide/vue'
import { VisuallyHidden } from 'reka-ui'
import Logo from '@/blocks/hero-03/components/Logo.vue'
import NavMenu from '@/blocks/hero-03/components/NavMenu.vue'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
</script>

<template>
  <Sheet>
    <SheetTrigger as-child>
      <Button class="rounded-full" size="icon" variant="outline">
        <MenuIcon />
        <span class="sr-only">Open menu</span>
      </Button>
    </SheetTrigger>
    <SheetContent class="px-6 py-3">
      <VisuallyHidden>
        <SheetTitle>Navigation Menu</SheetTitle>
      </VisuallyHidden>

      <Logo />
      <NavMenu class="mt-6 [&>div]:h-full" orientation="vertical" />
    </SheetContent>
  </Sheet>
</template>
