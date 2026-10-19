<script setup lang="ts">
import { Logo01, Logo02, Logo03, Logo04, Logo05, Logo06, Logo07, Logo08 } from '@/components/logos'

const logos = [Logo01, Logo02, Logo03, Logo04, Logo05, Logo06, Logo07, Logo08]
</script>

<template>
  <div class="grid w-full max-w-xl grid-cols-2 gap-x-10 gap-y-8 text-muted-foreground sm:grid-cols-4">
    <component :is="logo" v-for="(logo, i) in logos" :key="i" class="h-8 w-full" />
  </div>
</template>
