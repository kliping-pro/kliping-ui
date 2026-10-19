---
title: "Timeline"
description: "Garis waktu peristiwa, mendatar maupun menegak, dengan keadaan per simpul."
catalog: true
---

<ComponentPreview name="TimelineDemo" />

## Installation

```bash
npx kliping@latest add timeline
```

## Usage

```vue
<script setup lang="ts">
import { Timeline, TimelineConnector, TimelineContent, TimelineDescription, TimelineDot, TimelineHeader, TimelineItem, TimelineTime, TimelineTitle } from '@/components/ui/timeline'
</script>
```

## Examples

### Horizontal Timeline

<ComponentPreview name="TimelineHorizontalTimelineDemo" />

### RTL Timeline

<ComponentPreview name="TimelineRtlTimelineDemo" />

### Alternate Timeline

<ComponentPreview name="TimelineAlternateTimelineDemo" />

### Horizontal Alternate Timeline

<ComponentPreview name="TimelineHorizontalAlternateTimelineDemo" />

### With Custom Dots

<ComponentPreview name="TimelineWithCustomDotsDemo" />

<!--@include: ./_api/timeline.md-->
