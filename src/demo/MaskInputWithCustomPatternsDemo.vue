<!-- example: 1. With custom patterns -->
<script setup lang="ts">
import { ref } from 'vue'
import type { MaskPattern } from '@/components/mask-input'
import { MaskInput } from '@/components/mask-input'
import { Label } from '@/components/ui/label'

// `A` = huruf, `#` = angka; selain itu pemisah yang disisipkan apa adanya.
const licensePattern: MaskPattern = {
  pattern: 'AAA-####',
  transform: value => value.toUpperCase(),
  validate: value => /^[A-Z]{3}\d{4}$/.test(value),
}

const productCodePattern: MaskPattern = {
  pattern: 'PRD-***-***',
  transform: value => value.toUpperCase().replace(/^PRD/, ''),
  validate: value => value.length === 6,
}

const license = ref('')
const productCode = ref('')
const isLicenseValid = ref(true)
const isProductCodeValid = ref(true)
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-6">
    <div class="flex flex-col gap-2">
      <Label for="license">License plate</Label>
      <MaskInput
        id="license"
        v-model="license"
        :mask="licensePattern"
        placeholder="ABC-1234"
        :invalid="!isLicenseValid"
        @validate="valid => isLicenseValid = valid || license.length === 0"
      />
      <p class="text-sm text-muted-foreground">
        Enter license plate (3 letters, 4 numbers)
      </p>
    </div>
    <div class="flex flex-col gap-2">
      <Label for="product">Product code</Label>
      <MaskInput
        id="product"
        v-model="productCode"
        :mask="productCodePattern"
        placeholder="PRD-ABC-123"
        :invalid="!isProductCodeValid"
        @validate="valid => isProductCodeValid = valid || productCode.length === 0"
      />
      <p class="text-sm text-muted-foreground">
        Enter product code (PRD-XXX-XXX format)
      </p>
    </div>
  </div>
</template>
