<script setup lang="ts">
import type { LucideIcon } from '@lucide/vue'
import type { HTMLAttributes } from 'vue'
import { NavigationMenuLink } from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'

/**
 * Satu baris di dalam panel menu navigasi: ikon, judul, dan keterangannya.
 *
 * Dipakai dua varian, dan di sumbernya ditulis ulang di kedua berkasnya.
 */
const props = defineProps<{
  title: string
  icon?: LucideIcon
  href?: string
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <li>
    <NavigationMenuLink as-child>
      <a
        :class="cn(
          'block select-none flex-col items-start rounded-md p-3 leading-none no-underline outline-hidden transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
          props.class,
        )"
        :href="href"
      >
        <div class="flex items-center gap-2 font-semibold leading-none tracking-tight">
          <component :is="icon" class="h-5 w-5" />
          {{ title }}
        </div>
        <p class="mt-2 line-clamp-2 text-muted-foreground text-sm leading-snug">
          <slot />
        </p>
      </a>
    </NavigationMenuLink>
  </li>
</template>
