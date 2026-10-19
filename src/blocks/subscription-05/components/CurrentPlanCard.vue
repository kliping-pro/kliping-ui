<script setup lang="ts">
import { CheckIcon, CrownIcon } from '@lucide/vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

export interface Usage {
  label: string
  used: number
  limit: number
  unit?: string
}

defineProps<{
  name: string
  price: number
  cycle: string
  status: 'active' | 'cancelling'
  renewsOn: string
  features: string[]
  usage: Usage[]
}>()

defineEmits<{
  changePlan: []
  cancel: []
  resume: []
}>()
</script>

<template>
  <section class="bg-card text-card-foreground rounded-lg border">
    <div class="flex flex-col gap-4 p-6 sm:flex-row sm:items-start sm:justify-between">
      <div class="flex items-start gap-4">
        <div class="bg-primary text-primary-foreground grid size-11 shrink-0 place-items-center rounded-lg">
          <CrownIcon class="size-5" />
        </div>
        <div class="space-y-1">
          <div class="flex flex-wrap items-center gap-2">
            <h2 class="text-lg font-semibold">
              {{ name }} plan
            </h2>
            <Badge v-if="status === 'active'" class="rounded-md">
              Active
            </Badge>
            <Badge v-else variant="destructive" class="rounded-md">
              Cancels {{ renewsOn }}
            </Badge>
          </div>
          <p class="text-muted-foreground text-sm">
            <span class="text-foreground font-medium tabular-nums">${{ price }}</span> per {{ cycle }}
            <template v-if="status === 'active'">
              · renews {{ renewsOn }}
            </template>
          </p>
        </div>
      </div>
      <div class="flex shrink-0 flex-wrap gap-2">
        <Button @click="$emit('changePlan')">
          Change plan
        </Button>
        <Button
          v-if="status === 'active'"
          variant="outline"
          @click="$emit('cancel')"
        >
          Cancel
        </Button>
        <Button v-else variant="outline" @click="$emit('resume')">
          Resume
        </Button>
      </div>
    </div>

    <div class="grid gap-6 border-t p-6 md:grid-cols-2">
      <div>
        <p class="text-muted-foreground mb-3 text-xs font-medium tracking-wide uppercase">
          Included
        </p>
        <ul class="grid gap-2 text-sm">
          <li v-for="f in features" :key="f" class="flex items-center gap-2">
            <CheckIcon class="text-primary size-4 shrink-0" />
            {{ f }}
          </li>
        </ul>
      </div>
      <div>
        <p class="text-muted-foreground mb-3 text-xs font-medium tracking-wide uppercase">
          Usage this period
        </p>
        <div class="space-y-4">
          <div v-for="u in usage" :key="u.label" class="space-y-1.5">
            <div class="flex items-center justify-between text-sm">
              <span>{{ u.label }}</span>
              <span class="text-muted-foreground tabular-nums">
                {{ u.used }}{{ u.unit ?? '' }} / {{ u.limit }}{{ u.unit ?? '' }}
              </span>
            </div>
            <Progress :model-value="Math.round((u.used / u.limit) * 100)" class="h-1.5" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
