<script lang="ts">
export const description = "Satu bagian yang bisa dilipat, dipicu tombol ikon di sampingnya."
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { ChevronsUpDown } from '@lucide/vue'
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
    class="w-[350px] space-y-2"
    v-model:open="isOpen"
  >
    <div class="flex items-center justify-between space-x-4 px-4">
      <h4 class="font-semibold text-sm">
        @peduarte starred 3 repositories
      </h4>
      <CollapsibleTrigger as-child>
        <Button size="sm" variant="ghost">
          <ChevronsUpDown class="h-4 w-4" />
          <span class="sr-only">Toggle</span>
        </Button>
      </CollapsibleTrigger>
    </div>
    <div class="rounded-md border px-4 py-2 font-mono text-sm shadow-xs">
      @radix-ui/primitives
    </div>
    <CollapsibleContent class="space-y-2">
      <div class="rounded-md border px-4 py-2 font-mono text-sm shadow-xs">
        @radix-ui/colors
      </div>
      <div class="rounded-md border px-4 py-2 font-mono text-sm shadow-xs">
        @stitches/react
      </div>
    </CollapsibleContent>
  </Collapsible>
</template>
