<!-- example: 3. With Form -->
<script setup lang="ts">
import { reactive, ref } from 'vue'
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
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

type FieldName = 'firstName' | 'lastName' | 'email' | 'bio' | 'company' | 'website'

const steps: { title: string, description: string, fields: FieldName[] }[] = [
  { title: 'Personal Details', description: 'Enter your basic information', fields: ['firstName', 'lastName', 'email'] },
  { title: 'About You', description: 'Tell us more about yourself', fields: ['bio'] },
  { title: 'Professional Info', description: 'Add your professional details', fields: ['company', 'website'] },
]

const labels: Record<FieldName, string> = { firstName: 'First Name', lastName: 'Last Name', email: 'Email', bio: 'Bio', company: 'Company', website: 'Website' }
const placeholders: Record<FieldName, string> = { firstName: 'John', lastName: 'Doe', email: 'john@example.com', bio: 'Tell us about yourself...', company: 'Acme Inc.', website: 'https://example.com' }

const values = reactive<Record<FieldName, string>>({ firstName: '', lastName: '', email: '', bio: '', company: '', website: '' })
const errors = reactive<Partial<Record<FieldName, string>>>({})

const rules: Record<FieldName, (v: string) => string | undefined> = {
  firstName: v => (v.trim().length < 2 ? 'First name must be at least 2 characters' : undefined),
  lastName: v => (v.trim().length < 2 ? 'Last name must be at least 2 characters' : undefined),
  email: v => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? undefined : 'Please enter a valid email address'),
  bio: v => (v.trim().length < 10 ? 'Bio must be at least 10 characters' : undefined),
  company: v => (v.trim().length < 2 ? 'Company name must be at least 2 characters' : undefined),
  website: v => (v === '' || /^https?:\/\/\S+\.\S+/.test(v) ? undefined : 'Please enter a valid URL'),
}

const currentStep = ref(1)
const result = ref('')

function validate(step: number) {
  let valid = true
  for (const name of steps[step - 1]!.fields) {
    errors[name] = rules[name](values[name])
    if (errors[name])
      valid = false
  }
  return valid
}

function next() {
  if (validate(currentStep.value))
    currentStep.value++
}

function submit() {
  if (validate(currentStep.value))
    result.value = JSON.stringify(values, null, 2)
}
</script>

<template>
  <form class="flex w-full max-w-2xl flex-col gap-6" novalidate @submit.prevent="submit">
    <Stepper v-model="currentStep" linear>
      <StepperList>
        <StepperItem v-for="(step, i) in steps" :key="step.title" :step="i + 1" :disabled="i + 1 > currentStep">
          <StepperTrigger>
            <StepperIndicator />
            <div class="flex flex-col gap-1">
              <StepperTitle>{{ step.title }}</StepperTitle>
              <StepperDescription class="hidden sm:block">
                {{ step.description }}
              </StepperDescription>
            </div>
          </StepperTrigger>
          <StepperSeparator v-if="i < steps.length - 1" class="mx-4" />
        </StepperItem>
      </StepperList>
    </Stepper>

    <div class="grid gap-4 sm:grid-cols-2">
      <Field
        v-for="name in steps[currentStep - 1]!.fields"
        :key="name"
        :class="name === 'bio' || name === 'email' ? 'sm:col-span-2' : undefined"
        :data-invalid="!!errors[name] || undefined"
      >
        <FieldLabel :for="`form-${name}`">
          {{ labels[name] }}
        </FieldLabel>
        <Textarea
          v-if="name === 'bio'"
          :id="`form-${name}`"
          v-model="values[name]"
          class="min-h-[100px]"
          :placeholder="placeholders[name]"
          :aria-invalid="!!errors[name]"
        />
        <Input
          v-else
          :id="`form-${name}`"
          v-model="values[name]"
          :type="name === 'email' ? 'email' : name === 'website' ? 'url' : 'text'"
          :placeholder="placeholders[name]"
          :aria-invalid="!!errors[name]"
        />
        <FieldError :errors="[errors[name]]" />
      </Field>
    </div>

    <div class="flex justify-between">
      <Button type="button" variant="outline" :disabled="currentStep === 1" @click="currentStep--">
        Previous
      </Button>
      <Button v-if="currentStep < steps.length" type="button" @click="next">
        Next
      </Button>
      <Button v-else type="submit">
        Complete
      </Button>
    </div>

    <pre v-if="result" class="overflow-x-auto rounded-md border bg-muted p-3 text-xs" aria-live="polite">{{ result }}</pre>
  </form>
</template>
