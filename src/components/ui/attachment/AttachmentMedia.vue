<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import type { AttachmentMediaVariants } from "."
import { cn } from "@/lib/utils"
import { attachmentMediaVariants } from "."

const props = defineProps<{
  class?: HTMLAttributes["class"]
  /** Whether the media holds an icon or an `<img>`. */
  variant?: AttachmentMediaVariants["variant"]
}>()
</script>

<template>
  <div
    data-slot="attachment-media"
    :data-variant="variant"
    :class="cn(attachmentMediaVariants({ variant }), props.class)"
  >
    <slot />
  </div>
</template>
