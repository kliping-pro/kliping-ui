<script setup lang="ts">
import { VisuallyHidden } from 'reka-ui'
import { Menu } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import Logo from '@/blocks/navbar-04/components/Logo.vue'
import NavMenu from '@/blocks/navbar-04/components/NavMenu.vue'
</script>

<template>
  <Sheet>
    <VisuallyHidden>
      <SheetTitle>Navigation Menu</SheetTitle>
    </VisuallyHidden>

    <SheetTrigger as-child>
      <Button class="rounded-full" size="icon" variant="outline">
        <Menu />
      </Button>
    </SheetTrigger>
    <SheetContent class="px-6 py-3">
      <Logo />
      <NavMenu class="mt-6 [&>div]:h-full" orientation="vertical" />
    </SheetContent>
  </Sheet>
</template>
