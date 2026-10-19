---
title: "QR Code"
description: "Penggambar kode QR, dengan tingkat koreksi error, ukuran modul, dan sisipan logo di tengahnya."
catalog: true
---

<ComponentPreview name="QrCodeDemo" />

## Installation

```bash
npx kliping@latest add qr-code
```

## Usage

```vue
<script setup lang="ts">
import { QRCode, QRCodeCanvas, QRCodeDownload, QRCodeImage, QRCodeOverlay, QRCodeSkeleton, QRCodeSvg } from '@/components/ui/qr-code'
</script>
```

## Examples

### Different Formats

<ComponentPreview name="QrCodeFormatsDemo" />

### Customization

<ComponentPreview name="QrCodeCustomizationDemo" />

### Overlay

<ComponentPreview name="QrCodeOverlayDemo" />

<!--@include: ./_api/qr-code.md-->
