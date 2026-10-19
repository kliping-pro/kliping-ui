<!-- example: 2. With Form -->
<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm, Field as VeeField } from 'vee-validate'
import { h } from 'vue'
import { toast } from 'vue-sonner'
import { z } from 'zod'
import { PhoneInput, PhoneInputCountrySelect, PhoneInputField } from '@/components/phone-input'
import { Button } from '@/components/ui/button'
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'

const formSchema = toTypedSchema(z.object({
  phone: z.string().min(4, { message: 'Phone number is required.' }),
  country: z.string().min(1, { message: 'Country is required.' }),
}))

const form = useForm({
  validationSchema: formSchema,
  initialValues: { phone: '', country: 'US' },
})

const onSubmit = form.handleSubmit((values) => {
  toast('Phone number submitted', {
    description: h('pre', { class: 'mt-2 w-full rounded-md bg-muted p-4' }, h('code', JSON.stringify(values, null, 2))),
  })
})
</script>

<template>
  <form class="w-full max-w-sm" @submit="onSubmit">
    <FieldGroup>
      <VeeField v-slot="{ componentField, errors }" name="phone">
        <Field :data-invalid="!!errors.length">
          <FieldLabel>Phone Number</FieldLabel>
          <PhoneInput
            v-bind="(componentField as any)"
            default-country="US"
            required
            :invalid="!!errors.length"
            @country-change="code => form.setFieldValue('country', code)"
          >
            <PhoneInputCountrySelect />
            <PhoneInputField />
          </PhoneInput>
          <FieldDescription>Enter your phone number with country code.</FieldDescription>
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
