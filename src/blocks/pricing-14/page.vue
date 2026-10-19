<script lang="ts">
export const description = "Satu kartu paket utama dengan daftar fitur, catatan ala FAQ, dan pita kontak untuk perusahaan."
</script>

<script setup lang="ts">
import { ArrowRight, Building2, CircleCheck, ShieldCheck, Zap } from '@lucide/vue'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const features = [
  'Unlimited workspaces',
  'Unlimited collaborators',
  'Automations & integrations',
  'Advanced reporting',
  'Custom branding',
  'Version history',
  'Offline mode',
  'Priority support',
]

const notes = [
  {
    q: 'Is there really only one plan?',
    a: 'Yes. Everyone gets every feature. You never have to compare tiers or wonder if something is locked behind an upgrade.',
  },
  {
    q: 'What happens after the free trial?',
    a: 'Your trial lasts 30 days. We remind you a week before it ends, and nothing is charged unless you add a payment method.',
  },
  {
    q: 'Can I cancel at any time?',
    a: 'Absolutely. Cancel from your settings in two clicks. You keep access until the end of the current billing period.',
  },
  {
    q: 'Do you offer discounts?',
    a: 'Non-profits and education teams get 50% off. Reach out with proof of status and we will apply it to your account.',
  },
]
</script>

<template>
  <section class="bg-background px-4 py-20 sm:px-6 sm:py-24">
    <div class="mx-auto max-w-5xl">
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="font-semibold text-4xl tracking-tight sm:text-5xl">
          One plan. Everything included.
        </h2>
        <p class="mt-4 text-lg text-muted-foreground">
          No tiers, no add-ons, no surprises. Just the full product at one honest price.
        </p>
      </div>

      <div class="mt-14 overflow-hidden rounded-lg border bg-card shadow-sm lg:grid lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div class="p-6 sm:p-10">
          <div class="flex items-center gap-3">
            <span class="grid size-10 place-items-center rounded-lg bg-primary text-primary-foreground">
              <Zap class="size-5" />
            </span>
            <div>
              <h3 class="font-semibold text-xl">All-access</h3>
              <p class="text-muted-foreground text-sm">For individuals and teams of any size</p>
            </div>
          </div>

          <div class="mt-8 flex items-center gap-4">
            <p class="font-semibold text-muted-foreground text-xs uppercase tracking-wider">What's included</p>
            <div class="h-px flex-1 bg-border" />
          </div>

          <ul class="mt-6 grid gap-x-6 gap-y-3.5 text-sm sm:grid-cols-2">
            <li v-for="feature in features" :key="feature" class="flex items-center gap-3">
              <CircleCheck class="size-4.5 shrink-0 text-primary" />
              {{ feature }}
            </li>
          </ul>
        </div>

        <div class="relative flex flex-col items-center justify-center gap-1 border-t bg-muted/50 p-8 text-center lg:border-t-0 lg:border-l">
          <Badge variant="outline" class="bg-background">30-day free trial</Badge>
          <p class="mt-5 font-medium text-muted-foreground text-sm">Pay once a month</p>
          <p class="mt-1 flex items-baseline gap-1.5">
            <span class="font-semibold text-6xl tracking-tight">$24</span>
            <span class="font-medium text-muted-foreground text-sm">USD</span>
          </p>
          <Button size="lg" class="mt-7 w-full">
            Start free trial
            <ArrowRight class="size-4" />
          </Button>
          <p class="mt-3 flex items-center gap-1.5 text-muted-foreground text-xs">
            <ShieldCheck class="size-3.5" />
            No credit card required
          </p>
        </div>
      </div>

      <div class="mt-16 grid gap-8 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-12">
        <div>
          <h3 class="font-semibold text-xl">Good to know</h3>
          <p class="mt-2 text-muted-foreground text-sm">
            Quick answers to the questions we hear most often about billing.
          </p>
        </div>
        <Accordion type="single" collapsible default-value="note-0" class="w-full">
          <AccordionItem v-for="(note, i) in notes" :key="note.q" :value="`note-${i}`">
            <AccordionTrigger class="text-base">{{ note.q }}</AccordionTrigger>
            <AccordionContent class="text-muted-foreground">{{ note.a }}</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div class="relative mt-16 overflow-hidden rounded-lg bg-primary px-6 py-8 text-primary-foreground sm:px-10">
        <div
          aria-hidden="true"
          class="pointer-events-none absolute -top-24 -right-16 size-64 rounded-full bg-primary-foreground/10 blur-2xl"
        />
        <div class="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div class="flex items-start gap-4">
            <span class="grid size-11 shrink-0 place-items-center rounded-lg bg-primary-foreground/15">
              <Building2 class="size-5" />
            </span>
            <div>
              <h3 class="font-semibold text-lg">Need enterprise controls?</h3>
              <p class="mt-1 max-w-lg text-primary-foreground/95 text-sm">
                SSO, custom contracts, invoicing and a dedicated success manager for 100+ seats.
              </p>
            </div>
          </div>
          <Button variant="secondary" size="lg" class="w-full shrink-0 md:w-auto">
            Contact sales
          </Button>
        </div>
      </div>
    </div>
  </section>
</template>
