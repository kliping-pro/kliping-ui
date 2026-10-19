<script lang="ts">
export const description = "Daftar integrasi dengan penanda mana yang sudah tersambung."
</script>

<script setup lang="ts">
import { ArrowUpRight } from '@lucide/vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const integrations = [
  {
    title: "PostHog",
    description: "PostHog is an open-source product analytics tool.",
    url: "https://posthog.com/",
    status: "connected",
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
  <div class="my-12 px-6 sm:my-14">
    <div class="mx-auto flex w-full max-w-md flex-col rounded-lg border bg-muted p-1 shadow-lg/2">
      <div class="rounded-md border bg-card p-6">
        <h2 class="font-medium text-2xl tracking-tight">
          Our Integrations
        </h2>
        <p class="mt-1.5 text-pretty text-muted-foreground">
          Connect your favorite tools and services to your account and start
          using them in your app.
        </p>
        <div class="mx-auto mt-8 flex w-full flex-col gap-3">
          <div v-for="integration in integrations"
            class="flex items-center gap-3 rounded-lg border bg-card px-3 py-3"
            :key="integration.title"
          >
            <img
              :alt="integration.title"
              class="size-8 rounded"
              :src="`https://www.google.com/s2/favicons?domain=${encodeURIComponent(integration.url)}&sz=64`"
            />
            <h3 class="font-medium">{{ integration.title }}</h3>

            <Badge v-if="integration.status === 'connected'" class="ms-auto h-7 min-w-26 rounded-lg bg-emerald-600/10 px-3 text-emerald-700 text-sm dark:text-emerald-400">
              Connected
            </Badge>
            <Button v-else
              class="ms-auto h-7 min-w-26"
              size="sm"
              variant="outline"
            >
              Connect <ArrowUpRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
