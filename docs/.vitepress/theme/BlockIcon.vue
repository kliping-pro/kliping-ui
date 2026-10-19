<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

/**
 * Ikon tiap kategori di halaman Blocks › All.
 *
 * Satu aturan dengan VariantIcon: kanvas 24, garis 1.5, ujung dan sambungan
 * membulat, tanpa isian kecuali satu titik aksen. Bedanya isinya — di sini
 * tiap ikon adalah sketsa kecil tata letak block-nya (hero di tengah bingkai,
 * navbar di pucuk, sidebar di kiri), bukan potret satu kontrol.
 */
const props = defineProps<{ name: string, class?: string }>()

const FRAME = '<rect x="3" y="4" width="18" height="16" rx="2"/>'

const SHAPES: Record<string, string> = {
  'hero': `${FRAME}<path d="M8 10h8M9.5 13h5"/><rect x="10" y="15.5" width="4" height="2" rx="1"/>`,
  'cta': `${FRAME}<path d="M7 10h10"/><rect x="8.5" y="13" width="7" height="3" rx="1.5"/>`,
  'banner': '<rect x="3" y="4" width="18" height="4.5" rx="1.25"/><circle cx="6" cy="6.25" r=".75" fill="currentColor"/><path d="M8.5 6.25h7"/><path d="M5 12.5h14M5 16h14M5 19.5h9" stroke-dasharray="1 2.5"/>',
  'not-found': '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 5 5"/><path d="m8.5 8.5 4 4M12.5 8.5l-4 4"/>',
  'stats': '<path d="M4 20h16"/><path d="M7 17v-4M12 17V7M17 17v-7"/>',
  'features': '<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/>',
  'faq': '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .8-1 1.5v.4"/><path d="M12 16.5h.01"/>',
  'logo-cloud': '<circle cx="6" cy="8" r="2"/><rect x="10" y="6" width="4" height="4" rx="1"/><path d="m18 6 2 4h-4z"/><rect x="4" y="14" width="4" height="4" rx="1"/><path d="m12 14 2 4h-4z"/><circle cx="18" cy="16" r="2"/>',
  'team': '<circle cx="12" cy="8" r="2.5"/><path d="M7.5 18a4.5 4.5 0 0 1 9 0"/><circle cx="5" cy="10" r="1.75"/><path d="M2 17.5a3.25 3.25 0 0 1 4.5-3"/><circle cx="19" cy="10" r="1.75"/><path d="M22 17.5a3.25 3.25 0 0 0-4.5-3"/>',
  'pricing': '<path d="M3 12V4.5A1.5 1.5 0 0 1 4.5 3H12l9 9-9 9z"/><circle cx="7.5" cy="7.5" r="1.25"/>',
  'testimonials': '<path d="M4 5h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-9l-4 3v-3H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"/><path d="M8 9v2.5M11 9v2.5"/>',
  'timeline': '<path d="M6 3v18"/><circle cx="6" cy="6" r="1.5"/><circle cx="6" cy="12" r="1.5"/><circle cx="6" cy="18" r="1.5"/><path d="M10 6h10M10 12h7M10 18h9"/>',
  'footer': `${FRAME}<path d="M3 14h18"/><path d="M6 17h3M11 17h3M16 17h2"/>`,
  'blog': '<rect x="4" y="3" width="16" height="18" rx="2"/><rect x="7" y="6" width="10" height="5" rx="1"/><path d="M7 14h10M7 17h6"/>',
  'navbar': `${FRAME}<path d="M3 9h18"/><circle cx="6" cy="6.5" r=".75" fill="currentColor"/><path d="M10 6.5h2M14 6.5h2M18 6.5h.01"/>`,
  'integrations': '<rect x="9" y="9" width="6" height="6" rx="1.5"/><circle cx="5" cy="5" r="2"/><circle cx="19" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/><path d="m6.5 6.5 2.5 2.5M17.5 6.5 15 9M6.5 17.5 9 15M17.5 17.5 15 15"/>',
  'setup-guide': '<path d="m4 6 1.5 1.5L8 5"/><path d="M11 6.5h9"/><path d="m4 12 1.5 1.5L8 11"/><path d="M11 12.5h9"/><circle cx="6" cy="18.5" r="1.5"/><path d="M11 18.5h6"/>',
  'profile': '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="8.5" cy="11" r="2"/><path d="M5.5 16a3 3 0 0 1 6 0"/><path d="M14 10h4M14 13h3"/>',
  'keyboard-shortcuts': '<rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M6 14h.01M18 14h.01"/><path d="M9 14h6"/>',
  'empty-state': '<path d="M3 13h5l1.5 2.5h5L16 13h5"/><path d="M5.5 6.5 3 13v5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5l-2.5-6.5A2 2 0 0 0 16.6 5H7.4a2 2 0 0 0-1.9 1.5Z"/>',
  'members': '<circle cx="6" cy="6.5" r="2"/><path d="M10.5 6.5h9.5"/><circle cx="6" cy="12" r="2"/><path d="M10.5 12h7"/><circle cx="6" cy="17.5" r="2"/><path d="M10.5 17.5h8.5"/>',
  'contact': '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6.5 8.5 6 8.5-6"/>',
  'changelog': '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z"/><path d="M14 3v5h5"/><path d="M9 12.5h6M12 9.5v6"/><path d="M9 18h6"/>',
  'order-confirmation': '<path d="M5 3h14v18l-2.5-1.5L14 21l-2-1.5L10 21l-2.5-1.5L5 21Z"/><path d="m8.5 11 2.5 2.5 4.5-5"/>',
  'carousel-block': '<rect x="7" y="5" width="10" height="14" rx="1.5"/><path d="M4 7v10M20 7v10"/>',
  'verification': '<path d="M12 3 5 6v5c0 4.5 3 8.5 7 10 4-1.5 7-5.5 7-10V6Z"/><path d="m9 12 2 2 4-4.5"/>',
  'invite-member': '<circle cx="9.5" cy="8" r="3"/><path d="M4 19a5.5 5.5 0 0 1 11 0"/><path d="M19 8v6M16 11h6"/>',
  'code-block': `${FRAME}<path d="m9.5 9.5-2.5 2.5 2.5 2.5M14.5 9.5l2.5 2.5-2.5 2.5"/>`,
  'sidebar': `${FRAME}<path d="M9 4v16"/><path d="M5.5 8h1.5M5.5 11h1.5M5.5 14h1.5"/>`,
  'login': '<path d="M14 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4"/><path d="M3 12h11"/><path d="m10 8 4 4-4 4"/>',
  'signup': '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7.5h8"/><rect x="8" y="10.5" width="8" height="2.5" rx=".75"/><rect x="9.5" y="16" width="5" height="2" rx="1"/>',
  'otp': '<rect x="2.5" y="8" width="4" height="8" rx="1"/><rect x="7.5" y="8" width="4" height="8" rx="1"/><rect x="12.5" y="8" width="4" height="8" rx="1"/><rect x="17.5" y="8" width="4" height="8" rx="1"/><path d="M4.5 12h.01M9.5 12h.01"/>',
  'ai-agents': '<path d="M12 3v2.5"/><rect x="5" y="5.5" width="14" height="11" rx="3"/><circle cx="9.5" cy="11" r="1"/><circle cx="14.5" cy="11" r="1"/><path d="M9 19.5h6M12 16.5v3"/>',
  'web3': '<path d="M12 2.5 20 7v10l-8 4.5L4 17V7Z"/><path d="m4 7 8 4.5L20 7M12 11.5v10"/>',
  'account': '<circle cx="12" cy="9" r="3.5"/><path d="M5.5 20a6.5 6.5 0 0 1 13 0"/>',
  'billing': '<rect x="2.5" y="5" width="19" height="14" rx="2"/><path d="M2.5 9.5h19"/><path d="M6 15h4"/>',
  // Panah berputar mengelilingi kartu: tagihan yang berulang.
  'subscription': '<path d="M20 12a8 8 0 0 1-14.3 4.9"/><path d="M4 12a8 8 0 0 1 14.3-4.9"/><path d="M18.5 3.5v3.6h-3.6M5.5 20.5v-3.6h3.6"/><rect x="8.5" y="9.5" width="7" height="5" rx="1"/>',
  // Meteran setengah lingkaran dengan jarum: pemakaian terhadap batasnya.
  'usage': '<path d="M3.5 16a8.5 8.5 0 0 1 17 0"/><path d="M12 16l4-5"/><circle cx="12" cy="16" r="1"/><path d="M6 12.5l1 .6M18 12.5l-1 .6M12 8v1.2"/>',
  'cruds': '<path d="M4 20h4L19 9a2.1 2.1 0 0 0-3-3L5 17Z"/><path d="m14.5 7.5 3 3"/><path d="M13 20h7"/>',
  'modals': '<rect x="3" y="3" width="18" height="18" rx="2" stroke-dasharray="1 2.5"/><rect x="6.5" y="7.5" width="11" height="9" rx="1.5"/><path d="M9 10.5h6M13 13.5h2"/>',
  'ecommerce': '<path d="M3 4h2.5l2.2 10.5a1.5 1.5 0 0 0 1.5 1.2h7.9a1.5 1.5 0 0 0 1.5-1.2L20 8H6.5"/><circle cx="9.5" cy="19.5" r="1.25"/><circle cx="17" cy="19.5" r="1.25"/>',
  'lainnya': `${FRAME}<path d="M8 12h.01M12 12h.01M16 12h.01"/>`,
  // Kategori Template: halaman utuh, jadi sketsanya satu halaman bersusun.
  'landing-page': `${FRAME}<path d="M3 8h18"/><path d="M8.5 11h7"/><rect x="5.5" y="14" width="3.5" height="3.5" rx=".75"/><rect x="10.25" y="14" width="3.5" height="3.5" rx=".75"/><rect x="15" y="14" width="3.5" height="3.5" rx=".75"/>`,
  'portfolio': `${FRAME}<circle cx="8" cy="9" r="2"/><path d="M11.5 8.5h6M11.5 10.5h4"/><rect x="5.5" y="13.5" width="5.5" height="4" rx=".75"/><rect x="13" y="13.5" width="5.5" height="4" rx=".75"/>`,
}

const markup = computed(() => SHAPES[props.name] ?? FRAME)
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
