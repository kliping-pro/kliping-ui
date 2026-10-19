<script setup lang="ts">
defineProps<{
  label: string
  value: string
}>()
</script>

<template>
  <div>
    <h3 class="mb-1 font-medium text-muted-foreground text-sm">
      {{ label }}
    </h3>
    <p class="text-foreground">{{ value }}</p>
  </div>
</template>
