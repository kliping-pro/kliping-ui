<!-- example: 3. With Form -->
<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { ref } from 'vue'
import { z } from 'zod'
import {
  KeyValue,
  KeyValueAdd,
  KeyValueItem,
  KeyValueKeyInput,
  KeyValueList,
  KeyValueRemove,
  KeyValueValueInput,
} from '@/components/key-value'
import { Button } from '@/components/ui/button'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const formSchema = toTypedSchema(z.object({
  projectName: z.string().min(1, 'Project name is required'),
  envVariables: z
    .array(z.object({ id: z.string(), key: z.string().min(1, 'Key is required'), value: z.string() }))
    .min(1, 'At least one environment variable is required'),
}))

const form = useForm({
  validationSchema: formSchema,
  initialValues: { projectName: '', envVariables: [{ id: '1', key: '', value: '' }] },
})

const submitted = ref<string>()
const onSubmit = form.handleSubmit((values) => {
  submitted.value = JSON.stringify(values, null, 2)
})
</script>

<template>
  <form class="flex w-full max-w-lg flex-col gap-6" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="projectName">
      <FormItem>
        <FormLabel>Project Name</FormLabel>
        <FormControl>
          <Input placeholder="my-awesome-project" v-bind="componentField" />
        </FormControl>
        <FormDescription>The name of your project</FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="envVariables">
      <FormItem>
        <FormLabel>Environment Variables</FormLabel>
        <FormControl>
          <KeyValue v-bind="componentField" key-placeholder="KEY" value-placeholder="value">
            <KeyValueList v-slot="{ entry }">
              <KeyValueItem :entry="entry">
                <KeyValueKeyInput class="font-mono" />
                <KeyValueValueInput class="font-mono" />
                <KeyValueRemove />
              </KeyValueItem>
            </KeyValueList>
            <KeyValueAdd />
          </KeyValue>
        </FormControl>
        <FormDescription>Add environment variables for your project</FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>
    <Button type="submit" class="w-fit">
      Submit
    </Button>
    <pre v-if="submitted" class="rounded-md bg-muted p-3 text-xs">{{ submitted }}</pre>
  </form>
</template>
