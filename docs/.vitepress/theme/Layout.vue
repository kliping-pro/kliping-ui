<script setup lang="ts">
import { Content, useData } from 'vitepress'
import { ConfigProvider, TooltipProvider } from 'reka-ui'
import { computed } from 'vue'
import 'vue-sonner/style.css'
import { Toaster } from '@/components/ui/sonner'
import DocsShell from './chrome/DocsShell.vue'
import SiteFooter from './chrome/SiteFooter.vue'
import SiteHeader from './chrome/SiteHeader.vue'

/**
 * Kerangka situs Kliping.
 *
 * Tidak lagi membungkus `DefaultTheme.Layout`: header, sidebar, daftar isi, dan
 * footer digambar komponen Kliping sendiri. Yang tetap dipakai dari VitePress
 * adalah bagian yang memang tidak ada urusannya dengan tampilan — pipeline
 * markdown, router, build statis, indeks pencarian, dan penyimpan pilihan mode
 * gelap.
 *
 * Tooltip, dan beberapa komponen lain yang ikut memakainya, mengandalkan
 * provider yang dipasang sekali di akar aplikasi. Begitu pula `Toaster`:
 * demo yang memanggil `toast()` (Sonner, form, Questionnaire, …) baru tampak
 * bila wadahnya ada di halaman.
 */
const { frontmatter, isDark } = useData()

// `layout: false` dipakai halaman kanvas block: block adalah halaman utuh, dan
// yang ingin dilihat pembaca di sana memang cuma block-nya, tanpa kerangka apa
// pun di sekelilingnya.
const bare = computed(() => frontmatter.value.layout === false)

// `layout: page` untuk halaman yang menggambar isinya sendiri selebar layar —
// beranda sekarang, halaman lepas seperti /blocks dan /charts nanti.
const fullPage = computed(() => frontmatter.value.layout === 'page')
</script>

<template>
  <ConfigProvider>
    <TooltipProvider>
      <Content v-if="bare" />

      <div
        v-else
        class="group/body bg-background relative z-10 flex min-h-svh flex-col overscroll-none antialiased [--footer-height:calc(var(--spacing)*14)] [--header-height:calc(var(--spacing)*14)] lg:[--header-height:calc(var(--spacing)*16)] xl:[--footer-height:calc(var(--spacing)*24)]"
      >
        <SiteHeader />

        <main class="flex min-h-0 flex-1 flex-col">
          <Content v-if="fullPage" />
          <DocsShell v-else />
        </main>

        <SiteFooter />
      </div>

      <Toaster :theme="isDark ? 'dark' : 'light'" />
    </TooltipProvider>
  </ConfigProvider>
</template>
