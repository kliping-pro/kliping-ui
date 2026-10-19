<script lang="ts">
export const description = "Pengaturan penagihan lanjutan: mata uang, pajak, prefiks nomor invoice, nomor PO, dan zona bahaya penutupan akun dengan dialog konfirmasi."
</script>

<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import { CheckIcon, ReceiptTextIcon, TriangleAlertIcon } from '@lucide/vue'
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
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'

const CURRENCIES = [
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "IDR", name: "Indonesian Rupiah", symbol: "Rp" },
  { code: "SGD", name: "Singapore Dollar", symbol: "S$" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$" },
]

const TAX_TYPES = [
  { value: "vat", label: "VAT" },
  { value: "gst", label: "GST" },
  { value: "npwp", label: "NPWP (Indonesia)" },
  { value: "ein", label: "EIN (United States)" },
]

const ACCOUNT_NAME = "rasa-studio"

const currency = ref("USD")
const taxType = ref("npwp")
const taxId = ref("01.234.567.8-901.000")
const taxInclusive = ref(false)
const taxExempt = ref(false)
const exemptReason = ref("")
const prefix = ref("RASA")
const nextNumber = ref<string | number>(148)
const po = ref("PO-2026-0091")
const poOnInvoice = ref(true)
const memo = ref("Thank you for your business. Payment terms: Net 14.")
const saved = ref(false)

const sample = computed(() => {
  const amount = 1240
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.value,
    maximumFractionDigits: currency.value === "JPY" || currency.value === "IDR" ? 0 : 2,
  }).format(currency.value === "IDR" ? amount * 16000 : currency.value === "JPY" ? amount * 150 : amount)
  return formatted
})

const invoiceNumber = computed(() => {
  const clean = prefix.value.toUpperCase().replace(/[^A-Z0-9-]/g, "")
  const n = String(Math.max(Number(nextNumber.value) || 1, 1)).padStart(4, "0")
  return `${clean || "INV"}-${n}`
})

// Nilai mentah dulu, lalu versi bersih setelah render — supaya karakter yang
// ditolak tetap terhapus dari input walau hasilnya sama dengan nilai lama.
function onPrefix(value: string | number) {
  const raw = String(value)
  prefix.value = raw
  nextTick(() => {
    prefix.value = raw.toUpperCase().replace(/[^A-Z0-9-]/g, "").slice(0, 8)
  })
}

function save() {
  saved.value = true
  setTimeout(() => {
    saved.value = false
  }, 2000)
}

// --- Zona bahaya ------------------------------------------------------------

const closeOpen = ref(false)
const confirmText = ref("")
const closed = ref(false)
const canClose = computed(() => confirmText.value.trim() === ACCOUNT_NAME)

function closeAccount() {
  if (!canClose.value)
    return
  closed.value = true
  closeOpen.value = false
}

function onCloseDialog(value: boolean) {
  if (!value)
    confirmText.value = ""
}
</script>

<template>
  <div class="mx-auto max-w-3xl space-y-6 p-4 sm:p-6">
    <div>
      <h2 class="text-xl font-semibold tracking-tight">Invoicing & tax</h2>
      <p class="text-muted-foreground text-sm">
        Fine-tune how your invoices look and how taxes are applied.
      </p>
    </div>

    <Card>
      <CardHeader>
        <CardTitle>Currency & tax</CardTitle>
        <CardDescription>Applies to the next billing cycle onwards.</CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <Field>
            <FieldLabel for="currency">Billing currency</FieldLabel>
            <Select v-model="currency">
              <SelectTrigger id="currency" class="w-full sm:w-72">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="c in CURRENCIES" :key="c.code" :value="c.code">
                  <span class="text-muted-foreground w-7 font-mono text-xs">{{ c.symbol }}</span>
                  {{ c.code }} — {{ c.name }}
                </SelectItem>
              </SelectContent>
            </Select>
            <FieldDescription>
              A $1,240 plan is billed as <span class="text-foreground font-medium tabular-nums">{{ sample }}</span>.
            </FieldDescription>
          </Field>

          <div class="grid gap-4 sm:grid-cols-[12rem_1fr]">
            <Field>
              <FieldLabel for="tax-type">Tax ID type</FieldLabel>
              <Select v-model="taxType">
                <SelectTrigger id="tax-type" class="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem v-for="t in TAX_TYPES" :key="t.value" :value="t.value">
                    {{ t.label }}
                  </SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <FieldLabel for="tax-id">Tax ID</FieldLabel>
              <Input id="tax-id" v-model="taxId" class="font-mono" />
            </Field>
          </div>

          <Field orientation="horizontal">
            <FieldContent>
              <FieldLabel for="tax-inclusive">Prices include tax</FieldLabel>
              <FieldDescription>Show tax as part of the listed price instead of on top.</FieldDescription>
            </FieldContent>
            <Switch id="tax-inclusive" v-model="taxInclusive" />
          </Field>

          <Field orientation="horizontal">
            <FieldContent>
              <FieldLabel for="tax-exempt">Tax exempt</FieldLabel>
              <FieldDescription>For non-profits and other exempt organisations.</FieldDescription>
            </FieldContent>
            <Switch id="tax-exempt" v-model="taxExempt" />
          </Field>
          <Field v-if="taxExempt">
            <FieldLabel for="exempt-reason">Exemption reference</FieldLabel>
            <Textarea
              id="exempt-reason"
              v-model="exemptReason"
              rows="2"
              placeholder="Certificate number and issuing authority"
            />
            <FieldDescription>We'll review this within 2 business days.</FieldDescription>
          </Field>
        </FieldGroup>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Invoice details</CardTitle>
        <CardDescription>Numbering and references printed on every invoice.</CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <div class="grid gap-4 sm:grid-cols-2">
            <Field>
              <FieldLabel for="prefix">Invoice prefix</FieldLabel>
              <Input
                id="prefix"
                :model-value="prefix"
                class="font-mono uppercase"
                maxlength="8"
                @update:model-value="onPrefix"
              />
              <FieldDescription>Letters, numbers and dashes. Up to 8 characters.</FieldDescription>
            </Field>
            <Field>
              <FieldLabel for="next-number">Next invoice number</FieldLabel>
              <Input id="next-number" v-model="nextNumber" type="number" min="1" class="tabular-nums" />
            </Field>
          </div>

          <div class="bg-muted/40 flex items-center gap-3 rounded-lg border p-3">
            <div class="bg-background grid size-9 shrink-0 place-items-center rounded-md border">
              <ReceiptTextIcon class="text-muted-foreground size-4" />
            </div>
            <div class="min-w-0 flex-1 text-sm">
              <p class="text-muted-foreground text-xs">Next invoice will be numbered</p>
              <p class="truncate font-mono font-semibold">{{ invoiceNumber }}</p>
            </div>
            <Badge variant="secondary">Preview</Badge>
          </div>

          <FieldSeparator />

          <Field>
            <FieldLabel for="po">Purchase order (PO) number</FieldLabel>
            <Input id="po" v-model="po" placeholder="Optional" class="font-mono" />
          </Field>
          <Field orientation="horizontal">
            <Checkbox id="po-on-invoice" v-model="poOnInvoice" />
            <FieldLabel for="po-on-invoice" class="font-normal">
              Print the PO number on invoices
            </FieldLabel>
          </Field>
          <Field>
            <FieldLabel for="memo">Invoice footer</FieldLabel>
            <Textarea id="memo" v-model="memo" rows="3" />
            <FieldDescription>{{ memo.length }}/240 characters</FieldDescription>
          </Field>
        </FieldGroup>
      </CardContent>
      <CardFooter class="justify-end gap-3 border-t">
        <span v-if="saved" class="text-primary mr-auto flex items-center gap-1.5 text-sm font-medium">
          <CheckIcon class="size-4" /> Saved
        </span>
        <Button @click="save">Save settings</Button>
      </CardFooter>
    </Card>

    <!-- Zona bahaya -->
    <Card class="border-destructive/40">
      <CardHeader>
        <CardTitle class="text-destructive flex items-center gap-2">
          <TriangleAlertIcon class="size-4" />
          Danger zone
        </CardTitle>
        <CardDescription>Irreversible actions for this billing account.</CardDescription>
      </CardHeader>
      <CardContent>
        <div class="border-destructive/30 bg-destructive/5 flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p class="text-sm font-medium">
              {{ closed ? "Billing account scheduled for closure" : "Close billing account" }}
            </p>
            <p class="text-muted-foreground text-sm">
              <template v-if="closed">
                Closes at the end of the current period on Nov 1, 2026.
              </template>
              <template v-else>
                Cancels all subscriptions and deletes saved payment methods. Invoices remain available for 7 years.
              </template>
            </p>
          </div>
          <Button v-if="closed" variant="outline" class="shrink-0" @click="closed = false">
            Undo
          </Button>
          <Dialog v-else v-model:open="closeOpen" @update:open="onCloseDialog">
            <DialogTrigger as-child>
              <Button variant="destructive" class="shrink-0">Close account</Button>
            </DialogTrigger>
            <DialogContent class="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Close billing account?</DialogTitle>
                <DialogDescription>
                  All active subscriptions end on Nov 1, 2026 and your saved cards are removed.
                  This can't be undone after that date.
                </DialogDescription>
              </DialogHeader>
              <form id="close-account" @submit.prevent="closeAccount">
                <Field>
                  <FieldLabel for="confirm-close" class="font-normal">
                    Type <span class="bg-muted rounded px-1.5 py-0.5 font-mono text-xs font-semibold">{{ ACCOUNT_NAME }}</span> to confirm
                  </FieldLabel>
                  <Input id="confirm-close" v-model="confirmText" autocomplete="off" spellcheck="false" />
                </Field>
              </form>
              <DialogFooter>
                <DialogClose as-child>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit" form="close-account" variant="destructive" :disabled="!canClose">
                  Close billing account
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
