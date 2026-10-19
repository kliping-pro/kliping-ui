<script lang="ts">
export const description = "Fitur bergambar dalam kartu berbingkai tiga kolom."
</script>

<script setup lang="ts">
const features = [
  {
    title: "Blazing Fast Performance",
    description:
      "Optimized for speed with minimal loading times and instant interactions.",
    image: "/samples/photos/photo-01.svg",
  },
  {
    title: "Fully Customizable",
    description: "Tailor every component to match your brand or workflow.",
    image: "/samples/photos/photo-02.svg",
  },
  {
    title: "Developer-Friendly",
    description: "Built with clean, modern code and best practices in mind.",
    image: "/samples/photos/photo-03.svg",
  },
  {
    title: "Responsive by Default",
    description:
      "Every component is designed to look great on all screen sizes.",
    image: "/samples/photos/photo-04.svg",
  },
  {
    title: "Accessible for Everyone",
    description: "Built with accessibility best practices in mind.",
    image: "/samples/photos/photo-05.svg",
  },
  {
    title: "Seamless Integration",
    description: "Easily connect with your favorite tools, APIs, and services.",
    image: "/samples/photos/photo-06.svg",
  },
]
</script>

<template>
  <div class="mx-auto flex max-w-7xl flex-col px-6 py-20">
    <h2 class="text-pretty text-center font-medium text-4xl tracking-[-0.04em] sm:text-[2.75rem]">
      Consistency first
    </h2>
    <p class="mt-3 text-pretty text-center text-muted-foreground text-xl -tracking-[0.01em] sm:text-2xl">
      Maintain a clean and consistent UI across your app
    </p>

    <div class="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-6 sm:mt-20 sm:grid-cols-2 lg:grid-cols-3">
      <div v-for="(feature, index) in features"
        class="relative rounded-lg border border-border/80"
        :key="index"
      >
        <div class="mask-b-from-50% dark:mask-b-from-40% aspect-4/5 w-full rounded-t-lg">
          <img
            alt=""
            class="size-full rounded-t-lg object-cover"
            :src="feature.image"
          />
        </div>

        <div class="mask-t-from-50% absolute inset-x-0 bottom-0 rounded-b-lg bg-background/80 p-6 pt-20">
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
