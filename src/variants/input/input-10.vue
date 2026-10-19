<script lang="ts">
export const description = "Di dalam formulir bervalidasi, galatnya muncul setelah ditinggalkan."
</script>

<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { Field as VeeField, Form } from 'vee-validate'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'

const schema = toTypedSchema(z.object({
  email: z.string().email('Invalid email address'),
}))

const initialValues = { email: 'hello@example.com' }

function onSubmit(values: unknown) {
  // Varian ini contoh tampilan; ke mana nilainya dikirim ditentukan pemakainya.
  void values
}
</script>

<template>
  <Form v-slot="{ handleSubmit }" as="" :initial-values="initialValues" keep-values :validation-schema="schema">
    <form class="space-y-4" @submit="handleSubmit($event, onSubmit)">
      <VeeField v-slot="{ componentField, errors }" name="email">
        <Field :data-invalid="!!errors.length">
          <FieldLabel for="email">Email</FieldLabel>
          <Input
            id="email"
            :aria-invalid="!!errors.length"
            class="aria-invalid:border-destructive aria-invalid:ring-destructive"
            placeholder="Enter your email"
            v-bind="componentField"
          />
          <FieldError v-if="errors.length" :errors="errors" />
        </Field>
      </VeeField>
      <Button type="submit">Submit</Button>
    </form>
  </Form>
</template>
