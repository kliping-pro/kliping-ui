<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { injectScrollSpyContext } from './context'

/** A single navigation link. Highlights itself when its section is in view. */
const props = defineProps<{
  /** Value of the section this link scrolls to and highlights for. */
  value: string
  class?: HTMLAttributes['class']
}>()

const { state, scrollToSection } = injectScrollSpyContext('ScrollSpyLink')

const isActive = computed(() => state.value.activeValue === props.value)
</script>

<template>
  <a
    :aria-current="isActive ? 'location' : undefined"
    :class="cn(
      'rounded px-3 py-1.5 font-medium text-muted-foreground text-sm transition-colors hover:bg-accent hover:text-accent-foreground data-[state=active]:bg-accent data-[state=active]:text-foreground',
      props.class,
    )"
    data-slot="scroll-spy-link"
    :data-state="isActive ? 'active' : 'inactive'"
    :href="`#${props.value}`"
    @click.prevent="scrollToSection(props.value)"
  >
    <slot />
  </a>
</template>
