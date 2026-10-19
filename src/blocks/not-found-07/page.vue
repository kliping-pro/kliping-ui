<script lang="ts">
export const description = "Halaman 404 dengan angka yang bergetar seperti sinyal rusak."
</script>

<script setup lang="ts">
/**
 * Angkanya diteruskan lewat prop `text`, bukan sebagai anak seperti di
 * sumbernya. `GlitchText` menggambar bayangannya dengan `::before` dan
 * `::after`, dan `content: attr(data-text)` cuma bisa membaca atribut — jadi
 * teksnya harus sampai ke sana sebagai string, bukan sebagai simpul.
 */
import GlitchText from '@/blocks/not-found-07/components/GlitchText.vue'
import { Button } from '@/components/ui/button'
</script>

<template>
  <div class="flex min-h-screen flex-col items-center justify-center px-6 text-center">
    <div class="relative select-none">
      <GlitchText
        class="tracking-[0.15em]"
        :enable-on-hover="false"
        enable-shadows
        :speed="1"
        text="404"
      />
    </div>
    <h1 class="mt-2 text-2xl font-semibold tracking-tight">
      You found the void
    </h1>
    <p class="mt-3 max-w-sm text-muted-foreground">
      This page doesn't exist, but you found it anyway. Unfortunately,
      there's nothing here — just empty space and broken dreams.
    </p>
    <!-- Dua tombolnya ditumpuk di tengah bila tidak muat sebaris. -->
    <div class="mt-8 flex flex-wrap justify-center gap-3">
      <Button as-child>
        <a href="#">Escape the void</a>
      </Button>
      <Button as-child variant="outline">
        <a href="#">Send a distress signal</a>
      </Button>
    </div>
  </div>
</template>
