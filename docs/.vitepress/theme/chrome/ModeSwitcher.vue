<script setup lang="ts">
import { MoonIcon, SunIcon } from '@lucide/vue'
import { useData } from 'vitepress'
import { Button } from '@/components/ui/button'

// `isDark` datang dari inti VitePress, bukan dari tema bawaannya: yang menyimpan
// pilihan pembaca dan memasang kelas `.dark` di <html> — termasuk skrip kecil di
// <head> yang mencegah kedipan putih sebelum Vue jalan — semuanya ada di inti.
// Jadi mengganti temanya tidak mengorbankan apa pun dari mode gelap.
const { isDark, theme } = useData()
</script>

<template>
  <Button
    size="sm"
    variant="ghost"
    class="group/toggle size-8 rounded-full shadow-none hover:bg-pill"
    :title="isDark ? theme.lightModeSwitchTitle : theme.darkModeSwitchTitle"
    @click="isDark = !isDark"
  >
    <SunIcon class="hidden size-4 dark:block" />
    <MoonIcon class="size-4 dark:hidden" />
    <span class="sr-only">{{ theme.darkModeSwitchLabel ?? 'Appearance' }}</span>
  </Button>
</template>
