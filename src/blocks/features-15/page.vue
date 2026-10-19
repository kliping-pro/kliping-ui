<script lang="ts">
export const description = "Fitur bergambar berselang-seling kiri dan kanan."
</script>

<script setup lang="ts">
const features = [
  {
    title: "Blazing Fast Performance",
    description:
      "Optimized for speed with minimal loading times and instant interactions.",
    image: "/samples/photos/photo-18.svg",
  },
  {
    title: "Fully Customizable",
    description: "Tailor every component to match your brand or workflow.",
    image: "/samples/photos/photo-19.svg",
  },
  {
    title: "Developer-Friendly",
    description: "Built with clean, modern code and best practices in mind.",
    image: "/samples/photos/photo-20.svg",
  },
  {
    title: "Responsive by Default",
    description:
      "Every component is designed to look great on all screen sizes.",
    image: "/samples/photos/photo-21.svg",
  },
  {
    title: "Accessible for Everyone",
    description: "Built with accessibility best practices in mind.",
    image: "/samples/photos/photo-22.svg",
  },
  {
    title: "Seamless Integration",
    description: "Easily connect with your favorite tools, APIs, and services.",
    image: "/samples/photos/photo-23.svg",
  },
]
</script>

<template>
  <div class="mx-auto flex max-w-7xl flex-col px-6 py-20">
    <h2 class="text-pretty text-center font-medium text-4xl tracking-[-0.04em] sm:text-[2.75rem]">
      Built with intention
    </h2>
    <p class="mt-3 text-pretty text-center text-muted-foreground text-xl -tracking-[0.01em] sm:text-2xl">
      Carefully structured blocks that feel right in projects
    </p>

    <div class="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-6 sm:mt-20 sm:grid-cols-2 lg:grid-cols-3">
      <div v-for="(feature, index) in features" class="rounded-lg border border-border/80" :key="index">
        <div class="mask-b-from-70% dark:mask-b-from-40% aspect-square w-full rounded-t-lg">
          <img
            alt=""
            class="size-full rounded-t-lg object-cover"
            :src="feature.image"
          />
        </div>

        <div class="-mt-3 p-6 pt-0">
          <h3 class="font-medium text-xl tracking-[-0.005em]">
            {{ feature.title }}
          </h3>
          <p class="mt-2 text-foreground/80 text-lg">
            {{ feature.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
