<script lang="ts">
export const description = "Deret logo tanpa judul, rapat di tengah halaman."
</script>

<script setup lang="ts">
import {
  Logo01,
  Logo02,
  Logo03,
  Logo04,
  Logo05,
  Logo06,
  Logo07,
  Logo08,
} from "@/components/logos"
</script>

<template>
  <div class="flex min-h-screen items-center justify-center px-6">
    <div>
      <p class="text-center text-xl">
        More than 2.2 million companies worldwide already trust us
      </p>

      <div class="mt-20 flex max-w-(--breakpoint-lg) flex-wrap items-center justify-center gap-x-14 gap-y-12 *:h-10">
        <Logo01 />
        <Logo02 />
        <Logo03 />
        <Logo04 />
        <Logo05 />
        <Logo06 />
        <Logo07 />
        <Logo08 />
      </div>
    </div>
  </div>
</template>
