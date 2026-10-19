<script setup lang="ts">
/**
 * Judul panelnya dipindahkan ke dalam `SheetContent`.
 *
 * Sumbernya meletakkan `SheetTitle` berbungkus `VisuallyHidden` di luar panel,
 * langsung di bawah `Sheet`. Di sini itu berarti satu `<span>` yang selalu
 * tergambar. `VisuallyHidden` memakai `left: -1px` dan `margin: -1px`, dan
 * tanpa leluhur yang berposisi span itu jatuh dua piksel di luar tepi kiri
 * halaman. Di dalam panel ia cuma ada saat panelnya terbuka, terkurung panel
 * yang `fixed`, dan memang di sanalah Reka UI mencarinya untuk nama yang
 * dibacakan pembaca layar.
 */
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from '@lucide/vue'
import Logo from '@/templates/minimalist-landing-page/components/Logo.vue'
import NavMenu from '@/templates/minimalist-landing-page/components/NavMenu.vue'
import { VisuallyHidden } from 'reka-ui'
</script>

<template>
  <Sheet>
    <SheetTrigger as-child>
      <Button variant="outline" size="icon">
        <Menu />
      </Button>
    </SheetTrigger>
    <SheetContent class="p-6">
      <VisuallyHidden>
        <SheetTitle>Navigation Drawer</SheetTitle>
      </VisuallyHidden>

      <Logo />
      <NavMenu orientation="vertical" class="mt-12 flex-none items-start" />

      <div class="mt-8 space-y-4">
        <Button variant="outline" class="w-full sm:hidden">
          Sign In
        </Button>
        <Button class="w-full xs:hidden">Get Started</Button>
      </div>
    </SheetContent>
  </Sheet>
</template>
