<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { X } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { injectBannerContext } from './context'

/** The close button; not rendered when the banner is not dismissible. */
const props = defineProps<{ class?: HTMLAttributes['class'] }>()

const context = injectBannerContext('BannerClose')
</script>

<template>
  <Button
    v-if="context.dismissible"
    aria-label="Dismiss notification"
    :class="cn('size-7 shrink-0 rounded-sm p-0', props.class)"
    data-slot="banner-close"
    size="icon"
    type="button"
    variant="ghost"
    @click="context.close()"
  >
    <slot>
      <X />
    </slot>
  </Button>
</template>
