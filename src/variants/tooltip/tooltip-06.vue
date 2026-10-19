<script lang="ts">
export const description = "Setelah satu tooltip terbuka, tetangganya muncul tanpa jeda."
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

const skipDelayDuration = ref<
    number | undefined
  >(300)

function setSkipDelayDuration(value: 
    number | undefined
  ) {
  skipDelayDuration.value = value
}

const handleDelayDurationChange = (e: Event) => {
    setSkipDelayDuration(
      (e.target as HTMLInputElement).value === "" ? undefined : Math.max(0, +(e.target as HTMLInputElement).value)
    );
  }
</script>

<template>
  <div class="flex flex-col items-center gap-6">
    <TooltipProvider :skip-delay-duration="skipDelayDuration">
      <div class="flex gap-2">
        <Tooltip>
          <TooltipTrigger as-child>
            <Button variant="outline">Hover Here First</Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Hello there!</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger as-child>
            <Button variant="outline">Then Hover Here</Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Hello there!</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>

    <div>
      <Label>Skip delay duration</Label>
      <Input
        class="mt-2"
        @change="handleDelayDurationChange"
        type="number"
        :value="skipDelayDuration"
      />
    </div>
  </div>
</template>
