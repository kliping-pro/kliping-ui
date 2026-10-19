<script lang="ts">
export const description = "Form alamat penagihan perusahaan dengan NPWP/Tax ID, pilihan negara dan provinsi, serta pratinjau alamat pada invoice."
</script>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { Building2Icon, CheckIcon, FileTextIcon } from '@lucide/vue'
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
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface Country {
  code: string
  name: string
  taxLabel: string
  taxPlaceholder: string
  postalLabel: string
  stateLabel: string
  states: string[]
}

const COUNTRIES: Country[] = [
  {
    code: "ID",
    name: "Indonesia",
    taxLabel: "NPWP",
    taxPlaceholder: "01.234.567.8-901.000",
    postalLabel: "Postal code",
    stateLabel: "Province",
    states: ["Bali", "Banten", "DI Yogyakarta", "DKI Jakarta", "Jawa Barat", "Jawa Tengah", "Jawa Timur", "Sumatera Utara"],
  },
  {
    code: "US",
    name: "United States",
    taxLabel: "EIN",
    taxPlaceholder: "12-3456789",
    postalLabel: "ZIP code",
    stateLabel: "State",
    states: ["California", "Florida", "Illinois", "New York", "Texas", "Washington"],
  },
  {
    code: "CA",
    name: "Canada",
    taxLabel: "GST/HST number",
    taxPlaceholder: "123456789 RT0001",
    postalLabel: "Postal code",
    stateLabel: "Province",
    states: ["Alberta", "British Columbia", "Ontario", "Quebec"],
  },
  {
    code: "AU",
    name: "Australia",
    taxLabel: "ABN",
    taxPlaceholder: "51 824 753 556",
    postalLabel: "Postcode",
    stateLabel: "State",
    states: ["New South Wales", "Queensland", "Victoria", "Western Australia"],
  },
  {
    code: "DE",
    name: "Germany",
    taxLabel: "VAT number",
    taxPlaceholder: "DE123456789",
    postalLabel: "Postal code",
    stateLabel: "State",
    states: [],
  },
  {
    code: "GB",
    name: "United Kingdom",
    taxLabel: "VAT number",
    taxPlaceholder: "GB123456789",
    postalLabel: "Postcode",
    stateLabel: "County",
    states: [],
  },
  {
    code: "SG",
    name: "Singapore",
    taxLabel: "GST Reg. No.",
    taxPlaceholder: "M90312345A",
    postalLabel: "Postal code",
    stateLabel: "Region",
    states: [],
  },
]

const initial = {
  company: "Rasa Studio",
  taxId: "01.234.567.8-901.000",
  email: "finance@rasastudio.co",
  country: "ID",
  state: "DKI Jakarta",
  city: "Jakarta Selatan",
  postal: "12190",
  line1: "Jl. Jend. Sudirman Kav. 52-53",
  line2: "Tower B, 18th floor",
}

const form = reactive({ ...initial })
const saved = ref({ ...initial })
const justSaved = ref(false)

const country = computed(() => COUNTRIES.find(c => c.code === form.country) ?? COUNTRIES[0]!)

// Ganti negara → provinsi lama tidak berlaku lagi.
function setCountry(value: unknown) {
  if (typeof value !== "string" || value === form.country)
    return
  form.country = value
  form.state = ""
}

const dirty = computed(() =>
  (Object.keys(initial) as (keyof typeof initial)[]).some(k => form[k] !== saved.value[k]),
)

const preview = computed(() => [
  form.line1,
  form.line2,
  [form.city, form.state, form.postal].filter(Boolean).join(", "),
  country.value.name,
].filter(Boolean))

function save() {
  saved.value = { ...form }
  justSaved.value = true
  setTimeout(() => {
    justSaved.value = false
  }, 2000)
}

function discard() {
  Object.assign(form, saved.value)
}
</script>

<template>
  <div class="mx-auto max-w-5xl p-4 sm:p-6">
    <div class="grid items-start gap-6 lg:grid-cols-[1fr_20rem]">
      <Card>
        <CardHeader>
          <CardTitle>Billing address</CardTitle>
          <CardDescription>
            Used on invoices and to calculate the right taxes for your region.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="billing-address" @submit.prevent="save">
            <FieldGroup>
              <FieldSet>
                <FieldLegend>Company</FieldLegend>
                <FieldGroup class="grid gap-4 sm:grid-cols-2">
                  <Field class="sm:col-span-2">
                    <FieldLabel for="ba-company">Legal company name</FieldLabel>
                    <Input id="ba-company" v-model="form.company" autocomplete="organization" required />
                  </Field>
                  <Field>
                    <FieldLabel for="ba-tax">
                      {{ country.taxLabel }}
                      <span class="text-muted-foreground font-normal">(optional)</span>
                    </FieldLabel>
                    <Input id="ba-tax" v-model="form.taxId" :placeholder="country.taxPlaceholder" />
                  </Field>
                  <Field>
                    <FieldLabel for="ba-email">Billing email</FieldLabel>
                    <Input id="ba-email" v-model="form.email" type="email" autocomplete="email" />
                  </Field>
                </FieldGroup>
              </FieldSet>

              <FieldSeparator />

              <FieldSet>
                <FieldLegend>Address</FieldLegend>
                <FieldGroup class="grid gap-4 sm:grid-cols-6">
                  <Field class="sm:col-span-6">
                    <FieldLabel for="ba-country">Country</FieldLabel>
                    <Select :model-value="form.country" @update:model-value="setCountry">
                      <SelectTrigger id="ba-country" class="w-full">
                        <SelectValue placeholder="Select a country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem v-for="c in COUNTRIES" :key="c.code" :value="c.code">
                          {{ c.name }}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field class="sm:col-span-6">
                    <FieldLabel for="ba-line1">Address line 1</FieldLabel>
                    <Input id="ba-line1" v-model="form.line1" autocomplete="address-line1" placeholder="Street and number" />
                  </Field>
                  <Field class="sm:col-span-6">
                    <FieldLabel for="ba-line2">
                      Address line 2
                      <span class="text-muted-foreground font-normal">(optional)</span>
                    </FieldLabel>
                    <Input id="ba-line2" v-model="form.line2" autocomplete="address-line2" placeholder="Suite, floor, building" />
                  </Field>
                  <Field class="sm:col-span-2">
                    <FieldLabel for="ba-city">City</FieldLabel>
                    <Input id="ba-city" v-model="form.city" autocomplete="address-level2" />
                  </Field>
                  <Field class="sm:col-span-2">
                    <FieldLabel for="ba-state">{{ country.stateLabel }}</FieldLabel>
                    <Select v-if="country.states.length" v-model="form.state">
                      <SelectTrigger id="ba-state" class="w-full">
                        <SelectValue :placeholder="`Select ${country.stateLabel.toLowerCase()}`" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem v-for="s in country.states" :key="s" :value="s">
                          {{ s }}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <Input v-else id="ba-state" v-model="form.state" autocomplete="address-level1" />
                  </Field>
                  <Field class="sm:col-span-2">
                    <FieldLabel for="ba-postal">{{ country.postalLabel }}</FieldLabel>
                    <Input id="ba-postal" v-model="form.postal" autocomplete="postal-code" />
                  </Field>
                </FieldGroup>
              </FieldSet>
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter class="flex-col-reverse gap-3 border-t sm:flex-row sm:justify-end">
          <span
            v-if="justSaved"
            class="text-primary mr-auto flex items-center gap-1.5 text-sm font-medium"
          >
            <CheckIcon class="size-4" /> Address saved
          </span>
          <Button variant="ghost" class="w-full sm:w-auto" :disabled="!dirty" @click="discard">
            Discard
          </Button>
          <Button type="submit" form="billing-address" class="w-full sm:w-auto" :disabled="!dirty">
            Save address
          </Button>
        </CardFooter>
      </Card>

      <div class="space-y-4 lg:sticky lg:top-6">
        <div class="bg-card rounded-lg border p-5">
          <div class="text-muted-foreground mb-4 flex items-center gap-2 text-xs font-medium tracking-wide uppercase">
            <FileTextIcon class="size-4" />
            Invoice preview
          </div>
          <div class="flex items-start gap-3">
            <div class="bg-primary/10 text-primary grid size-10 shrink-0 place-items-center rounded-md">
              <Building2Icon class="size-5" />
            </div>
            <div class="min-w-0 text-sm">
              <p class="truncate font-semibold">{{ form.company || "Company name" }}</p>
              <p v-for="(line, i) in preview" :key="i" class="text-muted-foreground">
                {{ line }}
              </p>
              <p v-if="form.taxId" class="text-muted-foreground mt-2">
                {{ country.taxLabel }}: <span class="text-foreground">{{ form.taxId }}</span>
              </p>
              <p v-if="form.email" class="text-muted-foreground truncate">{{ form.email }}</p>
            </div>
          </div>
        </div>
        <p class="text-muted-foreground px-1 text-xs">
          Changes apply to future invoices. Past invoices keep the address they were issued with.
        </p>
      </div>
    </div>
  </div>
</template>
