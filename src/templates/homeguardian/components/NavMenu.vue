<script setup lang="ts">
import type { NavigationMenuRootProps } from 'reka-ui'
import { computed } from 'vue'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'

/**
 * Menu yang sama dipakai dua kali: mendatar di bilah atas, dan menurun di
 * dalam laci ponsel. Yang membedakan cuma `orientation`.
 *
 * Di sumbernya nilai itu dibaca kembali dari `props` yang baru saja disebar
 * (`const { orientation } = props`). Di sini ia prop yang dideklarasikan
 * betulan — tipenya diambil dari Reka UI, karena ke sanalah nilainya
 * diteruskan, dan `'horizontal' | 'vertical'` bukan sesuatu yang bisa ditebak
 * konverter dari `React.ComponentProps<typeof NavigationMenu>`.
 */
const props = withDefaults(defineProps<{
  orientation?: NavigationMenuRootProps['orientation']
}>(), {
  orientation: 'horizontal',
})

const isVertical = computed(() => props.orientation === 'vertical')

const triggerClass = computed(() => cn(navigationMenuTriggerStyle(), { 'text-xl': isVertical.value }))

const links = [
  { label: 'Why Choose Us', href: '#why-choose-us' },
  { label: 'Industries', href: '#industries' },
  { label: 'Features', href: '#features' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Testimonials', href: '#testimonials' },
]
</script>

<template>
  <NavigationMenu :orientation="orientation" :viewport="false">
    <NavigationMenuList :class="cn({ 'flex-col items-start gap-4': isVertical })">
      <NavigationMenuItem v-for="link in links" :key="link.href">
        <NavigationMenuLink as-child :class="triggerClass">
          <a :href="link.href">{{ link.label }}</a>
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
</template>
