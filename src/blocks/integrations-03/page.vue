<script lang="ts">
export const description = "Petak kartu integrasi dengan badge status di tiap kartu."
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
    status: "pending",
  },
  {
    title: "Notion",
    description:
      "Note-taking and project management tool for organizing ideas, tasks, and documents.",
    url: "https://notion.com",
    status: "pending",
  },
  {
    title: "Stripe",
    description: "Payment processing for online businesses and platforms.",
    url: "https://stripe.com",
    status: "pending",
  },
  {
    title: "Resend",
    description: "Email platform for developers to send, track, and manage.",
    url: "https://resend.com",
    status: "pending",
  },
  {
    title: "Zapier",
    description:
      "Automation tool for connecting and syncing data between different apps and services.",
    url: "https://zapier.com",
    status: "pending",
  },
  {
    title: "Cal.com",
    description:
      "Calendar booking tool for scheduling meetings and appointments.",
    url: "https://cal.com/",
    status: "pending",
  },
  {
    title: "Linear",
    description: "Project management tool for tracking tasks and projects.",
    url: "https://linear.app/",
    status: "connected",
  },
  {
    title: "Plausible",
    description:
      "Analytics tool for tracking website traffic and user behavior.",
    url: "https://plausible.io/",
    status: "pending",
  },
  {
    title: "Webflow",
    description: "Website builder for creating and managing websites.",
    url: "https://webflow.com/",
    status: "pending",
  },
  {
    title: "Sanity",
    description:
      "Content management system for creating and managing websites.",
    url: "https://sanity.io/",
    status: "pending",
  },
  {
    title: "Clerk",
    description: "Authentication for your website and application.",
    url: "https://clerk.com/",
    status: "pending",
  },
]
</script>

<template>
  <div class="mx-auto flex max-w-7xl flex-col px-6 py-12 sm:py-14">
    <h2 class="text-center font-medium text-4xl tracking-[-0.04em] sm:text-[2.75rem]">
      Connect your tools
    </h2>
    <p class="mt-3 text-pretty text-center text-muted-foreground text-xl -tracking-[0.01em] sm:text-2xl">
      Connect your favorite tools and services to your account
    </p>
    <div class="mt-12 grid grid-cols-1 gap-5 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
      <div v-for="integration in integrations"
        class="flex items-center gap-4 rounded-lg border border-border/85 bg-card pe-4 shadow-xs/2"
        :key="integration.title"
      >
        <div class="border-e border-dashed p-4">
          <img
            :alt="integration.title"
            class="size-8 rounded"
            :src="`https://www.google.com/s2/favicons?domain=${encodeURIComponent(integration.url)}&sz=64`"
          />
        </div>
        <h3 class="font-medium text-lg">{{ integration.title }}</h3>

        <Badge v-if="integration.status === 'connected'" class="ms-auto h-7 min-w-26 rounded-lg bg-emerald-600/10 px-3 text-emerald-700 text-sm dark:text-emerald-400">
          Connected
        </Badge>
        <Button v-else class="ms-auto h-7.5" size="sm" variant="outline">
          Connect <ArrowUpRight />
        </Button>
      </div>
    </div>
  </div>
</template>
