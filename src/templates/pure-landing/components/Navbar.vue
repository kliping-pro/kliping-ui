<script setup lang="ts">
import { Button } from "@/components/ui/button"
import Logo from '@/templates/pure-landing/components/Logo.vue'
import NavMenu from '@/templates/pure-landing/components/NavMenu.vue'
import NavigationSheet from '@/templates/pure-landing/components/NavigationSheet.vue'
import ThemeToggle from '@/templates/pure-landing/components/ThemeToggle.vue'
</script>

<template>
  <nav class="fixed z-10 top-6 inset-x-4 h-14 xs:h-16 bg-background/50 backdrop-blur-sm border dark:border-slate-700/70 max-w-screen-xl mx-auto rounded-full">
    <div class="h-full flex items-center justify-between mx-auto px-4">
      <Logo />

      <!-- Desktop Menu -->
      <NavMenu class="hidden md:block" />

      <div class="flex items-center gap-3">
        <ThemeToggle />
        <Button variant="outline" class="hidden sm:inline-flex">
          Sign In
        </Button>
        <Button class="hidden xs:inline-flex">Get Started</Button>

        <!-- Mobile Menu -->
        <div class="md:hidden">
          <NavigationSheet />
        </div>
      </div>
    </div>
  </nav>
</template>
