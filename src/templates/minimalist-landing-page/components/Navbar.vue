<script setup lang="ts">
import { Button } from "@/components/ui/button"
import Logo from '@/templates/minimalist-landing-page/components/Logo.vue'
import NavMenu from '@/templates/minimalist-landing-page/components/NavMenu.vue'
import NavigationSheet from '@/templates/minimalist-landing-page/components/NavigationSheet.vue'
import ThemeToggle from '@/templates/minimalist-landing-page/components/ThemeToggle.vue'
</script>

<template>
  <nav class="h-16 bg-background border-b border-accent">
    <div class="h-full flex items-center justify-between max-w-(--breakpoint-xl) mx-auto px-4 sm:px-6">
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
