<script lang="ts">
export const description = "Deret logo satu baris dengan judul pendek di atasnya."
</script>

<script setup lang="ts">
import { Logo01, Logo02, Logo03, Logo04 } from "@/components/logos"
</script>

<template>
  <div class="flex min-h-screen items-center justify-center px-6">
    <div>
      <p class="text-center text-xl">
        More than 2.2 million companies worldwide already trust us
      </p>

      <div class="mt-14 flex flex-wrap items-center justify-center gap-14 *:h-10">
        <Logo01 />
        <Logo02 />
        <Logo03 />
        <Logo04 />
      </div>
    </div>
  </div>
</template>
