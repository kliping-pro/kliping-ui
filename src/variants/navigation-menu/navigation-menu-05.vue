<script lang="ts">
export const description = "Garis bawah yang melebar saat disentuh kursor."
</script>

<script setup lang="ts">
import { BookOpen, Home, Rss } from '@lucide/vue'
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'

const navigationMenuItems = [
  { title: "Home", href: "#", icon: Home, isActive: true },
  { title: "Blog", href: "#", icon: Rss },
  { title: "Docs", href: "#", icon: BookOpen },
]
</script>

<template>
  <NavigationMenu>
    <NavigationMenuList class="space-x-8">
      <NavigationMenuItem v-for="item in navigationMenuItems" :key="item.title">
        <NavigationMenuLink
          :active="item.isActive"
          as-child
          :class="cn(
            'group relative inline-flex h-9 w-max items-center justify-center px-0.5 py-2 font-medium text-sm',
            'before:absolute before:inset-x-0 before:bottom-0 before:h-[2px] before:scale-x-0 before:bg-primary before:transition-transform',
            'hover:text-accent-foreground hover:before:scale-x-100',
            'focus:text-accent-foreground focus:outline-hidden focus:before:scale-x-100',
            'disabled:pointer-events-none disabled:opacity-50',
            'data-active:bg-transparent data-[state=open]:before:scale-x-100 data-active:before:scale-x-100',
            'hover:bg-transparent focus:bg-transparent active:bg-transparent'
          )"
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
