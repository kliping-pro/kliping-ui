<script lang="ts">
export const description = "Halaman 404 dengan daftar halaman yang mungkin dicari."
</script>

<script setup lang="ts">
import { ArrowRightIcon } from '@lucide/vue'
import { Button } from '@/components/ui/button'

const suggestions = [
  { label: "Home", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "Documentation", href: "#" },
  { label: "Contact", href: "#" },
]
</script>

<template>
  <div class="flex min-h-screen flex-col items-center justify-center px-6">
    <p class="select-none font-satoshi font-semibold text-[8rem] text-muted-foreground/75 leading-none tracking-tight">
      404
    </p>
    <h1 class="mt-2 font-medium text-3xl tracking-tight">
      Page not found
    </h1>
    <p class="mt-3 max-w-sm text-pretty text-center text-muted-foreground">
      The page you're looking for doesn't exist or has been moved.
    </p>

    <div class="mt-10 w-full max-w-xs">
      <p class="mb-3 text-center text-muted-foreground text-sm">
        You might be looking for:
      </p>
      <ul class="divide-y rounded-xl border">
        <li v-for="s in suggestions" class="group" :key="s.href">
          <a
            class="flex items-center justify-between px-4 py-3 text-sm transition-colors hover:bg-muted/50 group-first:rounded-t-xl group-last:rounded-b-xl"
            :href="s.href"
          >
            {{ s.label }}
            <ArrowRightIcon class="size-3.5 text-muted-foreground" />
          </a>
        </li>
      </ul>
    </div>

    <div class="mt-8 flex gap-3">
      <Button as-child>
        <a href="/">Go home</a>
      </Button>
      <Button as-child variant="outline">
        <a href="#">Contact support</a>
      </Button>
    </div>
  </div>
</template>
