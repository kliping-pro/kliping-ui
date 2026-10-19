<script lang="ts">
export const description = "Daftar card informasi tagihan perusahaan dengan tombol edit dan hapus."
</script>

<script setup lang="ts">
import { Building2Icon, PencilIcon, PlusIcon, Trash2Icon } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const billings = [
  {
    company: "Burrito Vikings",
    contact: "Emma Roberts",
    email: "emma@mail.com",
    vat: "FRB1235476",
  },
  {
    company: "Stone Tech Zone",
    contact: "Marcel Glock",
    email: "marcel@mail.com",
    vat: "FRB1235476",
  },
  {
    company: "Fiber Notion",
    contact: "Misha Stam",
    email: "misha@mail.com",
    vat: "FRB1235476",
  },
]
</script>

<template>
  <div class="mx-auto max-w-3xl p-6">
    <div class="flex flex-col items-start justify-between gap-4 sm:flex-row">
      <div>
        <h2 class="font-semibold">Billing Information</h2>
        <p class="text-muted-foreground text-sm">
          View and update your billing details quickly and easily.
        </p>
      </div>
      <Button variant="outline" class="w-full sm:w-auto">
        <PlusIcon class="mr-2 h-4 w-4" /> Add New Billing
      </Button>
    </div>
    <div class="mt-6 space-y-4">
      <Card v-for="{ company, contact, email, vat } in billings" :key="company" class="border">
        <CardHeader>
          <div class="flex items-center gap-3">
            <div class="bg-background grid h-12 w-12 shrink-0 place-items-center rounded border">
              <Building2Icon class="h-6 w-6" />
            </div>
            <div class="space-y-1">
              <CardTitle class="text-sm">{{ company }}</CardTitle>
              <p class="text-muted-foreground text-sm">Company</p>
            </div>
          </div>
          <CardAction>
            <div class="flex items-center gap-2">
              <Button size="sm" variant="ghost">
                <PencilIcon class="mr-2 h-4 w-4" />
                Edit
              </Button>
              <Button
                size="sm"
                variant="ghost"
                class="text-destructive hover:text-destructive"
              >
                <Trash2Icon class="mr-2 h-4 w-4" />
                Delete
              </Button>
            </div>
          </CardAction>
        </CardHeader>
        <CardContent class="space-y-2">
          <div class="text-sm">
            <span class="text-muted-foreground font-semibold">Contact: </span>
            <span class="font-medium">{{ contact }}</span>
          </div>
          <div class="text-sm">
            <span class="text-muted-foreground font-semibold">Email Address: </span>
            <span class="font-medium">{{ email }}</span>
          </div>
          <div class="text-sm">
            <span class="text-muted-foreground font-semibold">VAT Number: </span>
            <span class="font-medium">{{ vat }}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
