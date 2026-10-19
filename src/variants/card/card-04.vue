<script lang="ts">
export const description = "Kartu ajakan bertindak selebar dua kolom, rata tengah."
</script>

<script setup lang="ts">
import { ArrowUpRight, CirclePlay } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
</script>

<template>
  <Card class="w-full max-w-2xl bg-muted py-10 text-center shadow-none">
    <CardHeader class="px-4 sm:px-8">
      <CardTitle class="mb-2 font-medium text-3xl tracking-tight sm:text-4xl">
        Power up your scheduling
      </CardTitle>
      <CardDescription class="mx-auto max-w-lg text-lg text-muted-foreground">
        Get started with the world's leading Scheduling Automation
        Platform in seconds - for free.
      </CardDescription>
    </CardHeader>
    <CardContent class="mx-auto mt-4 flex flex-col gap-2 px-4 sm:flex-row sm:px-8">
      <Button size="lg">
        Sign up for free <ArrowUpRight /> 
      </Button>
      <Button size="lg" variant="outline">
        Get a demo <CirclePlay />
      </Button>
    </CardContent>
  </Card>
</template>
