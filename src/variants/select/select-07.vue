<script lang="ts">
export const description = "Di dalam formulir bervalidasi, wajib diisi."
</script>

<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { Field as VeeField, Form } from 'vee-validate'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const COUNTRIES = [
  { id: 'us', name: 'United States' },
  { id: 'uk', name: 'United Kingdom' },
  { id: 'ca', name: 'Canada' },
  { id: 'au', name: 'Australia' },
  { id: 'fr', name: 'France' },
  { id: 'de', name: 'Germany' },
  { id: 'jp', name: 'Japan' },
  { id: 'br', name: 'Brazil' },
]

const schema = toTypedSchema(z.object({
  country: z.string().min(1, 'Country is required'),
}))

const initialValues = { country: '' }

function onSubmit(values: unknown) {
  // Varian ini contoh tampilan; ke mana nilainya dikirim ditentukan pemakainya.
  void values
}
</script>

<template>
  <Form v-slot="{ handleSubmit }" as="" :initial-values="initialValues" keep-values :validation-schema="schema">
    <form class="mx-auto w-full max-w-sm space-y-3" @submit="handleSubmit($event, onSubmit)">
      <VeeField v-slot="{ value, handleChange, errors }" name="country">
        <Field :data-invalid="!!errors.length">
          <FieldLabel for="country">Select country</FieldLabel>
          <Select :model-value="value" @update:model-value="handleChange">
            <SelectTrigger
              id="country"
              :aria-invalid="!!errors.length"
              class="w-full aria-invalid:border-destructive aria-invalid:ring-destructive"
            >
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem v-for="item in COUNTRIES" :key="item.id" :value="item.id">
                  {{ item.name }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <FieldError v-if="errors.length" :errors="errors" />
        </Field>
      </VeeField>
      <Button type="submit">Submit</Button>
    </form>
  </Form>
</template>
