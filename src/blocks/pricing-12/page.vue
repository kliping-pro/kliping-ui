<script lang="ts">
export const description = "Tabel perbandingan fitur antarpaket dengan tanda centang dan baris kepala paket yang menempel saat digulir."
</script>

<script setup lang="ts">
import { Check, Minus } from '@lucide/vue'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

type Value = boolean | string

interface Plan {
  id: string
  name: string
  price: string
  note: string
  featured?: boolean
}

const plans: Plan[] = [
  { id: 'basic', name: 'Basic', price: '$0', note: 'Free forever' },
  { id: 'team', name: 'Team', price: '$29', note: 'per month', featured: true },
  { id: 'scale', name: 'Scale', price: '$99', note: 'per month' },
]

const groups: { title: string, rows: { label: string, values: Value[] }[] }[] = [
  {
    title: 'Workspace',
    rows: [
      { label: 'Members', values: ['3', '25', 'Unlimited'] },
      { label: 'Projects', values: ['5', 'Unlimited', 'Unlimited'] },
      { label: 'File storage', values: ['5 GB', '100 GB', '2 TB'] },
      { label: 'Version history', values: ['7 days', '90 days', 'Unlimited'] },
    ],
  },
  {
    title: 'Collaboration',
    rows: [
      { label: 'Real-time editing', values: [true, true, true] },
      { label: 'Comments & mentions', values: [true, true, true] },
      { label: 'Guest access', values: [false, true, true] },
      { label: 'Shared templates', values: [false, true, true] },
    ],
  },
  {
    title: 'Automation',
    rows: [
      { label: 'Workflow runs / month', values: ['100', '10,000', '250,000'] },
      { label: 'Webhooks', values: [false, true, true] },
      { label: 'API access', values: [false, true, true] },
    ],
  },
  {
    title: 'Security & support',
    rows: [
      { label: 'Two-factor authentication', values: [true, true, true] },
      { label: 'SAML single sign-on', values: [false, false, true] },
      { label: 'Audit log', values: [false, false, true] },
      { label: 'Support', values: ['Community', 'Email', '24/7 priority'] },
    ],
  },
]

const cols = 'grid grid-cols-3 md:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))]'
</script>

<template>
  <section class="bg-background px-4 py-20 sm:px-6 sm:py-24">
    <div class="mx-auto max-w-5xl">
      <div class="mx-auto max-w-2xl text-center">
        <p class="font-medium text-primary text-sm">Compare plans</p>
        <h2 class="mt-2 font-semibold text-4xl tracking-tight sm:text-5xl">
          Every detail, side by side
        </h2>
        <p class="mt-4 text-lg text-muted-foreground">
          See exactly what is included before you commit. Switch plans at any time.
        </p>
      </div>

      <div class="relative mt-14">
        <!-- Kepala paket: menempel di atas selama tabel masih terlihat -->
        <div
          :class="cn(cols, 'sticky top-0 z-20 gap-x-2 border-b bg-background/90 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/75 md:gap-x-4')"
        >
          <div class="hidden flex-col justify-end md:flex">
            <p class="font-semibold">Feature</p>
            <p class="text-muted-foreground text-sm">Billed monthly in USD</p>
          </div>
          <div
            v-for="plan in plans"
            :key="plan.id"
            :class="cn(
              'flex flex-col items-center gap-2 rounded-lg px-1 py-2 text-center sm:px-3',
              plan.featured && 'bg-primary/5 ring-1 ring-primary/30',
            )"
          >
            <div class="flex flex-wrap items-center justify-center gap-1.5">
              <span class="font-semibold text-sm sm:text-base">{{ plan.name }}</span>
              <span
                v-if="plan.featured"
                class="hidden rounded-full bg-primary px-2 py-0.5 font-semibold text-[0.625rem] text-primary-foreground uppercase leading-none tracking-wide sm:inline-block"
              >
                Popular
              </span>
            </div>
            <p class="leading-none">
              <span class="font-semibold text-xl tabular-nums sm:text-2xl">{{ plan.price }}</span>
              <span class="mt-1 block text-[0.6875rem] text-muted-foreground sm:text-xs">{{ plan.note }}</span>
            </p>
            <Button
              size="sm"
              :variant="plan.featured ? 'default' : 'outline'"
              class="h-8 w-full max-w-36 px-2 text-xs sm:text-sm"
            >
              {{ plan.featured ? 'Start trial' : 'Choose' }}
            </Button>
          </div>
        </div>

        <div v-for="group in groups" :key="group.title" class="mt-8">
          <h3 class="px-1 pb-2 font-semibold text-muted-foreground text-xs uppercase tracking-wider">
            {{ group.title }}
          </h3>
          <div class="divide-y overflow-hidden rounded-lg border">
            <div
              v-for="row in group.rows"
              :key="row.label"
              :class="cn(cols, 'gap-x-2 px-2 py-3 transition-colors hover:bg-muted/50 md:gap-x-4 md:px-4')"
            >
              <p class="col-span-3 pb-2 font-medium text-sm md:col-span-1 md:pb-0 md:self-center">
                {{ row.label }}
              </p>
              <div
                v-for="(value, i) in row.values"
                :key="plans[i]!.id"
                class="flex items-center justify-center text-center text-sm"
              >
                <template v-if="typeof value === 'boolean'">
                  <span
                    v-if="value"
                    :class="cn(
                      'grid size-6 place-items-center rounded-full',
                      plans[i]!.featured ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary',
                    )"
                  >
                    <Check class="size-3.5" />
                    <span class="sr-only">Included in {{ plans[i]!.name }}</span>
                  </span>
                  <span v-else class="text-muted-foreground/60">
                    <Minus class="size-4" />
                    <span class="sr-only">Not included in {{ plans[i]!.name }}</span>
                  </span>
                </template>
                <span v-else :class="cn('tabular-nums', plans[i]!.featured && 'font-medium')">
                  {{ value }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <p class="mt-8 text-center text-muted-foreground text-sm">
          Need something custom?
          <a href="#" class="font-medium text-foreground underline underline-offset-4 hover:text-primary">Contact our team</a>
        </p>
      </div>
    </div>
  </section>
</template>
