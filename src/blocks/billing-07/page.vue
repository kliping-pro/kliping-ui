<script lang="ts">
export const description = "Pemilih metode pembayaran berupa kartu radio untuk kartu tersimpan, lengkap dengan dialog tambah kartu baru."
</script>

<script setup lang="ts">
import type { Component } from 'vue'
import { computed, nextTick, ref } from 'vue'
import { CreditCardIcon, LockIcon, PlusIcon } from '@lucide/vue'
import { IconBrandMastercard, IconBrandVisa } from '@tabler/icons-vue'
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
  FieldTitle,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

type Brand = "visa" | "mastercard" | "card"

interface SavedCard {
  id: string
  brand: Brand
  last4: string
  expiry: string
  holder: string
}

const BRANDS: Record<Brand, { label: string, icon: Component }> = {
  visa: { label: "Visa", icon: IconBrandVisa },
  mastercard: { label: "Mastercard", icon: IconBrandMastercard },
  card: { label: "Card", icon: CreditCardIcon },
}

const cards = ref<SavedCard[]>([
  { id: "card_1", brand: "visa", last4: "4242", expiry: "04/28", holder: "Nadia Putri" },
  { id: "card_2", brand: "mastercard", last4: "8210", expiry: "11/26", holder: "Nadia Putri" },
  { id: "card_3", brand: "card", last4: "1005", expiry: "02/27", holder: "Studio Rasa Ltd." },
])

const defaultId = ref("card_1")
const selected = ref("card_1")

// Kartu dianggap "segera kedaluwarsa" bila berakhir sebelum 2027.
const expiringSoon = (expiry: string) => Number(expiry.slice(3)) < 27

const selectedCard = computed(() => cards.value.find(c => c.id === selected.value))

// --- Form kartu baru --------------------------------------------------------

const open = ref(false)
const name = ref("")
const number = ref("")
const expiry = ref("")
const cvc = ref("")
const makeDefault = ref(true)
const submitted = ref(false)

const digits = (value: string | number) => String(value).replace(/\D/g, "")

const formatNumber = (value: string) =>
  digits(value).slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ")

const formatExpiry = (value: string) => {
  const d = digits(value).slice(0, 4)
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d
}

const formatCvc = (value: string) => digits(value).slice(0, 4)

// Nilai mentah ditulis dulu, baru diganti versi terformat setelah render
// berikutnya — supaya input tetap tersinkron walau hasil format sama dengan
// nilai sebelumnya (mis. pengguna mengetik huruf).
function masked(target: typeof number, format: (v: string) => string) {
  return (value: string | number) => {
    target.value = String(value)
    nextTick(() => {
      target.value = format(String(value))
    })
  }
}

const onNumber = masked(number, formatNumber)
const onExpiry = masked(expiry, formatExpiry)
const onCvc = masked(cvc, formatCvc)

const detectBrand = (value: string): Brand => {
  if (value.startsWith("4"))
    return "visa"
  if (/^5[1-5]/.test(value) || /^2[2-7]/.test(value))
    return "mastercard"
  return "card"
}

const newBrand = computed(() => detectBrand(digits(number.value)))

const errors = computed(() => ({
  name: name.value.trim().length < 2,
  number: digits(number.value).length < 15,
  expiry: !/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry.value),
  cvc: digits(cvc.value).length < 3,
}))

const isValid = computed(() => !Object.values(errors.value).some(Boolean))

function resetForm() {
  name.value = ""
  number.value = ""
  expiry.value = ""
  cvc.value = ""
  makeDefault.value = true
  submitted.value = false
}

function addCard() {
  submitted.value = true
  if (!isValid.value)
    return
  const id = `card_${Date.now()}`
  cards.value = [
    ...cards.value,
    {
      id,
      brand: newBrand.value,
      last4: digits(number.value).slice(-4),
      expiry: expiry.value,
      holder: name.value.trim(),
    },
  ]
  selected.value = id
  if (makeDefault.value)
    defaultId.value = id
  open.value = false
  resetForm()
}
</script>

<template>
  <div class="mx-auto max-w-xl p-4 sm:p-6">
    <Card>
      <CardHeader>
        <CardTitle>Payment method</CardTitle>
        <CardDescription>
          Choose the card we should charge for your subscription.
        </CardDescription>
      </CardHeader>

      <CardContent class="space-y-4">
        <RadioGroup v-model="selected" class="grid-cols-1 gap-3" aria-label="Saved cards">
          <FieldLabel v-for="card in cards" :key="card.id" :for="card.id" class="min-w-0">
            <Field orientation="horizontal" class="min-w-0">
              <div class="bg-muted text-foreground grid h-9 w-12 shrink-0 place-items-center rounded-md border">
                <component :is="BRANDS[card.brand].icon" class="size-6" />
              </div>
              <FieldContent class="min-w-0">
                <FieldTitle class="flex-wrap">
                  {{ BRANDS[card.brand].label }} ending in {{ card.last4 }}
                  <Badge v-if="card.id === defaultId" variant="secondary">
                    Default
                  </Badge>
                  <Badge
                    v-else-if="expiringSoon(card.expiry)"
                    variant="outline"
                    class="border-destructive/30 text-destructive"
                  >
                    Expires soon
                  </Badge>
                </FieldTitle>
                <FieldDescription>
                  Expires {{ card.expiry }} · {{ card.holder }}
                </FieldDescription>
              </FieldContent>
              <RadioGroupItem :id="card.id" :value="card.id" />
            </Field>
          </FieldLabel>
        </RadioGroup>

        <Dialog v-model:open="open" @update:open="(v: boolean) => !v && resetForm()">
          <DialogTrigger as-child>
            <Button variant="outline" class="h-auto w-full border-dashed py-3">
              <PlusIcon />
              Add new card
            </Button>
          </DialogTrigger>
          <DialogContent class="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add a new card</DialogTitle>
              <DialogDescription>
                Your card details are encrypted and never stored on our servers.
              </DialogDescription>
            </DialogHeader>

            <form id="new-card-form" novalidate @submit.prevent="addCard">
              <FieldGroup class="gap-4">
                <Field :data-invalid="submitted && errors.name">
                  <FieldLabel for="card-name">Name on card</FieldLabel>
                  <Input
                    id="card-name"
                    v-model="name"
                    autocomplete="cc-name"
                    placeholder="Nadia Putri"
                    :aria-invalid="submitted && errors.name"
                  />
                </Field>
                <Field :data-invalid="submitted && errors.number">
                  <FieldLabel for="card-number">Card number</FieldLabel>
                  <div class="relative">
                    <Input
                      id="card-number"
                      :model-value="number"
                      inputmode="numeric"
                      autocomplete="cc-number"
                      placeholder="1234 5678 9012 3456"
                      class="pr-12 tabular-nums"
                      :aria-invalid="submitted && errors.number"
                      @update:model-value="onNumber"
                    />
                    <component
                      :is="BRANDS[newBrand].icon"
                      class="text-muted-foreground pointer-events-none absolute top-1/2 right-3 size-6 -translate-y-1/2"
                    />
                  </div>
                </Field>
                <div class="grid grid-cols-2 gap-4">
                  <Field :data-invalid="submitted && errors.expiry">
                    <FieldLabel for="card-expiry">Expiry</FieldLabel>
                    <Input
                      id="card-expiry"
                      :model-value="expiry"
                      inputmode="numeric"
                      autocomplete="cc-exp"
                      placeholder="MM/YY"
                      class="tabular-nums"
                      :aria-invalid="submitted && errors.expiry"
                      @update:model-value="onExpiry"
                    />
                  </Field>
                  <Field :data-invalid="submitted && errors.cvc">
                    <FieldLabel for="card-cvc">CVC</FieldLabel>
                    <Input
                      id="card-cvc"
                      :model-value="cvc"
                      inputmode="numeric"
                      autocomplete="cc-csc"
                      placeholder="123"
                      class="tabular-nums"
                      :aria-invalid="submitted && errors.cvc"
                      @update:model-value="onCvc"
                    />
                  </Field>
                </div>
                <Field orientation="horizontal">
                  <Checkbox id="card-default" v-model="makeDefault" />
                  <FieldLabel for="card-default" class="font-normal">
                    Set as default payment method
                  </FieldLabel>
                </Field>
                <p v-if="submitted && !isValid" class="text-destructive text-sm">
                  Please check the highlighted fields.
                </p>
              </FieldGroup>
            </form>

            <DialogFooter>
              <DialogClose as-child>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" form="new-card-form">Save card</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>

      <CardFooter class="flex flex-col gap-3 border-t sm:flex-row sm:justify-between">
        <p class="text-muted-foreground flex items-center gap-2 text-xs">
          <LockIcon class="size-3.5" />
          Payments are processed securely.
        </p>
        <Button class="w-full sm:w-auto">
          Use {{ selectedCard ? `•••• ${selectedCard.last4}` : "card" }}
        </Button>
      </CardFooter>
    </Card>
  </div>
</template>
