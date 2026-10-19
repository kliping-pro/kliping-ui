<script lang="ts">
export const description = "Pengaturan penagihan: switch notifikasi email kuitansi, daftar penerima invoice, pembayaran otomatis, dan batas pengeluaran bulanan."
</script>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { CheckIcon, MailIcon, WalletIcon, ZapIcon } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from '@/components/ui/field'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from '@/components/ui/input-group'
import { Progress } from '@/components/ui/progress'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import {
  TagsInput,
  TagsInputInput,
  TagsInputItem,
  TagsInputItemDelete,
  TagsInputItemText,
} from '@/components/ui/tags-input'

const NOTIFICATIONS = [
  { id: "receipts", label: "Payment receipts", description: "A receipt each time a payment succeeds." },
  { id: "invoices", label: "New invoices", description: "When an invoice is issued, with the PDF attached." },
  { id: "renewals", label: "Renewal reminders", description: "Seven days before your plan renews." },
  { id: "failed", label: "Failed payments", description: "Always sent so you never lose access by surprise.", locked: true },
  { id: "usage", label: "Usage alerts", description: "When spend crosses your alert threshold." },
] as const

type NotificationId = typeof NOTIFICATIONS[number]["id"]

const defaults = () => ({
  notify: { receipts: true, invoices: true, renewals: false, failed: true, usage: true } as Record<NotificationId, boolean>,
  recipients: ["finance@rasastudio.co", "nadia@rasastudio.co"],
  autoPay: true,
  chargeOn: "issue",
  limit: 1500 as string | number,
  hardCap: false,
  threshold: "75",
})

const settings = ref(defaults())
const baseline = ref(JSON.stringify(settings.value))
const saved = ref(false)

const dirty = computed(() => JSON.stringify(settings.value) !== baseline.value)

const SPENT = 1086.4
const limitValue = computed(() => Math.max(Number(settings.value.limit) || 0, 0))
const usedPercent = computed(() =>
  limitValue.value ? Math.min(Math.round((SPENT / limitValue.value) * 100), 100) : 0,
)

const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" })

const recipientsValid = computed(() =>
  settings.value.recipients.every(r => /^\S+@\S+\.\S+$/.test(r)),
)

function save() {
  baseline.value = JSON.stringify(settings.value)
  saved.value = true
  setTimeout(() => {
    saved.value = false
  }, 2000)
}

function reset() {
  settings.value = JSON.parse(baseline.value)
}
</script>

<template>
  <div class="mx-auto max-w-3xl p-4 sm:p-6">
    <div class="mb-6">
      <h2 class="text-xl font-semibold tracking-tight">Billing settings</h2>
      <p class="text-muted-foreground text-sm">
        Control who gets billing emails and how payments are collected.
      </p>
    </div>

    <form class="space-y-6" @submit.prevent="save">
      <!-- Email -->
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <MailIcon class="text-muted-foreground size-4" />
            Email receipts
          </CardTitle>
          <CardDescription>Choose which billing emails we send.</CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup class="gap-0">
            <template v-for="(item, index) in NOTIFICATIONS" :key="item.id">
              <FieldSeparator v-if="index > 0" class="-my-1" />
              <Field orientation="horizontal" class="py-2">
                <FieldContent>
                  <FieldLabel :for="`notify-${item.id}`">{{ item.label }}</FieldLabel>
                  <FieldDescription>{{ item.description }}</FieldDescription>
                </FieldContent>
                <Switch
                  :id="`notify-${item.id}`"
                  v-model="settings.notify[item.id]"
                  :disabled="'locked' in item && item.locked"
                />
              </Field>
            </template>
          </FieldGroup>
        </CardContent>
      </Card>

      <!-- Penerima -->
      <Card>
        <CardHeader>
          <CardTitle>Invoice recipients</CardTitle>
          <CardDescription>
            Everyone listed here receives a copy of each invoice and receipt.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Field :data-invalid="!recipientsValid">
            <FieldLabel for="recipients" class="sr-only">Recipients</FieldLabel>
            <TagsInput v-model="settings.recipients" class="w-full">
              <TagsInputItem v-for="email in settings.recipients" :key="email" :value="email">
                <TagsInputItemText />
                <TagsInputItemDelete />
              </TagsInputItem>
              <TagsInputInput id="recipients" placeholder="Add email and press Enter" class="min-w-48" />
            </TagsInput>
            <FieldDescription v-if="recipientsValid">
              {{ settings.recipients.length }} of 10 recipients. Press Enter or comma to add.
            </FieldDescription>
            <FieldDescription v-else class="text-destructive">
              One of the addresses doesn't look like a valid email.
            </FieldDescription>
          </Field>
        </CardContent>
      </Card>

      <!-- Auto-pay & batas -->
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <WalletIcon class="text-muted-foreground size-4" />
            Payments & spending
          </CardTitle>
          <CardDescription>Automate payments and stay within budget.</CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <Field orientation="horizontal">
              <FieldContent>
                <FieldLabel for="auto-pay">
                  <ZapIcon class="text-primary size-4" />
                  Auto-pay invoices
                </FieldLabel>
                <FieldDescription>
                  Charge your default card automatically instead of paying each invoice by hand.
                </FieldDescription>
              </FieldContent>
              <Switch id="auto-pay" v-model="settings.autoPay" />
            </Field>

            <Field v-if="settings.autoPay" class="bg-muted/40 rounded-lg border p-4">
              <FieldLabel for="charge-on">Charge on</FieldLabel>
              <Select v-model="settings.chargeOn">
                <SelectTrigger id="charge-on" class="bg-background w-full sm:w-64">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="issue">The day the invoice is issued</SelectItem>
                  <SelectItem value="due">The invoice due date</SelectItem>
                  <SelectItem value="month-end">The last day of the month</SelectItem>
                </SelectContent>
              </Select>
            </Field>

            <FieldSeparator />

            <div class="grid gap-4 sm:grid-cols-2">
              <Field>
                <FieldLabel for="spending-limit">Monthly spending limit</FieldLabel>
                <InputGroup>
                  <InputGroupAddon>
                    <InputGroupText>$</InputGroupText>
                  </InputGroupAddon>
                  <InputGroupInput
                    id="spending-limit"
                    v-model="settings.limit"
                    type="number"
                    min="0"
                    step="50"
                    class="tabular-nums"
                  />
                  <InputGroupAddon align="inline-end">
                    <InputGroupText>USD</InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
              </Field>
              <Field>
                <FieldLabel for="threshold">Alert me at</FieldLabel>
                <Select v-model="settings.threshold">
                  <SelectTrigger id="threshold" class="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="50">50% of limit</SelectItem>
                    <SelectItem value="75">75% of limit</SelectItem>
                    <SelectItem value="90">90% of limit</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            </div>

            <div class="space-y-2">
              <div class="flex justify-between text-sm">
                <span class="text-muted-foreground">
                  Spent this month: <span class="text-foreground font-medium">{{ currency.format(SPENT) }}</span>
                </span>
                <span class="font-medium tabular-nums">{{ usedPercent }}%</span>
              </div>
              <Progress :model-value="usedPercent" aria-label="Spending against limit" />
              <p v-if="usedPercent >= Number(settings.threshold)" class="text-destructive text-xs">
                You're past your {{ settings.threshold }}% alert threshold.
              </p>
            </div>

            <Field orientation="horizontal">
              <FieldContent>
                <FieldLabel for="hard-cap">Pause usage at the limit</FieldLabel>
                <FieldDescription>
                  Stop metered features instead of billing overages.
                </FieldDescription>
              </FieldContent>
              <Switch id="hard-cap" v-model="settings.hardCap" />
            </Field>
          </FieldGroup>
        </CardContent>
        <CardFooter class="flex-col-reverse gap-3 border-t sm:flex-row sm:justify-end">
          <span v-if="saved" class="text-primary mr-auto flex items-center gap-1.5 text-sm font-medium">
            <CheckIcon class="size-4" /> Settings saved
          </span>
          <Button type="button" variant="ghost" class="w-full sm:w-auto" :disabled="!dirty" @click="reset">
            Reset
          </Button>
          <Button type="submit" class="w-full sm:w-auto" :disabled="!dirty || !recipientsValid">
            Save changes
          </Button>
        </CardFooter>
      </Card>
    </form>
  </div>
</template>
