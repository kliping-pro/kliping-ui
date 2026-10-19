<script setup lang="ts">
import { MenuIcon, XIcon } from '@lucide/vue'
import Logo from '@/templates/homeguardian/components/Logo.vue'
import NavMenu from '@/templates/homeguardian/components/NavMenu.vue'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
</script>

<template>
  <div class="px-6 max-w-(--breakpoint-xl) mx-auto">
    <nav class="h-20 flex items-center justify-between w-full">
      <Logo />

      <!-- Desktop navigation menu -->
      <div class="hidden md:flex">
        <NavMenu />
      </div>

      <!-- Mobile navigation menu -->
      <Popover modal>
        <PopoverTrigger class="group md:hidden">
          <MenuIcon class="group-data-[state=open]:hidden" />
          <XIcon class="hidden group-data-[state=open]:block" />
        </PopoverTrigger>
        <PopoverContent
          :side-offset="28"
          class="bg-background h-[calc(100svh-3rem)] w-screen !animate-none rounded-none border-none"
        >
          <NavMenu orientation="vertical" />
        </PopoverContent>
      </Popover>
    </nav>
  </div>
</template>
