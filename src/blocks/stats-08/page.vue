<script lang="ts">
export const description = "Tiga angka setinggi layar penuh, ditaruh di tengah."
</script>

<script setup lang="ts">
import Shape1 from '@/blocks/stats-08/components/Shape1.vue'
import Shape2 from '@/blocks/stats-08/components/Shape2.vue'
import Shape3 from '@/blocks/stats-08/components/Shape3.vue'
</script>

<template>
  <div class="flex min-h-screen items-center justify-center">
    <div class="mx-auto max-w-(--breakpoint-xl) py-12 text-center">
      <h2 class="font-medium text-4xl tracking-[-0.04em] md:text-[2.75rem]">
        Why Should You Choose Us?
      </h2>
      <p class="mt-3.5 text-muted-foreground text-xl md:text-2xl">
        Because after switching to us...
      </p>

      <div class="px-6">
        <div class="mx-auto mt-16 grid max-w-5xl justify-center gap-x-8 gap-y-8 sm:mt-24 sm:grid-cols-2 lg:grid-cols-3">
          <div class="flex flex-col items-center rounded-xl bg-foreground/95 px-6 py-12 dark:bg-foreground/5">
            <Shape1 class="size-14" />
            <span class="mt-10 font-medium text-5xl text-background dark:text-foreground">
              96%
            </span>
            <p class="mt-6 text-background/80 text-lg dark:text-foreground/80">
              of customers say they have a better brand experience
            </p>
          </div>
          <div class="flex flex-col items-center rounded-xl bg-foreground/95 px-6 py-12 dark:bg-foreground/5">
            <Shape2 class="size-14" />
            <span class="mt-10 font-medium text-5xl text-background dark:text-foreground">
              95%
            </span>
            <p class="mt-6 text-background/80 text-lg dark:text-foreground/80">
              of customers say they gather more data, more easily
            </p>
          </div>
          <div class="flex flex-col items-center rounded-xl bg-foreground/95 px-6 py-12 dark:bg-foreground/5">
            <Shape3 class="size-14" />
            <span class="mt-10 font-medium text-5xl text-background dark:text-foreground">
              87%
            </span>
            <p class="mt-6 text-background/80 text-lg dark:text-foreground/80">
              of customers say they reveal deeper insights from data
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
