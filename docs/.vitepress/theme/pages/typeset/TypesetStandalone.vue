<script setup lang="ts">
import { withBase } from 'vitepress'
import { onMounted } from 'vue'
import { ensureStylesheet } from './data'
import PreviewContent from './PreviewContent.vue'
import { useTypeset } from './state'

/**
 * Pratinjau typeset sendirian, selebar layar — tujuan "Open in New Tab".
 *
 * Halamannya `layout: false`, jadi tidak ada header, sidebar, atau footer:
 * yang dilihat pembaca hanya naskahnya, seperti nanti di aplikasinya sendiri.
 * Setelannya dibaca dari query yang sama dengan penyusunnya; mode gelapnya
 * mengikuti pilihan yang tersimpan di situs.
 */
const { displayed, start } = useTypeset()

onMounted(() => {
  ensureStylesheet(withBase('/typeset.css'))
  start()
})
</script>

<template>
  <main class="min-h-svh bg-background text-foreground">
    <h1 class="sr-only">
      Typeset preview
    </h1>
    <PreviewContent :settings="displayed" />
  </main>
</template>
