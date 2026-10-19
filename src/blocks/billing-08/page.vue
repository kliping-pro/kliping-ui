<script lang="ts">
export const description = "Form detail pembayaran dengan format nomor kartu, masa berlaku, dan CVC otomatis, ringkasan pesanan, serta tombol bayar sesuai nominal."
</script>

<script setup lang="ts">
import type { Component } from 'vue'
import { computed, nextTick, ref } from 'vue'
import {
  CircleCheckIcon,
  CreditCardIcon,
  LockIcon,
  ShieldCheckIcon,
} from '@lucide/vue'
import { IconBrandMastercard, IconBrandVisa } from '@tabler/icons-vue'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldLegend,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Spinner } from '@/components/ui/spinner'

const LINES = [
  { label: "Pro plan · annual", detail: "5 seats × $48.00", amount: 240 },
  { label: "Priority support", detail: "Add-on", amount: 60 },
]
const TAX_RATE = 0.11

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
})

const subtotal = LINES.reduce((sum, l) => sum + l.amount, 0)
const tax = Math.round(subtotal * TAX_RATE * 100) / 100
const total = subtotal + tax

const email = ref("")
const name = ref("")
const number = ref("")
const expiry = ref("")
const cvc = ref("")
const submitted = ref(false)
const state = ref<"idle" | "processing" | "done">("idle")

const digits = (value: string) => value.replace(/\D/g, "")

const formatters = {
  number: (v: string) => digits(v).slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 "),
  expiry: (v: string) => {
    const d = digits(v).slice(0, 4)
    // "4" → "04/" terasa terlalu agresif; cukup sisipkan garis miring setelah dua digit.
    return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d
  },
  cvc: (v: string) => digits(v).slice(0, 4),
}

const fields = { number, expiry, cvc }

// Tulis nilai mentah, lalu ganti dengan versi terformat sesudah render —
// jadi input ikut terkoreksi walau hasil format sama dengan nilai lama.
function mask(key: keyof typeof fields) {
  return (value: string | number) => {
    const raw = String(value)
    fields[key].value = raw
    nextTick(() => {
      fields[key].value = formatters[key](raw)
    })
  }
}

type Brand = "visa" | "mastercard" | "card"
const BRAND_ICON: Record<Brand, Component> = {
  visa: IconBrandVisa,
  mastercard: IconBrandMastercard,
  card: CreditCardIcon,
}

const brand = computed<Brand>(() => {
  const d = digits(number.value)
  if (d.startsWith("4"))
    return "visa"
  if (/^(5[1-5]|2[2-7])/.test(d))
    return "mastercard"
  return "card"
})

const errors = computed(() => {
  const [mm = "", yy = ""] = expiry.value.split("/")
  return {
    email: /^\S+@\S+\.\S+$/.test(email.value) ? "" : "Enter a valid email address.",
    number: digits(number.value).length === 16 ? "" : "Card number must be 16 digits.",
    expiry: Number(mm) >= 1 && Number(mm) <= 12 && yy.length === 2 ? "" : "Use the MM/YY format.",
    cvc: cvc.value.length >= 3 ? "" : "CVC must be 3 or 4 digits.",
    name: name.value.trim() ? "" : "Enter the name on the card.",
  }
})

const cardError = computed(() =>
  errors.value.number || errors.value.expiry || errors.value.cvc,
)

function pay() {
  submitted.value = true
  if (Object.values(errors.value).some(Boolean))
    return
  state.value = "processing"
  setTimeout(() => {
    state.value = "done"
  }, 1400)
}

function reset() {
  email.value = ""
  name.value = ""
  number.value = ""
  expiry.value = ""
  cvc.value = ""
  submitted.value = false
  state.value = "idle"
}
</script>

<template>
  <div class="mx-auto max-w-4xl p-4 sm:p-6">
    <Card class="gap-0 overflow-hidden py-0">
      <div class="grid md:grid-cols-[1fr_1.15fr]">
        <!-- Ringkasan pesanan -->
        <div class="bg-muted/40 flex flex-col gap-6 border-b p-6 md:border-r md:border-b-0 md:p-8">
          <div>
            <p class="text-muted-foreground text-sm">Pay Acme Studio</p>
            <p class="mt-1 text-4xl font-semibold tracking-tight tabular-nums">
              {{ currency.format(total) }}
            </p>
            <p class="text-muted-foreground mt-1 text-sm">Billed yearly, renews Oct 15, 2027</p>
          </div>

          <ul class="space-y-4 text-sm">
            <li v-for="line in LINES" :key="line.label" class="flex justify-between gap-4">
              <div>
                <p class="font-medium">{{ line.label }}</p>
                <p class="text-muted-foreground text-xs">{{ line.detail }}</p>
              </div>
              <span class="tabular-nums">{{ currency.format(line.amount) }}</span>
            </li>
          </ul>

          <div class="space-y-2 text-sm">
            <Separator />
            <div class="flex justify-between pt-2">
              <span class="text-muted-foreground">Subtotal</span>
              <span class="tabular-nums">{{ currency.format(subtotal) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-muted-foreground">Tax (11%)</span>
              <span class="tabular-nums">{{ currency.format(tax) }}</span>
            </div>
            <Separator class="my-2" />
            <div class="flex justify-between font-semibold">
              <span>Total due today</span>
              <span class="tabular-nums">{{ currency.format(total) }}</span>
            </div>
          </div>

          <div class="text-muted-foreground mt-auto hidden items-center gap-2 text-xs md:flex">
            <ShieldCheckIcon class="size-4" />
            30-day money-back guarantee on annual plans.
          </div>
        </div>

        <!-- Form pembayaran -->
        <div class="p-6 md:p-8">
          <div
            v-if="state === 'done'"
            class="flex h-full flex-col items-center justify-center gap-4 py-10 text-center"
          >
            <div class="bg-primary/10 text-primary grid size-14 place-items-center rounded-full">
              <CircleCheckIcon class="size-7" />
            </div>
            <div>
              <h3 class="text-lg font-semibold">Payment successful</h3>
              <p class="text-muted-foreground mt-1 text-sm">
                We sent a receipt for {{ currency.format(total) }} to {{ email }}.
              </p>
            </div>
            <Button variant="outline" @click="reset">Make another payment</Button>
          </div>

          <template v-else>
            <CardHeader class="px-0">
              <CardTitle>Payment details</CardTitle>
              <CardDescription>Complete your purchase by providing your card.</CardDescription>
            </CardHeader>
            <CardContent class="mt-6 px-0">
              <form novalidate @submit.prevent="pay">
                <FieldGroup class="gap-5">
                  <Field :data-invalid="submitted && !!errors.email">
                    <FieldLabel for="pay-email">Email</FieldLabel>
                    <Input
                      id="pay-email"
                      v-model="email"
                      type="email"
                      autocomplete="email"
                      placeholder="you@company.com"
                      :aria-invalid="submitted && !!errors.email"
                    />
                    <FieldError v-if="submitted && errors.email">{{ errors.email }}</FieldError>
                  </Field>

                  <FieldSet class="gap-3">
                    <FieldLegend variant="label">Card information</FieldLegend>
                    <div
                      class="divide-input dark:bg-input/30 grid grid-cols-2 divide-y overflow-hidden rounded-md border shadow-xs focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50"
                      :class="submitted && cardError ? 'border-destructive' : 'border-input'"
                    >
                      <div class="relative col-span-2">
                        <label for="pay-number" class="sr-only">Card number</label>
                        <Input
                          id="pay-number"
                          :model-value="number"
                          inputmode="numeric"
                          autocomplete="cc-number"
                          placeholder="1234 1234 1234 1234"
                          class="h-10 rounded-none border-0 bg-transparent pr-12 shadow-none tabular-nums focus-visible:ring-0 dark:bg-transparent"
                          @update:model-value="mask('number')($event)"
                        />
                        <component
                          :is="BRAND_ICON[brand]"
                          class="text-muted-foreground pointer-events-none absolute top-1/2 right-3 size-6 -translate-y-1/2"
                        />
                      </div>
                      <div class="border-input border-r">
                        <label for="pay-expiry" class="sr-only">Expiry date</label>
                        <Input
                          id="pay-expiry"
                          :model-value="expiry"
                          inputmode="numeric"
                          autocomplete="cc-exp"
                          placeholder="MM / YY"
                          class="h-10 rounded-none border-0 bg-transparent shadow-none tabular-nums focus-visible:ring-0 dark:bg-transparent"
                          @update:model-value="mask('expiry')($event)"
                        />
                      </div>
                      <div>
                        <label for="pay-cvc" class="sr-only">CVC</label>
                        <Input
                          id="pay-cvc"
                          :model-value="cvc"
                          inputmode="numeric"
                          autocomplete="cc-csc"
                          placeholder="CVC"
                          class="h-10 rounded-none border-0 bg-transparent shadow-none tabular-nums focus-visible:ring-0 dark:bg-transparent"
                          @update:model-value="mask('cvc')($event)"
                        />
                      </div>
                    </div>
                    <FieldError v-if="submitted && cardError">{{ cardError }}</FieldError>
                  </FieldSet>

                  <Field :data-invalid="submitted && !!errors.name">
                    <FieldLabel for="pay-name">Name on card</FieldLabel>
                    <Input
                      id="pay-name"
                      v-model="name"
                      autocomplete="cc-name"
                      placeholder="Full name"
                      :aria-invalid="submitted && !!errors.name"
                    />
                    <FieldError v-if="submitted && errors.name">{{ errors.name }}</FieldError>
                  </Field>

                  <Button type="submit" size="lg" class="w-full" :disabled="state === 'processing'">
                    <template v-if="state === 'processing'">
                      <Spinner />
                      Processing…
                    </template>
                    <template v-else>
                      <LockIcon />
                      Pay {{ currency.format(total) }}
                    </template>
                  </Button>
                  <p class="text-muted-foreground text-center text-xs">
                    By confirming, you allow Acme Studio to charge your card for this
                    and future payments in line with their terms.
                  </p>
                </FieldGroup>
              </form>
            </CardContent>
          </template>
        </div>
      </div>
    </Card>
  </div>
</template>
