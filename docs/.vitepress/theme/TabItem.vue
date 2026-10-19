<script setup lang="ts">
import { computed, inject } from 'vue'

/**
 * Satu tab. `label` dibaca induknya dari vnode ini, jadi propnya wajib ada.
 *
 * Isinya tetap ada di DOM meski tab lain sedang dipilih — disembunyikan, bukan
 * dilepas. Itu disengaja: isi tab yang tidak terlihat tetap ikut terbaca mesin
 * pencari dan tetap bisa ditemukan lewat pencarian di halaman.
 */
const props = defineProps<{ value?: string, label: string }>()

const active = inject<() => string | undefined>('kliping-tab-active', () => undefined)
const panelValue = computed(() => props.value ?? props.label)
</script>

<template>
  <div
    class="kliping-tab"
    role="tabpanel"
    :data-value="panelValue"
    :hidden="active() !== undefined && active() !== panelValue"
  >
    <slot />
  </div>
</template>
