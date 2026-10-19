<!-- example: 1. Form Input -->
<script setup lang="ts">
import { reactive, ref } from 'vue'
import { SegmentedInput, SegmentedInputItem } from '@/components/segmented-input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

const phoneNumber = reactive({ countryCode: '+1', areaCode: '', number: '' })
const submitted = ref('')

function onSubmit() {
  submitted.value = `${phoneNumber.countryCode} ${phoneNumber.areaCode}-${phoneNumber.number}`
}
</script>

<template>
  <form class="flex w-full max-w-sm flex-col gap-4" @submit.prevent="onSubmit">
    <div class="flex flex-col gap-2">
      <Label for="segmented-country-code">Phone Number</Label>
      <SegmentedInput class="w-full" aria-label="Phone number input">
        <SegmentedInputItem
          id="segmented-country-code"
          v-model="phoneNumber.countryCode"
          placeholder="+1"
          class="w-16"
          aria-label="Country code"
        />
        <SegmentedInputItem
          v-model="phoneNumber.areaCode"
          placeholder="555"
          class="w-20"
          maxlength="3"
          inputmode="numeric"
          pattern="[0-9]*"
          aria-label="Area code"
        />
        <SegmentedInputItem
          v-model="phoneNumber.number"
          placeholder="1234567"
          class="flex-1"
          maxlength="7"
          inputmode="numeric"
          pattern="[0-9]*"
          aria-label="Phone number"
        />
      </SegmentedInput>
    </div>
    <Button type="submit" size="sm">
      Submit
    </Button>
    <p v-if="submitted" class="text-sm text-muted-foreground">
      Submitted: <code>{{ submitted }}</code>
    </p>
  </form>
</template>
