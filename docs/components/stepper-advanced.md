---
title: "Stepper Advanced"
description: "Penuntun proses berlangkah dengan penanda kemajuan, langkah yang bisa dilompati, dan keadaan error per langkah."
catalog: true
---

<ComponentPreview name="StepperAdvancedDemo" />

## Installation

```bash
npx kliping@latest add stepper-advanced
```

## Usage

```vue
<script setup lang="ts">
import { Stepper, StepperDescription, StepperIndicator, StepperItem, StepperList, StepperSeparator, StepperTitle, StepperTrigger } from '@/components/ui/stepper-advanced'
</script>
```

## Examples

### Vertical Layout

<ComponentPreview name="StepperAdvancedVerticalLayoutDemo" />

### With Validation

<ComponentPreview name="StepperAdvancedWithValidationDemo" />

### With Form

<ComponentPreview name="StepperAdvancedWithFormDemo" />

<!--@include: ./_api/stepper-advanced.md-->
