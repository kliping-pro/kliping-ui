---
title: "Cropper"
description: "Pemotong gambar dan video dengan zum, putar, dan bingkai potong yang bisa dibentuk."
catalog: true
---

<ComponentPreview name="CropperDemo" />

## Installation

```bash
npx kliping@latest add cropper
```

## Usage

```vue
<script setup lang="ts">
import { Cropper, CropperArea, CropperImage, CropperReset, CropperRotate, CropperRotateSlider, CropperVideo, CropperViewport, CropperZoom, CropperZoomSlider } from '@/components/ui/cropper'
</script>
```

## Examples

### Controlled State

<ComponentPreview name="CropperControlledStateDemo" />

### With File Upload

<ComponentPreview name="CropperWithFileUploadDemo" />

### Different Shapes

<ComponentPreview name="CropperDifferentShapesDemo" />

### Video Cropping

<ComponentPreview name="CropperVideoCroppingDemo" />

<!--@include: ./_api/cropper.md-->
