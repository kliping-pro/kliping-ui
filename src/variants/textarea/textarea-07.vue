<script lang="ts">
export const description = "Nilainya dipegang halaman, bukan komponennya sendiri."
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { Textarea } from '@/components/ui/textarea'

/**
 * Sumbernya membaca nilainya dari `e.target.value` di dalam `onChange`. Di
 * sini `v-model` sudah melakukan hal yang sama, dan lebih tepat: `change` di
 * DOM baru menyala saat isian ditinggalkan, sementara yang diperagakan
 * demo ini nilai yang mengikuti tiap ketikan.
 */
const message = ref('')
</script>

<template>
  <Textarea v-model="message" placeholder="Type your message here." />
</template>
