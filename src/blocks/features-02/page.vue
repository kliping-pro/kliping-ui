<script lang="ts">
export const description = "Fitur bergambar tanpa ikon, ditaruh di tengah."
</script>

<script setup lang="ts">
const features = [
  {
    title: "Identify Opportunities",
    description: "Find untapped areas to explore effortlessly.",
    image: "/samples/photos/photo-12.svg",
  },
  {
    title: "Build Authority",
    description: "Craft content that resonates and inspires trust.",
    image: "/samples/photos/photo-13.svg",
  },
  {
    title: "Instant Insights",
    description: "Get actionable insights instantly at a glance.",
    image: "/samples/photos/photo-14.svg",
  },
]
</script>

<template>
  <div class="flex min-h-screen items-center justify-center px-6 py-20">
    <div class="w-full grow sm:max-w-(--breakpoint-md) lg:max-w-(--breakpoint-lg)">
      <h2 class="mx-auto text-center font-medium text-4xl tracking-[-0.045em] sm:text-[2.75rem]/[1.2]">
        Where ideas take shape
      </h2>
      <p class="mt-3 text-pretty text-center text-lg text-muted-foreground tracking-[-0.01em] sm:text-2xl">
        No complex configs. Just copy, paste, and start building
      </p>
      <div class="mt-18 grid w-full gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="feature in features"
          class="flex w-full flex-col text-start"
          :key="feature.title"
        >
          <div class="relative mb-5 aspect-4/5 w-full overflow-hidden rounded-xl sm:mb-6">
            <img
              alt=""
              class="size-full bg-muted object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              :src="feature.image"
            />
          </div>
          <div class="px-1">
            <span class="font-medium text-[22px] tracking-[-0.015em]">
              {{ feature.title }}
            </span>
            <p class="mt-1 max-w-[25ch] text-[17px] text-muted-foreground">
              {{ feature.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
