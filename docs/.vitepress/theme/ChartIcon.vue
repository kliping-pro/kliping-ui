<script setup lang="ts">
import type { Component } from 'vue'
import { ChartAreaIcon, ChartColumnIcon, ChartLineIcon, ChartPieIcon, MessageSquareIcon } from '@lucide/vue'
import { computed } from 'vue'

/**
 * Ikon tiap jenis grafik — padanan BlockIcon dan VariantIcon untuk halaman
 * Charts, supaya ketiga galeri bisa memanggil ikon kategorinya dengan cara yang
 * sama: `<Icon :name="slug" />`.
 *
 * Yang ini memakai lucide, bukan gambar sendiri: lucide punya ikon untuk kelima
 * jenis grafiknya, dan semuanya satu keluarga.
 */
const props = defineProps<{ name: string }>()

const ICONS: Record<string, Component> = {
  area: ChartAreaIcon,
  bar: ChartColumnIcon,
  line: ChartLineIcon,
  pie: ChartPieIcon,
  tooltip: MessageSquareIcon,
}

const icon = computed(() => ICONS[props.name] ?? ChartAreaIcon)
</script>

<template>
  <component :is="icon" />
</template>
