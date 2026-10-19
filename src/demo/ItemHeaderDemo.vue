<script setup lang="ts">
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemHeader,
  ItemTitle,
} from '@/components/ui/item'

const models = [
  {
    name: 'v0-1.5-sm',
    description: 'Everyday tasks and UI generation.',
    image:
      '/samples/photos/photo-22.svg',
    credit: 'Valeria Reverdo on Unsplash',
  },
  {
    name: 'v0-1.5-lg',
    description: 'Advanced thinking or reasoning.',
    image:
      '/samples/photos/photo-23.svg',
    credit: 'Michael Oeser on Unsplash',
  },
  {
    name: 'v0-2.0-mini',
    description: 'Open Source model for everyone.',
    image:
      '/samples/photos/photo-24.svg',
    credit: 'Cherry Laithang on Unsplash',
  },
]
</script>

<template>
  <div class="flex w-full max-w-xl flex-col gap-6">
    <ItemGroup class="grid grid-cols-3 gap-4">
      <Item
        v-for="model in models"
        :key="model.name"
        variant="outline"
        as-child
        role="listitem"
      >
        <a href="#">
          <ItemHeader>
            <img
              :src="model.image"
              :alt="model.name"
              width="128"
              height="128"
              class="aspect-square w-full rounded-sm object-cover grayscale"
            >
          </ItemHeader>
          <ItemContent>
            <ItemTitle>{{ model.name }}</ItemTitle>
            <ItemDescription>{{ model.description }}</ItemDescription>
          </ItemContent>
        </a>
      </Item>
    </ItemGroup>
  </div>
</template>
