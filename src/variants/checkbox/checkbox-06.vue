<script lang="ts">
export const description = "Nilainya dipegang halaman, bukan komponennya sendiri."
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { Checkbox } from '@/components/ui/checkbox'

const checked = ref<boolean | 'indeterminate'>(false)

</script>

<template>
  <div class="flex items-center space-x-2">
    <Checkbox
      v-model="checked"
      id="terms-controlled"
    />
    <label
      class="font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      for="terms-controlled"
    >
      Accept terms and conditions
    </label>
  </div>
</template>
