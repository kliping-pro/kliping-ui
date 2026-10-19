<script lang="ts">
export const description = "Pemicunya dimatikan, tooltipnya tetap muncul."
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
    <Tooltip disableHoverableContent>
      <TooltipTrigger as-child>
        <Button variant="outline">Hover</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>You can't hover over me</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
