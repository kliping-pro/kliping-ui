<!-- example: 3. Vertical Layout -->
<script setup lang="ts">
import { reactive } from 'vue'
import { SegmentedInput, SegmentedInputItem } from '@/components/segmented-input'

const address = reactive({ street: '', city: '', zipCode: '' })
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-4">
    <div class="flex flex-col gap-2">
      <span class="text-sm leading-none font-medium">Mailing Address</span>
      <SegmentedInput aria-label="Mailing address input" class="w-full" orientation="vertical">
        <SegmentedInputItem v-model="address.street" aria-label="Street address" placeholder="Street Address" />
        <SegmentedInputItem v-model="address.city" aria-label="City" placeholder="City" />
        <SegmentedInputItem v-model="address.zipCode" aria-label="ZIP code" placeholder="ZIP Code" />
      </SegmentedInput>
    </div>
    <p class="text-sm text-muted-foreground">
      Use Tab and Shift + Tab to move between the fields.
    </p>
  </div>
</template>
