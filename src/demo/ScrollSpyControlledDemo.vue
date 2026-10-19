<!-- example: 2. Controlled State -->
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
  { value: 'introduction', title: 'Introduction', text: 'ScrollSpy automatically updates navigation links based on scroll position.' },
  { value: 'getting-started', title: 'Getting Started', text: 'Install the component using the CLI or copy the source code.' },
  { value: 'usage', title: 'Usage', text: 'Use the root, nav, link, viewport, and section parts to build your scroll spy navigation.' },
  { value: 'api-reference', title: 'API Reference', text: 'Complete API documentation for all ScrollSpy parts.' },
]

const value = ref('getting-started')
const viewport = ref<HTMLElement | null>(null)
</script>

<template>
  <div class="flex w-full flex-col gap-3">
    <p class="text-sm text-muted-foreground">
      Active section: <strong>{{ value }}</strong>
    </p>

    <ScrollSpy v-model="value" :offset="16" orientation="horizontal" :scroll-container="viewport" class="h-[400px] w-full overflow-hidden rounded-md border">
      <ScrollSpyNav class="w-40 shrink-0 border-r p-4">
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
