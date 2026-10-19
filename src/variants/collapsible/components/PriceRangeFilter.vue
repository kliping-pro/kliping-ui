<script setup lang="ts">
import { CircleDollarSign } from '@lucide/vue'
import { ref } from 'vue'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import CollapsibleFilter from '@/variants/collapsible/components/CollapsibleFilter.vue'

const MIN_PRICE = 0
const MAX_PRICE = 1000

const priceRange = ref([MIN_PRICE, MAX_PRICE])
</script>

<template>
  <CollapsibleFilter :icon="CircleDollarSign" title="Price Range">
    <div class="flex justify-between space-x-4">
      <Input
        class="w-20"
        :model-value="priceRange[0]"
        type="number"
        @update:model-value="priceRange = [Number($event), priceRange[1]]"
      />
      <Input
        class="w-20"
        :model-value="priceRange[1]"
        type="number"
        @update:model-value="priceRange = [priceRange[0], Number($event)]"
      />
    </div>
    <Slider
      v-model="priceRange"
      class="mt-4 mb-3 w-full"
      :max="MAX_PRICE"
      :min="MIN_PRICE"
      :step="10"
    />
  </CollapsibleFilter>
</template>
