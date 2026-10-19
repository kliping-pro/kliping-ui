<!-- example: 1. Controlled -->
<script setup lang="ts">
import type { TourStep } from '@/components/tour'
import { ref } from 'vue'
import {
  Tour,
  TourClose,
  TourContent,
  TourDescription,
  TourNext,
  TourOverlay,
  TourPrevious,
  TourProgress,
  TourTitle,
} from '@/components/tour'
import { Button } from '@/components/ui/button'

const open = ref(false)
// Langkah aktif dikendalikan dari luar lewat `v-model:step`.
const step = ref(0)

const steps: TourStep[] = [
  { id: 'title', target: '#controlled-title', title: 'Controlled Tour', description: 'This tour is driven by state outside the component.', side: 'bottom' },
  { id: 'first', target: '#controlled-step-1', title: 'Step 1', description: 'The Prev and Next buttons above move the tour too.', side: 'top' },
  { id: 'second', target: '#controlled-step-2', title: 'Step 2', description: 'A new card appears once you reach this step.', side: 'top' },
  { id: 'third', target: '#controlled-step-3', title: 'Step 3', description: 'This target was rendered only after step 2.', side: 'top' },
]

function start() {
  step.value = 0
  open.value = true
}

function reset() {
  open.value = false
  step.value = 0
}
</script>

<template>
  <Tour v-model:open="open" v-model:step="step" :steps="steps" @complete="reset" @skip="reset">
    <div class="flex w-full flex-col items-center gap-8 p-4">
      <div class="flex flex-col items-center gap-4">
        <h3 id="controlled-title" class="font-bold text-2xl">
          Controlled Tour
        </h3>
        <div class="flex items-center gap-2">
          <Button @click="start">
            Start
          </Button>
          <Button variant="outline" :disabled="!open || step === 0" @click="step = Math.max(0, step - 1)">
            Prev
          </Button>
          <Button variant="outline" :disabled="!open || step === steps.length - 1" @click="step = Math.min(steps.length - 1, step + 1)">
            Next
          </Button>
        </div>
      </div>
      <div class="flex w-full flex-col gap-6">
        <div class="grid grid-cols-2 gap-6">
          <div id="controlled-step-1" class="rounded-lg border p-6 text-center">
            <h4 class="font-semibold">
              Step 1
            </h4>
            <p class="text-muted-foreground text-sm">
              First step in our controlled tour
            </p>
          </div>
          <div id="controlled-step-2" class="rounded-lg border p-6 text-center">
            <h4 class="font-semibold">
              Step 2
            </h4>
            <p class="text-muted-foreground text-sm">
              Second step with external controls
            </p>
          </div>
        </div>
        <div
          v-if="open && step >= 2"
          id="controlled-step-3"
          class="rounded-lg border border-primary/50 bg-primary/5 p-6 text-center"
        >
          <h4 class="font-semibold">
            Step 3
          </h4>
          <p class="text-muted-foreground text-sm">
            Dynamic step that appears after step 2
          </p>
        </div>
      </div>
    </div>

    <TourOverlay />

    <TourContent class="relative">
      <TourClose />
      <div class="flex flex-col gap-1.5 pr-6">
        <TourTitle />
        <TourDescription />
      </div>
      <div class="mt-4 flex items-center justify-between gap-2">
        <TourProgress />
        <div class="flex items-center gap-1">
          <TourPrevious />
          <TourNext />
        </div>
      </div>
    </TourContent>
  </Tour>
</template>
