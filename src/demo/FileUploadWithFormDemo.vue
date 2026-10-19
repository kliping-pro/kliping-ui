<!-- example: 7. With Form -->
<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { CloudUpload } from '@lucide/vue'
import { useForm } from 'vee-validate'
import { ref } from 'vue'
import { z } from 'zod'
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadList,
  FileUploadTrigger,
} from '@/components/file-upload'
import { Button } from '@/components/ui/button'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

const formSchema = toTypedSchema(z.object({
  files: z
    .array(z.custom<File>())
    .min(1, 'Please select at least one file')
    .max(2, 'Please select up to 2 files')
    .refine(files => files.every(file => file.size <= 5 * 1024 * 1024), 'File size must be less than 5MB'),
}))

const form = useForm({
  validationSchema: formSchema,
  initialValues: { files: [] },
})

const submitted = ref<string[]>()

const onSubmit = form.handleSubmit((values) => {
  submitted.value = values.files.map(file => (file.name.length > 25 ? `${file.name.slice(0, 25)}...` : file.name))
})
</script>

<template>
  <form class="flex w-full max-w-md flex-col gap-4" @submit="onSubmit">
    <FormField v-slot="{ value, handleChange }" name="files">
      <FormItem>
        <FormLabel>Attachments</FormLabel>
        <FormControl>
          <FileUpload :max-files="2" :max-size="5 * 1024 * 1024" :model-value="value" @update:model-value="handleChange">
            <FileUploadDropzone class="flex-row flex-wrap border-dotted text-center">
              <CloudUpload class="size-4" />
              Drag and drop or
              <FileUploadTrigger as-child>
                <Button class="p-0" size="sm" variant="link">
                  choose files
                </Button>
              </FileUploadTrigger>
              to upload
            </FileUploadDropzone>
            <FileUploadList v-slot="{ file }">
              <FileUploadItem :file="file">
                <FileUploadItemPreview />
                <FileUploadItemMetadata class="flex-1" />
                <FileUploadItemDelete />
              </FileUploadItem>
            </FileUploadList>
          </FileUpload>
        </FormControl>
        <FormDescription>Upload up to 2 images up to 5MB each.</FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>
    <Button class="w-fit" type="submit">
      Submit
    </Button>
    <pre v-if="submitted" class="rounded-md bg-muted p-3 text-xs">{{ JSON.stringify(submitted, null, 2) }}</pre>
  </form>
</template>
