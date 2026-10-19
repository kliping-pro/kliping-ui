<script lang="ts">
export const description = "Petak logo integrasi tanpa tombol, hanya tampilan."
</script>

<script setup lang="ts">
const integrations = [
  {
    title: "PostHog",
    description: "PostHog is an open-source product analytics tool.",
    url: "https://posthog.com/",
  },
  {
    title: "Mailchimp",
    description:
      "Marketing platform for creating, sending, and automating emails.",
    url: "https://mailchimp.com",
  },
  {
    title: "Webflow",
    description: "Website builder for creating and managing websites.",
    url: "https://webflow.com/",
    status: "pending",
  },
  {
    title: "Stripe",
    description: "Payment processing for online businesses and platforms.",
    url: "https://stripe.com",
  },
  {
    title: "Sanity",
    description:
      "Content management system for creating and managing websites.",
    url: "https://sanity.io/",
    status: "pending",
  },
  {
    title: "Zapier",
    description:
      "Automation tool for connecting and syncing data between different apps and services.",
    url: "https://zapier.com",
  },
]
</script>

<template>
  <div class="mx-auto flex max-w-7xl flex-col px-6 py-12 sm:py-14">
    <h2 class="text-center font-medium text-4xl tracking-[-0.04em] sm:text-[2.75rem]">
      Easy integrations
    </h2>
    <p class="mt-3 text-pretty text-center text-muted-foreground text-xl -tracking-[0.01em] sm:text-2xl">
      Connect your favorite tools and services to your account
    </p>
    <div class="mt-12 grid grid-cols-1 gap-6 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
      <div v-for="integration in integrations"
        class="relative flex flex-col items-start border bg-card p-8"
        :key="integration.title"
      >
        <!-- Decorative borders -->
        <div class="absolute inset-x-0 bottom-0 h-2 w-full border-t border-dashed bg-muted/75" />
        <div class="absolute inset-x-0 top-0 h-2 w-full border-b border-dashed bg-muted/75" />
        <div class="absolute inset-y-0 left-0 h-full w-2 border-e border-dashed bg-muted/75" />
        <div class="absolute inset-y-0 right-0 h-full w-2 border-s border-dashed bg-muted/75" />

        <img
          :alt="integration.title"
          class="size-10 rounded"
          :src="`https://www.google.com/s2/favicons?domain=${encodeURIComponent(integration.url)}&sz=64`"
        />
        <h3 class="mt-5 font-medium text-xl">{{ integration.title }}</h3>
        <p class="mt-1.5 text-pretty text-muted-foreground tracking-normal">
          {{ integration.description }}
        </p>
      </div>
    </div>
  </div>
</template>
