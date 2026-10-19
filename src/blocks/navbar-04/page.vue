<script lang="ts">
export const description = "Bilah navigasi mengambang berbentuk pil."
</script>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import Logo from '@/blocks/navbar-04/components/Logo.vue'
import NavMenu from '@/blocks/navbar-04/components/NavMenu.vue'
import NavigationSheet from '@/blocks/navbar-04/components/NavigationSheet.vue'
</script>

<template>
  <nav class="fixed inset-x-4 top-6 mx-auto h-16 max-w-(--breakpoint-xl) rounded-full border bg-background">
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
