<!-- example: 1. Vertical Orientation -->
<script setup lang="ts">
import { ref } from 'vue'
import {
  ScrollSpy,
  ScrollSpyLink,
  ScrollSpyNav,
  ScrollSpySection,
  ScrollSpyViewport,
} from '@/components/scroll-spy'

const sections = [
  { value: 'overview', title: 'Overview', text: 'The navigation sits above the content in vertical orientation.' },
  { value: 'features', title: 'Features', text: 'All the features available in this component.' },
  { value: 'installation', title: 'Installation', text: 'How to install and set up the component.' },
  { value: 'examples', title: 'Examples', text: 'Various examples showing different use cases.' },
  { value: 'api', title: 'API Reference', text: 'Complete API documentation for all components.' },
]

const viewport = ref<HTMLElement | null>(null)
</script>

<template>
  <div class="flex w-full flex-col gap-3">
    <ScrollSpy :offset="10" orientation="vertical" :scroll-container="viewport" class="h-[400px] w-full overflow-hidden rounded-md border">
      <ScrollSpyNav class="border-b p-4">
        <ScrollSpyLink v-for="section in sections" :key="section.value" :value="section.value">
          {{ section.title }}
        </ScrollSpyLink>
      </ScrollSpyNav>

      <ScrollSpyViewport as-child>
        <div ref="viewport" class="overflow-y-auto p-4" tabindex="0" aria-label="Sections">
          <ScrollSpySection v-for="section in sections" :key="section.value" :value="section.value">
            <h2 class="text-2xl font-bold">
              {{ section.title }}
            </h2>
            <p class="mt-2 text-muted-foreground">
              {{ section.text }}
            </p>
            <div class="mt-4 h-64 rounded-lg bg-accent" />
          </ScrollSpySection>
        </div>
      </ScrollSpyViewport>
    </ScrollSpy>
  </div>
</template>
