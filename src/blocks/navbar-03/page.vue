<script lang="ts">
export const description = "Bilah navigasi dengan menu turun bertingkat."
</script>

<script setup lang="ts">
import { ArrowUpRight } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import Logo from '@/blocks/navbar-03/components/Logo.vue'
import NavMenu from '@/blocks/navbar-03/components/NavMenu.vue'
import NavigationSheet from '@/blocks/navbar-03/components/NavigationSheet.vue'
</script>

<template>
  <nav class="h-16 border-b bg-background">
    <div class="mx-auto flex h-full max-w-(--breakpoint-lg) items-center justify-between px-4 sm:px-6 lg:px-8">
      <div class="flex items-center gap-8">
        <Logo />

        <!-- Desktop Menu -->
        <NavMenu class="hidden md:block" />
      </div>

      <div class="flex items-center gap-3">
        <Button>
          Get Started <ArrowUpRight />
        </Button>

        <!-- Mobile Menu -->
        <div class="md:hidden">
          <NavigationSheet />
        </div>
      </div>
    </div>
  </nav>
</template>
