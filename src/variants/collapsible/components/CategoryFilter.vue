<script setup lang="ts">
import { Tag } from '@lucide/vue'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import CollapsibleFilter from '@/variants/collapsible/components/CollapsibleFilter.vue'

const categories = ['Electronics', 'Clothing', 'Books', 'Home & Garden', 'Toys']
</script>

<template>
  <CollapsibleFilter :icon="Tag" title="Category">
    <div v-for="category in categories" :key="category" class="mb-2 flex items-center space-x-3">
      <Checkbox :id="category" />
      <Label :for="category">{{ category }}</Label>
    </div>
  </CollapsibleFilter>
</template>
