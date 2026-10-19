<script lang="ts">
export const description = "Kartu artikel blog: sampul gradasi, tanggal, lama baca, dan tautan Read More."
</script>

<script setup lang="ts">
import { CalendarIcon } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
</script>

<template>
  <Card class="w-full max-w-md overflow-hidden">
    <div class="aspect-video w-full bg-gradient-to-br from-blue-500 to-purple-600" />
    <CardHeader>
      <div class="text-muted-foreground flex items-center gap-2 text-sm">
        <CalendarIcon class="h-4 w-4" />
        <span>March 15, 2025</span>
        <span>•</span>
        <span>5 min read</span>
      </div>
      <CardTitle>Getting Started with Vue</CardTitle>
      <CardDescription>
        Learn how to build modern web applications with Vue, Vite, and
        TypeScript.
      </CardDescription>
    </CardHeader>
    <CardFooter>
      <Button variant="ghost">
        Read More
      </Button>
    </CardFooter>
  </Card>
</template>
