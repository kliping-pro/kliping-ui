<script setup lang="ts">
defineProps<{
  projects: { name: string; description: string; image: string }[]
}>()
</script>

<template>
  <div class="grid grid-cols-1 gap-4 p-3 *:h-72 sm:grid-cols-2">
    <div v-for="project in projects"
      class="relative flex flex-col overflow-hidden rounded-xl border border-border/60 bg-background p-1 shadow-[0_0_15px_rgba(0,0,0,0.05)] dark:border-border/85 dark:shadow-[0_0_20px_rgba(0,0,0,0.4)]"
      :key="project.name"
    >
      <div class="mask-b-from-50% dark:mask-b-from-10% dark:mask-b-to-70% size-full rounded-lg">
        <img
          :alt="project.name"
          class="size-full rounded-lg object-cover"
          :src="project.image"
        >
      </div>

      <div class="mask-t-from-50% absolute inset-x-0 bottom-0 rounded-b-xl bg-background/80 p-6 pt-20">
        <h3 class="font-medium text-xl tracking-[-0.005em]">
          {{ project.name }}
        </h3>
        <p class="mt-1.5 text-base text-foreground/90">
          {{ project.description }}
        </p>
      </div>
    </div>
  </div>
</template>
