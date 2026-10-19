<script lang="ts">
export const description = "Bilah navigasi berbingkai dengan tombol ganda di kanan."
</script>

<script setup lang="ts">
import { Search } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Logo from '@/blocks/navbar-05/components/Logo.vue'
</script>

<template>
  <nav class="fixed inset-x-4 top-6 mx-auto h-16 max-w-(--breakpoint-xl) rounded-full border bg-background">
    <div class="mx-auto flex h-full items-center justify-between px-4">
      <div class="flex items-center gap-2 md:gap-6">
        <Logo class="shrink-0" />

        <div class="relative hidden md:block">
          <Search class="absolute inset-y-0 left-2.5 my-auto h-5 w-5" />
          <Input
            class="w-[280px] flex-1 rounded-full border-none bg-muted pl-10 shadow-none"
            placeholder="Search"
          />
        </div>
      </div>

      <div class="flex items-center gap-2">
        <Button
          class="rounded-full bg-muted text-foreground shadow-none hover:bg-accent md:hidden"
          size="icon"
        >
          <Search class="h-5! w-5!" />
        </Button>
        <Button
          class="hidden rounded-full sm:inline-flex"
          variant="outline"
        >
          Sign In
        </Button>
        <Button class="rounded-full">Get Started</Button>
      </div>
    </div>
  </nav>
</template>
