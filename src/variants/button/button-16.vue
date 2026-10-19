<script lang="ts">
export const description = "Pengalih tema terang dan gelap."
</script>

<script setup lang="ts">
import { MoonIcon, SunIcon } from '@lucide/vue'
import { useDark, useToggle } from '@vueuse/core'
import { Button } from '@/components/ui/button'

/**
 * Sumbernya memakai `useTheme()` dari `next-themes`, dan menahan gambarnya
 * sampai komponennya terpasang supaya server dan peramban tidak berselisih.
 *
 * Di sini penyimpanannya disamakan dengan tema situsnya sendiri — kunci
 * `vitepress-theme-appearance` — jadi tombol ini dan pengalih di bilah atas
 * halaman menggerakkan hal yang sama, bukan dua keadaan yang saling menimpa.
 */
const isDark = useDark({
  storageKey: 'vitepress-theme-appearance',
  valueDark: 'dark',
  valueLight: 'light',
})

const toggleDark = useToggle(isDark)
</script>

<template>
  <Button class="rounded-full" size="icon" @click="toggleDark()">
    <ClientOnly>
      <SunIcon v-if="isDark" />
      <MoonIcon v-else />
    </ClientOnly>
  </Button>
</template>
