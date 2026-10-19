<script setup lang="ts">
/**
 * Kepala blok kode: nama berkas di kiri, tombol salin di kanan.
 *
 * Sumbernya menyalin lewat hook `useCopyToClipboard` miliknya sendiri. Di sini
 * yang dipakai `useClipboard` dari registry composable — sudah ada, sudah diuji,
 * dan sudah menangani hal yang lupa ditangani hook itu: peramban yang tidak
 * mengizinkan clipboard sama sekali.
 */
import { Check, Copy } from '@lucide/vue'
import { useClipboard } from '@/composables/use-clipboard'
import { Button } from '@/components/ui/button'
import VueLogo from '@/blocks/code-block-02/components/VueLogo.vue'

const props = defineProps<{ code: string }>()

const { copy, copied } = useClipboard({ copiedDuring: 2000 })
</script>

<template>
  <div class="flex items-center justify-between py-0.5 ps-2">
    <div class="flex items-center gap-2">
      <VueLogo class="h-4 w-4" />
      <span class="text-sm font-medium">ProfileCard.vue</span>
    </div>
    <Button class="size-8" size="icon" variant="ghost" @click="copy(props.code)">
      <Check v-if="copied" />
      <Copy v-else />
      <span class="sr-only">Copy code</span>
    </Button>
  </div>
</template>
