<script setup lang="ts">
import type { SelectLabelProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { SelectLabel } from "reka-ui"
import { cn } from "@/lib/utils"

// Prop dari reka-ui tanpa JSDoc dideklarasikan ulang dengan keterangan,
// supaya hover di editor dan tabel API tidak kosong. Tipenya tetap milik Reka.
interface Props extends SelectLabelProps {
  /** Id of the control this label names. */
  for?: SelectLabelProps["for"]
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()
</script>

<template>
  <SelectLabel
    data-slot="select-label"
    :class="cn('text-muted-foreground px-2 py-1.5 text-xs', props.class)"
  >
    <slot />
  </SelectLabel>
</template>
