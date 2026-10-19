<script setup lang="ts">
import type { LucideIcon } from '@lucide/vue'
import { ChevronDown } from '@lucide/vue'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

/** Shell for a single filter: an icon title on top, collapsible content below. */
defineProps<{ title: string, icon?: LucideIcon }>()
</script>

<template>
  <Collapsible default-open>
    <CollapsibleTrigger class="group flex w-full items-center justify-between py-3">
      <h3 class="flex items-center gap-2 font-semibold text-sm">
        <component :is="icon" v-if="icon" class="h-5 w-5" /> {{ title }}
      </h3>
      <ChevronDown class="h-4 w-4 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
    </CollapsibleTrigger>
    <CollapsibleContent class="pt-1 pb-3">
      <slot />
    </CollapsibleContent>
  </Collapsible>
</template>
