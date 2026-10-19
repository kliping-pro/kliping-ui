<script setup lang="ts">
import { Mail } from '@lucide/vue'
import { z } from "zod"
import { Button } from '@/components/ui/button'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { toTypedSchema } from '@vee-validate/zod'
import { Form, Field as VeeField } from 'vee-validate'

const schema = toTypedSchema(z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
}))

const initialValues = {
  email: "",
  password: "",
}

function onSubmit(values: unknown) {
  // Block ini contoh tampilan; ke mana nilainya dikirim ditentukan pemakainya.
  void values
}
</script>

<template>
  <Form v-slot="{ handleSubmit }" as="" :initial-values="initialValues" keep-values :validation-schema="schema">
    <form @submit="handleSubmit($event, onSubmit)">
      <div class="space-y-5">
        <VeeField v-slot="{ componentField, errors }" name="email">
          <Field :data-invalid="!!errors.length">
            <FieldLabel>Email</FieldLabel>
            <Input
              :aria-invalid="!!errors.length"
              placeholder="Enter your email"
              type="email"
              v-bind="componentField"
            />
            <FieldDescription>
              We'll never share your email with anyone else.
            </FieldDescription>
            <FieldError v-if="errors.length" :errors="errors" />
          </Field>
        </VeeField>

        <VeeField v-slot="{ componentField, errors }" name="password">
          <Field :data-invalid="!!errors.length">
            <FieldLabel>Password</FieldLabel>
            <Input
              :aria-invalid="!!errors.length"
              placeholder="Enter your password"
              type="password"
              v-bind="componentField"
            />
            <FieldError v-if="errors.length" :errors="errors" />
          </Field>
        </VeeField>
      </div>
      <Button class="mt-6 w-full" size="lg">
        <Mail class="mr-2" />
        Continue with Email
      </Button>
    </form>
  </Form>
</template>
