<script lang="ts">
export const description = "Jeda sebelum muncul bisa diatur sendiri."
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

const delayDuration = ref<number | undefined>(500)

function setDelayDuration(value: number | undefined) {
  delayDuration.value = value
}

const handleDelayDurationChange = (e: Event) => {
    setDelayDuration(
      (e.target as HTMLInputElement).value === "" ? undefined : Math.max(0, +(e.target as HTMLInputElement).value)
    );
  }
</script>

<template>
  <div class="flex flex-col items-center gap-6">
    <TooltipProvider>
      <Tooltip :delay-duration="delayDuration">
        <TooltipTrigger as-child>
          <Button variant="outline">Hover</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Hello there!</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>

    <div>
      <Label>Delay</Label>
      <Input
        class="mt-2"
        @change="handleDelayDurationChange"
        type="number"
        :value="delayDuration"
      />
    </div>
  </div>
</template>
