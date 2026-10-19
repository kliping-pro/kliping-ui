<script setup lang="ts">
/**
 * Satu butir di dalam menu turun navbar-03: ikon, judul, keterangan.
 *
 * Di sumbernya ini `React.forwardRef` — komponen yang meneruskan ref dari
 * pemanggilnya ke elemen di dalamnya. Vue 3.5 tidak membutuhkannya: `ref` di
 * template sudah menunjuk elemen akar komponen, dan sisa atributnya diteruskan
 * sendiri lewat `$attrs`. Jadi yang di sana butuh pembungkus, di sini hilang
 * tanpa mengubah apa pun yang terlihat.
 */
import type { FunctionalComponent } from 'vue'
import type { HTMLAttributes } from 'vue'
import { NavigationMenuLink } from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
  href: string
  title: string
  icon: FunctionalComponent
}>()
</script>

<template>
  <li>
    <NavigationMenuLink as-child>
      <a
        :class="cn(
          'flex-col items-start select-none rounded-md p-3 leading-none no-underline outline-hidden transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
          props.class,
        )"
        :href="props.href"
      >
        <component :is="props.icon" class="mb-3 size-6" />
        <div class="font-medium leading-none">
          {{ props.title }}
        </div>
        <p class="line-clamp-2 text-sm leading-snug text-muted-foreground">
          <slot />
        </p>
      </a>
    </NavigationMenuLink>
  </li>
</template>
