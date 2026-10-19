<script lang="ts">
export const description = "Hero dua kolom dengan media setinggi layar di sebelah kanan."
</script>

<script setup lang="ts">
import { ArrowUpRight, CirclePlay } from '@lucide/vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
</script>

<template>
  <div class="flex min-h-screen items-center justify-center overflow-hidden">
    <div class="mx-auto grid w-full max-w-(--breakpoint-xl) gap-12 px-6 py-12 lg:grid-cols-2 lg:py-0">
      <div class="my-auto">
        <Badge
          as-child
          class="rounded-full border-border py-1"
          variant="secondary"
        >
          <a href="#">
            Just released v1.0.0 <ArrowUpRight class="ml-1 size-4" />
          </a>
        </Badge>
        <h1 class="mt-6 max-w-[17ch] font-medium text-4xl leading-[1.2]! tracking-[-0.04em] md:text-5xl lg:text-[2.75rem] xl:text-[3.25rem]">
          A better way to build clean interfaces
        </h1>
        <p class="mt-4 max-w-[60ch] text-foreground/60 text-lg sm:mt-6 sm:text-xl/normal">
          Explore a collection of UI blocks and components, ready to
          preview and copy. Streamline your development workflow with
          easy-to-implement examples.
        </p>
        <div class="mt-8 flex items-center gap-4 sm:mt-12">
          <Button class="rounded-full" size="lg">
            Get Started <ArrowUpRight class="h-5! w-5!" />
          </Button>
          <Button
            class="rounded-full shadow-none"
            size="lg"
            variant="outline"
          >
            <CirclePlay class="h-5! w-5!" /> Watch Demo
          </Button>
        </div>
      </div>
      <div class="aspect-video w-full rounded-xl bg-accent lg:aspect-auto lg:h-[calc(100vh-4rem)] lg:w-[1000px]" />
    </div>
  </div>
</template>
