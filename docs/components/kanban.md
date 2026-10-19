---
title: "Kanban"
description: "Papan kanban seret-dan-lepas: kartu berpindah antar kolom, kolomnya sendiri bisa diurutkan ulang."
catalog: true
---

<ComponentPreview name="KanbanDemo" />

## Installation

```bash
npx kliping@latest add kanban
```

## Usage

```vue
<script setup lang="ts">
import { Kanban, KanbanBoard, KanbanColumn, KanbanColumnHandle, KanbanItem, KanbanItemHandle } from '@/components/ui/kanban'
</script>
```

<!--@include: ./_api/kanban.md-->
