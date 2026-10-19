<script lang="ts">
export const description = "Ikon di atas namanya, seperti bilah bawah ponsel."
</script>

<script setup lang="ts">
import { BookOpen, Home, Rss, Settings, User } from '@lucide/vue'
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'

const navigationMenuItems = [
  { title: "Home", href: "#", icon: Home, isActive: true },
  { title: "Blog", href: "#", icon: Rss },
  { title: "Docs", href: "#", icon: BookOpen },
  { title: "Account", href: "#", icon: Settings },
  { title: "Settings", href: "#", icon: User },
]
</script>

<template>
  <NavigationMenu>
    <NavigationMenuList class="flex-wrap gap-1">
      <NavigationMenuItem v-for="item in navigationMenuItems" :key="item.title">
        <NavigationMenuLink
          :active="item.isActive"
          as-child
          :class="cn(
            navigationMenuTriggerStyle(),
            'flex h-auto flex-col items-center px-5 py-3'
          )"
        >
          <a :href="item.href">
            <component :is="item.icon" class="mb-0.5 size-5" />
            {{ item.title }}
          </a>
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
</template>
