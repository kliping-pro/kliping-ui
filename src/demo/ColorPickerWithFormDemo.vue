<!-- example: 3. With Form -->
<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { h } from 'vue'
import { toast } from 'vue-sonner'
import { z } from 'zod'
import {
  ColorPicker,
  ColorPickerAlphaSlider,
  ColorPickerArea,
  ColorPickerContent,
  ColorPickerEyeDropper,
  ColorPickerFormatSelect,
  ColorPickerHueSlider,
  ColorPickerInput,
  ColorPickerTrigger,
} from '@/components/color-picker'
import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

const hex = (label: string) => z.string().min(1, `${label} is required`).regex(/^#(?:[0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i, 'Must be a valid hex color')

const formSchema = toTypedSchema(z.object({
  primaryColor: hex('Primary color'),
  secondaryColor: hex('Secondary color'),
  accentColor: hex('Accent color'),
}))

const form = useForm({
  validationSchema: formSchema,
  initialValues: { primaryColor: '#3b82f6', secondaryColor: '#10b981', accentColor: '#f59e0b' },
})

const fields = [
  { name: 'primaryColor', label: 'Primary Color' },
  { name: 'secondaryColor', label: 'Secondary Color' },
  { name: 'accentColor', label: 'Accent Color' },
]

const onSubmit = form.handleSubmit((values) => {
  toast('Theme colors updated!', {
    description: h('pre', { class: 'mt-2 w-full text-xs' }, JSON.stringify(values, null, 2)),
  })
})
</script>

<template>
  <form class="flex w-full max-w-md flex-col gap-4 rounded-md border p-6 shadow-sm" @submit="onSubmit">
    <div class="flex flex-col gap-1">
      <h3 class="text-lg font-semibold">
        Theme Colors
      </h3>
      <p class="text-muted-foreground text-sm">
        Configure your application's color scheme
      </p>
    </div>
    <FormField v-for="field in fields" :key="field.name" v-slot="{ componentField }" :name="field.name">
      <FormItem>
        <FormLabel>{{ field.label }}</FormLabel>
        <FormControl>
          <ColorPicker v-bind="componentField" format="hex" class="w-auto">
            <ColorPickerTrigger class="w-fit px-3" />
            <ColorPickerContent>
              <ColorPickerArea />
              <div class="flex items-center gap-2">
                <ColorPickerEyeDropper />
                <div class="flex flex-1 flex-col gap-2">
                  <ColorPickerHueSlider />
                  <ColorPickerAlphaSlider />
                </div>
              </div>
              <div class="flex items-center gap-2">
                <ColorPickerFormatSelect />
                <ColorPickerInput class="flex-1" />
              </div>
            </ColorPickerContent>
          </ColorPicker>
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <div class="flex justify-end gap-2 pt-2">
      <Button type="button" variant="outline" @click="form.resetForm()">
        Reset
      </Button>
      <Button type="submit">
        Save Theme
      </Button>
    </div>
  </form>
</template>
