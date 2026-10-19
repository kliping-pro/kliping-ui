<script lang="ts">
export const description = "Nilainya dipegang halaman, bukan komponennya sendiri."
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { Switch } from '@/components/ui/switch'

const checked = ref<boolean>()

</script>

<template>
  <Switch v-model="checked" />
</template>
