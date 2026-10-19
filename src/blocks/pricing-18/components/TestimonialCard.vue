<script setup lang="ts">
defineProps<{
  quote: string
  name: string
  role: string
}>()
</script>

<template>
  <figure class="flex flex-col justify-between gap-6 rounded-lg bg-muted/60 p-6">
    <div>
      <slot name="icon" />
      <blockquote class="mt-3 text-sm leading-relaxed">
        “{{ quote }}”
      </blockquote>
    </div>
    <figcaption class="flex items-center gap-3">
      <slot name="avatar" />
      <div>
        <p class="font-medium text-sm">{{ name }}</p>
        <p class="text-muted-foreground text-xs">{{ role }}</p>
      </div>
    </figcaption>
  </figure>
</template>
