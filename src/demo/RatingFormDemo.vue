<!-- example: 3. With Form -->
<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm, Field as VeeField } from 'vee-validate'
import { toast } from 'vue-sonner'
import { z } from 'zod'
import { Rating } from '@/components/rating'
import { Button } from '@/components/ui/button'
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'

const formSchema = toTypedSchema(z.object({
  rating: z.number().min(1, { message: 'Please provide a rating.' }),
}))

const form = useForm({
  validationSchema: formSchema,
  initialValues: { rating: 0 },
})

const onSubmit = form.handleSubmit((values) => {
  toast.success(`You rated: ${values.rating} stars`)
})
</script>

<template>
  <form class="w-full max-w-sm" @submit="onSubmit">
    <FieldGroup>
      <VeeField v-slot="{ componentField, errors }" name="rating">
        <Field :data-invalid="!!errors.length">
          <FieldLabel>Rating</FieldLabel>
          <Rating v-bind="(componentField as any)" :step="0.5" name="rating" />
          <FieldDescription>Rate your experience from 1 to 5 stars.</FieldDescription>
          <FieldError v-if="errors.length" :errors="errors" />
        </Field>
      </VeeField>

      <Field>
        <Button type="submit" class="w-full">
          Submit
        </Button>
      </Field>
    </FieldGroup>
  </form>
</template>
