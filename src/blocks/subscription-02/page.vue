<script lang="ts">
export const description = "Kartu pembatalan langganan di halaman pengaturan dengan daftar fitur yang hilang dan opsi jeda sebagai alternatif."
</script>

<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  CirclePauseIcon,
  CircleXIcon,
  CloudIcon,
  FolderKanbanIcon,
  GlobeIcon,
  HeadsetIcon,
  InfoIcon,
  UsersIcon,
} from '@lucide/vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { cn } from '@/lib/utils'

const losses = [
  { icon: FolderKanbanIcon, label: 'Unlimited projects', now: '24 active', after: '3 projects' },
  { icon: UsersIcon, label: 'Team seats', now: '8 members', after: '1 member' },
  { icon: CloudIcon, label: 'File storage', now: '48 GB used', after: '2 GB' },
  { icon: GlobeIcon, label: 'Custom domains', now: '2 connected', after: 'Not available' },
  { icon: HeadsetIcon, label: 'Priority support', now: '< 2h response', after: 'Community only' },
]

const pauseOptions = [
  { value: '1', label: '1 month', resumes: 'December 30, 2026' },
  { value: '2', label: '2 months', resumes: 'January 30, 2027' },
  { value: '3', label: '3 months', resumes: 'February 28, 2027' },
]

const choice = ref<'pause' | 'cancel'>('pause')
const pauseLength = ref('1')
const result = ref<'paused' | 'cancelled' | null>(null)

const resumesOn = computed(() => pauseOptions.find(o => o.value === pauseLength.value)?.resumes ?? '')

function submit() {
  result.value = choice.value === 'pause' ? 'paused' : 'cancelled'
}
</script>

<template>
  <div class="mx-auto w-full max-w-3xl p-4 sm:p-6">
    <Card class="gap-0 rounded-lg py-0">
      <CardHeader class="flex flex-col gap-3 border-b p-6 sm:flex-row sm:items-start sm:justify-between">
        <div class="space-y-1.5">
          <CardTitle class="text-lg">
            Cancel subscription
          </CardTitle>
          <CardDescription>
            You're on the <span class="text-foreground font-medium">Business</span> plan, billed $49/month. Renews November 30, 2026.
          </CardDescription>
        </div>
        <Badge variant="secondary" class="rounded-md">
          Active
        </Badge>
      </CardHeader>

      <CardContent class="grid grid-cols-1 gap-8 p-6 md:grid-cols-2">
        <!-- What you lose -->
        <section class="min-w-0 space-y-4">
          <div>
            <h3 class="text-sm font-medium">
              What you'll lose
            </h3>
            <p class="text-muted-foreground text-sm">
              When the current period ends, your workspace drops to Free.
            </p>
          </div>
          <ul class="divide-y rounded-lg border">
            <li
              v-for="item in losses"
              :key="item.label"
              class="flex items-center gap-3 px-3 py-2.5"
            >
              <div class="bg-muted text-muted-foreground grid size-8 shrink-0 place-items-center rounded-md">
                <component :is="item.icon" class="size-4" />
              </div>
              <div class="min-w-0 flex-1">
                <p class="truncate text-sm font-medium">
                  {{ item.label }}
                </p>
                <p class="text-muted-foreground flex flex-wrap items-center gap-x-1.5 text-xs">
                  <span>{{ item.now }}</span>
                  <span aria-hidden="true">→</span>
                  <span class="sr-only">becomes</span>
                  <span class="text-destructive">{{ item.after }}</span>
                </p>
              </div>
            </li>
          </ul>
        </section>

        <!-- Options -->
        <section class="min-w-0 space-y-4">
          <div>
            <h3 class="text-sm font-medium">
              Choose what happens next
            </h3>
            <p class="text-muted-foreground text-sm">
              Taking a break? Pausing keeps everything exactly as it is.
            </p>
          </div>

          <RadioGroup v-model="choice" class="gap-3" :disabled="result !== null">
            <div
              :class="cn(
                'rounded-lg border transition-colors',
                choice === 'pause' ? 'border-primary bg-primary/5' : 'hover:bg-muted/50',
              )"
            >
              <Label for="opt-pause" class="flex cursor-pointer items-start gap-3 p-4 font-normal">
                <RadioGroupItem id="opt-pause" value="pause" class="mt-0.5" />
                <div class="flex-1 space-y-1">
                  <div class="flex flex-wrap items-center gap-2">
                    <CirclePauseIcon class="text-primary size-4" />
                    <span class="text-sm font-medium">Pause instead</span>
                    <Badge class="px-1.5 text-[10px] leading-4">
                      Recommended
                    </Badge>
                  </div>
                  <p class="text-muted-foreground text-sm">
                    No charges while paused. Your data and settings are kept.
                  </p>
                </div>
              </Label>
              <div
                v-if="choice === 'pause'"
                class="space-y-2 px-4 pb-4 pl-11"
              >
                <ToggleGroup
                  :model-value="pauseLength"
                  type="single"
                  variant="outline"
                  size="sm"
                  class="bg-background w-full"
                  :disabled="result !== null"
                  @update:model-value="(v) => { if (typeof v === 'string' && v) pauseLength = v }"
                >
                  <ToggleGroupItem
                    v-for="opt in pauseOptions"
                    :key="opt.value"
                    :value="opt.value"
                    class="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground min-w-0 flex-1 shrink px-2"
                  >
                    {{ opt.label }}
                  </ToggleGroupItem>
                </ToggleGroup>
                <p class="text-muted-foreground text-xs">
                  Billing resumes automatically on {{ resumesOn }}.
                </p>
              </div>
            </div>

            <Label
              for="opt-cancel"
              :class="cn(
                'flex cursor-pointer items-start gap-3 rounded-lg border p-4 font-normal transition-colors',
                choice === 'cancel' ? 'border-destructive/60 bg-destructive/5' : 'hover:bg-muted/50',
              )"
            >
              <RadioGroupItem id="opt-cancel" value="cancel" class="mt-0.5" />
              <div class="flex-1 space-y-1">
                <div class="flex items-center gap-2">
                  <CircleXIcon class="text-destructive size-4" />
                  <span class="text-sm font-medium">Cancel at period end</span>
                </div>
                <p class="text-muted-foreground text-sm">
                  Keep Business features until November 30, 2026.
                </p>
              </div>
            </Label>
          </RadioGroup>
        </section>
      </CardContent>

      <Separator />

      <CardFooter class="flex flex-col-reverse items-stretch gap-3 p-6 sm:flex-row sm:items-center sm:justify-between">
        <p
          v-if="result"
          class="text-muted-foreground flex items-center gap-2 text-sm"
          role="status"
        >
          <InfoIcon class="text-primary size-4 shrink-0" />
          <template v-if="result === 'paused'">
            Paused. Billing resumes {{ resumesOn }}.
          </template>
          <template v-else>
            Cancelled. Access ends November 30, 2026.
          </template>
        </p>
        <p v-else class="text-muted-foreground text-sm">
          Changed your mind? You can resume anytime.
        </p>
        <div class="flex flex-col-reverse gap-2 sm:flex-row">
          <Button v-if="result" variant="outline" @click="result = null">
            Undo
          </Button>
          <template v-else>
            <Button variant="ghost">
              Keep subscription
            </Button>
            <Button
              :variant="choice === 'cancel' ? 'destructive' : 'default'"
              @click="submit"
            >
              {{ choice === 'pause' ? `Pause for ${pauseOptions.find(o => o.value === pauseLength)?.label}` : 'Cancel subscription' }}
            </Button>
          </template>
        </div>
      </CardFooter>
    </Card>
  </div>
</template>
