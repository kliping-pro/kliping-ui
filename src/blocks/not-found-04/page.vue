<script lang="ts">
export const description = "Halaman 404 dengan kotak pencarian."
</script>

<script setup lang="ts">
import { ArrowLeftIcon, SearchIcon, SearchXIcon } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
</script>

<template>
  <div class="flex min-h-screen flex-col items-center justify-center px-6 text-center">
    <div class="flex size-12 items-center justify-center rounded-2xl border bg-muted">
      <SearchXIcon class="size-6 text-muted-foreground" />
    </div>
    <h1 class="mt-6 font-medium text-4xl/none tracking-tight">
      Page not found
    </h1>
    <p class="mt-4 max-w-sm text-pretty text-muted-foreground">
      Can't find what you're looking for?
      Try&nbsp;searching&nbsp;below.
    </p>
    <form action="/search" class="mt-8 w-full max-w-sm">
      <div class="relative">
        <SearchIcon class="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          class="pl-9"
          name="q"
          placeholder="Search..."
          type="search"
        />
      </div>
      <Button class="mt-3 w-full" type="submit">
        Search
      </Button>
    </form>
    <Button as-child class="mt-6" variant="link">
      <a
        class="underline underline-offset-4 hover:text-foreground"
        href="#"
      >
        <ArrowLeftIcon /> Go back home
      </a>
    </Button>
  </div>
</template>
