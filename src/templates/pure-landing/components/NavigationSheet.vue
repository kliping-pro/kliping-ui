<script setup lang="ts">
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from '@lucide/vue'
import Logo from '@/templates/pure-landing/components/Logo.vue'
import NavMenu from '@/templates/pure-landing/components/NavMenu.vue'
</script>

<template>
  <Sheet>
    <SheetTrigger as-child>
      <Button variant="outline" size="icon" class="rounded-full">
        <Menu />
      </Button>
    </SheetTrigger>
    <SheetContent class="p-6">
      <Logo />
      <NavMenu orientation="vertical" class="mt-12 flex-none items-start" />

      <div class="mt-8 space-y-4">
        <Button variant="outline" class="w-full sm:hidden">
          Sign In
        </Button>
        <Button class="w-full xs:hidden">Get Started</Button>
      </div>
    </SheetContent>
  </Sheet>
</template>
