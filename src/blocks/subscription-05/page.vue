<script lang="ts">
export const description = "Halaman kelola langganan: kartu paket aktif dengan pemakaian, tagihan berikutnya, metode pembayaran, riwayat invoice, serta aksi ganti paket dan batalkan."
</script>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { DownloadIcon } from '@lucide/vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import CurrentPlanCard from '@/blocks/subscription-05/components/CurrentPlanCard.vue'
import NextInvoiceCard from '@/blocks/subscription-05/components/NextInvoiceCard.vue'
import PaymentMethodCard from '@/blocks/subscription-05/components/PaymentMethodCard.vue'
import { cn } from '@/lib/utils'

const plans = [
  { id: 'starter', name: 'Starter', price: 12, seats: 2, storage: 20, api: 10, features: ['2 team seats', '10 projects', '20 GB storage', 'Email support'] },
  { id: 'pro', name: 'Pro', price: 24, seats: 5, storage: 100, api: 50, features: ['5 team seats', 'Unlimited projects', '100 GB storage', 'Priority support'] },
  { id: 'business', name: 'Business', price: 49, seats: 20, storage: 1000, api: 250, features: ['20 team seats', 'SSO & roles', '1 TB storage', 'Dedicated manager'] },
]


const invoices = [
  { id: 'INV-2026-010', date: 'Oct 30, 2026', amount: 26.4, status: 'Paid' },
  { id: 'INV-2026-009', date: 'Sep 30, 2026', amount: 24, status: 'Paid' },
  { id: 'INV-2026-008', date: 'Aug 30, 2026', amount: 24, status: 'Paid' },
  { id: 'INV-2026-007', date: 'Jul 30, 2026', amount: 12, status: 'Refunded' },
]

const renewsOn = 'Nov 30, 2026'

const planId = ref('pro')
const status = ref<'active' | 'cancelling'>('active')
const changeOpen = ref(false)
const cancelOpen = ref(false)
const draftPlan = ref(planId.value)

const plan = computed(() => plans.find(p => p.id === planId.value)!)
const usage = computed(() => [
  { label: 'Team seats', used: Math.min(4, plan.value.seats), limit: plan.value.seats },
  { label: 'Storage', used: Math.min(62, plan.value.storage), limit: plan.value.storage, unit: ' GB' },
  { label: 'API calls', used: Math.min(18, plan.value.api), limit: plan.value.api, unit: 'k' },
])
const invoiceLines = computed(() => [
  { label: `${plan.value.name} plan · monthly`, amount: plan.value.price },
  { label: 'Extra seat (prorated)', amount: 3.2 },
  { label: 'Loyalty credit', amount: -2 },
  { label: 'Tax (11%)', amount: Math.round((plan.value.price + 1.2) * 0.11 * 100) / 100 },
])

const usd = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

function openChange() {
  draftPlan.value = planId.value
  changeOpen.value = true
}

function applyChange() {
  planId.value = draftPlan.value
  changeOpen.value = false
}
</script>

<template>
  <div class="mx-auto w-full max-w-5xl space-y-6 p-4 sm:p-6 lg:p-8">
    <header class="space-y-1">
      <h1 class="text-2xl font-semibold tracking-tight">
        Subscription
      </h1>
      <p class="text-muted-foreground text-sm">
        Manage your plan, billing details and invoices.
      </p>
    </header>

    <CurrentPlanCard
      :name="plan.name"
      :price="plan.price"
      cycle="month"
      :status="status"
      :renews-on="renewsOn"
      :features="plan.features"
      :usage="usage"
      @change-plan="openChange"
      @cancel="cancelOpen = true"
      @resume="status = 'active'"
    />

    <div class="grid gap-6 md:grid-cols-2">
      <NextInvoiceCard
        :date="renewsOn"
        :lines="invoiceLines"
        :cancelled="status === 'cancelling'"
      />
      <PaymentMethodCard
        brand="Visa"
        last4="4242"
        expires="08/28"
        email="billing@northwind.studio"
        address="Jl. Kemang Raya 12, Jakarta"
      />
    </div>

    <section class="bg-card text-card-foreground rounded-lg border">
      <div class="flex h-12 items-center justify-between gap-3 border-b px-5">
        <h3 class="text-sm font-medium">
          Billing history
        </h3>
        <Button variant="ghost" size="sm" class="-mr-2">
          View all
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead class="pl-5">
              Invoice
            </TableHead>
            <TableHead class="max-sm:hidden">
              Date
            </TableHead>
            <TableHead>Status</TableHead>
            <TableHead class="text-right">
              Amount
            </TableHead>
            <TableHead class="w-12 pr-5">
              <span class="sr-only">Download</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="inv in invoices" :key="inv.id">
            <TableCell class="pl-5 font-medium">
              {{ inv.id }}
              <span class="text-muted-foreground block text-xs font-normal sm:hidden">{{ inv.date }}</span>
            </TableCell>
            <TableCell class="text-muted-foreground max-sm:hidden">
              {{ inv.date }}
            </TableCell>
            <TableCell>
              <Badge
                :variant="inv.status === 'Paid' ? 'secondary' : 'outline'"
                class="rounded-md"
              >
                {{ inv.status }}
              </Badge>
            </TableCell>
            <TableCell class="text-right tabular-nums">
              {{ usd.format(inv.amount) }}
            </TableCell>
            <TableCell class="pr-5">
              <Button variant="ghost" size="icon-sm" :aria-label="`Download ${inv.id}`">
                <DownloadIcon />
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </section>

    <!-- Change plan -->
    <Dialog v-model:open="changeOpen">
      <DialogContent class="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Change plan</DialogTitle>
          <DialogDescription>
            The difference is prorated on your next invoice.
          </DialogDescription>
        </DialogHeader>
        <RadioGroup v-model="draftPlan" class="gap-2">
          <Label
            v-for="p in plans"
            :key="p.id"
            :for="`manage-${p.id}`"
            :class="cn(
              'flex cursor-pointer items-center gap-3 rounded-lg border p-3 font-normal transition-colors',
              draftPlan === p.id ? 'border-primary bg-primary/5' : 'hover:bg-muted/50',
            )"
          >
            <RadioGroupItem :id="`manage-${p.id}`" :value="p.id" />
            <span class="flex-1 text-sm font-medium">
              {{ p.name }}
              <Badge v-if="p.id === planId" variant="outline" class="ml-1 rounded-md">Current</Badge>
            </span>
            <span class="text-sm tabular-nums">${{ p.price }}/mo</span>
          </Label>
        </RadioGroup>
        <DialogFooter>
          <Button variant="outline" @click="changeOpen = false">
            Cancel
          </Button>
          <Button :disabled="draftPlan === planId" @click="applyChange">
            Confirm change
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <!-- Cancel -->
    <AlertDialog v-model:open="cancelOpen">
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Cancel your {{ plan.name }} plan?</AlertDialogTitle>
          <AlertDialogDescription>
            You'll keep access until {{ renewsOn }}. You can resume anytime before then.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Keep plan</AlertDialogCancel>
          <AlertDialogAction
            class="bg-destructive hover:bg-destructive/90 text-white"
            @click="status = 'cancelling'"
          >
            Cancel plan
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
</template>
