<script setup lang="ts">
defineProps<{
  title: string
  items: string[]
}>()
</script>

<template>
  <div>
    <h4 class="mb-1 flex items-center gap-2 font-medium text-foreground text-lg">
      {{ title }}
    </h4>
    <ul class="list-disc pl-5">
      <li v-for="item in items" :key="item">{{ item }}</li>
    </ul>
  </div>
</template>
