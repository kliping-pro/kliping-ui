<script setup lang="ts">
/**
 * Menu navigasi hero-03. Dipakai dua kali: mendatar di navbar layar lebar, dan
 * tegak di dalam sheet layar sempit — `orientation` yang membedakannya.
 */
import type { NavigationMenuRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'

defineProps<NavigationMenuRootProps & { class?: HTMLAttributes['class'] }>()

const links = [
  { href: '#', label: 'Home' },
  { href: '#', label: 'Blog' },
  { href: '#', label: 'About' },
  { href: '#', label: 'Contact Us' },
]
</script>

<template>
  <NavigationMenu :class="$props.class" :orientation="orientation">
    <NavigationMenuList
      class="space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start data-[orientation=vertical]:justify-start"
    >
      <NavigationMenuItem v-for="t in links" :key="t.label">
        <NavigationMenuLink as-child :class="cn(navigationMenuTriggerStyle())">
          <a :href="t.href">{{ t.label }}</a>
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
</template>
