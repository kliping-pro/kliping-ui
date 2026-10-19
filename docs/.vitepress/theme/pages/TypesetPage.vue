<script setup lang="ts">
import { ExternalLinkIcon } from '@lucide/vue'
import { useEventListener } from '@vueuse/core'
import { useData, withBase } from 'vitepress'
import { computed, onMounted } from 'vue'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { ARTICLE_OPTIONS, ensureStylesheet, writeQuery } from './typeset/data'
import PreviewContent from './typeset/PreviewContent.vue'
import { useTypeset } from './typeset/state'
import PanelDocs from './typeset/PanelDocs.vue'
import ControlPanel from './typeset/ControlPanel.vue'

/**
 * Penyusun typeset — padanan halaman /typeset di shadcn-vue.
 *
 * Tiga kolom di bawah header: panel kendali di kiri, pratinjau di tengah,
 * panel Docs di kanan. Semuanya membaca satu keadaan (`typeset/state.ts`),
 * jadi pratinjau dan kode yang disalin tidak pernah berselisih.
 *
 * Bedanya dengan upstream: pratinjaunya digambar langsung di halaman, bukan di
 * iframe. Pratinjau ikut tema situs tanpa perlu dikirimi pesan, dan setiap
 * perubahan langsung tampil tanpa memuat ulang apa pun. Halaman lepasnya
 * (`/typeset/preview`) tetap ada untuk "Open in New Tab".
 *
 * Seluruh dokumentasi Typeset tetap di bawahnya, di halaman yang sama —
 * "Read the docs" menggulir ke sana.
 */
const { isDark } = useData()
const { settings, displayed, start, update, shuffle, reset, undo, redo } = useTypeset()

onMounted(() => {
  ensureStylesheet(withBase('/typeset.css'))
  start()
})

function toggleTheme() {
  isDark.value = !isDark.value
}

function isTyping(e: KeyboardEvent) {
  const t = e.target as HTMLElement | null
  return !!t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))
}

// ⌘Z / Ctrl+Z mundur selangkah, ⇧⌘Z / Ctrl+Shift+Z (atau Ctrl+Y) maju lagi —
// sama dengan upstream. Saat mengetik, pintasan itu milik kolom teksnya.
useEventListener(globalThis.document, 'keydown', (e: KeyboardEvent) => {
  if (!(e.metaKey || e.ctrlKey) || e.altKey || e.defaultPrevented || isTyping(e))
    return
  const k = e.key.toLowerCase()
  if ((k === 'z' && e.shiftKey) || (k === 'y' && e.ctrlKey)) {
    e.preventDefault()
    redo()
  }
  else if (k === 'z') {
    e.preventDefault()
    undo()
  }
})

// R mengacak, ⇧R mengembalikan ke bawaan, D berganti terang/gelap — sama
// dengan upstream. Diabaikan saat mengetik atau saat ada tombol pengubah.
useEventListener(globalThis.document, 'keydown', (e: KeyboardEvent) => {
  if (e.metaKey || e.ctrlKey || e.altKey || e.defaultPrevented || isTyping(e))
    return
  // Menu yang sedang terbuka memakai huruf untuk melompat ke itemnya.
  if (document.querySelector('[role="menu"][data-state="open"], [role="listbox"]'))
    return
  const k = e.key.toLowerCase()
  if (k === 'r') {
    e.preventDefault()
    e.shiftKey ? reset() : shuffle()
  }
  else if (k === 'd' && !e.shiftKey) {
    e.preventDefault()
    toggleTheme()
  }
})

const standaloneLink = computed(() => `${withBase('/typeset/preview')}${writeQuery(settings)}`)
</script>

<template>
  <div
    class="grid items-start gap-(--frame-gap) p-(--frame-gap) pt-1 md:grid-cols-[12rem_minmax(0,1fr)] xl:h-[calc(100svh-var(--header-height))] xl:grid-cols-[12rem_minmax(0,1fr)_22rem] 2xl:grid-cols-[14rem_minmax(0,1fr)_26rem]"
  >
    <h1 class="sr-only">
      Typeset
    </h1>

    <!-- Kiri: kendali. Menempel saat digulir di layar menengah. -->
    <div class="flex min-h-0 flex-col md:sticky md:row-span-2 xl:row-span-1 md:top-(--header-height) md:max-h-[calc(100svh-var(--header-height)-var(--frame-gap))] xl:static xl:max-h-full">
      <ControlPanel @toggle-theme="toggleTheme" />
    </div>

    <!-- Tengah: pratinjau. -->
    <section
      aria-label="Preview"
      class="relative isolate flex h-[75svh] min-h-0 min-w-0 flex-col overflow-hidden rounded-lg border bg-background md:h-[calc(100svh-var(--header-height)-var(--frame-gap))] xl:h-full"
    >
      <div class="scrollbar-none min-h-0 flex-1 overflow-y-auto">
        <PreviewContent :settings="displayed" />
      </div>

      <div class="pointer-events-none absolute inset-x-0 bottom-3 z-10 flex justify-center gap-1.5 px-3">
        <div role="tablist" aria-label="Sample content" class="kliping-segmented pointer-events-auto flex items-center gap-0.5 border bg-popover/90 p-1 shadow-lg backdrop-blur-xl">
          <Tooltip v-for="(o, i) in ARTICLE_OPTIONS" :key="o.value">
            <TooltipTrigger as-child>
              <button
                type="button"
                role="tab"
                :aria-selected="settings.item === o.value"
                class="h-7 min-w-8 px-2 text-xs font-medium tabular-nums outline-none transition-colors hover:bg-pill hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
                :class="settings.item === o.value ? 'bg-pill text-foreground' : 'text-muted-foreground'"
                @click="update({ item: o.value })"
              >
                {{ String(i + 1).padStart(2, '0') }}<span class="sr-only">&nbsp;{{ o.label }}</span>
              </button>
            </TooltipTrigger>
            <TooltipContent side="top" :side-offset="10">
              {{ o.label }}
            </TooltipContent>
          </Tooltip>
        </div>
        <div class="kliping-segmented pointer-events-auto flex items-center border bg-popover/90 p-1 shadow-lg backdrop-blur-xl">
          <a
            :href="standaloneLink"
            target="_blank"
            rel="noreferrer"
            class="flex h-7 items-center gap-1.5 px-2.5 text-xs font-medium text-muted-foreground no-underline outline-none transition-colors hover:bg-pill hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ExternalLinkIcon class="size-3.5 sm:hidden" />
            <span class="max-sm:sr-only">Open in New Tab</span>
          </a>
        </div>
      </div>
    </section>

    <!-- Kanan: cara memasang. Di bawah xl pindah ke bawah pratinjau. -->
    <div class="flex min-h-0 min-w-0 flex-col md:col-start-2 xl:col-start-3 xl:row-start-1 xl:h-full">
      <PanelDocs />
    </div>
  </div>
</template>
