<script lang="ts">
export const description = "Petak logo integrasi berbingkai rapat."
</script>

<script setup lang="ts">
const integrations = [
  {
    title: "PostHog",
    description: "PostHog is an open-source product analytics tool.",
    url: "https://posthog.com/",
  },
  {
    title: "Zapier",
    description:
      "Automation tool for connecting and syncing data between different apps.",
    url: "https://zapier.com",
  },
  {
    title: "Webflow",
    description: "Website builder for creating and managing websites.",
    url: "https://webflow.com/",
    status: "pending",
  },
  {
    title: "Semrush",
    description: "SEO and digital marketing analytics platform.",
    url: "https://www.semrush.com/",
  },
  {
    title: "Mailchimp",
    description:
      "Marketing platform for creating, sending, and automating emails.",
    url: "https://mailchimp.com",
  },
  {
    title: "Sanity",
    description:
      "Content management system for creating and managing websites.",
    url: "https://sanity.io/",
    status: "pending",
  },
]
</script>

<template>
  <div class="mx-auto flex max-w-7xl flex-col px-6 py-12 sm:py-14">
    <h2 class="text-center font-medium text-4xl tracking-[-0.04em] sm:text-[2.75rem]">
      Plug into your stack
    </h2>
    <p class="mt-3 text-pretty text-center text-muted-foreground text-xl -tracking-[0.01em] sm:text-2xl">
      Connect your favorite tools and services to your account
    </p>
    <div class="mt-12 grid grid-cols-1 gap-6 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
      <div v-for="integration in integrations"
        class="relative flex flex-col items-start overflow-hidden border bg-card"
        :key="integration.title"
      >
        <div class="absolute inset-x-0 top-7 h-9.5 border-y border-dashed bg-muted/30" />
        <div class="absolute inset-y-0 left-7 w-9.5 border-x border-dashed bg-muted/30" />

        <div class="relative isolate flex items-start justify-between gap-5 p-6">
          <div class="w-fit shrink-0 rounded-3xl bg-transparent p-1">
            <div class="relative border bg-background">
              <img
                :alt="integration.title"
                class="absolute inset-0 size-9 blur-[36px]"
                :src="`https://www.google.com/s2/favicons?domain=${encodeURIComponent(integration.url)}&sz=64`"
              />
              <img
                :alt="integration.title"
                class="size-9"
                :src="`https://www.google.com/s2/favicons?domain=${encodeURIComponent(integration.url)}&sz=64`"
              />
            </div>
          </div>
          <div>
            <h3 class="py-2 font-medium text-xl">
              {{ integration.title }}
            </h3>
            <p class="mt-4 mb-2 text-pretty text-muted-foreground tracking-normal">
              {{ integration.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
