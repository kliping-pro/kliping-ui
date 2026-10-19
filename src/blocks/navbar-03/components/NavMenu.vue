<script setup lang="ts">
/** Navigation menu for navbar-03, with two dropdowns holding a grid of icon items. */
import type { NavigationMenuRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import ListItem from '@/blocks/navbar-03/components/ListItem.vue'
import { foods, travelMenuItems } from '@/blocks/navbar-03/config/navbar'
import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'

const props = defineProps<NavigationMenuRootProps & { class?: HTMLAttributes['class'] }>()

const gridClass = 'grid w-[400px] gap-3 p-1 md:w-[500px] md:grid-cols-2 lg:w-[600px]'
</script>

<template>
  <NavigationMenu :class="props.class" :orientation="orientation">
    <NavigationMenuList class="gap-1 space-x-0 text-sm">
      <NavigationMenuItem>
        <Button as-child variant="ghost">
          <a href="#">Home</a>
        </Button>
      </NavigationMenuItem>

      <NavigationMenuItem>
        <NavigationMenuTrigger>Food</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul :class="gridClass">
            <ListItem
              v-for="food in foods"
              :key="food.title"
              href="#"
              :icon="food.icon"
              :title="food.title"
            >
              {{ food.description }}
            </ListItem>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>

      <NavigationMenuItem>
        <NavigationMenuTrigger>Travel</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul :class="gridClass">
            <ListItem
              v-for="menuItem in travelMenuItems"
              :key="menuItem.title"
              href="#"
              :icon="menuItem.icon"
              :title="menuItem.title"
            >
              {{ menuItem.description }}
            </ListItem>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
</template>
