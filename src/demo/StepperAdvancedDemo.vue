<script setup lang="ts">
import { Check } from '@lucide/vue'
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
import { Button } from '@/components/ui/button'

const steps = [
  { title: 'Account', description: 'Email and password' },
  { title: 'Profile', description: 'Name and photo' },
  { title: 'Done', description: 'Review and submit' },
]

const currentStep = ref(1)
</script>

<template>
  <div class="flex w-full max-w-lg flex-col gap-6">
    <Stepper v-model="currentStep" linear>
      <StepperList>
        <StepperItem v-for="(step, i) in steps" :key="step.title" :step="i + 1">
          <StepperTrigger>
            <StepperIndicator>
              <template #default="{ step }">
                <Check v-if="step < currentStep" class="size-4" />
                <template v-else>
                  {{ step }}
                </template>
              </template>
            </StepperIndicator>
            <div class="flex flex-col">
              <StepperTitle>{{ step.title }}</StepperTitle>
              <StepperDescription>{{ step.description }}</StepperDescription>
            </div>
          </StepperTrigger>
          <StepperSeparator v-if="i < steps.length - 1" class="mx-3" />
        </StepperItem>
      </StepperList>
    </Stepper>

    <div class="flex gap-2">
      <Button :disabled="currentStep === 1" variant="outline" @click="currentStep--">
        Previous
      </Button>
      <Button :disabled="currentStep === steps.length" @click="currentStep++">
        Next
      </Button>
    </div>
  </div>
</template>
