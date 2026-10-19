<script setup lang="ts">
import { useData, withBase } from 'vitepress'
import { computed } from 'vue'
import { sidebarFor } from './chrome/navigation'

/**
 * Daftar seluruh halaman komponen.
 *
 * Sumbernya kelompok "Components" di sidebar, yang isinya sudah disusun saat
 * build dari frontmatter tiap berkas. Jadi halaman ini tidak pernah bisa
 * ketinggalan dari sidebar: keduanya membaca daftar yang sama, dan komponen
 * baru muncul di dua tempat sekaligus tanpa ada yang perlu diperbarui.
 */
const { theme } = useData()

const components = computed(
  () => sidebarFor(theme.value.sidebar, '/components').find(k => k.text === 'Components')?.items ?? [],
)
</script>

<template>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-x-8 lg:gap-x-16 lg:gap-y-6 xl:gap-x-20">
    <a
      v-for="item in components"
      :key="item.link"
      data-slot="components-list-item"
      :href="withBase(item.link!)"
      class="inline-flex items-center gap-2 text-lg md:text-base"
    >
      {{ item.text }}
      <span v-if="(item as any).isNew" class="flex size-2 rounded-full bg-green-500" title="New" />
    </a>
  </div>
</template>
