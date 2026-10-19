<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

/**
 * Ikon tiap komponen di halaman Variasi.
 *
 * Digambar sendiri, bukan dipinjam dari lucide. Lucide punya ikon untuk
 * sebagian komponen — `Table`, `SquareCheck` — tapi tidak untuk sebagian besar
 * lainnya: tidak ada "input OTP", "separator", atau "navigation menu" di sana,
 * dan mencomot ikon terdekat menghasilkan deretan yang tidak satu bahasa.
 *
 * Yang di sini semuanya potret kecil komponennya sendiri, satu aturan untuk
 * semuanya: kanvas 24, garis 1.5, ujung dan sambungan membulat, tanpa isian
 * kecuali satu titik aksen. Jadi kalau satu ikon ditambah, aturannya sudah ada.
 */
const props = defineProps<{ name: string, class?: string }>()

const SHAPES: Record<string, string> = {
  'accordion': '<rect x="3" y="4" width="18" height="4.5" rx="1.25"/><rect x="3" y="10.5" width="18" height="9.5" rx="1.25"/><path d="m16 5.5 1.25 1.25L18.5 5.5"/><path d="m16 13.75 1.25-1.25 1.25 1.25"/><path d="M6 15.5h8M6 17.5h5"/>',
  'alert': '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="7.5" cy="10" r="1.75"/><path d="M11.5 9.25h6M11.5 12h4M7.5 15.5h10"/>',
  'alert-dialog': '<rect x="3.5" y="4" width="17" height="16" rx="2"/><path d="M7 8.5h10M7 11.5h7"/><rect x="7" y="15" width="4.5" height="2.5" rx="1"/><rect x="13" y="15" width="4.5" height="2.5" rx="1"/>',
  'avatar': '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="10" r="3"/><path d="M6.5 18.25a6.5 6.5 0 0 1 11 0"/>',
  'badge': '<rect x="3" y="8" width="18" height="8" rx="4"/><circle cx="7.5" cy="12" r="1" fill="currentColor"/><path d="M11 12h6.5"/>',
  'breadcrumb': '<path d="M3 12h3.5"/><path d="m9 10 2 2-2 2"/><path d="M13.25 12h2.5"/><path d="m18 10 2 2-2 2"/>',
  'button': '<rect x="3" y="7.5" width="18" height="9" rx="2.5"/><path d="M8.5 12h7"/>',
  'card': '<rect x="3.5" y="3.5" width="17" height="17" rx="2"/><path d="M7 7.5h7M7 10h4.5"/><path d="M3.5 13.5h17"/><path d="M7 17h10"/>',
  'carousel': '<rect x="7" y="5" width="10" height="14" rx="1.5"/><path d="M4 7v10M20 7v10"/><path d="M10.5 21.5h.01M12 21.5h.01M13.5 21.5h.01"/>',
  'checkbox': '<rect x="4" y="4" width="16" height="16" rx="3"/><path d="m8.25 12.25 2.5 2.5 5-5.5"/>',
  'collapsible': '<rect x="3" y="4" width="18" height="5" rx="1.25"/><path d="m15.75 7.25 1.25-1.25 1.25 1.25"/><path d="M6 6.5h6"/><path d="M5 12.5h14M5 16h14M5 19.5h9" stroke-dasharray="1 2.5"/>',
  'dropdown-menu': '<rect x="3" y="3" width="11" height="5" rx="1.25"/><path d="m10.5 5 1 1 1-1"/><rect x="3" y="10" width="15" height="11" rx="1.5"/><path d="M6 13.5h8M6 17.5h6"/>',
  'input': '<rect x="3" y="7" width="18" height="10" rx="2"/><path d="M7 10v4"/><path d="M10 12h.01M13 12h.01M16 12h.01"/>',
  'input-otp': '<rect x="2.5" y="8" width="4" height="8" rx="1"/><rect x="7.5" y="8" width="4" height="8" rx="1"/><rect x="12.5" y="8" width="4" height="8" rx="1"/><rect x="17.5" y="8" width="4" height="8" rx="1"/><path d="M4.5 12h.01M9.5 12h.01"/>',
  'navigation-menu': '<rect x="2.5" y="4" width="19" height="5" rx="1.25"/><path d="M5.5 6.5h3M11 6.5h3M16.5 6.5h2"/><rect x="9" y="11" width="12.5" height="9" rx="1.5"/><path d="M12 14.5h6.5M12 17h4.5"/>',
  'pagination': '<path d="m6 9-3 3 3 3"/><rect x="8.5" y="8" width="7" height="8" rx="1.5"/><path d="M12 12h.01"/><path d="m18 9 3 3-3 3"/>',
  'progress': '<rect x="2.5" y="9.5" width="19" height="5" rx="2.5"/><path d="M5 12h7.5" stroke-width="2.5"/>',
  'radio-group': '<circle cx="6" cy="8" r="2.5"/><circle cx="6" cy="8" r=".75" fill="currentColor"/><circle cx="6" cy="16" r="2.5"/><path d="M11 8h9M11 16h7"/>',
  'select': '<rect x="3" y="7" width="18" height="10" rx="2"/><path d="M6.5 12h7"/><path d="m16 11 1.5 1.5L19 11"/>',
  'separator': '<path d="M5 6h14M5 8.5h9"/><path d="M3 12h18" stroke-dasharray="0.01 3"/><path d="M5 15.5h14M5 18h10"/>',
  'slider': '<path d="M3 12h18"/><path d="M3 12h9" stroke-width="2.5"/><circle cx="13" cy="12" r="2.75" fill="var(--background, #fff)"/>',
  'spinner': '<path d="M12 3a9 9 0 1 0 9 9"/><path d="M12 7a5 5 0 1 0 5 5" opacity=".45"/>',
  'switch': '<rect x="2.5" y="7" width="19" height="10" rx="5"/><circle cx="16.5" cy="12" r="3"/>',
  'table': '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M3 14.5h18M10 4v16"/>',
  'tabs': '<path d="M3 9V5.5A1.5 1.5 0 0 1 4.5 4h5A1.5 1.5 0 0 1 11 5.5V9"/><path d="M13 7.5h4"/><rect x="3" y="9" width="18" height="11" rx="1.75"/><path d="M6.5 13h8M6.5 16.5h5"/>',
  'textarea': '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M6.5 8h11M6.5 11h11M6.5 14h6"/><path d="m15.5 18 2.5-2.5M17.75 18l.25-.25"/>',
  'tooltip': '<path d="M5 4h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-5l-2 2.5-2-2.5H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"/><path d="M7.5 8.5h9M7.5 11.5h6"/><path d="M8 21h8"/>',
}

const markup = computed(() => SHAPES[props.name] ?? '<rect x="4" y="4" width="16" height="16" rx="3"/>')
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
