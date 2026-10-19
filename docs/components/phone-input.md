---
title: "Phone Input"
description: "Masukan nomor telepon internasional dengan pemilih negara dan perapian nomor mengikuti negaranya."
catalog: true
---

<ComponentPreview name="PhoneInputDemo" />

## Installation

```bash
npx kliping@latest add phone-input
```

## Usage

```vue
<script setup lang="ts">
import { PhoneInput, PhoneInputCountrySelect, PhoneInputField } from '@/components/ui/phone-input'
</script>
```

## Examples

### Custom Countries

<ComponentPreview name="PhoneInputCustomCountriesDemo" />

### With Form

<ComponentPreview name="PhoneInputFormDemo" />

<!--@include: ./_api/phone-input.md-->
