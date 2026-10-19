<script lang="ts">
export const description = "Daftar yang dipotong, dengan tombol tampilkan lebih banyak."
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { ChevronDown, ChevronUp } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'

const isOpen = ref(false)

</script>

<template>
  <Collapsible
    class="w-full max-w-xs space-y-2"
    v-model:open="isOpen"
  >
    <div v-for="(_, index) in Array.from({ length: 2 })" class="flex items-center gap-2" :key="index">
      <div class="h-10 w-10 shrink-0 rounded-full bg-accent" />
      <div class="flex w-full flex-col gap-1.5">
        <div class="h-2.5 w-[40%] rounded-lg bg-accent" />
        <div class="h-2.5 w-full rounded-lg bg-accent" />
      </div>
    </div>
    <CollapsibleContent class="space-y-2">
      <div v-for="(_, index) in Array.from({ length: 3 })" class="flex items-center gap-2" :key="index + 2">
        <div class="h-10 w-10 shrink-0 rounded-full bg-accent" />
        <div class="flex w-full flex-col gap-1.5">
          <div class="h-2.5 w-[40%] rounded-lg bg-accent" />
          <div class="h-2.5 w-full rounded-lg bg-accent" />
        </div>
      </div>
    </CollapsibleContent>
    <CollapsibleTrigger as-child>
      <Button
        class="mt-4! data-[state=open]:hidden"
        size="sm"
        variant="outline"
      >
        Show more <ChevronDown />
      </Button>
    </CollapsibleTrigger>
    <CollapsibleTrigger as-child>
      <Button
        class="mt-4! hidden data-[state=open]:inline-flex"
        size="sm"
        variant="outline"
      >
        Show less <ChevronUp />
      </Button>
    </CollapsibleTrigger>
  </Collapsible>
</template>
