<script lang="ts">
export const description = "Hari kerja sebagai lencana yang bisa dipilih."
</script>

<script setup lang="ts">
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { CheckboxRoot } from 'reka-ui'

const days = [
  { label: "M", value: "monday" },
  { label: "T", value: "tuesday" },
  { label: "W", value: "wednesday" },
  { label: "T", value: "thursday" },
  { label: "F", value: "friday" },
  { label: "S", value: "saturday" },
  { label: "S", value: "sunday" },
]
</script>

<template>
  <div>
    <Label class="ps-1 font-medium text-foreground/80">
      Select Working Days
    </Label>
    <div class="mt-3.5 flex flex-wrap items-center gap-2 rounded-lg bg-muted/50 px-4 py-3">
      <CheckboxRoot v-for="day in days"
        :class="cn(
          'size-9 cursor-pointer rounded-full border bg-background text-sm transition-colors',
          'data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground'
        )"
        :default-checked="day.value === 'monday' || day.value === 'tuesday'"
        :key="day.value"
      >
        {{ day.label }}
      </CheckboxRoot>
    </div>
  </div>
</template>
