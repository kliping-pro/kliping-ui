---
title: "Key Value"
description: "Masukan pasangan kunci-nilai yang tumbuh sendiri, mengerti tempelan berbaris banyak, dan memvalidasi kuncinya."
catalog: true
---

<ComponentPreview name="KeyValueDemo" />

## Installation

```bash
npx kliping@latest add key-value
```

## Usage

```vue
<script setup lang="ts">
import { KeyValue, KeyValueAdd, KeyValueError, KeyValueItem, KeyValueKeyInput, KeyValueList, KeyValueRemove, KeyValueValueInput } from '@/components/ui/key-value'
</script>
```

## Examples

### With Paste Support

<ComponentPreview name="KeyValueWithPasteSupportDemo" />

### With Validation

<ComponentPreview name="KeyValueWithValidationDemo" />

### With Form

<ComponentPreview name="KeyValueWithFormDemo" />

<!--@include: ./_api/key-value.md-->
