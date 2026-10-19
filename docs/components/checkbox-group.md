---
title: "Checkbox Group"
description: "Sekelompok kotak centang yang dikelola bersama: satu nilai jamak, satu pesan error, satu label."
catalog: true
---

<ComponentPreview name="CheckboxGroupDemo" />

## Installation

```bash
npx kliping@latest add checkbox-group
```

## Usage

```vue
<script setup lang="ts">
import { CheckboxGroup, CheckboxGroupDescription, CheckboxGroupItem, CheckboxGroupLabel, CheckboxGroupList, CheckboxGroupMessage } from '@/components/ui/checkbox-group'
</script>
```

## Examples

### Horizontal Orientation

<ComponentPreview name="CheckboxGroupHorizontalOrientationDemo" />

### With Validation

<ComponentPreview name="CheckboxGroupWithValidationDemo" />

### Multi Selection

<ComponentPreview name="CheckboxGroupMultiSelectionDemo" />

<!--@include: ./_api/checkbox-group.md-->
