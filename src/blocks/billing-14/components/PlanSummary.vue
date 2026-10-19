<script setup lang="ts">
import { CheckIcon, SparklesIcon } from '@lucide/vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const FEATURES = [
  "Up to 10 team seats",
  "250k API requests / month",
  "100 GB file storage",
  "Priority email support",
]
</script>

<template>
  <Card class="relative overflow-hidden">
    <div
      class="from-primary/10 pointer-events-none absolute inset-x-0 top-0 h-32 bg-linear-to-b to-transparent"
      aria-hidden="true"
    />
    <CardHeader class="relative">
      <CardDescription class="flex items-center gap-2">
        <SparklesIcon class="text-primary size-4" />
        Current plan
      </CardDescription>
      <CardTitle class="flex flex-wrap items-center gap-2 text-2xl">
        Pro
        <Badge variant="secondary">Monthly</Badge>
      </CardTitle>
      <CardAction>
        <Badge variant="outline" class="border-primary/30 text-primary">Active</Badge>
      </CardAction>
    </CardHeader>
    <CardContent class="relative space-y-6">
      <div>
        <p class="text-4xl font-semibold tracking-tight tabular-nums">
          $1,240
          <span class="text-muted-foreground text-base font-normal">/ month</span>
        </p>
        <p class="text-muted-foreground mt-1 text-sm">
          Renews on <span class="text-foreground font-medium">Nov 1, 2026</span> · 8 of 10 seats used
        </p>
      </div>
      <ul class="grid gap-2 text-sm sm:grid-cols-2">
        <li v-for="feature in FEATURES" :key="feature" class="flex items-center gap-2">
          <CheckIcon class="text-primary size-4 shrink-0" />
          {{ feature }}
        </li>
      </ul>
    </CardContent>
    <CardFooter class="relative flex-wrap gap-2 border-t">
      <Button>Upgrade to Business</Button>
      <Button variant="outline">Change plan</Button>
      <Button variant="ghost" class="text-muted-foreground sm:ml-auto">Cancel subscription</Button>
    </CardFooter>
  </Card>
</template>
