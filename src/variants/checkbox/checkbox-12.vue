<script lang="ts">
export const description = "Di dalam formulir bervalidasi, lengkap dengan keterangannya."
</script>

<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { Field as VeeField, Form } from 'vee-validate'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field'

const schema = toTypedSchema(z.object({
  isAdmin: z.boolean(),
}))

const initialValues = { isAdmin: false }

function onSubmit(values: unknown) {
  // Varian ini contoh tampilan; ke mana nilainya dikirim ditentukan pemakainya.
  void values
}
</script>

<template>
  <Form v-slot="{ handleSubmit }" as="" :initial-values="initialValues" keep-values :validation-schema="schema">
    <form class="w-full space-y-4 px-4" @submit="handleSubmit($event, onSubmit)">
      <VeeField v-slot="{ value, handleChange, errors }" name="isAdmin" type="checkbox">
        <Field class="flex w-full items-start gap-4" :data-invalid="!!errors.length">
          <Checkbox
            id="isAdmin"
            :model-value="value"
            @update:model-value="handleChange"
          />
          <div class="flex flex-col gap-1.5">
            <FieldLabel for="isAdmin">Admin role</FieldLabel>
            <FieldDescription>
              This role has access to all the features of the application.
            </FieldDescription>
          </div>
          <FieldError v-if="errors.length" :errors="errors" />
        </Field>
      </VeeField>
      <Button type="submit">Submit</Button>
    </form>
  </Form>
</template>
