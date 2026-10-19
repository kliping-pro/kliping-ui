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
  TourSkip,
  TourTitle,
  TourTrigger,
} from '@/components/tour'
import { Button } from '@/components/ui/button'

const isOpen = ref(false)
const outcome = ref<string>()

const steps: TourStep[] = [
  {
    id: 'welcome',
    title: 'Welcome',
    description: 'Three short steps to get to know this board. The left and right arrow keys work too.',
  },
  {
    id: 'search',
    target: '#tour-search',
    title: 'Search box',
    description: 'Typing here filters the whole list below it, no need to press Enter.',
    side: 'bottom',
    align: 'start',
  },
  {
    id: 'save',
    target: '#tour-save',
    title: 'Save',
    description: 'Changes are saved automatically. This button is for when you want to be sure.',
    side: 'left',
  },
  {
    id: 'help',
    target: '#tour-help',
    title: 'Help',
    description: 'You can replay the tour from here at any time.',
    side: 'top',
    align: 'end',
  },
]
</script>

<template>
  <div class="flex w-full flex-col gap-4">
    <Tour v-model:open="isOpen" :steps="steps" @skip="outcome = 'skipped'" @complete="outcome = 'completed'">
      <div class="flex flex-col gap-4 rounded-lg border bg-card p-4">
        <div class="flex items-center gap-2">
          <input
            id="tour-search"
            class="h-9 flex-1 rounded-md border bg-transparent px-3 text-base outline-none md:text-sm focus-visible:ring-3 focus-visible:ring-ring/50"
            placeholder="Search…"
            type="search"
          >
          <Button id="tour-save" size="sm">
            Save
          </Button>
        </div>

        <div class="grid gap-2 sm:grid-cols-3">
          <div v-for="n in 3" :key="n" class="rounded-md border bg-muted/40 p-3 text-muted-foreground text-sm">
            Card {{ n }}
          </div>
        </div>

        <div class="flex justify-end">
          <TourTrigger id="tour-help" as-child>
            <Button size="sm" variant="outline">
              Start tour
            </Button>
          </TourTrigger>
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
            <TourSkip />
            <TourPrevious />
            <TourNext />
          </div>
        </div>
      </TourContent>
    </Tour>

    <p v-if="outcome" class="text-muted-foreground text-sm">
      Tour <code>{{ outcome }}</code>.
    </p>
  </div>
</template>
