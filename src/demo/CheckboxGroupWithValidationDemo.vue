<!-- example: 2. With Validation -->
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

const tricks = ref<string[]>(['stalefish', 'fs-540'])

// Validasi ditulis di pemakaian: nilai saat ini → pesan galat atau null.
const error = computed(() => (tricks.value.includes('indy') ? 'Indy is not allowed' : null))
</script>

<template>
  <CheckboxGroup v-model="tricks">
    <CheckboxGroupLabel>Tricks</CheckboxGroupLabel>
    <CheckboxGroupList>
      <CheckboxGroupItem value="indy" :invalid="!!error">
        Indy
      </CheckboxGroupItem>
      <CheckboxGroupItem value="stalefish" :invalid="!!error">
        Stalefish
      </CheckboxGroupItem>
      <CheckboxGroupItem value="fs-540" :invalid="!!error">
        FS 540
      </CheckboxGroupItem>
    </CheckboxGroupList>
    <CheckboxGroupMessage v-if="error" invalid>
      {{ error }}
    </CheckboxGroupMessage>
    <CheckboxGroupDescription v-else>
      Select grab tricks
    </CheckboxGroupDescription>
  </CheckboxGroup>
</template>
