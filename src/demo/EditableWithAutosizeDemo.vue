<!-- example: 2. With Autosize -->
<script setup lang="ts">
import {
  Editable,
  EditableArea,
  EditableCancel,
  EditableInput,
  EditableLabel,
  EditablePreview,
  EditableSubmit,
  EditableToolbar,
} from '@/components/editable'
</script>

<template>
  <div class="flex w-full max-w-md flex-col gap-4">
    <Editable auto-resize default-value="Adjust the size of the input with the text inside." submit-mode="enter">
      <EditableLabel>Autosize editable</EditableLabel>
      <EditableArea>
        <EditablePreview class="whitespace-pre-wrap" />
        <EditableInput />
      </EditableArea>
      <EditableToolbar>
        <EditableSubmit />
        <EditableCancel />
      </EditableToolbar>
    </Editable>
  </div>
</template>
