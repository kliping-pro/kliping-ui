<script lang="ts">
export const description = "Menu ikon saja, tanpa tulisan."
</script>

<script setup lang="ts">
import { BookOpen, Home, Rss, Settings, User } from '@lucide/vue'
import { cn } from "@/lib/utils"
import { buttonVariants } from '@/components/ui/button'
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
  { title: "Account", href: "#", icon: Settings },
  { title: "Settings", href: "#", icon: User },
]
</script>

<template>
  <NavigationMenu>
    <NavigationMenuList class="flex-wrap gap-4">
      <NavigationMenuItem v-for="item in navigationMenuItems" :key="item.title">
        <NavigationMenuLink
          as-child
          :class="cn(
            buttonVariants({
              size: 'icon',
              variant: item.isActive ? 'secondary' : 'ghost',
            }),
            'h-11 w-11',
            !item.isActive && 'text-muted-foreground'
          )"
        >
          <a :href="item.href">
            <component :is="item.icon" class="h-6! w-6!" />
          </a>
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
</template>
