<script setup lang="ts">
import { CheckIcon, StarIcon, XIcon } from '@lucide/vue'
import { ref } from 'vue'
import { Chip } from '@/components/chip'

const variants = ['default', 'secondary', 'outline', 'ghost', 'destructive'] as const
const filters = ref(['Vue', 'Tailwind CSS', 'TypeScript', 'Vite'])
const selected = ref('All')
</script>

<template>
  <div class="flex w-full max-w-md flex-col gap-6">
    <div class="flex flex-wrap items-center gap-2">
      <Chip v-for="variant in variants" :key="variant" :variant="variant" class="capitalize">
        {{ variant }}
      </Chip>
    </div>

    <div class="flex flex-wrap items-center gap-2">
      <Chip size="sm" variant="secondary">Small</Chip>
      <Chip size="md" variant="secondary">Medium</Chip>
      <Chip size="lg" variant="secondary">Large</Chip>
      <Chip variant="outline">
        <StarIcon /> Favorite
      </Chip>
    </div>

    <div class="flex flex-wrap items-center gap-2">
      <Chip v-for="f in filters" :key="f" variant="outline" class="pr-1.5">
        {{ f }}
        <button
          type="button"
          class="rounded-full p-0.5 hover:bg-muted"
          :aria-label="`Remove ${f}`"
          @click="filters = filters.filter(x => x !== f)"
        >
          <XIcon class="size-3" />
        </button>
      </Chip>
      <span v-if="!filters.length" class="text-muted-foreground text-sm">All filters cleared.</span>
    </div>

    <div class="flex flex-wrap items-center gap-2">
      <Chip
        v-for="k in ['All', 'Design', 'Code', 'Product']"
        :key="k"
        as="button"
        type="button"
        :variant="selected === k ? 'default' : 'outline'"
        @click="selected = k"
      >
        <CheckIcon v-if="selected === k" /> {{ k }}
      </Chip>
    </div>
  </div>
</template>
