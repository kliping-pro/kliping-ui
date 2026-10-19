<script lang="ts">
export const description = "Bilah navigasi lebar penuh dengan menu tarik di layar sempit."
</script>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import Logo from '@/blocks/navbar-01/components/Logo.vue'
import NavMenu from '@/blocks/navbar-01/components/NavMenu.vue'
import NavigationSheet from '@/blocks/navbar-01/components/NavigationSheet.vue'
</script>

<template>
  <nav class="h-16 border-b bg-background">
    <div class="mx-auto flex h-full max-w-(--breakpoint-xl) items-center justify-between px-4 sm:px-6 lg:px-8">
      <Logo />

      <!-- Desktop Menu -->
      <NavMenu class="hidden md:block" />

      <div class="flex items-center gap-3">
        <Button class="hidden sm:inline-flex" variant="outline">
          Sign In
        </Button>
        <Button>Get Started</Button>

        <!-- Mobile Menu -->
        <div class="md:hidden">
          <NavigationSheet />
        </div>
      </div>
    </div>
  </nav>
</template>
