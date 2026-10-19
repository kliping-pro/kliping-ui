<script lang="ts">
export const description = "Tooltip bawaan, muncul saat kursor berhenti di atasnya."
</script>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
</script>

<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger as-child>
        <Button variant="outline">Hover</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Default Tooltip</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
