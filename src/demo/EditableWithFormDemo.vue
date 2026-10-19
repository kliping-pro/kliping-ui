<!-- example: 4. With Form -->
<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { h } from 'vue'
import { toast } from 'vue-sonner'
import { z } from 'zod'
import {
  Editable,
  EditableArea,
  EditableCancel,
  EditableInput,
  EditablePreview,
  EditableSubmit,
  EditableToolbar,
  EditableTrigger,
} from '@/components/editable'
import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

const formSchema = toTypedSchema(z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name must be less than 50 characters'),
  title: z.string().min(3, 'Title must be at least 3 characters').max(100, 'Title must be less than 100 characters'),
}))

const form = useForm({
  validationSchema: formSchema,
  initialValues: { name: 'Rodney Mullen', title: 'Skateboarder' },
})

const onSubmit = form.handleSubmit((values) => {
  toast('You submitted the following values:', {
    description: h('pre', { class: 'mt-2 w-full' }, JSON.stringify(values, null, 2)),
  })
})

const fields = [
  { name: 'name', label: 'Name' },
  { name: 'title', label: 'Title' },
] as const
</script>

<template>
  <form class="flex w-full max-w-md flex-col gap-4 rounded-md border p-4 shadow-sm" @submit="onSubmit">
    <FormField v-for="field in fields" :key="field.name" v-slot="{ componentField }" :name="field.name">
      <FormItem>
        <FormLabel>{{ field.label }}</FormLabel>
        <FormControl>
          <Editable v-bind="componentField" submit-mode="enter">
            <div class="flex items-start gap-4">
              <EditableArea class="flex-1">
                <EditablePreview />
                <EditableInput />
              </EditableArea>
              <EditableTrigger />
            </div>
            <EditableToolbar>
              <EditableSubmit />
              <EditableCancel />
            </EditableToolbar>
          </Editable>
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <div class="flex w-fit gap-2 self-end">
      <Button type="button" variant="outline" @click="form.resetForm()">
        Reset
      </Button>
      <Button type="submit">
        Update
      </Button>
    </div>
  </form>
</template>
