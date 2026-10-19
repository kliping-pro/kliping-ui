<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  CheckboxGroup,
  CheckboxGroupDescription,
  CheckboxGroupItem,
  CheckboxGroupLabel,
  CheckboxGroupList,
  CheckboxGroupMessage,
} from '@/components/checkbox-group'

const options = ['Email', 'SMS', 'Push notifications', 'WhatsApp']
const selected = ref<string[]>(['Email'])

const isEmpty = computed(() => selected.value.length === 0)
</script>

<template>
  <CheckboxGroup v-model="selected" class="w-full max-w-sm">
    <CheckboxGroupLabel>Contact methods</CheckboxGroupLabel>
    <CheckboxGroupList>
      <CheckboxGroupItem v-for="option in options" :key="option" :invalid="isEmpty" :value="option">
        {{ option }}
      </CheckboxGroupItem>
    </CheckboxGroupList>
    <CheckboxGroupMessage v-if="isEmpty" invalid>
      Choose at least one method.
    </CheckboxGroupMessage>
    <CheckboxGroupDescription v-else>
      Selected: {{ selected.join(', ') }}
    </CheckboxGroupDescription>
  </CheckboxGroup>
</template>
