<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { injectMapMarkerContext } from './context'

/** The marker appearance. Without content, a round primary-colored dot is shown. */
const props = defineProps<{ class?: HTMLAttributes['class'] }>()

const { markerElement } = injectMapMarkerContext('MarkerContent')
</script>

<template>
  <Teleport v-if="markerElement" :to="markerElement">
    <div :class="cn(props.class)" data-slot="marker-content">
      <slot>
        <div class="size-4 rounded-full border-2 border-white bg-primary shadow-lg" />
      </slot>
    </div>
  </Teleport>
</template>
