<script lang="ts">
export const description = "Tombol salin yang berganti jadi centang sesudah disalin."
</script>

<script setup lang="ts">
import { Check, Copy } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { useClipboard } from '@/composables/use-clipboard'

/**
 * Sumbernya membawa `useCopyToClipboard` sendiri, ditulis di berkas yang sama.
 * Di sini padanannya sudah ada sebagai composable di registry — lengkap dengan
 * jalur cadangan untuk konteks tidak aman, yang tidak dipunyai versi
 * sumbernya — jadi yang dipakai itu, bukan salinan kedua.
 */
const link = 'https://kliping.pro'

const { copied, copy } = useClipboard({ copiedDuring: 2000 })
</script>

<template>
  <div class="flex items-center overflow-hidden rounded-xl border bg-muted/70 p-0.75 ps-0">
    <p class="max-w-[25ch] select-all overflow-hidden text-ellipsis whitespace-nowrap pr-2 pl-3 text-sm">
      {{ link }}
    </p>
    <Button size="icon" @click="copy(link)">
      <Check v-if="copied" />
      <Copy v-else />
    </Button>
  </div>
</template>
