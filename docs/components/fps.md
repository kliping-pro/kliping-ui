---
title: "FPS"
description: "Penghitung bingkai per detik yang berjalan langsung, untuk mengintip biaya render sambil mengembangkan."
catalog: true
---

<ComponentPreview name="FpsDemo" />

## Installation

```bash
npx kliping@latest add fps
```

## Usage

```vue
<script setup lang="ts">
import { Fps } from '@/components/ui/fps'
</script>
```

## Examples

### Positioning Strategy

<ComponentPreview name="FpsPositioningStrategyDemo" />

### Custom Position

<ComponentPreview name="FpsCustomPositionDemo" />

### Custom Thresholds

<ComponentPreview name="FpsCustomThresholdsDemo" />

### Conditional Rendering

<ComponentPreview name="FpsConditionalRenderingDemo" />

<!--@include: ./_api/fps.md-->
