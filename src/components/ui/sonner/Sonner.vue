<script lang="ts" setup>
import type { ToasterProps } from "vue-sonner"
import { CircleCheckIcon, InfoIcon, Loader2Icon, OctagonXIcon, TriangleAlertIcon, XIcon } from "@lucide/vue"
import { Toaster as Sonner } from "vue-sonner"
import { cn } from "@/lib/utils"

// Props milik vue-sonner dideklarasikan ulang dengan JSDoc: paketnya tidak
// menulis keterangan, jadi tanpa ini hover di editor dan tabel API kosong.
// Tipe tiap prop tetap persis milik paketnya.
interface SonnerProps extends ToasterProps {
  /** Swap the colours: dark toasts on a light page, light on a dark page. */
  invert?: ToasterProps["invert"]
  /** Colour scheme of the toasts: `light`, `dark`, or `system`. */
  theme?: ToasterProps["theme"]
  /** Corner or edge where toasts stack; default `bottom-right`. */
  position?: ToasterProps["position"]
  /** Corner of each toast where the close button sits. */
  closeButtonPosition?: ToasterProps["closeButtonPosition"]
  /** Keys that move focus to the toast region; default Alt+T (`["altKey", "KeyT"]`). */
  hotkey?: ToasterProps["hotkey"]
  /** Coloured backgrounds for success, error, warning, and info toasts. */
  richColors?: ToasterProps["richColors"]
  /** Show every toast expanded instead of stacked. */
  expand?: ToasterProps["expand"]
  /** Milliseconds before a toast closes by itself; default 4000. */
  duration?: ToasterProps["duration"]
  /** Pixels between expanded toasts; default 14. */
  gap?: ToasterProps["gap"]
  /** How many toasts are visible at once; default 3. */
  visibleToasts?: ToasterProps["visibleToasts"]
  /** Add a close button to every toast. */
  closeButton?: ToasterProps["closeButton"]
  /** Defaults applied to every toast (class, style, duration, …). */
  toastOptions?: ToasterProps["toastOptions"]
  /** Distance from the viewport edge; default `24px`. */
  offset?: ToasterProps["offset"]
  /** Distance from the viewport edge on small screens; default `16px`. */
  mobileOffset?: ToasterProps["mobileOffset"]
  /** Directions a toast can be swiped to dismiss it. */
  swipeDirections?: ToasterProps["swipeDirections"]
  /** Replace the default icons per toast type. */
  icons?: ToasterProps["icons"]
  /** Accessible name of the toast region; default "Notifications". */
  containerAriaLabel?: ToasterProps["containerAriaLabel"]
}

const props = defineProps<SonnerProps>()
</script>

<template>
  <Sonner
    :class="cn('toaster group', props.class)"
    :style="{
      '--normal-bg': 'var(--popover)',
      '--normal-text': 'var(--popover-foreground)',
      '--normal-border': 'var(--border)',
      '--border-radius': 'var(--radius)',
    }"
    v-bind="props"
  >
    <template #success-icon>
      <CircleCheckIcon class="size-4" />
    </template>
    <template #info-icon>
      <InfoIcon class="size-4" />
    </template>
    <template #warning-icon>
      <TriangleAlertIcon class="size-4" />
    </template>
    <template #error-icon>
      <OctagonXIcon class="size-4" />
    </template>
    <template #loading-icon>
      <div>
        <Loader2Icon class="size-4 animate-spin" />
      </div>
    </template>
    <template #close-icon>
      <XIcon class="size-4" />
    </template>
  </Sonner>
</template>
