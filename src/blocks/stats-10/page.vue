<script lang="ts">
export const description = "Angka berdampingan dengan ajakan bertindak di sebelahnya."
</script>

<script setup lang="ts">
import { ArrowUpRightIcon } from '@lucide/vue'
import { cn } from "@/lib/utils"
import { Button } from '@/components/ui/button'
</script>

<template>
  <div class="mx-auto flex max-w-5xl flex-col items-start gap-14 px-6 py-20 sm:gap-10 md:flex-row">
    <div class="max-w-md lg:max-w-lg">
      <h2 class="font-medium text-4xl tracking-[-0.04em] md:text-[2.75rem]">
        Numbers that matter
      </h2>
      <p class="mt-3.5 text-muted-foreground text-xl tracking-[-0.01em] md:text-2xl/normal">
        Continuously improving with feedback from developers building modern
        applications.
      </p>
      <Button class="mt-8 sm:mt-10" size="lg">
        View all stats <ArrowUpRightIcon />
      </Button>
    </div>

    <div
      :class="cn(
        'grow',
        'space-y-4 *:space-y-3 *:rounded-xl *:bg-muted *:p-6 dark:*:bg-muted/70'
      )"
    >
      <div class="">
        <div class="font-medium text-5xl">96%</div>
        <p class="text-foreground/80 text-lg">
          of customers say they have a better brand experience
        </p>
      </div>
      <div class="">
        <div class="font-medium text-5xl">95%</div>
        <p class="text-foreground/80 text-lg">
          of customers say they gather more data, more easily
        </p>
      </div>
      <div class="">
        <div class="font-medium text-5xl">87%</div>
        <p class="text-foreground/80 text-lg">
          of customers say they reveal deeper insights from data
        </p>
      </div>
    </div>
  </div>
</template>
