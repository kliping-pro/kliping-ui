<script setup lang="ts">
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from '@lucide/vue'
import Logo from '@/templates/minimal-portfolio/components/Logo.vue'
import NavMenu from '@/templates/minimal-portfolio/components/NavMenu.vue'
</script>

<template>
  <Sheet>
    <SheetTrigger as-child>
      <Button variant="outline" size="icon" class="rounded-full">
        <Menu />
      </Button>
    </SheetTrigger>
    <SheetContent class="pt-3 px-6">
      <Logo />
      <NavMenu orientation="vertical" class="mt-12" />
    </SheetContent>
  </Sheet>
</template>
