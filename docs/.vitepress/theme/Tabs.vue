<script setup lang="ts">
import type { VNode } from 'vue'
import { computed, provide, ref, useSlots } from 'vue'

/**
 * Tab untuk isi markdown — padanan `:::code-tabs` milik Nuxt Content.
 *
 * Daftar pemicunya dibaca langsung dari vnode anaknya, bukan dari anak yang
 * mendaftarkan diri lewat provide/inject. Alasannya urutan: setup anak baru
 * berjalan setelah induknya selesai merender, jadi cara mendaftar itu
 * menghasilkan deretan tab kosong pada render pertama — dan render pertama
 * adalah satu-satunya render yang terjadi saat halaman statis dibangun.
 */
const slots = useSlots()

interface TabEntry { value: string, label: string }

/** Ratakan fragment: markdown membungkus anaknya beberapa lapis. */
function flatten(nodes: VNode[]): VNode[] {
  return nodes.flatMap(v => Array.isArray(v.children) && typeof v.type === 'symbol'
    ? flatten(v.children as VNode[])
    : [v])
}

const tabs = computed<TabEntry[]>(() =>
  flatten(slots.default?.() ?? [])
    .filter(v => v.props?.label)
    .map(v => ({ value: String(v.props!.value ?? v.props!.label), label: String(v.props!.label) })),
)

const chosen = ref<string>()
const active = computed(() => chosen.value ?? tabs.value[0]?.value)

// Anaknya menyembunyikan dirinya sendiri: hanya panel itu yang tahu nilainya,
// dan CSS tidak bisa membandingkan dua atribut.
provide('kliping-tab-active', () => active.value)
</script>

<template>
  <div class="kliping-tabs my-6" :data-active="active">
    <div class="kliping-tabs-list" role="tablist">
      <button
        v-for="t in tabs"
        :key="t.value"
        type="button"
        role="tab"
        :aria-selected="t.value === active"
        :class="{ active: t.value === active }"
        @click="chosen = t.value"
      >
        {{ t.label }}
      </button>
    </div>
    <div class="kliping-tabs-content">
      <slot />
    </div>
  </div>
</template>
