---
title: "File Upload"
description: "Pengunggah berkas dengan seret-dan-lepas, pratinjau, dan bilah kemajuan per berkas."
catalog: true
---

<ComponentPreview name="FileUploadDemo" />

## Installation

```bash
npx kliping@latest add file-upload
```

## Usage

```vue
<script setup lang="ts">
import { FileUpload, FileUploadClear, FileUploadDropzone, FileUploadItem, FileUploadItemDelete, FileUploadItemMetadata, FileUploadItemPreview, FileUploadItemProgress, FileUploadList, FileUploadTrigger } from '@/components/ui/file-upload'
</script>
```

## Examples

### With Validation

<ComponentPreview name="FileUploadWithValidationDemo" />

### Direct Upload

<ComponentPreview name="FileUploadDirectUploadDemo" />

### Circular Progress

<ComponentPreview name="FileUploadCircularProgressDemo" />

### Fill Progress

<ComponentPreview name="FileUploadFillProgressDemo" />

### With Chat Input

<ComponentPreview name="FileUploadWithChatInputDemo" />

### With Form

<ComponentPreview name="FileUploadWithFormDemo" />

<!--@include: ./_api/file-upload.md-->
