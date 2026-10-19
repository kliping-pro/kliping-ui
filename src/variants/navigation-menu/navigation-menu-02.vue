<script lang="ts">
export const description = "Ikon di samping tiap namanya."
</script>

<script setup lang="ts">
import { BookOpen, Home, Rss } from '@lucide/vue'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'

const navigationMenuItems = [
  { title: "Home", href: "#", icon: Home },
  { title: "Blog", href: "#", icon: Rss },
  { title: "Docs", href: "#", icon: BookOpen },
]
</script>

<template>
  <NavigationMenu>
    <NavigationMenuList class="flex-wrap">
      <NavigationMenuItem v-for="item in navigationMenuItems" :key="item.title">
        <NavigationMenuLink
          as-child
          :class="navigationMenuTriggerStyle()"
        >
          <a class="flex-row items-center gap-2.5" :href="item.href">
            <component :is="item.icon" class="h-5 w-5 shrink-0" />
            {{ item.title }}
          </a>
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
</template>
