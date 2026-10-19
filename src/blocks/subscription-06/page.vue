<script lang="ts">
export const description = "Kartu masa uji coba yang hampir habis dengan progres hari tersisa, hitung mundur, tombol upgrade, dan daftar data yang tetap tersimpan."
</script>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import {
  ArrowRightIcon,
  CircleCheckIcon,
  HourglassIcon,
  LockIcon,
} from '@lucide/vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

const TRIAL_DAYS = 14
const DAY = 86_400_000

const keeps = [
  'All 12 projects and their history',
  'Uploaded files and brand assets',
  'Team members and their roles',
  'Integrations and API keys',
]

const locks = [
  'Publishing to custom domains',
  'Exports above 720p',
]

// Waktu baru dihitung setelah mount supaya HTML server dan klien sama.
const endsAt = ref<number | null>(null)
const now = ref<number | null>(null)
let timer: ReturnType<typeof setInterval> | undefined

onMounted(() => {
  const start = Date.now()
  // Demo: masa uji coba berakhir 3 hari 7 jam 42 menit dari sekarang.
  endsAt.value = start + 3 * DAY + 7 * 3_600_000 + 42 * 60_000
  now.value = start
  timer = setInterval(() => {
    now.value = Date.now()
  }, 1000)
})

onBeforeUnmount(() => {
  if (timer)
    clearInterval(timer)
})

const remaining = computed(() => {
  if (endsAt.value === null || now.value === null)
    return null
  return Math.max(0, endsAt.value - now.value)
})

const parts = computed(() => {
  const ms = remaining.value
  if (ms === null)
    return [{ label: 'Days', value: '--' }, { label: 'Hours', value: '--' }, { label: 'Min', value: '--' }, { label: 'Sec', value: '--' }]
  const s = Math.floor(ms / 1000)
  const pad = (n: number) => String(n).padStart(2, '0')
  return [
    { label: 'Days', value: pad(Math.floor(s / 86_400)) },
    { label: 'Hours', value: pad(Math.floor((s % 86_400) / 3600)) },
    { label: 'Min', value: pad(Math.floor((s % 3600) / 60)) },
    { label: 'Sec', value: pad(s % 60) },
  ]
})

const daysLeft = computed(() => (remaining.value === null ? null : Math.floor(remaining.value / DAY)))
const usedPercent = computed(() => {
  if (remaining.value === null)
    return 0
  return Math.min(100, Math.round(((TRIAL_DAYS * DAY - remaining.value) / (TRIAL_DAYS * DAY)) * 100))
})

const endDate = computed(() => {
  if (endsAt.value === null)
    return '—'
  return new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric' }).format(endsAt.value)
})
</script>

<template>
  <div class="mx-auto w-full max-w-2xl p-4 sm:p-6">
    <section class="bg-card text-card-foreground overflow-hidden rounded-lg border shadow-sm">
      <div class="from-primary/10 bg-linear-to-b to-transparent p-6">
        <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <div class="flex items-center gap-3">
            <div class="bg-primary text-primary-foreground grid size-10 shrink-0 place-items-center rounded-lg">
              <HourglassIcon class="size-5" />
            </div>
            <div>
              <h2 class="font-semibold">
                Your Pro trial ends soon
              </h2>
              <p class="text-muted-foreground text-sm">
                Trial ends on {{ endDate }}. Upgrade to keep the momentum.
              </p>
            </div>
          </div>
          <Badge variant="outline" class="bg-background shrink-0 self-start rounded-md tabular-nums max-sm:order-first">
            {{ daysLeft === null ? '–' : daysLeft }} {{ daysLeft === 1 ? 'day' : 'days' }} left
          </Badge>
        </div>

        <!-- Countdown -->
        <div class="mt-6 grid grid-cols-4 gap-2 sm:gap-3" role="timer" aria-live="off">
          <div
            v-for="p in parts"
            :key="p.label"
            class="bg-background rounded-lg border px-2 py-3 text-center"
          >
            <p class="text-2xl font-semibold tracking-tight tabular-nums sm:text-3xl">
              {{ p.value }}
            </p>
            <p class="text-muted-foreground mt-0.5 text-[11px] tracking-wide uppercase">
              {{ p.label }}
            </p>
          </div>
        </div>

        <!-- Progress -->
        <div class="mt-6 space-y-2">
          <div class="flex items-center justify-between text-xs">
            <span class="text-muted-foreground">Day 1</span>
            <span class="font-medium tabular-nums">{{ usedPercent }}% of trial used</span>
            <span class="text-muted-foreground">Day {{ TRIAL_DAYS }}</span>
          </div>
          <Progress :model-value="usedPercent" class="h-2" />
        </div>
      </div>

      <div class="grid gap-6 border-t p-6 sm:grid-cols-2">
        <div>
          <p class="mb-3 text-sm font-medium">
            What you keep
          </p>
          <ul class="space-y-2">
            <li v-for="k in keeps" :key="k" class="text-muted-foreground flex items-start gap-2 text-sm">
              <CircleCheckIcon class="text-primary mt-0.5 size-4 shrink-0" />
              {{ k }}
            </li>
          </ul>
        </div>
        <div>
          <p class="mb-3 text-sm font-medium">
            Paused on the Free plan
          </p>
          <ul class="space-y-2">
            <li v-for="l in locks" :key="l" class="text-muted-foreground flex items-start gap-2 text-sm">
              <LockIcon class="mt-0.5 size-4 shrink-0" />
              {{ l }}
            </li>
          </ul>
          <p class="text-muted-foreground mt-4 text-xs">
            Nothing is deleted. Upgrade anytime to unlock it again.
          </p>
        </div>
      </div>

      <div class="bg-muted/40 flex flex-col gap-4 border-t p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p class="text-sm">
            <span class="text-lg font-semibold tabular-nums">$20</span>
            <span class="text-muted-foreground">/month, billed yearly</span>
          </p>
          <p class="text-muted-foreground text-xs">
            or $24 month-to-month · cancel anytime
          </p>
        </div>
        <div class="flex flex-col-reverse gap-2 sm:flex-row">
          <Button variant="ghost">
            Compare plans
          </Button>
          <Button class="group">
            Upgrade to Pro
            <ArrowRightIcon class="transition-transform group-hover:translate-x-0.5" />
          </Button>
        </div>
      </div>
    </section>
  </div>
</template>
