<!-- example: 2. With Validation -->
<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
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

type FieldName = 'username' | 'email' | 'firstName' | 'lastName' | 'bio'

const steps: { title: string, description: string, fields: FieldName[] }[] = [
  { title: 'Account Setup', description: 'Create your account', fields: ['username', 'email'] },
  { title: 'Profile Info', description: 'Complete your profile', fields: ['firstName', 'lastName', 'bio'] },
  { title: 'Review', description: 'Review your information', fields: [] },
]

const values = reactive<Record<FieldName, string>>({ username: '', email: '', firstName: '', lastName: '', bio: '' })
const errors = reactive<Partial<Record<FieldName, string>>>({})

const rules: Record<FieldName, (v: string) => string | undefined> = {
  username: v => (v.trim().length < 3 ? 'Username must be at least 3 characters' : undefined),
  email: v => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? undefined : 'Please enter a valid email address'),
  firstName: v => (v.trim().length < 2 ? 'First name must be at least 2 characters' : undefined),
  lastName: v => (v.trim().length < 2 ? 'Last name must be at least 2 characters' : undefined),
  bio: v => (v.trim().length < 10 ? 'Bio must be at least 10 characters' : undefined),
}

const currentStep = ref(1)
// Langkah terjauh yang boleh dibuka lewat pemicunya: langkah sesudah yang
// terakhir lolos validasi.
const reachable = ref(1)
const submitted = ref(false)

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
  if (!validate(currentStep.value))
    return
  currentStep.value++
  reachable.value = Math.max(reachable.value, currentStep.value)
}

const summary = computed(() => [
  ['Username', values.username],
  ['Email', values.email],
  ['First name', values.firstName],
  ['Last name', values.lastName],
  ['Bio', values.bio],
])
</script>

<template>
  <form class="flex w-full max-w-2xl flex-col gap-6" novalidate @submit.prevent="submitted = true">
    <Stepper v-model="currentStep">
      <StepperList>
        <StepperItem v-for="(step, i) in steps" :key="step.title" :step="i + 1" :disabled="i + 1 > reachable">
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

    <div v-if="currentStep === 1" class="flex flex-col gap-4 rounded-md border bg-card p-4 text-card-foreground">
      <Field :data-invalid="!!errors.username || undefined">
        <FieldLabel for="validation-username">
          Username
        </FieldLabel>
        <Input id="validation-username" v-model="values.username" placeholder="Enter username" :aria-invalid="!!errors.username" />
        <FieldError :errors="[errors.username]" />
      </Field>
      <Field :data-invalid="!!errors.email || undefined">
        <FieldLabel for="validation-email">
          Email
        </FieldLabel>
        <Input id="validation-email" v-model="values.email" type="email" placeholder="Enter email" :aria-invalid="!!errors.email" />
        <FieldError :errors="[errors.email]" />
      </Field>
    </div>

    <div v-else-if="currentStep === 2" class="flex flex-col gap-4 rounded-md border bg-card p-4 text-card-foreground">
      <div class="grid grid-cols-2 gap-4">
        <Field :data-invalid="!!errors.firstName || undefined">
          <FieldLabel for="validation-first-name">
            First Name
          </FieldLabel>
          <Input id="validation-first-name" v-model="values.firstName" placeholder="Enter first name" :aria-invalid="!!errors.firstName" />
          <FieldError :errors="[errors.firstName]" />
        </Field>
        <Field :data-invalid="!!errors.lastName || undefined">
          <FieldLabel for="validation-last-name">
            Last Name
          </FieldLabel>
          <Input id="validation-last-name" v-model="values.lastName" placeholder="Enter last name" :aria-invalid="!!errors.lastName" />
          <FieldError :errors="[errors.lastName]" />
        </Field>
      </div>
      <Field :data-invalid="!!errors.bio || undefined">
        <FieldLabel for="validation-bio">
          Bio
        </FieldLabel>
        <Textarea id="validation-bio" v-model="values.bio" placeholder="Tell us about yourself..." class="min-h-[80px]" :aria-invalid="!!errors.bio" />
        <FieldError :errors="[errors.bio]" />
      </Field>
    </div>

    <div v-else class="grid grid-cols-2 gap-4 rounded-md border bg-card p-4 text-card-foreground lg:grid-cols-3">
      <div v-for="[label, value] in summary" :key="label" class="flex flex-col gap-1 rounded-md border p-2">
        <span class="font-medium text-sm">{{ label }}</span>
        <span class="text-muted-foreground text-sm">{{ value }}</span>
      </div>
    </div>

    <div class="flex items-center justify-between">
      <Button type="button" variant="outline" :disabled="currentStep === 1" @click="currentStep--">
        Previous
      </Button>
      <span class="text-muted-foreground text-sm">
        {{ submitted ? 'Submitted' : `Step ${currentStep} of ${steps.length}` }}
      </span>
      <Button v-if="currentStep < steps.length" type="button" @click="next">
        Next
      </Button>
      <Button v-else type="submit">
        Complete
      </Button>
    </div>
  </form>
</template>
