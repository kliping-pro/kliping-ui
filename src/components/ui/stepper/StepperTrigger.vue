<script lang="ts" setup>
import type { StepperTriggerProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { injectStepperItemContext, StepperTrigger, useForwardProps, useId } from "reka-ui"
import { cn } from "@/lib/utils"

const props = defineProps<StepperTriggerProps & { class?: HTMLAttributes["class"] }>()

const delegatedProps = reactiveOmit(props, "class")

const forwarded = useForwardProps(delegatedProps)

const itemContext = injectStepperItemContext()
const id = useId(undefined, "stepper-trigger")
</script>

<template>
  <!-- Reka menamai tombol dari judul langkah saja (`aria-labelledby` →
       StepperTitle). Teks yang terlihat di tombol (mis. nomor langkah) lalu
       tidak termasuk namanya (WCAG 2.5.3, Label in Name). Tombol ikut dirujuk:
       namanya = isinya sendiri + judul; bila isinya hanya ikon, judul saja. -->
  <StepperTrigger
    v-bind="forwarded"
    :id="id"
    :aria-labelledby="`${id} ${itemContext.titleId}`"
    :class="cn('p-1 flex flex-col items-center text-center gap-1 rounded-md', props.class)"
  >
    <slot />
  </StepperTrigger>
</template>
