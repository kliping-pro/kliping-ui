<script setup lang="ts">
import { Button } from "@/components/ui/button"
import GithubLogo from '@/templates/minimal-portfolio/components/GithubLogo.vue'
import XLogo from '@/templates/minimal-portfolio/components/XLogo.vue'
import Logo from '@/templates/minimal-portfolio/components/Logo.vue'
import NavMenu from '@/templates/minimal-portfolio/components/NavMenu.vue'
import NavigationSheet from '@/templates/minimal-portfolio/components/NavigationSheet.vue'
</script>

<template>
  <nav class="fixed z-10 top-6 inset-x-4 h-14 bg-background border dark:border-slate-700/70 max-w-screen-md mx-auto rounded-full">
    <div class="h-full flex items-center justify-between mx-auto px-3">
      <Logo />

      <!-- Desktop Menu -->
      <NavMenu class="hidden md:block" />

      <div class="flex items-center gap-2">
        <Button
          variant="outline"
          class="hidden sm:inline-flex rounded-full shadow-none"
          size="icon"
        >
          <XLogo />
        </Button>
        <Button
          variant="outline"
          class="rounded-full shadow-none"
          size="icon"
        >
          <GithubLogo class="h-5! w-5!" />
        </Button>

        <!-- Mobile Menu -->
        <div class="md:hidden">
          <NavigationSheet />
        </div>
      </div>
    </div>
  </nav>
</template>
