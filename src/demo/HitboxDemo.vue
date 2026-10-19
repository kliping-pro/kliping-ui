<script setup lang="ts">
import { X } from '@lucide/vue'
import { Hitbox } from '@/components/hitbox'
import { Button } from '@/components/ui/button'
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="flex items-center gap-8">
      <Hitbox debug radius="full" size="lg">
        <Button class="size-6 rounded-full p-0" size="icon" variant="outline" aria-label="Close">
          <X class="size-3" />
        </Button>
      </Hitbox>

      <Hitbox radius="full" size="lg">
        <Button class="size-6 rounded-full p-0" size="icon" variant="outline" aria-label="Close">
          <X class="size-3" />
        </Button>
      </Hitbox>
    </div>

    <p class="text-muted-foreground text-sm">
      Both look the same size. The left one draws its hit area with
      <code>debug</code>; the right one has the same area, it's just
      invisible.
    </p>
  </div>
</template>
