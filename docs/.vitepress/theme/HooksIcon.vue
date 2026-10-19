<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

/**
 * Ikon tiap kategori di halaman Hooks › All.
 *
 * Satu aturan dengan BlockIcon dan VariantIcon: kanvas 24, garis 1.5, ujung
 * dan sambungan membulat, tanpa isian kecuali satu titik aksen. Isinya
 * gambaran peran kategorinya — nilai yang berganti, jam, jendela peramban —
 * bukan potret satu composable.
 */
const props = defineProps<{ name: string, class?: string }>()

const SHAPES: Record<string, string> = {
  // Bendera di ujung jalur: titik mulai.
  'getting-started': '<path d="M5 21V4"/><path d="M5 4h11l-2 3.5 2 3.5H5"/><circle cx="5" cy="21" r=".5"/>',
  // Saklar: nilai yang disimpan dan dibalik.
  'state': '<rect x="3" y="7" width="18" height="10" rx="5"/><circle cx="16" cy="12" r="3"/><path d="M7 12h3"/>',
  // Roda gigi kecil di dalam kurung kurawal: pola tingkat lanjut.
  'advanced': '<path d="M7 4H6a2 2 0 0 0-2 2v3.5L2.5 12 4 14.5V18a2 2 0 0 0 2 2h1"/><path d="M17 4h1a2 2 0 0 1 2 2v3.5l1.5 2.5-1.5 2.5V18a2 2 0 0 1-2 2h-1"/><circle cx="12" cy="12" r="2.5"/><path d="M12 7.5v1.25M12 15.25v1.25M7.5 12h1.25M15.25 12h1.25"/>',
  // Jam dengan panah putar: dijadwalkan, ditunda, berulang.
  'lifecycle': '<path d="M20 12a8 8 0 1 1-2.34-5.66"/><path d="M20 4.5v4h-4"/><path d="M12 8v4l2.5 1.5"/>',
  // Jendela peramban dengan kursor.
  'browser': '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 8.5h18"/><path d="M6 6.25h.01M8 6.25h.01M10 6.25h.01"/><path d="m12 12 5.5 2-2.25 1-1 2.25Z"/>',
  // Serangga: alat bantu mencari sebab.
  'development': '<rect x="8" y="7" width="8" height="12" rx="4"/><path d="M10 7V5.5a2 2 0 0 1 4 0V7"/><path d="M4 9.5l4 1.5M20 9.5l-4 1.5M3.5 14H8M20.5 14H16M4.5 18.5 8 16.5M19.5 18.5 16 16.5"/><path d="M12 11v6"/>',
  // Kotak paket: pustaka luar.
  'third-party': '<path d="M12 3 20 7.5v9L12 21l-8-4.5v-9Z"/><path d="m4 7.5 8 4.5 8-4.5M12 12v9"/><path d="m8 5.25 8 4.5"/>',
  // Buku: helper bersama.
  'libraries': '<path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H11v16H5.5A1.5 1.5 0 0 1 4 18.5Z"/><path d="M20 5.5A1.5 1.5 0 0 0 18.5 4H13v16h5.5a1.5 1.5 0 0 0 1.5-1.5Z"/><path d="M6.5 8h2M6.5 11h2M15.5 8h2M15.5 11h2"/>',
}

const markup = computed(() => SHAPES[props.name] ?? '<rect x="3" y="4" width="18" height="16" rx="2"/>')
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    :class="cn('size-6 shrink-0', props.class)"
    v-html="markup"
  />
</template>
