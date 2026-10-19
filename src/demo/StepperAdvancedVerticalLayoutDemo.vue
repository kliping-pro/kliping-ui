<!-- example: 1. Vertical Layout -->
<script setup lang="ts">
import { ref } from 'vue'
import {
  Stepper,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperList,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from '@/components/stepper-advanced'

const steps = [
  { title: 'Order Placed', description: 'Your order has been successfully placed' },
  { title: 'Processing', description: 'We\'re preparing your items for shipment' },
  { title: 'Shipped', description: 'Your order is on its way to you' },
  { title: 'Delivered', description: 'Order delivered to your address' },
]

const currentStep = ref(3)
</script>

<template>
  <Stepper v-model="currentStep" orientation="vertical" class="w-full max-w-xl flex-col gap-6 sm:flex-row">
    <StepperList>
      <StepperItem v-for="(step, i) in steps" :key="step.title" :step="i + 1" class="items-start">
        <StepperTrigger class="items-start">
          <StepperIndicator />
          <div class="flex flex-col gap-1">
            <StepperTitle>{{ step.title }}</StepperTitle>
            <StepperDescription>{{ step.description }}</StepperDescription>
          </div>
        </StepperTrigger>
        <StepperSeparator v-if="i < steps.length - 1" class="my-1 ml-[13px] h-8" />
      </StepperItem>
    </StepperList>

    <div class="flex flex-1 flex-col gap-4 rounded-lg border bg-card p-6 text-card-foreground">
      <div class="flex flex-col gap-px">
        <h4 class="font-semibold">
          {{ steps[currentStep - 1]?.title }}
        </h4>
        <p class="text-muted-foreground text-sm">
          {{ steps[currentStep - 1]?.description }}
        </p>
      </div>
      <p class="text-sm">
        This is the content for {{ steps[currentStep - 1]?.title }}. You can add forms, information, or any other content here.
      </p>
    </div>
  </Stepper>
</template>
