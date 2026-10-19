<script setup lang="ts">
/**
 * Navbar hero-08 — bergaris bawah, dengan menu layar sempit yang membuka
 * popover setinggi layar.
 *
 * Ikon hamburgernya berganti jadi silang saat terbuka, dan pergantian itu
 * digerakkan `data-state` milik pemicunya lewat `group-data-[state=open]`,
 * bukan oleh state tersendiri. Satu sumber kebenaran: yang tahu popover-nya
 * terbuka adalah popover-nya.
 */
import { ArrowUpRight, MenuIcon, WheatIcon, XIcon } from '@lucide/vue'
import NavMenu from '@/blocks/hero-08/components/NavMenu.vue'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
</script>

<template>
  <div class="h-16 border-b bg-background px-6">
    <nav class="mx-auto flex h-full max-w-(--breakpoint-xl) items-center justify-between">
      <div class="flex items-center gap-4">
        <a class="flex items-center gap-3" href="#">
          <WheatIcon />
          <span class="text-xl font-bold">Bloxxee</span>
        </a>
      </div>

      <!-- Menu layar lebar -->
      <div class="hidden md:flex">
        <NavMenu />
      </div>

      <div class="flex items-center gap-4">
        <div class="flex items-center gap-2">
          <Button>
            Sign Up <ArrowUpRight />
          </Button>
          <Button class="hidden sm:inline-flex" variant="secondary">
            Sign In
          </Button>
        </div>

        <!-- Menu layar sempit -->
        <Popover>
          <PopoverTrigger class="group md:hidden">
            <MenuIcon class="group-data-[state=open]:hidden" />
            <XIcon class="hidden group-data-[state=open]:block" />
            <span class="sr-only">Open menu</span>
          </PopoverTrigger>
          <PopoverContent
            class="h-[calc(100svh-4rem)] w-screen rounded-none border-none bg-background !animate-none"
            :side-offset="20"
          >
            <NavMenu orientation="vertical" />
          </PopoverContent>
        </Popover>
      </div>
    </nav>
  </div>
</template>
