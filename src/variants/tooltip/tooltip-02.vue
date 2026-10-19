<script lang="ts">
export const description = "Dengan panah kecil yang menunjuk pemicunya."
</script>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { TooltipArrow } from 'reka-ui'
</script>

<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger as-child>
        <Button variant="outline">Hover</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Tooltip with arrow</p>
        <TooltipArrow class="fill-foreground" />
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
