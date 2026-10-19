<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Check } from '@lucide/vue'
import { ListboxItemIndicator as ListboxItemIndicatorPrimitive } from 'reka-ui'
import { cn } from '@/lib/utils'

/** The check mark shown on the selected option. */
const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
  <ListboxItemIndicatorPrimitive :class="cn(props.class)" data-slot="listbox-item-indicator">
    <slot>
      <Check class="size-4" />
    </slot>
  </ListboxItemIndicatorPrimitive>
</template>
