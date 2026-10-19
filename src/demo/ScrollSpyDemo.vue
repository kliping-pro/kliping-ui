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
  { value: 'introduction', title: 'Introduction' },
  { value: 'installation', title: 'Installation' },
  { value: 'usage', title: 'Usage' },
  { value: 'notes', title: 'Notes' },
]

const activeSection = ref('introduction')
const container = ref<HTMLElement | null>(null)
</script>

<template>
  <div class="w-full">
    <p class="mb-3 text-muted-foreground text-sm">
      Section in view: <strong>{{ activeSection }}</strong>
    </p>

    <div ref="container" class="h-64 overflow-y-auto rounded-md border p-4">
      <ScrollSpy v-model="activeSection" class="gap-6" :offset="16" :scroll-container="container ?? undefined">
        <ScrollSpyNav class="sticky top-0 h-fit shrink-0">
          <ScrollSpyLink v-for="section in sections" :key="section.value" :value="section.value">
            {{ section.title }}
          </ScrollSpyLink>
        </ScrollSpyNav>

        <ScrollSpyViewport>
          <ScrollSpySection v-for="section in sections" :key="section.value" class="min-h-40" :value="section.value">
            <h3 class="mb-2 font-semibold">
              {{ section.title }}
            </h3>
            <p class="text-muted-foreground text-sm">
              Scroll this box to watch the navigation highlight move.
              It's driven by an <code>IntersectionObserver</code>, not a
              scroll listener.
            </p>
          </ScrollSpySection>
        </ScrollSpyViewport>
      </ScrollSpy>
    </div>
  </div>
</template>
