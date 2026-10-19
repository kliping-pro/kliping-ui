<!-- example: 4. With Form -->
<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { h } from 'vue'
import { toast } from 'vue-sonner'
import { z } from 'zod'
import {
  AngleSlider,
  AngleSliderRange,
  AngleSliderThumb,
  AngleSliderTrack,
  AngleSliderValue,
} from '@/components/angle-slider'
import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

const formSchema = toTypedSchema(z.object({
  rotation: z.array(z.number()).length(1),
  range: z.array(z.number()).length(2),
}))

const form = useForm({
  validationSchema: formSchema,
  initialValues: { rotation: [45], range: [90, 270] },
})

const onSubmit = form.handleSubmit((values) => {
  toast('You submitted the following values:', {
    description: h('pre', { class: 'mt-2 w-full' }, JSON.stringify(values, null, 2)),
  })
})
</script>

<template>
  <form class="flex flex-col gap-4" @submit="onSubmit">
    <div class="grid grid-cols-2 gap-4">
      <FormField v-slot="{ componentField }" name="rotation">
        <FormItem class="place-items-center rounded-lg border p-6">
          <FormLabel>Rotation angle</FormLabel>
          <FormControl>
            <AngleSlider v-bind="componentField" :max="360" :min="0" :step="1" :size="60">
              <AngleSliderTrack>
                <AngleSliderRange />
              </AngleSliderTrack>
              <AngleSliderThumb />
              <AngleSliderValue />
            </AngleSlider>
          </FormControl>
          <FormDescription>Set the rotation angle in degrees (0-360°)</FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="range">
        <FormItem class="place-items-center rounded-lg border p-6">
          <FormLabel>Angle range</FormLabel>
          <FormControl>
            <AngleSlider v-bind="componentField" :max="360" :min="0" :step="5" :size="60">
              <AngleSliderTrack>
                <AngleSliderRange />
              </AngleSliderTrack>
              <AngleSliderThumb :index="0" />
              <AngleSliderThumb :index="1" />
              <AngleSliderValue />
            </AngleSlider>
          </FormControl>
          <FormDescription>Define a range of angles for the operation</FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>
    </div>
    <div class="flex items-center justify-end gap-2">
      <Button type="button" variant="outline" @click="form.resetForm()">
        Reset
      </Button>
      <Button type="submit">
        Submit
      </Button>
    </div>
  </form>
</template>
