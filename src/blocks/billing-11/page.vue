<script lang="ts">
export const description = "Tampilan pembayaran gagal dengan ringkasan galat, alasan penolakan, tombol coba lagi, ganti metode pembayaran, hubungi support, dan linimasa percobaan."
</script>

<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  CalendarClockIcon,
  CircleCheckIcon,
  CircleXIcon,
  CreditCardIcon,
  LifeBuoyIcon,
  RefreshCwIcon,
  TriangleAlertIcon,
} from '@lucide/vue'
import { IconBrandVisa } from '@tabler/icons-vue'
import { cn } from '@/lib/utils'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Spinner } from '@/components/ui/spinner'

type AttemptStatus = "failed" | "succeeded" | "scheduled"

interface Attempt {
  title: string
  when: string
  note: string
  status: AttemptStatus
}

const attempts = ref<Attempt[]>([
  { title: "Automatic retry scheduled", when: "Oct 18, 2026 · 09:00", note: "We'll try the same card again.", status: "scheduled" },
  { title: "Retry declined", when: "Oct 15, 2026 · 09:02", note: "Insufficient funds", status: "failed" },
  { title: "Payment declined", when: "Oct 12, 2026 · 09:00", note: "Insufficient funds", status: "failed" },
  { title: "Invoice INV-2026-0148 issued", when: "Oct 12, 2026 · 08:58", note: "$1,240.00 due on receipt", status: "succeeded" },
])

const state = ref<"failed" | "retrying" | "paid">("failed")

const failedCount = computed(() => attempts.value.filter(a => a.status === "failed").length)

const DETAILS = [
  { label: "Amount due", value: "$1,240.00" },
  { label: "Invoice", value: "INV-2026-0148" },
  { label: "Plan", value: "Pro · monthly" },
  { label: "Access paused on", value: "Oct 26, 2026" },
]

const ICONS = {
  failed: CircleXIcon,
  succeeded: CircleCheckIcon,
  scheduled: CalendarClockIcon,
}

const DOT = {
  failed: "bg-destructive/10 text-destructive",
  succeeded: "bg-primary/10 text-primary",
  scheduled: "bg-muted text-muted-foreground",
}

function retry() {
  state.value = "retrying"
  setTimeout(() => {
    state.value = "paid"
    attempts.value = [
      { title: "Payment succeeded", when: "Just now", note: "Visa •••• 4242 was charged $1,240.00", status: "succeeded" },
      ...attempts.value.filter(a => a.status !== "scheduled"),
    ]
  }, 1500)
}
</script>

<template>
  <div class="mx-auto max-w-5xl p-4 sm:p-6">
    <div class="grid items-start gap-6 lg:grid-cols-[1fr_22rem]">
      <Card>
        <CardHeader class="gap-4">
          <div
            :class="cn(
              'grid size-12 place-items-center rounded-full',
              state === 'paid' ? 'bg-primary/10 text-primary' : 'bg-destructive/10 text-destructive',
            )"
          >
            <CircleCheckIcon v-if="state === 'paid'" class="size-6" />
            <TriangleAlertIcon v-else class="size-6" />
          </div>
          <div class="space-y-1.5">
            <CardTitle class="text-xl">
              {{ state === 'paid' ? "Payment received — you're all set" : "Your payment didn't go through" }}
            </CardTitle>
            <CardDescription>
              <template v-if="state === 'paid'">
                Thanks! Invoice INV-2026-0148 is now paid and your workspace stays active.
              </template>
              <template v-else>
                We couldn't charge <span class="text-foreground font-medium">$1,240.00</span> to your
                Visa ending in 4242. Update your card or retry to keep your workspace active.
              </template>
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent class="space-y-6">
          <Alert v-if="state !== 'paid'" variant="destructive" class="border-destructive/30 bg-destructive/5 text-red-700 *:data-[slot=alert-description]:text-red-700 dark:text-destructive dark:*:data-[slot=alert-description]:text-destructive/90">
            <CircleXIcon />
            <AlertTitle class="line-clamp-none">Declined by your bank: insufficient funds</AlertTitle>
            <AlertDescription>
              <p>
                Your bank rejected the charge after {{ failedCount }} attempts. Make sure the card has
                enough balance, or use a different payment method.
              </p>
              <p class="mt-1 font-mono text-xs">Decline code: insufficient_funds</p>
            </AlertDescription>
          </Alert>

          <dl class="grid grid-cols-2 gap-px overflow-hidden rounded-lg border bg-border">
            <div v-for="item in DETAILS" :key="item.label" class="bg-card p-4">
              <dt class="text-muted-foreground text-xs">{{ item.label }}</dt>
              <dd class="mt-1 text-sm font-semibold">{{ item.value }}</dd>
            </div>
          </dl>

          <div class="flex items-center gap-3 rounded-lg border p-4">
            <div class="bg-muted grid h-9 w-12 shrink-0 place-items-center rounded-md border">
              <IconBrandVisa class="size-6" />
            </div>
            <div class="min-w-0 flex-1">
              <p class="text-sm font-medium">Visa ending in 4242</p>
              <p class="text-muted-foreground text-xs">Expires 04/28 · Nadia Putri</p>
            </div>
            <Badge
              v-if="state !== 'paid'"
              variant="outline"
              class="border-destructive/30 text-destructive"
            >
              Declined
            </Badge>
            <Badge v-else variant="outline" class="border-primary/30 text-primary">
              Charged
            </Badge>
          </div>

          <div v-if="state !== 'paid'" class="flex flex-col gap-2 sm:flex-row">
            <Button :disabled="state === 'retrying'" class="sm:flex-1" @click="retry">
              <Spinner v-if="state === 'retrying'" />
              <RefreshCwIcon v-else />
              {{ state === 'retrying' ? "Retrying…" : "Retry payment" }}
            </Button>
            <Button variant="outline" class="sm:flex-1" :disabled="state === 'retrying'">
              <CreditCardIcon />
              Update payment method
            </Button>
          </div>
          <Button v-else variant="outline" class="w-full">Download receipt</Button>

          <Separator />

          <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p class="text-muted-foreground text-sm">
              Think this is a mistake? Our billing team replies within 2 hours.
            </p>
            <Button variant="ghost" class="shrink-0">
              <LifeBuoyIcon />
              Contact support
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle class="text-base">Payment attempts</CardTitle>
          <CardDescription>Invoice INV-2026-0148</CardDescription>
        </CardHeader>
        <CardContent>
          <ol class="relative">
            <li
              v-for="(attempt, index) in attempts"
              :key="attempt.title + attempt.when"
              class="relative flex gap-3 pb-6 last:pb-0"
            >
              <span
                v-if="index < attempts.length - 1"
                class="bg-border absolute top-8 bottom-0 left-[0.9375rem] w-px"
                aria-hidden="true"
              />
              <span :class="cn('relative grid size-8 shrink-0 place-items-center rounded-full', DOT[attempt.status])">
                <component :is="ICONS[attempt.status]" class="size-4" />
              </span>
              <div class="min-w-0 pt-1">
                <p class="text-sm font-medium">{{ attempt.title }}</p>
                <p class="text-muted-foreground text-xs">{{ attempt.when }}</p>
                <p
                  :class="cn(
                    'mt-1 text-xs',
                    attempt.status === 'failed' ? 'text-destructive' : 'text-muted-foreground',
                  )"
                >
                  {{ attempt.note }}
                </p>
              </div>
            </li>
          </ol>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
