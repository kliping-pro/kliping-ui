<script setup lang="ts">
import type { TagsInputInputProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { TagsInputInput, useForwardProps } from "reka-ui"
import { cn } from "@/lib/utils"

const props = defineProps<TagsInputInputProps & { class?: HTMLAttributes["class"] }>()

const delegatedProps = reactiveOmit(props, "class")

const forwardedProps = useForwardProps(delegatedProps)

// Di bawah md teksnya 16px agar Safari iOS tidak memperbesar halaman saat kolom
// ini difokuskan, tetapi itu ikut melebarkan lebar bawaan <input>. w-56 (dipakai
// flex lewat basis-auto) dan leading-5 menyamai lebar dan tingginya dulu di 14px,
// supaya kotak dan baris tagnya tetap seperti semula; min-w-0 membolehkannya
// menyusut bila barisnya lebih sempit.
</script>

<template>
  <TagsInputInput v-bind="forwardedProps" :class="cn('text-base leading-5 min-h-5 focus:outline-none flex-1 bg-transparent px-1 md:text-sm max-md:w-56 max-md:min-w-0 max-md:basis-auto', props.class)" />
</template>
