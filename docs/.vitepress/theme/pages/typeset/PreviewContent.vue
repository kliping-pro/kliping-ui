<script setup lang="ts">
import type { Settings } from './data'
import { computed } from 'vue'
import { ARTICLES, CHAT_QUESTION } from './article'
import { selectedFonts, typesetStyle, measureWidth } from './data'

/**
 * Naskah contoh yang ditata `typeset.css` dengan setelan yang diberikan.
 *
 * Setelannya dipasang lewat variabel `--typeset-*` di container-nya — API yang
 * sama persis dengan yang diberikan panel Docs kepada pemakai — bukan lewat
 * jalan pintas khusus pratinjau. Style inline menang atas nilai bawaan yang
 * dideklarasikan `typeset.css` di `@layer components`.
 *
 * Dipakai di kartu pratinjau penyusun dan di halaman lepasnya.
 */
const props = defineProps<{ settings: Settings }>()

const html = computed(() => ARTICLES[props.settings.item])
const typesetVars = computed(() => typesetStyle(props.settings))
const body = computed(() => selectedFonts(props.settings).body)
</script>

<template>
  <div class="flex justify-center px-5 pt-8 pb-24 sm:px-8 md:pt-16 md:pb-28" :style="{ fontFamily: body.stack }">
    <div class="w-full min-w-0" :style="{ maxWidth: measureWidth(settings) }">
      <!-- Gelembung pertanyaannya chrome halaman: sengaja di luar container
           typeset, jadi yang ditata hanya jawabannya. -->
      <div v-if="settings.item === 'chat'" class="mb-10 ml-auto w-fit max-w-[80%] rounded-lg bg-muted px-4 py-2.5 text-[15px] leading-relaxed">
        {{ CHAT_QUESTION }}
      </div>
      <!-- eslint-disable-next-line vue/no-v-html -- naskah statis milik situs sendiri -->
      <div class="typeset w-full" :style="typesetVars" v-html="html" />
    </div>
  </div>
</template>
