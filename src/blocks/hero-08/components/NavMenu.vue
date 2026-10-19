<script setup lang="ts">
/**
 * Menu navigasi hero-08. Dipakai dua kali: mendatar di navbar layar lebar, dan
 * tegak di dalam popover layar sempit — `orientation` yang membedakannya, dan
 * yang tegak sengaja dibuat lebih besar karena disentuh jari, bukan diklik.
 */
import type { NavigationMenuRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'

const props = defineProps<NavigationMenuRootProps & { class?: HTMLAttributes['class'] }>()

const isVertical = computed(() => props.orientation === 'vertical')

// Tautannya penampung, bukan tujuan sungguhan. Di sumbernya sebagian menunjuk
// `#components`, `#blog`, `#about` — jangkar yang tidak ada di block ini maupun
// di sana, jadi mengkliknya tidak melakukan apa-apa selain menaruh jangkar palsu
// di bilah alamat. Di sini semuanya `#`, dan `check:links` tetap bersih tanpa
// perlu daftar pengecualian yang harus dijaga.
const links = [
  { href: '#', label: 'Home' },
  { href: '#', label: 'Components' },
  { href: '#', label: 'Blog' },
  { href: '#', label: 'About' },
]
</script>

<template>
  <NavigationMenu :class="props.class" :orientation="orientation">
    <NavigationMenuList :class="cn(isVertical && 'flex-col items-start gap-4')">
      <NavigationMenuItem v-for="t in links" :key="t.href">
        <NavigationMenuLink
          as-child
          :class="cn(navigationMenuTriggerStyle(), isVertical && 'text-xl')"
        >
          <a :href="t.href">{{ t.label }}</a>
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
</template>
