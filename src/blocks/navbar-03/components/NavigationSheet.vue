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
import Logo from '@/blocks/navbar-03/components/Logo.vue'
import { foods, travelMenuItems } from '@/blocks/navbar-03/config/navbar'
</script>

<template>
  <Sheet>
    <VisuallyHidden>
      <SheetTitle>Navigation Menu</SheetTitle>
    </VisuallyHidden>

    <SheetTrigger as-child>
      <Button size="icon" variant="outline">
        <Menu />
      </Button>
    </SheetTrigger>
    <SheetContent class="px-6 py-3">
      <Logo />

      <div class="mt-12 space-y-4 text-base">
        <a class="inline-block" href="#">
          Home
        </a>

        <div>
          <div class="font-bold">Food</div>
          <ul class="mt-2 ml-1 space-y-3 border-l pl-4">
            <li v-for="foodItem in foods" :key="foodItem.title">
              <a class="flex items-center gap-2" href="#">
                <component :is="foodItem.icon" class="mr-2 h-5 w-5 text-muted-foreground" />
                {{ foodItem.title }}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <div class="font-bold">Travel</div>
          <ul class="mt-2 ml-1 space-y-3 border-l pl-4">
            <li v-for="item in travelMenuItems" :key="item.title">
              <a class="flex items-center gap-2" href="#">
                <component :is="item.icon" class="mr-2 h-5 w-5 text-muted-foreground" />
                {{ item.title }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </SheetContent>
  </Sheet>
</template>
