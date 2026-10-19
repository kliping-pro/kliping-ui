<script setup lang="ts">
import { Fps } from '@/components/fps'
</script>

<template>
  <!--
    `strategy="absolute"` menahannya di dalam kotak pratinjau ini. Bawaannya
    `fixed`, yang menempelkannya di sudut layar — benar untuk dipakai
    sungguhan, tapi di halaman dokumentasi ia akan melayang di atas isi
    halaman lain.
  -->
  <div class="relative h-32 w-full rounded-md border bg-muted/30">
    <Fps label="Frames" position="top-right" strategy="absolute" />
  </div>
</template>
