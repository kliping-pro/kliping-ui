<!-- example: 4. With form -->
<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { ref } from 'vue'
import { z } from 'zod'
import { MaskInput } from '@/components/mask-input'
import { Button } from '@/components/ui/button'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

// MaskInput menyimpan nilai mentah (tanpa pemisah) di modelnya — skema
// memeriksa nilai mentah itu.
const formSchema = toTypedSchema(z.object({
  phone: z.string().min(10, 'Phone number must have at least 10 digits'),
  birthDate: z.string().length(8, 'Enter the full date'),
}))

const form = useForm({ validationSchema: formSchema, initialValues: { phone: '', birthDate: '' } })

const submitted = ref<string>()
const onSubmit = form.handleSubmit((values) => {
  submitted.value = JSON.stringify(values, null, 2)
})
</script>

<template>
  <form class="flex w-full max-w-sm flex-col gap-6" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="phone">
      <FormItem>
        <FormLabel>Phone number</FormLabel>
        <FormControl>
          <MaskInput v-bind="componentField" mask="phone" inputmode="tel" />
        </FormControl>
        <FormDescription>Stored without separators</FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="birthDate">
      <FormItem>
        <FormLabel>Date of birth</FormLabel>
        <FormControl>
          <MaskInput v-bind="componentField" mask="date" inputmode="numeric" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <Button type="submit" class="w-fit">
      Submit
    </Button>
    <pre v-if="submitted" class="rounded-md bg-muted p-3 text-xs">{{ submitted }}</pre>
  </form>
</template>
