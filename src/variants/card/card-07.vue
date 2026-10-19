<script lang="ts">
export const description = "Kartu ringkas berikon dengan satu tombol di kakinya."
</script>

<script setup lang="ts">
import { ArrowRight, Shapes } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
</script>

<template>
  <Card class="max-w-xs gap-0 pt-0 shadow-none">
    <CardHeader class="flex flex-row items-center gap-3 px-5 py-4 font-semibold">
      <div class="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
        <Shapes class="h-5 w-5" />
      </div>
      Acme UI
    </CardHeader>

    <CardContent class="mt-1 px-5 text-[15px] text-muted-foreground">
      <p>
        Explore a collection of UI blocks and components, ready to
        preview and copy.
      </p>
      <div class="mt-5 aspect-video w-full rounded-xl bg-muted" />
    </CardContent>

    <CardFooter class="mt-6">
      <Button class="/blocks">
        Explore Blocks <ArrowRight />
      </Button>
    </CardFooter>
  </Card>
</template>
