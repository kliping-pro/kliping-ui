<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { Primitive } from 'reka-ui'
import { cn } from '@/lib/utils'

// Bawaannya `<ul>` dengan `<li>` di dalamnya. Untuk daftar tombol atau tautan
// (`ListItem as="button"`), pakai `as="div"`: `<ul>` hanya boleh berisi `<li>`.
const props = withDefaults(defineProps<PrimitiveProps & { class?: HTMLAttributes['class'] }>(), {
  as: 'ul',
})

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <Primitive data-slot="list" :class="cn('flex flex-col gap-1', props.class)" v-bind="delegatedProps">
    <slot />
  </Primitive>
</template>
