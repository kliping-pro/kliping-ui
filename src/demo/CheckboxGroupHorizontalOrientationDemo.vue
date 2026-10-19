<!-- example: 1. Horizontal Orientation -->
<script setup lang="ts">
import {
  CheckboxGroup,
  CheckboxGroupDescription,
  CheckboxGroupItem,
  CheckboxGroupLabel,
  CheckboxGroupList,
} from '@/components/checkbox-group'
</script>

<template>
  <CheckboxGroup orientation="horizontal">
    <CheckboxGroupLabel>Tricks</CheckboxGroupLabel>
    <CheckboxGroupList orientation="horizontal">
      <CheckboxGroupItem value="indy">
        Indy
      </CheckboxGroupItem>
      <CheckboxGroupItem value="stalefish">
        Stalefish
      </CheckboxGroupItem>
      <CheckboxGroupItem value="pizza-guy">
        Pizza Guy
      </CheckboxGroupItem>
      <CheckboxGroupItem value="fs-540">
        FS 540
      </CheckboxGroupItem>
    </CheckboxGroupList>
    <CheckboxGroupDescription>Select grab tricks</CheckboxGroupDescription>
  </CheckboxGroup>
</template>
