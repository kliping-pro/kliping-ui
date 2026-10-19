<script lang="ts">
export const description = "Digambar di luar induknya, jadi tidak terpotong wadahnya."
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
      <TooltipContent forceMount>
        <p>I'm in a Portal</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
