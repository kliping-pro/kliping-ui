<script lang="ts">
export const description = "Dialog promo waktu terbatas dengan sorotan diskon, hitung mundur, dan tabel perbandingan paket singkat."
</script>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { CheckIcon, MinusIcon, TimerIcon, XIcon } from '@lucide/vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

const DISCOUNT = 40
const PRICE_YEARLY = 240
const OFFER_MS = 23 * 3_600_000 + 59 * 60_000 + 30_000

const rows: { label: string, free: string | boolean, pro: string | boolean }[] = [
  { label: 'Projects', free: '3', pro: 'Unlimited' },
  { label: 'Storage', free: '2 GB', pro: '100 GB' },
  { label: 'Team seats', free: '1', pro: '5' },
  { label: 'Custom domain', free: false, pro: true },
  { label: 'Version history', free: '7 days', pro: '1 year' },
  { label: 'Priority support', free: false, pro: true },
]

const open = ref(true)
const claimed = ref(false)

const discounted = PRICE_YEARLY * (1 - DISCOUNT / 100)
const perMonth = (discounted / 12).toFixed(2)

// Batas waktu ditetapkan setelah mount agar render server dan klien identik.
const deadline = ref<number | null>(null)
const now = ref<number | null>(null)
let timer: ReturnType<typeof setInterval> | undefined

onMounted(() => {
  const t = Date.now()
  deadline.value = t + OFFER_MS
  now.value = t
  timer = setInterval(() => {
    now.value = Date.now()
  }, 1000)
})

onBeforeUnmount(() => {
  if (timer)
    clearInterval(timer)
})

const clock = computed(() => {
  if (deadline.value === null || now.value === null)
    return ['--', '--', '--']
  const s = Math.max(0, Math.floor((deadline.value - now.value) / 1000))
  const pad = (n: number) => String(n).padStart(2, '0')
  return [pad(Math.floor(s / 3600)), pad(Math.floor((s % 3600) / 60)), pad(s % 60)]
})

const expired = computed(() => deadline.value !== null && now.value !== null && now.value >= deadline.value)
</script>

<template>
  <div class="grid min-h-screen w-full place-items-center p-6">
    <Dialog v-model:open="open">
      <DialogTrigger as-child>
        <Button variant="outline">
          <TimerIcon />
          View offer
        </Button>
      </DialogTrigger>
      <DialogContent class="max-h-[calc(100dvh-2rem)] grid-cols-1 gap-0 overflow-x-hidden overflow-y-auto p-0 [&>*]:min-w-0 sm:max-w-lg" :show-close-button="false">
        <!-- Hero -->
        <div class="bg-primary text-primary-foreground relative overflow-hidden rounded-t-lg px-6 pt-8 pb-6">
          <div
            aria-hidden="true"
            class="pointer-events-none absolute -top-16 -right-10 size-48 rounded-full bg-white/10"
          />
          <div
            aria-hidden="true"
            class="pointer-events-none absolute -bottom-20 -left-12 size-40 rounded-full bg-black/10"
          />
          <DialogClose
            class="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 focus-visible:ring-primary-foreground/50 absolute top-3 right-3 z-10 grid size-8 place-items-center rounded-md transition-colors outline-none focus-visible:ring-2"
          >
            <XIcon class="size-4" />
            <span class="sr-only">Close</span>
          </DialogClose>
          <div class="relative">
            <Badge class="bg-primary-foreground text-primary rounded-md">
              Limited-time offer
            </Badge>
            <DialogHeader class="mt-4 gap-1 text-left">
              <DialogTitle class="text-primary-foreground text-4xl font-semibold tracking-tight sm:text-5xl">
                {{ DISCOUNT }}% off Pro
              </DialogTitle>
              <DialogDescription class="text-primary-foreground/95">
                Your first year of Pro for ${{ discounted.toFixed(0) }} instead of ${{ PRICE_YEARLY }}. That's ${{ perMonth }}/month.
              </DialogDescription>
            </DialogHeader>

            <div class="mt-6 flex items-center gap-3">
              <span class="text-primary-foreground/95 text-xs font-medium tracking-wide uppercase">
                Ends in
              </span>
              <div class="flex items-center gap-1.5" role="timer" :aria-label="`Offer ends in ${clock[0]} hours ${clock[1]} minutes`">
                <template v-for="(unit, i) in clock" :key="i">
                  <span class="bg-primary-foreground/5 min-w-10 rounded-md px-2 py-1.5 text-center text-lg font-semibold tabular-nums">
                    {{ unit }}
                  </span>
                  <span v-if="i < clock.length - 1" class="font-semibold opacity-70">:</span>
                </template>
              </div>
            </div>
          </div>
        </div>

        <!-- Comparison -->
        <div class="p-6">
          <table class="w-full text-sm">
            <caption class="sr-only">
              Free and Pro plan comparison
            </caption>
            <thead>
              <tr class="text-muted-foreground text-xs">
                <th scope="col" class="pb-2 text-left font-medium">
                  Feature
                </th>
                <th scope="col" class="w-20 pb-2 text-center font-medium">
                  Free
                </th>
                <th scope="col" class="text-primary w-24 pb-2 text-center font-semibold">
                  Pro
                </th>
              </tr>
            </thead>
            <tbody class="divide-y border-y">
              <tr v-for="row in rows" :key="row.label">
                <th scope="row" class="py-2.5 text-left font-normal">
                  {{ row.label }}
                </th>
                <td class="text-muted-foreground py-2.5 text-center">
                  <template v-if="typeof row.free === 'string'">
                    {{ row.free }}
                  </template>
                  <CheckIcon v-else-if="row.free" class="mx-auto size-4" aria-label="Included" />
                  <MinusIcon v-else class="mx-auto size-4 opacity-50" aria-label="Not included" />
                </td>
                <td class="bg-primary/5 py-2.5 text-center font-medium">
                  <template v-if="typeof row.pro === 'string'">
                    {{ row.pro }}
                  </template>
                  <CheckIcon v-else-if="row.pro" class="text-primary mx-auto size-4" aria-label="Included" />
                  <MinusIcon v-else class="mx-auto size-4 opacity-50" aria-label="Not included" />
                </td>
              </tr>
            </tbody>
          </table>

          <div class="mt-6 flex items-end justify-between gap-4">
            <div>
              <p class="text-muted-foreground text-sm tabular-nums line-through">
                ${{ PRICE_YEARLY }}/year
              </p>
              <p class="text-2xl font-semibold tracking-tight tabular-nums">
                ${{ discounted.toFixed(0) }}<span class="text-muted-foreground ml-1 text-sm font-normal">/first year</span>
              </p>
            </div>
            <Badge variant="secondary" class="rounded-md tabular-nums">
              Save ${{ (PRICE_YEARLY - discounted).toFixed(0) }}
            </Badge>
          </div>

          <div class="mt-6 flex flex-col gap-2">
            <Button
              size="lg"
              :disabled="claimed || expired"
              @click="claimed = true"
            >
              <template v-if="claimed">
                <CheckIcon />
                Offer claimed
              </template>
              <template v-else-if="expired">
                Offer expired
              </template>
              <template v-else>
                Claim {{ DISCOUNT }}% off
              </template>
            </Button>
            <Button variant="ghost" class="text-muted-foreground" @click="open = false">
              Maybe later
            </Button>
          </div>
          <p class="text-muted-foreground mt-3 text-center text-xs">
            Renews at ${{ PRICE_YEARLY }}/year. Cancel anytime.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  </div>
</template>
