<!-- example: 1. With Double Click -->
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
  <div class="flex w-full max-w-sm flex-col gap-4">
    <Editable activation-mode="dblclick" default-value="Double click to edit" placeholder="Enter your text here" submit-mode="enter">
      <EditableLabel>Fruit</EditableLabel>
      <EditableArea>
        <EditablePreview />
        <EditableInput />
      </EditableArea>
      <EditableToolbar>
        <EditableSubmit />
        <EditableCancel />
      </EditableToolbar>
    </Editable>
  </div>
</template>
