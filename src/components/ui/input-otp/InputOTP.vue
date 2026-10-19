<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import type { OTPInputProps } from "vue-input-otp"
import { reactiveOmit } from "@vueuse/core"
import { useForwardPropsEmits } from "reka-ui"
import { OTPInput } from "vue-input-otp"
import { cn } from "@/lib/utils"

// Props milik vue-input-otp dideklarasikan ulang dengan JSDoc: paketnya tidak
// menulis keterangan, jadi tanpa ini hover di editor dan tabel API kosong.
// Tipe tiap prop tetap persis milik paketnya.
interface InputOTPProps extends OTPInputProps {
  /** Number of characters in the code; one slot each. */
  maxlength: OTPInputProps["maxlength"]
  /** Where the caret sits inside the hidden input; matches the slot that looks active. */
  textAlign?: OTPInputProps["textAlign"]
  /** Mobile keyboard to show: digits only (`numeric`) or full (`text`). */
  inputmode?: OTPInputProps["inputmode"]
  /** Classes for the wrapper around the slots; set from `class` by this component. */
  containerClass?: OTPInputProps["containerClass"]
  /** Widen the input so password-manager badges do not cover the last slot. */
  pushPasswordManagerStrategy?: OTPInputProps["pushPasswordManagerStrategy"]
  /** CSS injected in a `<noscript>` tag so the input stays usable without JavaScript. */
  noScriptCssFallback?: OTPInputProps["noScriptCssFallback"]
  /** Cleans pasted text before it is checked against `pattern`, e.g. strips spaces or dashes. */
  pasteTransformer?: OTPInputProps["pasteTransformer"]
  class?: HTMLAttributes["class"]
}

const props = defineProps<InputOTPProps>()

const emits = defineEmits<{
  /** Emitted with the code once every slot is filled. */
  complete: [value: string]
  /** Emitted with the current code on every change. */
  input: [value: string]
  /** Native `change` event of the hidden input. */
  change: [e: Event]
  /** Native `select` event: the text selection inside the input changed. */
  select: [e: Event]
  /** Emitted when the input gains focus. */
  focus: [e: FocusEvent]
  /** Emitted when the input loses focus. */
  blur: [e: FocusEvent]
  /** Emitted when the pointer enters the slots. */
  mouseover: [e: MouseEvent]
  /** Emitted when the pointer leaves the slots. */
  mouseleave: [e: MouseEvent]
  /** Emitted on paste, before `pasteTransformer` runs. */
  paste: [e: ClipboardEvent]
}>()

const delegatedProps = reactiveOmit(props, "class")

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <OTPInput
    v-slot="slotProps"
    v-bind="forwarded"
    aria-label="One-time code"
    :container-class="cn('flex items-center gap-2 has-disabled:opacity-50', props.class)"
    data-slot="input-otp"
    class="disabled:cursor-not-allowed"
  >
    <slot v-bind="slotProps" />
  </OTPInput>
</template>
