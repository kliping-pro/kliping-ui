---
title: "Color Picker"
description: "Pemilih warna dengan bidang saturasi, penggeser rona dan alfa, serta masukan teks dalam beberapa format."
catalog: true
---

<ComponentPreview name="ColorPickerDemo" />

## Installation

```bash
npx kliping@latest add color-picker
```

## Usage

```vue
<script setup lang="ts">
import { ColorPicker, ColorPickerAlphaSlider, ColorPickerArea, ColorPickerContent, ColorPickerEyeDropper, ColorPickerFormatSelect, ColorPickerHueSlider, ColorPickerInput, ColorPickerSwatch, ColorPickerSwatches, ColorPickerSwatchItem, ColorPickerTrigger } from '@/components/ui/color-picker'
</script>
```

## Examples

### Inline Color Picker

<ComponentPreview name="ColorPickerInlineColorPickerDemo" />

### Controlled State

<ComponentPreview name="ColorPickerControlledStateDemo" />

### With Form

<ComponentPreview name="ColorPickerWithFormDemo" />

<!--@include: ./_api/color-picker.md-->
