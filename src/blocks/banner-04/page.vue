<script lang="ts">
export const description = "Bilah ajakan mendaftar berbingkai ganda dengan dua tombol."
</script>

<script setup lang="ts">
import { UserPlusIcon } from '@lucide/vue'
import { Button } from '@/components/ui/button'
</script>

<template>
  <div class="px-6 py-10">
    <div class="mx-auto max-w-xl rounded-xl border bg-muted/70 p-0.75">
      <div class="shadow/5 flex flex-wrap items-center justify-between gap-3 rounded-lg border bg-background px-5 py-3.5">
        <div class="flex items-center gap-3">
          <div class="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            <UserPlusIcon class="size-5 shrink-0" />
          </div>
          <div>
            <p class="font-medium text-sm">Create your account</p>
            <p class="text-muted-foreground text-sm">
              Sign up to get started with our platform.
            </p>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <Button class="text-muted-foreground" size="sm" variant="ghost">
            Dismiss
          </Button>
          <Button size="sm">Sign up</Button>
        </div>
      </div>
    </div>
  </div>
</template>
