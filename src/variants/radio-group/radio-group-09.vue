<script lang="ts">
export const description = "Pilihan paket di dalam kartu, tiap baris berketerangan."
</script>

<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
</script>

<template>
  <Card class="max-w-xs shadow-xs">
    <CardHeader>
      <CardTitle>Plan Options</CardTitle>
      <CardDescription>
        Select your preferred subscription plan
      </CardDescription>
    </CardHeader>
    <CardContent>
      <RadioGroup defaultValue="standard">
        <div class="mb-4 flex items-start space-x-2">
          <RadioGroupItem id="free" value="free" />
          <Label class="flex flex-col items-start" for="free">
            <span class="font-semibold">Free</span>
            <span class="text-muted-foreground text-sm">
              Basic features, no cost
            </span>
          </Label>
        </div>
        <div class="mb-4 flex items-start space-x-2">
          <RadioGroupItem id="standard" value="standard" />
          <Label class="flex flex-col items-start" for="standard">
            <span class="font-semibold">Standard</span>
            <span class="text-muted-foreground text-sm">
              Advanced features, $9.99/month
            </span>
          </Label>
        </div>
        <div class="flex items-start space-x-2">
          <RadioGroupItem id="premium" value="premium" />
          <Label class="flex flex-col items-start" for="premium">
            <span class="font-semibold">Premium</span>
            <span class="text-muted-foreground text-sm">
              All features, $19.99/month
            </span>
          </Label>
        </div>
      </RadioGroup>
    </CardContent>
  </Card>
</template>
