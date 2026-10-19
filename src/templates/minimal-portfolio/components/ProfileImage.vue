<script setup lang="ts">
import { cn } from "@/lib/utils"
import GithubLogo from '@/templates/minimal-portfolio/components/GithubLogo.vue'
</script>

<template>
  <div :class="cn('mt-10 w-48 h-48 md:w-64 md:h-64')">
    <div class="relative w-full h-full rounded-2xl overflow-hidden bg-accent">
      <img loading="lazy" src="/placeholder.svg" alt="" class="object-cover" fill />
    </div>
  </div>
</template>
