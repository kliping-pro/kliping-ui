<script lang="ts">
export const description = "Dialog pembatalan langganan bertahap: pilihan alasan, masukan opsional, tawaran diskon untuk bertahan, lalu konfirmasi akhir."
</script>

<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  ArrowLeftIcon,
  CircleCheckIcon,
  GiftIcon,
  PartyPopperIcon,
  TriangleAlertIcon,
} from '@lucide/vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

type Step = 'reason' | 'offer' | 'confirm' | 'cancelled' | 'retained'

const reasons = [
  { value: 'price', label: 'It is too expensive' },
  { value: 'usage', label: "I don't use it enough" },
  { value: 'features', label: 'Missing features I need' },
  { value: 'switching', label: 'Switching to another tool' },
  { value: 'issues', label: 'Too many bugs or technical issues' },
  { value: 'other', label: 'Something else' },
]

const plan = {
  name: 'Pro',
  price: 24,
  renewsOn: 'November 30, 2026',
}

const offer = {
  percent: 50,
  months: 3,
}

const open = ref(true)
const step = ref<Step>('reason')
const reason = ref<string>('')
const feedback = ref('')
const acknowledged = ref(false)

const steps: { id: Step, label: string }[] = [
  { id: 'reason', label: 'Reason' },
  { id: 'offer', label: 'Offer' },
  { id: 'confirm', label: 'Confirm' },
]

const stepIndex = computed(() => steps.findIndex(s => s.id === step.value))
const discounted = computed(() => plan.price * (1 - offer.percent / 100))
const savings = computed(() => (plan.price - discounted.value) * offer.months)

function reset() {
  step.value = 'reason'
  reason.value = ''
  feedback.value = ''
  acknowledged.value = false
}

function onOpenChange(value: boolean) {
  open.value = value
  if (!value)
    setTimeout(reset, 200)
}
</script>

<template>
  <div class="grid min-h-screen w-full place-items-center p-6">
    <Dialog :open="open" @update:open="onOpenChange">
      <DialogTrigger as-child>
        <Button variant="outline">
          Cancel subscription
        </Button>
      </DialogTrigger>
      <DialogContent class="max-h-[calc(100dvh-2rem)] grid-cols-1 gap-0 overflow-x-hidden overflow-y-auto p-0 [&>*]:min-w-0 sm:max-w-md">
        <!-- Progress -->
        <div
          v-if="stepIndex !== -1"
          class="flex items-center gap-2 border-b px-6 py-4 pr-12"
        >
          <template v-for="(s, i) in steps" :key="s.id">
            <div class="flex items-center gap-2">
              <span
                :class="cn(
                  'grid size-5 place-items-center rounded-full border text-[11px] leading-none font-medium tabular-nums transition-colors',
                  i < stepIndex && 'border-primary bg-primary text-primary-foreground',
                  i === stepIndex && 'border-primary text-primary',
                  i > stepIndex && 'text-muted-foreground',
                )"
              >
                {{ i + 1 }}
              </span>
              <span
                :class="cn(
                  'text-xs font-medium',
                  i === stepIndex ? 'text-foreground' : 'text-muted-foreground',
                  i !== stepIndex && 'max-sm:hidden',
                )"
              >
                {{ s.label }}
              </span>
            </div>
            <div
              v-if="i < steps.length - 1"
              :class="cn('h-px flex-1', i < stepIndex ? 'bg-primary' : 'bg-border')"
            />
          </template>
        </div>

        <!-- Step 1: reason -->
        <div v-if="step === 'reason'" class="space-y-5 p-6">
          <DialogHeader class="text-left">
            <DialogTitle>Why are you cancelling?</DialogTitle>
            <DialogDescription>
              Your answer helps us improve. It only takes a few seconds.
            </DialogDescription>
          </DialogHeader>

          <RadioGroup v-model="reason" class="gap-2">
            <Label
              v-for="r in reasons"
              :key="r.value"
              :for="`reason-${r.value}`"
              :class="cn(
                'hover:bg-muted/50 flex cursor-pointer items-center gap-3 rounded-lg border px-3 py-2.5 text-sm font-normal transition-colors',
                reason === r.value && 'border-primary bg-primary/5 hover:bg-primary/5',
              )"
            >
              <RadioGroupItem :id="`reason-${r.value}`" :value="r.value" />
              {{ r.label }}
            </Label>
          </RadioGroup>

          <div class="space-y-2">
            <Label for="cancel-feedback" class="text-sm">
              Anything else? <span class="text-muted-foreground font-normal">(optional)</span>
            </Label>
            <Textarea
              id="cancel-feedback"
              v-model="feedback"
              placeholder="Tell us what we could have done better…"
              class="min-h-20 resize-none"
              maxlength="500"
            />
            <p class="text-muted-foreground text-right text-xs tabular-nums">
              {{ feedback.length }}/500
            </p>
          </div>

          <DialogFooter class="gap-2 sm:justify-between">
            <Button variant="ghost" @click="onOpenChange(false)">
              Keep my plan
            </Button>
            <Button :disabled="!reason" @click="step = 'offer'">
              Continue
            </Button>
          </DialogFooter>
        </div>

        <!-- Step 2: retention offer -->
        <div v-else-if="step === 'offer'" class="space-y-5 p-6">
          <DialogHeader class="text-left">
            <DialogTitle>Before you go, a special offer</DialogTitle>
            <DialogDescription>
              Stay on {{ plan.name }} and we'll take {{ offer.percent }}% off your next {{ offer.months }} months.
            </DialogDescription>
          </DialogHeader>

          <div class="bg-primary/5 border-primary/30 relative overflow-hidden rounded-lg border p-5">
            <div class="flex items-start justify-between gap-4">
              <div class="bg-primary text-primary-foreground grid size-10 shrink-0 place-items-center rounded-lg">
                <GiftIcon class="size-5" />
              </div>
              <Badge class="rounded-md">
                Save ${{ savings }}
              </Badge>
            </div>
            <p class="mt-4 text-3xl font-semibold tracking-tight">
              {{ offer.percent }}% off
            </p>
            <p class="text-muted-foreground text-sm">
              for {{ offer.months }} months, then ${{ plan.price }}/mo
            </p>
            <div class="mt-4 flex items-baseline gap-2">
              <span class="text-2xl font-semibold tabular-nums">${{ discounted }}</span>
              <span class="text-muted-foreground text-sm">/month</span>
              <span class="text-muted-foreground ml-1 text-sm tabular-nums line-through">${{ plan.price }}</span>
            </div>
          </div>

          <ul class="text-muted-foreground space-y-2 text-sm">
            <li class="flex items-center gap-2">
              <CircleCheckIcon class="text-primary size-4 shrink-0" />
              Applied automatically to your next invoice
            </li>
            <li class="flex items-center gap-2">
              <CircleCheckIcon class="text-primary size-4 shrink-0" />
              Keep every project, file and integration
            </li>
          </ul>

          <div class="flex flex-col gap-2">
            <Button @click="step = 'retained'">
              Accept offer
            </Button>
            <Button variant="ghost" class="text-muted-foreground" @click="step = 'confirm'">
              No thanks, continue cancelling
            </Button>
          </div>
        </div>

        <!-- Step 3: confirm -->
        <div v-else-if="step === 'confirm'" class="space-y-5 p-6">
          <DialogHeader class="text-left">
            <div class="bg-destructive/10 text-destructive mb-2 grid size-10 place-items-center rounded-lg">
              <TriangleAlertIcon class="size-5" />
            </div>
            <DialogTitle>Cancel your {{ plan.name }} plan?</DialogTitle>
            <DialogDescription>
              You'll keep access until <span class="text-foreground font-medium">{{ plan.renewsOn }}</span>.
              After that, your workspace moves to the Free plan.
            </DialogDescription>
          </DialogHeader>

          <dl class="divide-y rounded-lg border text-sm">
            <div class="flex items-center justify-between gap-4 px-4 py-3">
              <dt class="text-muted-foreground">Current plan</dt>
              <dd class="font-medium">{{ plan.name }} · ${{ plan.price }}/mo</dd>
            </div>
            <div class="flex items-center justify-between gap-4 px-4 py-3">
              <dt class="text-muted-foreground">Access ends</dt>
              <dd class="font-medium">{{ plan.renewsOn }}</dd>
            </div>
            <div class="flex items-center justify-between gap-4 px-4 py-3">
              <dt class="text-muted-foreground">Future charges</dt>
              <dd class="font-medium">None</dd>
            </div>
          </dl>

          <Label for="cancel-ack" class="flex items-start gap-3 text-sm leading-snug font-normal">
            <Checkbox id="cancel-ack" v-model="acknowledged" class="mt-0.5" />
            I understand that projects over the Free plan limits will become read-only.
          </Label>

          <DialogFooter class="gap-2 sm:justify-between">
            <Button variant="ghost" @click="step = 'offer'">
              <ArrowLeftIcon />
              Back
            </Button>
            <Button variant="destructive" :disabled="!acknowledged" @click="step = 'cancelled'">
              Cancel subscription
            </Button>
          </DialogFooter>
        </div>

        <!-- Done: retained -->
        <div v-else-if="step === 'retained'" class="flex flex-col items-center gap-4 p-8 text-center">
          <div class="bg-primary/10 text-primary grid size-12 place-items-center rounded-full">
            <PartyPopperIcon class="size-6" />
          </div>
          <DialogHeader class="items-center text-center">
            <DialogTitle>Glad you're staying!</DialogTitle>
            <DialogDescription>
              {{ offer.percent }}% off has been applied. You'll pay ${{ discounted }}/mo for the next {{ offer.months }} months.
            </DialogDescription>
          </DialogHeader>
          <Button class="w-full" @click="onOpenChange(false)">
            Back to billing
          </Button>
        </div>

        <!-- Done: cancelled -->
        <div v-else class="flex flex-col items-center gap-4 p-8 text-center">
          <div class="bg-muted grid size-12 place-items-center rounded-full">
            <CircleCheckIcon class="size-6" />
          </div>
          <DialogHeader class="items-center text-center">
            <DialogTitle>Subscription cancelled</DialogTitle>
            <DialogDescription>
              Your {{ plan.name }} features stay active until {{ plan.renewsOn }}. You can resubscribe anytime.
            </DialogDescription>
          </DialogHeader>
          <div class="flex w-full flex-col gap-2">
            <Button variant="outline" @click="reset">
              Undo cancellation
            </Button>
            <Button variant="ghost" @click="onOpenChange(false)">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  </div>
</template>
