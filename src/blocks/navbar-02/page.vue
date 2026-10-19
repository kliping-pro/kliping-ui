<script lang="ts">
export const description = "Bilah navigasi dengan logo di tengah."
</script>

<script setup lang="ts">
import { SunIcon } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import Logo from '@/blocks/navbar-02/components/Logo.vue'
import NavMenu from '@/blocks/navbar-02/components/NavMenu.vue'
import NavigationSheet from '@/blocks/navbar-02/components/NavigationSheet.vue'
</script>

<template>
  <nav class="h-16 border-b bg-background">
    <div class="mx-auto flex h-full max-w-(--breakpoint-xl) items-center justify-between px-4 sm:px-6 lg:px-8">
      <div class="flex items-center gap-12">
        <Logo />

        <!-- Desktop Menu -->
        <NavMenu class="hidden md:block" />
      </div>

      <div class="flex items-center gap-3">
        <Button class="hidden sm:inline-flex" variant="outline">
          Sign In
        </Button>
        <Button>Sign Up</Button>
        <Button aria-label="Toggle theme" size="icon" variant="outline">
          <SunIcon />

        </Button>

        <!-- Mobile Menu -->
        <div class="md:hidden">
          <NavigationSheet />
        </div>
      </div>
    </div>
  </nav>
</template>
