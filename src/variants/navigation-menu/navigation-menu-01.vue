<script lang="ts">
export const description = "Menu navigasi mendatar, tulisan saja."
</script>

<script setup lang="ts">
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'

const navigationMenuItems = [
  { title: "Home", href: "#" },
  { title: "Blog", href: "#" },
  { title: "Docs", href: "#" },
]
</script>

<template>
  <NavigationMenu>
    <NavigationMenuList>
      <NavigationMenuItem v-for="item in navigationMenuItems" :key="item.title">
        <NavigationMenuLink
          as-child
          :class="navigationMenuTriggerStyle()"
        >
          <a :href="item.href">{{ item.title }}</a>
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
</template>
