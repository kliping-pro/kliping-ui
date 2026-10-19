<script setup lang="ts">
import { ref } from 'vue'
import {
  Editable,
  EditableArea,
  EditableCancel,
  EditableInput,
  EditableLabel,
  EditablePreview,
  EditableSubmit,
  EditableToolbar,
  EditableTrigger,
} from '@/components/editable'

const title = ref('Quarterly release plan')
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-4">
    <Editable v-model="title" placeholder="Enter a title…" submit-mode="both">
      <EditableLabel required>
        Title
      </EditableLabel>
      <EditableArea>
        <EditablePreview />
        <EditableInput />
      </EditableArea>
      <EditableToolbar>
        <EditableTrigger />
        <EditableSubmit />
        <EditableCancel />
      </EditableToolbar>
    </Editable>

    <p class="text-muted-foreground text-sm">
      Current value: <strong>{{ title }}</strong>
    </p>
  </div>
</template>
