<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { CheckIcon, CopyIcon } from '@lucide/vue'
import type { Language } from './highlight'
import { useClipboard } from '@vueuse/core'
import { computed, onMounted } from 'vue'
import { cn } from '@/lib/utils'
import { prepareHighlighter, highlight } from './highlight'

/**
 * Blok kode kecil di panel Docs, dengan tombol salin di pojoknya.
 *
 * Dengan `lang`, kodenya disorot begitu penyorotnya siap; sampai saat itu —
 * dan di render server — yang tampil teks polos yang sama persis.
 */
const props = defineProps<{
  code: string
  lang?: Language
  class?: HTMLAttributes['class']
  /** Membungkus baris panjang, untuk teks seperti prompt. */
  wrap?: boolean
}>()

onMounted(() => {
  if (props.lang)
    prepareHighlighter()
})

const html = computed(() => (props.lang ? highlight(props.code, props.lang) : null))

const { copy, copied } = useClipboard({ copiedDuring: 1600, legacy: true })
</script>

<template>
  <div class="relative min-w-0 rounded-lg bg-(--code) text-(--code-foreground)">
    <pre
      :class="cn(
        'scrollbar-none overflow-x-auto p-3 pr-10 font-mono text-[13px] leading-relaxed',
        wrap && 'whitespace-pre-wrap break-words',
        props.class,
      )"
    ><code v-if="html" class="vp-code" v-html="html" /><code v-else>{{ code }}</code></pre>
    <button
      type="button"
      class="absolute top-2 right-2 flex size-7 items-center justify-center rounded-full opacity-70 transition-opacity hover:bg-pill hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-ring"
      :aria-label="copied ? 'Copied' : 'Copy code'"
      @click="copy(code)"
    >
      <CheckIcon v-if="copied" class="size-3.5" />
      <CopyIcon v-else class="size-3.5" />
    </button>
  </div>
</template>
