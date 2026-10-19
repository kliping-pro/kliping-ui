<script setup lang="ts">
import type { ComboboxTriggerProps } from "reka-ui"
import type { ComponentPublicInstance, HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { ComboboxTrigger, useForwardProps } from "reka-ui"
import { onMounted, onUpdated, ref } from "vue"
import { cn } from "@/lib/utils"

const props = defineProps<ComboboxTriggerProps & { class?: HTMLAttributes["class"] }>()

const delegatedProps = reactiveOmit(props, "class")

const forwarded = useForwardProps(delegatedProps)

// Reka memberi `aria-label="Show popup"` pada trigger. Itu tepat untuk trigger
// ikon saja, tapi trigger bertulisan ("Select framework...") lalu bernama lain
// dari teks yang terlihat (WCAG 2.5.3, Label in Name) — jadi labelnya dilepas
// bila trigger memuat teks, dan namanya diambil dari teks itu.
let rootEl: Element | null = null
const hasText = ref(false)
function setRoot(el: Element | ComponentPublicInstance | null) {
  rootEl = el && "$el" in el ? el.$el : el
}
function detectText() {
  hasText.value = !!rootEl?.textContent?.trim()
}
onMounted(detectText)
onUpdated(detectText)
</script>

<template>
  <ComboboxTrigger
    :ref="setRoot"
    data-slot="combobox-trigger"
    v-bind="forwarded"
    :aria-label="hasText ? undefined : 'Show popup'"
    :class="cn('', props.class)"
    tabindex="0"
  >
    <slot />
  </ComboboxTrigger>
</template>
