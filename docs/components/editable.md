---
title: "Editable"
description: "Teks yang disunting di tempat — sekali klik berubah jadi masukan, sekali Escape kembali seperti semula."
catalog: true
---

<ComponentPreview name="EditableDemo" />

## Installation

```bash
npx kliping@latest add editable
```

## Usage

```vue
<script setup lang="ts">
import { Editable, EditableArea, EditableCancel, EditableInput, EditableLabel, EditablePreview, EditableSubmit, EditableToolbar, EditableTrigger } from '@/components/ui/editable'
</script>
```

## Examples

### With Double Click

<ComponentPreview name="EditableWithDoubleClickDemo" />

### With Autosize

<ComponentPreview name="EditableWithAutosizeDemo" />

### Todo List

<ComponentPreview name="EditableTodoListDemo" />

### With Form

<ComponentPreview name="EditableWithFormDemo" />

<!--@include: ./_api/editable.md-->
