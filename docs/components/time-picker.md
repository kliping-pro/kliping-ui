---
title: "Time Picker"
description: "Pemilih waktu yang bisa diketik langsung maupun dipilih dari daftar, dan mengikuti format 12 atau 24 jam sesuai lokal."
catalog: true
---

<ComponentPreview name="TimePickerDemo" />

## Installation

```bash
npx kliping@latest add time-picker
```

## Usage

```vue
<script setup lang="ts">
import { TimePicker, TimePickerClear, TimePickerColumn, TimePickerColumnItem, TimePickerContent, TimePickerHour, TimePickerInput, TimePickerInputGroup, TimePickerLabel, TimePickerMinute, TimePickerPeriod, TimePickerSecond, TimePickerSeparator, TimePickerTrigger } from '@/components/ui/time-picker'
</script>
```

## Examples

### With Step

<ComponentPreview name="TimePickerWithStepDemo" />

### With Seconds

<ComponentPreview name="TimePickerWithSecondsDemo" />

### Open on Focus

<ComponentPreview name="TimePickerOpenOnFocusDemo" />

### Input Group Click Action

<ComponentPreview name="TimePickerInputGroupClickActionDemo" />

### Controlled State

<ComponentPreview name="TimePickerControlledStateDemo" />

### With Form

<ComponentPreview name="TimePickerWithFormDemo" />

<!--@include: ./_api/time-picker.md-->
