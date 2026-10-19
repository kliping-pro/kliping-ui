<script setup lang="ts">
import { Button } from '@/components/ui/button'
import Logo from '@/blocks/hero-03/components/Logo.vue'
import NavMenu from '@/blocks/hero-03/components/NavMenu.vue'
import NavigationSheet from '@/blocks/hero-03/components/NavigationSheet.vue'
</script>

<template>
  <nav class="mx-auto h-16 w-full max-w-5xl rounded-full border border-border/85 bg-background shadow-xs/3">
    <div class="mx-auto flex h-full items-center justify-between px-4">
      <Logo />

      <!-- Desktop Menu -->
      <NavMenu class="hidden md:block" />

      <div class="flex items-center gap-3">
        <Button
          class="hidden rounded-full sm:inline-flex"
          variant="outline"
        >
          Sign In
        </Button>
        <Button class="rounded-full">Get Started</Button>

        <!-- Mobile Menu -->
        <div class="md:hidden">
          <NavigationSheet />
        </div>
      </div>
    </div>
  </nav>
</template>
